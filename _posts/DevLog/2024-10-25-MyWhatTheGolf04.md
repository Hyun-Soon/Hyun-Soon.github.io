---
title: \[DevLog\] Game Engine 개발일지 \#04
excerpt: Game Engine 개발일지
categories:
  - DevLog
  - MyWhatTheGolf
tags:
  - 개발일지
  - directX
  - WinAPI
---
## 1. 날짜 (Date)

2024/10/25

---

## 2. 작업 목표 (Daily Goals)

window, directx 클래스 분할

---

## 3. 진행 사항 (Progress)

임시로 클래스 분할

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

directx로 게임을 처음 만들어봐서 그림이 잘 안그려진다. 진행하면서 수시로 리팩토링 해야 할 듯

---

## 5. 다음 단계 (Next Steps)

삼각형 렌더링

---

## 6. 회고 (Reflection)

- window와 directx를 관리하는 클래스를 각각 만들었다. 나중에 window, device, context 등을 사용해서 게임을 렌더링해야 할텐데, 얘네를 관리하는 클래스에 각자 넣어놔야할지, MyWhatTheGolf 클래스에서 한번에 관리해야 할지 고민이 된다. 다른 게임 코드를 찾아봤는데 몇몇 프로젝트는 window를 전역변수로 해놨다. 일단은 전역변수 쓰지 말고 해보자.
- 해상도 값도 웬만하면 MyWhatTheGolf 말고 WindowManager에서 바로 설정하고 싶은데, 나중에 MyWhatTheGolf 클래스에서 사용할 일이 있을 것 같아서 일단 냅두기로 했다.
- 프로젝트 진행하면서 구조를 계속 생각해보자.

---

## 7. 메모 (Notes)

- [Coding Standard](https://docs.popekim.com/ko/coding-standards/cpp)

---

