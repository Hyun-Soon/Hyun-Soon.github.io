---
title: "[DevLog] Maplestory 모작 개발일지 #11"
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

2025/02/02

---

## 2. 작업 목표 (Daily Goals)

구조 리팩토링(엔진 코드와 게임 코드의 결합도 제거)

---

## 3. 진행 사항 (Progress)

작업 목표 완료

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- `AddGameObject 함수에서 접근하는 mActiveScene 포인터가 nullptr이었다.`
 -> SceneManager::CreateScene()에서 만든 씬을 바로 activeScene으로 설정하는 코드를 주석처리해서 문제 발생. 현재 AddGameObject() 함수가 activeScene에 물체를 추가하도록 구현되어 있다. Scene pointer를 받아서 해당 씬에 오브젝트를 생성해주는 함수를 추가로 만들 수도 있지만, 처음 씬을 초기화할 때가 아니면 해당 함수를 사용할 경우는 거의 없을 것 같다. 따라서 AddGameObject() 함수를 현재 상태로 유지하고 CreateScene()에서 만든 Scene을 바로 activeScene으로 설정하도록 했다. 

---

## 5. 다음 단계 (Next Steps)

Animation 클래스 구현하기
Camera 컴포넌트 구현하기
FSM 공부하기

---

## 6. 회고 (Reflection)

슬슬 게임 로직 구체적으로 고민해야될 듯 싶다

---

## 7. 메모 (Notes)


---

