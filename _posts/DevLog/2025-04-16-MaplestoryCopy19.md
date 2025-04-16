---
title: "[DevLog] Maplestory 모작 개발일지 #19"
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

2025/04/16

---

## 2. 작업 목표 (Daily Goals)

- 필요한 씬 및 포탈 배치
- UI , UI Manager 구현
- 플레이어 상태 이전 코드 함수화
- 몬스터 투사체 피격 데미지 구현

---

## 3. 진행 사항 (Progress)

작업 목표 완료

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- 캐릭터 및 몬스터의 모든 픽셀마다 CollisionMap과 충돌 검사를 했더니 프레임 드랍 발생(20 아래로)
	 충돌범위 사각형의 꼭짓점만 검사

- 씬 전환 시 무한루프(특히, 캐릭터 이동하고 공격 후 전환하면 발생)

- 큰 맵(ex. SouthFerry) 렌더링 시, 프레임 드랍
	gdiplus 함수 대신 winapi 함수 사용하여 개선

-  플레이어 여러 씬에 넣어놨는데, 싱글톤이라서 2중 해제 에러 발생

- 포탈 구현 후, 계속 씬 변환 과정에서 무한 루프 발생
	 계속해서 중력 가속도를 받아서 속도가 매우 커져서 CollisionMap 체크 과정에서 발생. 포탈 탈 때마다 ResetVelocity() 호출하여 해결.

- 발판을 점프로 올라갈 때, 발판 아래에서 충돌 발생
	 플레이어의 상태가 점프가 아닐 때만 충돌 검사

- x 방향으로 이동하면서 Collision Map 충돌 시 무한루프 발생
	 CollisionMap과 오브젝트 충돌 시, 오브젝트의 속도 반대 방향으로 가능한 위치 픽셀 검사

---

## 5. 다음 단계 (Next Steps)

- 월드 기준 플레이어 위치 비율 계산해서 작은 배경사진 렌더링하기
- Npc 클릭 상호작용 구현 

---

## 6. 회고 (Reflection)


---

## 7. 메모 (Notes)


---

