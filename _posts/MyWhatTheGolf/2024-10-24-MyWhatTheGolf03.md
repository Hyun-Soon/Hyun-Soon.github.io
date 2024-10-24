---
title: \[DebLog\] What The Golf 모작 개발일지 \#03
categories:
  - MyWhatTheGolf
tags:
  - 개발일지
  - directX
  - WinAPI
---
## 1. 날짜 (Date)

2024/10/24

---

## 2. 작업 목표 (Daily Goals)

- DirectX 초기화하기
- Window, DirectX 초기화 코드 클래스로 분할하기

---

## 3. 진행 사항 (Progress)

코드 분할 진행 중

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- `Error LNK2019 unresolved external symbol _main referenced in function "int __cdecl invoke_main(void)" (?invoke_main@@YAHXZ)` : main 함수를 wWinMain 함수로 변경했을 때 발생했다. properties -> Linker -> System -> SubSystem에서 Windows로 설정해줘서 해결했다.

---

## 5. 다음 단계 (Next Steps)

- Window, DirectX 초기화 코드 클래스로 분할하기
- 삼각형 렌더링하기

---

## 6. 회고 (Reflection)

- 객체 지향 프로그래밍 경험이 없다 보니, Initializer를 어떤 식으로 만드는 게 좋은지 감이 안온다. 인터페이스를 만들고 윈도우, directX intializer에서 이를 기반으로 만들자니 함수에 필요한 인자가 다르고 명시할 인터페이스 내용도 딱히 없다. 일단은 Initializer 객체 안에 window, directX intializer를 멤버 변수로 넣을 것 같다.
- 디자인 패턴 공부의 필요성을 느낀다. Component 디자인 패턴을 조사해보자.

---

## 7. 메모 (Notes)

- `SAL` : Standard Annotation Language. Microsoft가 Visual C++에서 코드 분석과 정적 코드 검사를 개선하기 위해 도입한 주석 시스템. 코드의 함수, 매개변수, 반환 값에 대한 의도를 명확히 하여, 잠재적인 버그를 미리 감지하고, 안정성을 향상시키는 데 기여한다. 
- `WINAPI` : 매크로로 정의되어 있으며, 실제로는 `__stdcall`이라는 호출 규약을 의미한다. \_\_stdcall은 매개변수를 오른쪽에서 왼쪽으로 스택에 push하고, 함수가 반환될 때 호출자가 아니라 함수가 스택을 정리하는 방식이다. 윈도우 API 함수들은 이 규약을 따르기 때문에, 윈도우 API 함수와의 일관성을 유지하기 위해 프로그래머가 작성하는 콜백 함수에도 `WINAPI`를 사용하는 경우가 많다.

---

