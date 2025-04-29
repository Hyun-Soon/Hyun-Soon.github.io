---
title: "[DevLog] Maplestory 모작 개발일지 #20"
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

2025/04/29

---

## 2. 작업 목표 (Daily Goals)

- 보스몬스터 구현
- 배경사진 원근감있게 느리게 이동하도록 렌더링
- NPC 대화 시스템
- 게임오브젝트 자식오브젝트 기능 추가 및 함수 수정  

---

## 3. 진행 사항 (Progress)

- 자쿰 설계 중
- 배경사진 느리게 이동 적용 완료
- BossMonster Layer 추가
- 게임오브젝트 자식오브젝트 기능 추가 완료 및 Update, LateUpdate, Render, CollisionCheck 함수 리팩토링 완료

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

보스 몬스터 자쿰은 몸체와 8개의 팔로 이루어져 있다. 몸체의 위치를 기준으로, 각 팔의 위치는 Offset을 이용하여 위치를 정하려고 생각했다.  

GameObject를 상속받은 자쿰 클래스를 만들고 멤버 변수로 자쿰 팔 클래스 포인터를 담는 std::vector를 선언했다. 하지만 자쿰에 대해서만 멤버 변수로 객체를 추가하면, 자쿰의 Update, LateUpdate, Render 함수를 따로 오버라이딩해야 하며, 자식을 가지는 다른 클래스를 만들 때도 해당 함수들을 오버라이딩 해야한다.  

또한 충돌을 체크하는 부분에서 일반적인 게임오브젝트만 확인하고 있기 때문에, 자식을 가지는 특이한 객체에 대해서는 따로 방법을 강구해야 한다.  

이러한 확장성, 통일성 문제 때문에 일반적인 GameObject가 자식 객체를 std::vector에 담아서 가지고 있도록 했다. list를 구현해서 넣으려고 했으나, 캐시 효율성을 고려해서 vector를 사용했다.  

Update, LateUpdate, Render 함수는 leaf 자식 객체부터 실행되도록 재귀적으로 구현했다. 자쿰의 경우 몸체가 팔보다 앞에 있기 때문에 leaf 부터 순회하도록 구현했다.

---

## 5. 다음 단계 (Next Steps)

- 자쿰 Phase별 구현

---

## 6. 회고 (Reflection)

기존의 배경 렌더링 방식은, 플레이어가 중심 위치에서 얼마나 움직였는지를 픽셀 단위로 계산하여 맵과 배경을 그만큼 반대로 이동시키는 방식이었다. 이를 비율화하고 작은 배경 이동속도 상수를 곱함으로써 멀리 있는 배경이 천천히 움직이도록 구현했다.

---

## 7. 메모 (Notes)


---

