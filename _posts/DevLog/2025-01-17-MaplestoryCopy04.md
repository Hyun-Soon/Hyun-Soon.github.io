---
title: "[DevLog] Maplestory 모작 개발일지 #04"
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

2025/01/17

---

## 2. 작업 목표 (Daily Goals)

LuckySeven 구현

---

## 3. 진행 사항 (Progress)

LuckySeven 구현 완료
Player가 스킬 호출하는 방법 고민 중

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)



---

## 5. 다음 단계 (Next Steps)

SkillManager 구현

---

## 6. 회고 (Reflection)

Skill을 담은 vector를 플레이어에 멤버 변수로 놓고, 키 입력이랑 매핑해서 Player::Update()에서 호출하는게 낫겠지? SkillManager 클래스에서 전직에 따른 스킬들을 관리해주자.

아이템들에서 공통적으로 필요한 이미지, 이름, id 등은 아이템별로 하나씩 동적할당 해놓고, 필드에서 아이템이 드랍될 때 전에 동적할당 해놓은 포인터에서 필요한 내용을 가져다 쓰려고 생각했다. 그런데 이러면 추후에 아이템이 추가될 수록 동적할당 해야 하는 양이 많아진다. 따라서 씬마다 몬스터 정보와 그 몬스터가 드랍하는 아이템 목록을 저장해놓고 씬을 옮길 때 마다 동적할당 하는 방향으로 구현하기로 했다.

아이템에 따라 추가적으로 필요한 정보들이 있다. 예를 들어, 소비 아이템의 경우 남은 양이 있고 아이템을 먹었을 경우 인벤토리의 어느 위치에 담겨있는지 정보가 있어야 렌더링을 할 수 있다(인벤토리에서 위치 옮길 경우 고려). 이런 정보들의 경우 각 아이템 객체마다 다르므로 각각 추가로 할당을 해줘야 한다. 아래 두가지 경우를 생각해봤다.

1. 몬스터가 죽고 드랍되는 시점에 할당하기
2. 드랍 때는 이미지만 띄워주고 아이템을 먹을 때 할당하기

2번의 경우 아이템을 먹지 않으면 할당을 하지 않을 수 있으므로 효율적이다. 하지만 메이플스토리에서 아이템을 먹지 않는 경우는 드물 것이고, 아이템을 몰아서 먹는 경우 많은 동적할당으로 인해 렉이 걸릴 수 있을 것이다. 1번으로 미리미리 할당해놓자. 어차피 메이플스토리는 몬스터 수도 많지 않다.

어.. 근데 어차피 아이템 드랍되면 위치 정보는 할당하긴 해야 됐네..

구현 계획에 없긴 하지만 자석펫을 구현한다고 하면, 아이템 위치를 prioirty_queue에 pair로 넣는게 주변 아이템 찾을 때 좋을 것 같다.

---

## 7. 메모 (Notes)


---
