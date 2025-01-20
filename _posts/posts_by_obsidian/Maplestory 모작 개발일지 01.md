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

2025/01/19

---

## 2. 작업 목표 (Daily Goals)

Component 구현

---

## 3. 진행 사항 (Progress)

GameObject들이 Component를 사용하는 식으로 구조 변경 중

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)


---

## 5. 다음 단계 (Next Steps)

Transform 구현

---

## 6. 회고 (Reflection)

플레이어의 전직, 전직에 따른 스킬 등을 변경하는 과정에서 확장성을 생각했을 때 컴포넌트 구조가 좋아보여서 바꾸게 됐다.

이로 인해서 컴포넌트 각각의 함수들이 virtual로 구현되므로 vtable에 의한 오버헤드가 발생한다. 
하지만 몬스터를 생성할 때, renderer 컴포넌트만 뺐다 꼈다 해주는게 계속 몬스터 동적할당/해제하는 것보다 효율적일 것 같다.
Npc와 대화하는 상황을 생각해보면 플레이어의 움직임을 멈춰야 하는데, 컴포넌트를 사용하지 않으면 계속해서 움직일 수 있는 상황인지 조건문을 체크해야 한다. 모든 상황에서 조건을 체크하느니 컴포넌트를 탈부착하는 게 좋을 것 같다.

Player, Npc, Monster 별로 움직임을 제어하는 함수가 달라야 한다. 컴포넌트로 구현한다면 내부에 함수포인터를 담는 방법이 좋을 것 같다.

---

## 7. 메모 (Notes)


---

