---
title: "[DevLog] Maplestory 모작 개발일지 #13"
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

2025/02/18

---

## 2. 작업 목표 (Daily Goals)

Player 상태 및 애니메이션 구현

---

## 3. 진행 사항 (Progress)

GameObject들이 Component를 사용하는 식으로 구조 변경 중

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)


---

## 5. 다음 단계 (Next Steps)

Player 상태 및 애니메이션 구현

---

## 6. 회고 (Reflection)

방향키를 누를 때 마다 애니메이션을 재생시키면 연타했을 때 애니메이션이 멈춘 것 처럼 보인다. 이런 상황을 피하고자 해당 상태에 들어갈 때 애니메이션을 동작시키고, 동작 함수에서는 상태 전이에 관련된 코드만 작성했다.

Attack, Alert 등의 상태에서도 땅에 붙어있는 상태인지, 공중에 떠있는 상태인지 구분이 필요하다. 일단 떠오르는 방식은 비트 플래그인데, 더 좋은 방법이 있을까?

---

## 7. 메모 (Notes)


---

