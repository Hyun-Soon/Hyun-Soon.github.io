---
title: "[DevLog] Maplestory 모작 개발일지 #17"
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

2025/03/26

---

## 2. 작업 목표 (Daily Goals)

Collider 구현, 충돌 검사

---

## 3. 진행 사항 (Progress)

목표 완료

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- Monster에 컴포넌트를 잘 넣어줬으나 렌더링되지 않음
	이전에 디버깅 때문에 Monster::Render()를 컴포넌트의 Render()를 실행하지 않고 임의로 네모를 그리도록 구현했는데, 이 코드가 남아있었음. override 함수를 삭제함.

- release 모드 기준, 엔진 구조가 복잡해짐에 따라 fps가 최악의 경우 57까지도 떨어졌다.
	`__forceinline`을 Input::GetKey 함수들, TimeUtils::GetDeltaTime() 등 자주 사용하는 함수에 사용했더니 fps가 여전히 가끔 떨어지긴 하지만, 반응성이 좋아졌다. parsec 원격 접속으로 구현하고 있어서, 추후 원래 컴퓨터에서 다시 한번 확인해봐야겠다.

---

## 5. 다음 단계 (Next Steps)

충돌체에 따른 로직 구현

---

## 6. 회고 (Reflection)

자꾸 구현하면서 디테일에 신경쓰느라 작업 속도가 많이 느렸다. 오늘은 디테일은 적당히 챙기면서 할일을 쳐내는 것에 집중했는데, 이게 훨씬 나은 것 같다.

---

## 7. 메모 (Notes)

`__forceinline` : MSVC(Microsoft Visual C++ Compiler)에서 제공하는 강제 인라인 지시어. `inline`을 사용하면 컴파일러가 거절할 수 있음. 하지만 forceinline의 경우 컴파일러가 인라인을 거부하려 해도 가능하면 강제로 인라인을 적용함. 단 재귀, 가상 함수 등에는 강제할 수 없음.

---

