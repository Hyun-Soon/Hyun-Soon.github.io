---
title: "[DevLog] Maplestory 모작 개발일지 #08"
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

2025/01/27

---

## 2. 작업 목표 (Daily Goals)

ObjectUtils, 디렉토리 정리
Gdiplus 오류 원인 찾기

---

## 3. 진행 사항 (Progress)

작업 목표 완료

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- Gdi plus 라이브러리를 사용하여 이미지를 불러오는데, `Gdiplus::Image::FromFile` 함수가 자꾸 null을 리턴했다
-> gdiplus 초기화 함수를 app.initialize() 이후에 실행해서 문제가 발생했다. app.initialize 내부에서 gdiplus 라이브러리를 사용하기 때문에, 이 전에 gdiplus를 초기화해줘야한다.

---

## 5. 다음 단계 (Next Steps)

object::Instantiate 함수를 사용하여 객체를 생성하도록 리팩토링

---

## 6. 회고 (Reflection)

Instantiate함수가 activeScene에 게임 오브젝트를 만들고 있는데, 투척 무기 등을 그릴 때는 이게 좋겠지만 처음에 맵을 만들 때는 activeScene에 게임 오브젝트를 추가하는 방식이 불편할 수도 있다. 맵별로 헤더와 소스 파일을 만들기보다 json같은 형식으로 파일로 저장해서 불러오는 식으로 만들어볼까?

개발 일지 꼬박꼬박좀 쓰자!!!!@#!$!

---

## 7. 메모 (Notes)

- `template<typename T, typename std::enable_if<std::is_base_of<Component, T>::value, int>::type = 0>` : 이를 이용해 컴파일 타임에 `T`가 `Component`를 상속받은 타입인지 확인할 수 있다. 이 조건이 만족되지 않으면 컴파일 에러가 발생한다.

---

