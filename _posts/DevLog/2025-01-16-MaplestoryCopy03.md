---
title: "[DevLog] Maplestory 개발일지 #03"
excerpt: Maplestory 개발일지
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

2025/01/16

---

## 2. 작업 목표 (Daily Goals)

LuckySevne 구현

---

## 3. 진행 사항 (Progress)

투사체 구현 중

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)


---

## 5. 다음 단계 (Next Steps)

투사체 이어서 구현하기

---

## 6. 회고 (Reflection)

LuckySeven에서 Monster->TakeDamage()를 실행해버리면 표창은 날라가고 있는데 몬스터가 데미지를 입는 상황이 발생한다. 추후 구현할 충돌 감지 클래스에서 충돌이 일어난 물체들의 타입을 보고 데미지를 주는 식으로 구현해야 할 것 같다. 몬스터의 움직임까지 고려했을 때, 공격 시 생성된 표창 클래스에 target을 저장하고, 이 target의 위치를 업데이트마다 추적하는 식으로 구현하는 게 좋을 것 같다.

아이템들은 Update()가 굳이 필요없다고 생각해서 GameObject를 상속받지 않고, 새로운 Item 클래스를 상속받아서 각각 장비(Equipment), 소비(Consumables), 기타(Miscellaneous) 아이템을 만들었다. 그런데 표창 아이템의 경우, 플레이어가 투척할 때 씬에서 움직이면서 Update가 되어야 한다. `class Shuriken : public Consumables, public GameObject`로 구현할지, 아니면 Consumables를 상속받은 표창 클래스와 GameObject를 상속받은 표창 클래스를 따로 구현할지 고민했지만, 둘다 깔끔하지 않은 것 같아서 다른 방법을 고민했다. 생각해보니 표창 뿐만 아니라 화살 등 투척 무기의 경우 하는 일이 다 같을 것 같아서, 표창 클래스는 단순 렌더링 및 개수 세기 용으로 Consumables만 상속받고, update되어야 하는 투척 무기들은 투척 무기 클래스를 따로 만들기로 했다.

Npc에 속도, 가속도 안넣겠다고 Player, Monster, Projectile에 따로 속도, 가속도를 넣고 있다. 차라리 GameObject에 넣고 다 상속받는게 더 나을 것 같다.


---

## 7. 메모 (Notes)


---

