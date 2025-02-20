---
title: "[DevLog] Maplestory 모작 개발일지 #14"
excerpt: Maplestory 모작 개발일지
categories:
  - DevLog
  - GameEngine
  - WinAPI
  - Maplestory
tags:
  - 개발일지
  - WinAPI
  - Maplestory
---
## 1. 날짜 (Date)

2025/02/19

---

## 2. 작업 목표 (Daily Goals)

Player 상태 및 애니메이션 구현
Rigidbody 구현

---

## 3. 진행 사항 (Progress)



---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- `unresolved external symbol "class hs::Application hs::app" (?app@hs@@3VApplication@1@A)` 링커 오류 발생 

HyunsoonEngine.cpp에 아래와 같이 app을 선언했다.
```c++
hs::Application app;
```

이후 다른 cpp 파일에서 app을 사용하기 위해 아래와 같이 extern을 사용더니 에러가 발생했다.
```c++
// Case 1
namespace hs
{
	extern Application app;
}
```

아래와 같이 바꿔 빌드했더니 정상적으로 빌드가 되었다.
```c++
// Case 2
extern hs::Application app;
```

각각의 경우에 대해, dumpbin으로 심볼을 확인해 봤다.
- Case 1
<img width="1440" alt="Image" src="https://github.com/user-attachments/assets/273c267a-250f-47d0-81cc-560e4c9d8677" />

- Case 2
<img width="1440" alt="Image" src="https://github.com/user-attachments/assets/7502a871-3b12-465d-ae90-8c0baf26f567" />

- HyunsoonEngine의 심볼
<img width="1440" alt="Image" src="https://github.com/user-attachments/assets/948ef195-49d4-41bf-81d6-28f8337245cf" />

에러가 발생한 Case 1의 심볼을 보면, `?app@hs@@3VApplication@1@A`로 Case 2 및 HyunsoonEngine에서의 심볼과 다른 것을 확인할 수 있다. 이로 인해 링커 에러가 발생했다.
다른 컴파일러에서도 Case1의 경우에, hs::app처럼 변수명 앞에도 네임스페이스를 붙이나?

---

## 5. 다음 단계 (Next Steps)



---

## 6. 회고 (Reflection)

현재 캐릭터의 상태를 Idle, Walk, Attack, Alert, Jump, ... 등으로 분류했다. 그런데 Alert의 경우, 다른 상태와 중첩된 경우가 존재한다. 예를 들어 몬스터에게 공격을 받으며 이동하고 있는 경우 Walk와 Alert가 중첩된다. 또한 사용자 경험적인 측면에서 Jump 상태에서 Idle을 거쳐서 Walk로 가는 것보다, Jump에서 바로 Walk로 가는 것이 좋아보이는데, 이 경우 캐릭터가 공중에 떠있는지 바닥에 착지했는지에 따라 경우가 나뉜다. Alert는 멤버변수로 시간을 따로 재는 것이 좋아보이고, 공중에 떠있는지 여부도 bool 변수를 하나 만들어서, 이 변수에 따라 갈 수 있는 상태를 정해주는 것이 좋을 것 같다.

---

## 7. 메모 (Notes)

- `Visual Studio 컴파일러 버전 확인하는 법` : Tools -> Command Line -> Developer Command Prompt -> `cl` 입력

---

