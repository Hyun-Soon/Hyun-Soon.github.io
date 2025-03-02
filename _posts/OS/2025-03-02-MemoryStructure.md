---
title: \[OS\] 프로세스의 메모리 구조
excerpt: 프로세스의 메모리 구조에 대해 알아보자
categories:
  - OS
tags:
  - Memory
  - OperatingSystem
  - SystemProgramming
  - OS
---
## 1. 메모리 구조

메모리는 아래의 4가지 구조로 구분된다.
1. 코드 영역(Text Section) : 실행 코드 저장(읽기 전용)
2. 데이터 영역(Data Section)
	- `.data` : 초기화 된 전역 변수, 정적 변수 저장
	- `.bss` : 초기화되지 않은 전역 변수 저장
3. 힙 영역(Heap) : malloc, new 등을 통해 동적 할당
4. 스택 영역(Stack) : 지역 변수, 함수 호출 프레임 저장


## 2. Stack과 Heap

일반적으로 프로세스가 사용할 수 있는 메모리 공간이 정해져 있고, 이 안에서 코드, 데이터, 힙, 스택 영역이 배치된다. x86_64 아키텍쳐 기준으로, 힙 영역은 낮은 주소에서 높은 주소로, 스택 영역은 높은 주소에서 낮은 주소로 성장하며 유동적으로 크기가 변한다. 

### 2-1. Stack

 스택은 고정된 최대 크기를 가진다. 이를 초과 시, Stack Overflow가 발생한다.
 사용자가 설정하여 이 최대 크기를 바꿀 수 있다.

- `Stack Frame` : 함수 단위로 관리되는 메모리 블록. 함수가 호출되면 아래의 방식으로 프레임이 생성된다.
- 스택 관련 레지스터
	- `ESP` : Extended Stack Pointer. 현재 스택의 최상단 주소를 가리키는 포인터. push, pop 연산이 수행될 때 자동으로 변환됨.
	- `EBP` : Extended Base Pointer. 함수의 스택 프레임 시작 주소를 저장하는 포인터. 함수가 호출되면 현재 EBP 값을 저장하고, 새로운 스택 프레임을 설정.

- 함수 호출 시 어셈블리 및 스택 프레임 변화
```c++
void func(int a, int b) {
    int c = a + b;
}
```
```assembly
push ebp        ; 이전 EBP 저장
mov ebp, esp    ; 현재 ESP를 EBP로 설정 (새로운 스택 프레임 시작)
sub esp, 8      ; 지역 변수 공간 할당 (8바이트)
mov eax, [ebp+8]; 첫 번째 인자 값 로드
mov ebx, [ebp+12]; 두 번째 인자 값 로드
add eax, ebx    ; 두 값을 더함
mov [ebp-4], eax; 결과를 지역 변수에 저장
mov esp, ebp    ; 스택 포인터 복구
pop ebp         ; 이전 EBP 복원
ret             ; 리턴
```

### 2-2. Heap

힙의 최대 크기는 OS 설정과 메모리 상황에 따라 달라진다.
힙 할당 방식은 대표적으로 2가지가 있다.

1. `sbrk()` 방식 (전통적인 방식)
	BSS(Data)영역 바로 위에서 성장하기 시작함. sbrk()를 사용하여 힙 영역을 늘릴 수 있지만, 스택과 충돌할 위험이 있다.

2. `mmap()` 방식 (현대적인 방식)
	현대적인 OS에서는 mmap()을 활용하여 힙을 가변적으로 관리한다. 힙을 더 크게 할당해야 할 경우, 새로운 가상 메모리 페이지를 만들어 확장한다. 따라서 힙 크기는 이론상 물리적 메모리(RAM)과 가상 메모리 한도 내에서 커질 수 있다.
	
	 mmap()을 사용하면 힙을 유연하게 확장할 수 있지만, 다음과 같은 제한이 있다.
	 1. 프로세스의 가상 메모리 크기 제한
	 2. 물리 메모리(RAM) 및 스왑 공간 크기
	 3. 프로세스 당 열 수 있는 최대 메모리 매핑 개수


## 3. Buffer Overflow(메모리 주소를 활용한 해킹 기법)

메모리 주소를 활용하는 대표적인 방법으로 `Buffer Overflow`가 있다.

- `개념` : 프로그램이 버퍼(배열 등)에 데이터를 저장할 때, 크기를 초과하는 입력이 들어오면 인접한 메모리 영역을 덮어쓸 수 있다.
- `공격 방식` : 함수의 리턴 주소를 덮어써서 악성 코드가 실행되도록 유도, 또는 기존 변수 값을 변조하여 권한 상승 등의 공격 수행.
- `코드 예제`

```c++
#include <stdio.h>
#include <string.h>

void vulnerableFunction(char *userInput) {
    char buffer[64];  // 64바이트 크기의 버퍼
    strcpy(buffer, userInput);  // 크기 검사 없이 복사 (취약점)
}

int main() {
    char userInput[128];
    printf("Enter input: ");
    gets(userInput);  // gets()는 길이 검사를 안 함 (보안 취약)
    vulnerableFunction(userInput);
    return 0;
}
```

`userInput`이 **64바이트를 초과하면** `buffer`의 경계를 넘어 **리턴 주소를 덮어쓸 가능성이 있음**.

- `리턴 주소를 덮어쓰는 과정`

```text
// 일반적인 스택 상태
| [ 함수 매개변수 ] |
| [ 리턴 주소 ]    |  <-- 함수가 끝난 후 점프할 주소 (예: 0x08048456)
| [ 저장된 EBP ]   |
| [ 지역 변수 ]    |  <-- 버퍼 (buffer[64])

```

```text
// 악의적인 입력으로 리턴 주소 조작
| [ 악성 페이로드 (NOP + 쉘코드) ] |
| [ 새로운 리턴 주소 (0x08048500) ] |  <-- 공격자가 설정한 주소
| [ 저장된 EBP ]                  |
| [ buffer[] ]                  |

```