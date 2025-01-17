---
title: "[DevLog] Maplestory 모작 개발일지 #02"
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

2025/01/15

---

## 2. 작업 목표 (Daily Goals)

Item, Skill 구현

---

## 3. 진행 사항 (Progress)

LuckySeven 구현 중

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

1. 스킬 럭키세븐을 사용하려면 아이템 표창의 수를 확인해야 한다. 하지만 럭키세븐의 Cast() 함수 인자로 아이템을 넣어버리면 아이템을 받지 않는 스킬과 다형성 사용에서 문제가 생긴다. 
-> Inventory를 싱글톤으로 만들어서 접근 가능하게 만들었다.

2. 내가 만든 "Time.h"를 사용하다가 \<random\> 헤더를 include했더니 acstime을 비롯한 몇몇 변수들에 대해 다음과 같은 에러가 발생했다. `asctime: is not a member of global namespace`. 
-> https://stackoverflow.com/questions/23907008/compilation-error-error-c2039-clock-t-is-not-a-member-of-global-namespace

---

## 5. 다음 단계 (Next Steps)

LuckySeven 구현

---

## 6. 회고 (Reflection)

플레이어의 이동을 구현할 때, 현재 State와 Key 입력 상태에 따라 체크를 하기 때문에 코드가 지저분해 보인다. int 변수 하나에 비트 연산을 통해서 상태를 하나의 변수로 관리하면 더 편할 것 같다.

싱글톤 패턴 vs 멤버 변수 및 함수를 static으로 전부 구현하기
-> 싱글톤 객체를 static으로 선언하면 차이는 접근성 뿐인 것 같다. activeScene이나 상태 관리가 필요한 클래스의 경우는 싱글톤을 사용하여 폐쇄적으로 구현하는 게 좋을 것 같다. Time같은 유틸은 그냥 static으로 구현하는 게 편할 것 같다.

현재 싱글톤으로 플레이어, 인벤토리 등을 구현하고 있는데, 여기저기서 다 접근할 수 있어서 캡슐화가 보장되지 않는 느낌이다. 추후에 스킬 매니저 클래스에 friend를 줘서 여기서 스킬과 인벤토리, 능력치 사이의 동작을 조절하는 식으로 바꾸는 게 나을 것 같다.

---

## 7. 메모 (Notes)

싱글톤 패턴에서 메모리 해제 순서와 관련하여 발생할 수 있는 문제는 **정적 객체 파괴 순서(static object destruction order)** 문제다. 이는 프로그램 종료 시 정적 객체가 해제되는 순서가 정의되지 않아, 싱글톤 인스턴스가 파괴된 후 다른 정적 객체가 여전히 싱글톤에 접근하려 할 때 문제가 발생하는 상황이다. 프로그램 종료 시 모든 정적 객체가 파괴되지만 파괴 순서는 **C++ 표준에서 정의되어 있지 않다**. 이를 방지하려면, 
- 정적 객체를 동적으로 관리하거나,
- 소멸 순서를 명확히 제어하거나,
- 설계를 단순화하여 싱글톤과 다른 정적 객체 간의 의존성을 제거해야 한다.

---

