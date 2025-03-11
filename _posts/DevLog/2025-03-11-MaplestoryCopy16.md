---
title: "[DevLog] Maplestory 모작 개발일지 #16"
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

2025/03/11

---

## 2. 작업 목표 (Daily Goals)

LandMonsterScript 구현

---

## 3. 진행 사항 (Progress)

LandMonsterScript 디버깅 진행 중

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- release 모드로 실행했을 때, 리소스가 렌더링되지 않음

	debug 모드에서만 실행되는 assert문 안에 리소스 로드 코드를 넣어놨기 때문에 release 모드에서 실행되지 않았음.

---

## 5. 다음 단계 (Next Steps)

초록 달팽이 렌더링

---

## 6. 회고 (Reflection)

멀티플레이까지 고려했을 때 맵을 나갔다가 돌아와도 몬스터의 위치가 유지되어야 한다. 오브젝트 풀을 맵마다 만들어 놓으면 될 것 같다.

LandMonsterScript 컴포넌트를 몬스터 오브젝트에 끼우면 바로 행동할 수 있도록 하고 싶다. 몬스터마다 스피드는 달라야 하기 때문에 몬스터 클래스의 멤버 변수로 넣어놨는데, LandMonsterScript의 멤버 변수로 넣어놓는게 나을지 아직 고민된다. 팩토리 패턴도 슬슬 고려해보자.

---

## 7. 메모 (Notes)


---

