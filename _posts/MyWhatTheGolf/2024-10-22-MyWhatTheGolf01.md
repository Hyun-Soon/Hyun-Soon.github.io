---
title: \[DevLog\] What The Golf 모작 개발일지 \#01
excerpt: What The Golf 모작 개발일지
categories:
  - DevLog
  - MyWhatTheGolf
tags:
  - 개발일지
  - directX
  - WinAPI
---
## 1. 날짜 (Date)

2024/10/22

---

## 2. 작업 목표 (Daily Goals)

window 창 띄우기

---

## 3. 진행 사항 (Progress)

window 창 띄우기 성공

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)


---

## 5. 다음 단계 (Next Steps)

DirectX 초기화하기

---

## 6. 회고 (Reflection)

- Windows 운영 체제의 동작 방식과 용어들이 생소하다. 틈틈이 보면서 익숙해져야겠다.
- HINSTANCE가 처음엔 PID인줄 알았는데 약간 다른 것 같다.

---

## 7. 메모 (Notes)

- `WNDPROC` : "Window Procedure"의 약자로, 윈도우 창과 관련된 이벤트 메시지(입력, 윈도우 크기 조정, 페인팅 등)를 처리하는 콜백 함수. 운영체제가 다양한 메시지를 해당 창의 프로시저로 보내면, 프로시저는 그 메시지를 해석하여 적절한 동작을 수행한다.

- `PID vs HINSTANCE`
	- `PID` : 각각의 실행 중인 프로세스에게 운영 체제가 배정하는 고유한 ID. 특정 프로세스를 관리하거나 추적하기 위해 사용된다(시그널, 종료, 모니터링 등).
	- `HINSTANCE` : Handle to an Instance. 애플리케이션의 현재 인스턴스에 대한 핸들을 의미하며, 실행되고 있는 코드가 적재된 메모리 주소를 가리킨다. 애플리케이션이 실행되면 운영체제는 instance handle을 제공한다. 이 핸들을 통해 애플리케이션의 resource(아이콘, 창 등)들을 관리할 수 있다.

- `Handle` : Windows에서 handle은 운영체제에 의해 관리되는 resource 또는 object에 대한 abstract reference이다. 고유한 식별자로서, system resource의 자세한 구현을 몰라도 프로그램이 다양한 system resource와 상호작용할 수 있게 해준다. HINSTANCE, HWND 등이 있다.

- `SOLID 원칙`
	- S : Single Responsibility Principle, 하나의 클래스는 하나의 책임만 가져야 한다.
	- O : Open/Closed Principle, 소프트웨어의 구성 요소는 확장에는 열려 있고, 수정에는 닫혀 있어야 한다.
	- L : Liskov Subsitution Principle, 자식 클래스는 부모 클래스에서 정의한 기능을 모두 충족해야 하며, 부모 클래스로 대체가능해야 한다.
	- I : Interface Segregation Principle, 클라이언트가 필요하지 않은 기능에 의존하지 않도록 인터페이스를 작고 구체적으로 나눠야 한다.
	- D : Dependency Inversion Principle, 구체적인 클래스에 의존하는 것이 아니라, 인터페이스나 추상 클래스에 의존함으로써 유연성을 높여야 한다.
---

