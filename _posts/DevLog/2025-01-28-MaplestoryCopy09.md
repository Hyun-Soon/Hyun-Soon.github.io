---
title: "[DevLog] Maplestory 모작 개발일지 #09"
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

2025/01/28

---

## 2. 작업 목표 (Daily Goals)

object::Instantiate()로 객체 생성하도록 리팩토링

---

## 3. 진행 사항 (Progress)

목표 완료

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- Player를 static으로 선언해놔서, 생성자에서 initialize() 호출할 때 gdiplus가 초기화되어있지 않음. -> 순서를 직접 조정하기 위해 static으로 구현했던 Player 싱글톤 패턴을 동적 할당으로 변경
- 시작 맵 레이어가 3개로 나누어져 있어서, 각각 그렸더니 fps가 너무 크게 떨어졌다. -> 하나의 사진으로 합쳐서 렌더링했다.

---

## 5. 다음 단계 (Next Steps)

- Resource, Resources 클래스 구현
- Texture 클래스 구현

---

## 6. 회고 (Reflection)

Scene마다 Player::GetInstance()를 호출해서 player layer에 추가해야 한다. 현재 각각의 Initialize() 함수에서 추가하고 있는데, 깔끔하게 한번에 추가하는 방법을 생각해보자. -> 부모 Scene 클래스에서 미리 하면 될 듯?
player layer를 없애고, 모든 layer render 후 player만 따로 렌더링 하는 것도 생각해봤지만, 게임 엔진 관점에서 봤을 때 특정 게임에만 특화되는 느낌이 든다. 플레이어가 몸을 바꿔가며 플레이하면 여러 캐릭터가 렌더링되어야 한다. 너무 메이플스토리만 생각하지 말자.

debug 모드에서만 실행되는 assert를 잘 사용하는 게 좋다고 한다. 써본적이 없어서 그런지, 이 부분에서 써야겠다는 생각이 들지 않는다. 계속 의식을 하는게 좋겠다.

---

## 7. 메모 (Notes)


---

