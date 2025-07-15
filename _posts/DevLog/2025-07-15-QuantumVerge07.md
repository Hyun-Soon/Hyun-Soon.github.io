---
title: "[DevLog] QuantumVerge 개발일지 #07"
excerpt: QuantumVerge 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - UnrealEngine
  - QuantumVerge
---
## 1. 날짜 (Date)

2025/07/15

---

## 2. 작업 목표 (Daily Goals)

- LootBase 구현

---

## 3. 진행 사항 (Progress)

- Loot용 ObjectChannel, CollisionProfile 생성
- Teleport Decal 적용
- TeleportIndicator(Actor) 파기
- LootBase 구현
- Enemy 사망 시 LootBase 드랍


---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- TeleportAbility에서 SkillTimer에 함수를 등록해놓고, Enemy(Neutrinos)가 죽을 때 SkillTimer 해제 및 TeleportAbility::EndPlay()를 호출해주지 않음.
	Enemy와 TeleportAbility의 생명 주기를 맞춰주기 위해 EnemyBass에 Instanced Ability를 찾는 함수를 만들고, 이 함수를 통해 어빌리티에 접근하여 ClearTimer() 및 CancelAbility() 실행. 확장성과 단일 책임 원칙을 지키기 위해 Timer를 TeleportAbility에 선언했는데, 급하게 크래쉬를 고치려고 하드코딩하다 보니 Neutrinos와 연결 관계가 강해졌다. 위의 과정을 TeleportAbility에서 함수화하자.

- Loot의 SphereComponent가 사용하는 CollisionProfile에서 Player를 Overlap 처리 했지만, Overlap Delegate 함수가 호출되지 않음.
	Player가 사용하는 CollisionProfile에서도 Loot를 Overlap 처리하여 해결


---

## 5. 다음 단계 (Next Steps)

- TeleportAbility 기능 구현(TeleportIndicator 파기)

---

## 6. 회고 (Reflection)

GAS를 제대로 이해하지 못한 채로 코드 짜는데 집중했더니, Crash를 유발해 버렸다. 기한을 맞춰야 팀원분도 테스트를 편하게 하실텐데 고민이 많이 된다. 속도냐 이해냐...

팀플이니까 일단 구현이 먼저겠지?

---

## 7. 메모 (Notes)

- AActor 1088바이트로 너무 커서, IndicatorActor로 구현하기 적합하지 않음. Decal로 대체. -> 원래 TeleportIndicator에서 ExecuteTeleport()를 호출해 주고 있었기 때문에, 구조를 바꿔야 함.

---

