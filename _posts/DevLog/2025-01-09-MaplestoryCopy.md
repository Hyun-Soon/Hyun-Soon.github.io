---
title: "[DevLog] Maplestory 모작 개발일지 #01"
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

2025/01/09

---

## 2. 작업 목표 (Daily Goals)

플레이어 점프, 더블 점프 구현

---

## 3. 진행 사항 (Progress)

Player, Monster, Npc 클래스 구현 중

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

1. 땅의 위치에 왔을 때, 검사하는 로직이 작동하지 않음. 부동 소수점 오차 때문에 발생. `Pos.y == 600.0f` 가 아닌, `Pos.y > 599.9f`로 바꿔서 해결.

2. npc는 속도가 필요없다. monster는 가속도가 필요없다. player는 속도와 가속도 모두 필요하다. 속도와 가속도를 GameObject에 넣어 놓으면 클래스가 불필요한 추가 메모리를 사용하는 대신, Update()에서 한번에 계산할 수 있으므로 가독성이 좋다. 메모리와 가독성 사이에서 선택해야 한다. Velocity와 Acceleration의 경우 차지하는 메모리가 크지 않으니 가독성을 택해야겠다. -> WinAPI는 CPU 중심의 API로, GPU를 잘 활용 못하는 걸로 알고 있다. 최대한 효율적으로 짜자.

3. 기존에는 GetKeyPressed() 함수를 사용해 const speed \* dt 만큼 물체를 움직여주는 방식을 사용했다. 속도와 가속도를 사용하기 위해 GetKeyUp(), GetKeyDown() 함수로 velocity를 바꿔주고, 나중에 updatePhysics() 함수에서 한번에 시간에 따른 움직임을 계산하는 방식으로 변경했다. 그런데 A를 누르다가 바로 D를 누르게 되면, x방향 velocity가 1. A key down 2. D key down 3. A key up 순으로 업데이트 되어서 D 키를 누르고 있는데도 플레이어가 움직이지 않는 문제가 발생한다.

---

## 5. 다음 단계 (Next Steps)

Item, Skill 구현

---

## 6. 회고 (Reflection)

플레이어의 이동을 구현할 때, 현재 State와 Key 입력 상태에 따라 체크를 하기 때문에 코드가 지저분해 보인다. int 변수 하나에 비트 연산을 통해서 상태를 하나의 변수로 관리하면 더 편할 것 같다.

---

## 7. 메모 (Notes)


---

