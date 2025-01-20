---
title: "[DevLog] Maplestory 모작 개발일지 #06"
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

2025/01/20

---

## 2. 작업 목표 (Daily Goals)

GameObject 및 자식 클래스를 Component 시스템으로 변경

---

## 3. 진행 사항 (Progress)

Player 리팩토링 중

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

1. 헤더 `<dinput.h>` 에서 사용하는 몇몇 타입에 대해서 `identifier is undefined` 에러가 발생했다.

```c++
#include <mmsystem.h>
#include <dinput.h>
#pragma comment(lib, "Msimg32.lib")
#pragma comment(lib, "winmm.lib")
#include <gdiplus.h>
#pragma comment(lib, "gdiplus.lib")
```

-> Windows.h 헤더를 인클루드하지 않아서 발생한 문제다. dinput.h 헤더는 Windows.h 헤더에서 정의한 기본 API와 타입을 의존하기 때문에, 이를 찾지 못해 에러가 발생했다. dinput.h 이전에 Windows.h를 인클루드하여 해결했다.

---

## 5. 다음 단계 (Next Steps)

Player 리팩토링

---

## 6. 회고 (Reflection)

Jooh님이랑 대화하면서 내가 너무 메이플스토리 게임 자체에만 생각이 매몰되어있었다는 것을 느꼈다. 확장성을 고려하지 않고 내가 지금 구현하려는 내용에만 맞춰서 구조를 짜고 있었다. 현재 메이플스토리에는 종종 다양한 미니게임이 제공된다. 그리고 미니게임에서는 플레이어의 조작 방식과 동작이 달라진다. 내가 지금 구현하는 방식처럼, "플레이어는 이런 움직임이 무조건 있으니 클래스 내부에 구현해놓자"라는 식으로 만들게 되면 추후 새로운 움직임이나 컨텐츠를 추가할 때 구조적으로 어려움이 있을 것이다. 컴포넌트 구조로 바꾸는 것에 대해 의심이 있었는데, 긍정적인 방향이라는 생각이 강해졌다.

---

## 7. 메모 (Notes)


---

