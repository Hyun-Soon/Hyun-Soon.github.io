---
title: "[DevLog] Maplestory 모작 개발일지 #21"
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

2025/05/

---

## 2. 작업 목표 (Daily Goals)

- 게임오브젝트 자식 구조
- Update/LateUpdate/Render/Destroy 함수 자식까지 포함하는 재귀 구조로 변경
- Effect, Buff 기능 구현

---

## 3. 진행 사항 (Progress)



---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- 각 맵의 레이어 마다 싱글톤 객체인 플레이어 포인터가 들어가 있어서 해제 시 다중 해제로 인한 문제 발생
	맵을 나갈 때 호출되는 OnExit() 함수에서 플레이어 포인터 제거


---

## 5. 다음 단계 (Next Steps)



---

## 6. 회고 (Reflection)

BuffInfo.h 헤더 파일에 BuffInfo 구조체를 담는 unordered_map을 선언했다. 그런데 이 헤더를 인클루드하는 cpp파일들 마다 이 map 변수를 선언해서 중복 에러가 발생했다. 이를 해결하기 위해 unordered_map을 static으로 선언해서 해결했다. 그런데 충격적인 사실이 있었다. 함수 내부의 static 변수처럼, 모든 cpp 파일들에서 이 unordered_map을 공유할 줄 알았는데, 각 unordered_map의 주소가 달랐다. 즉 obj 파일 마다 각각 unordered_map을 생성해 메모리를 차지하던 것이었다. extern을 사용하거나 클래스 내부에 static으로 선언해야겠다.

자쿰 본체에서 자식 오브젝트가 다 사라졌는지 확인하고 BoxCollider를 추가하는 것 보다, 자식 오브젝트가 죽을 때 남은 다른 자식 오브젝트가 없으면, 부모 오브젝트에 BoxCollider를 추가하도록 했다. 본체에서 계속 자식을 확인하는 것 보다, 자식이 죽을 때만 확인하는 게 나을 것 같다.

---

## 7. 메모 (Notes)


---

