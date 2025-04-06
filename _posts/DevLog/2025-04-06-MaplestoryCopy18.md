---
title: "[DevLog] Maplestory 모작 개발일지 #18"
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

2025/04/06

---

## 2. 작업 목표 (Daily Goals)

Collision Map 에러 고치기

---

## 3. 진행 사항 (Progress)

Collision 검사는 되지만, 떨림 현상 발생

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- CollisionMap을 파싱하는 과정에서, HDC에서 GetPixel()을 사용해 픽셀값을 확인하는데, 첫번째 row를 돌고 나서 `if (color == CLR_INVALID)`의 조건문에 걸려버렸다.
	 GetPixel() 인자의 순서가 x, y인데 r, c로 반대로 넣어버렸다.

- 바닥에 충돌하면, 저장해뒀던 이전 포지션으로 위치를 조정하는 방식으로 발판 위에 올라가도록 설계했는데, 이후 공중에 있는데도 계속 충돌 판정이 발생했다.
	 포지션을 전 프레임 위치로 옮겼으나, 속도 및 가속도를 초기화 하지 않았다. 이에 아래 방향 속도가 점점 커져 매 프레임마다 바닥과 충돌 판정이 발생했다.

- CollisionMap에 충돌하면 충돌하지 않을 때까지 y 위치를 올리고 있는데, 떨림 현상이 발생한다.

---

## 5. 다음 단계 (Next Steps)

- 씬 여러개 구성하기
- 씬 이동 구현하기

---

## 6. 회고 (Reflection)

어이없게도 GetPixel()의 인자 순서를 잘못 넣어서 시간을 많이 잡아먹었다. 나는 평소에 r, c를 많이 사용하는데 GetPixel함수는 x, y를 사용해서 순서가 반대였다. 만들어진 함수를 사용할 때, 확인하는 습관을 가지자.

고화질 배경화면을 깔았더니 프레임 드랍이 심하다. 저화질 배경화면 찾아보자.

---

## 7. 메모 (Notes)


---

