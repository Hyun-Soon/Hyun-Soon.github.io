---
title: "[DevLog] QuantumVerge 개발일지 #14"
excerpt: QuantumVerge 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - QuantumVerge
  - UnrealEngine
---
## 1. 날짜 (Date)

2025/07/23

---

## 2. 작업 목표 (Daily Goals)

- Debuff GE 추가(`Confusion`, `Dot`) ✅
- `UGameplayEffectLibrary` 구현 ✅
- ShockWaveAbility 구현(`Confusion`을 여기에서 적용) ✅
- Aura Material 제작 ✅
- PlayerTestLevel에서 충돌 없이 플레이어 데미지 입는 버그 해결 ✅
- VFX/SFX 옵션 구현

---

## 3. 진행 사항 (Progress)

- Debuff GE 추가(`Confusion`, `Dot`) 완료
- `UGameplayEffectLibrary` 구현 완료
- ShockWaveAbility 구현(`Confusion`을 여기에서 적용) 완료
- Aura Material 제작 완료
- PlayerTestLevel에서 충돌 없이 플레이어 데미지 입는 버그 해결 완료

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

#### 4-1. 스턴 확률을 GE 밖에서 계산 후, 실행
https://forums.unrealengine.com/t/gas-gameplayeffect-component-chance-to-apply/1997435/2

GE 안에서 계산하려면 Component 클래스를 상속받아서 다시 만들어야 함. Ability에서 확률 계산 후, GE 생성하기로 결정.

#### 4-2. PlayerTestLevel에서 충돌 없이 플레이어 데미지 입는 버그 해결

Enemy가 스킬로 Overlap 검사를 할 때, 플레이어만 Overlap하는 채널(`EnemySkill`)을 사용하여 Player Casting 없이 바로 데미지를 전달했다. 그런데 Enemy 자체는 `EnemyLive` 채널을 사용하고, 이 채널은 `Projectile` 클래스와도 Overlap 처리되기 때문에 플레이어 캐스팅 분기 처리해서 해결했다.


---

## 5. 다음 단계 (Next Steps)

- VFX/SFX 옵션 및 UI 구현
- InstantSlowAuraAbility `State.Slow.Instant` 적용 안되는 문제 해결
- 보스용 공간왜곡 매터리얼 생성

---

## 6. 회고 (Reflection)


---

## 7. 메모 (Notes)

- 충격파에서 `State.Immobilized` 태그 사용하기
- SlowDebuff GE 추가 종류 필요. -> `State.Slow.Duration`, `State.Slow.Instant`로 태그 구분
- 함수 인자에 default 값 설정할 때는 헤더 파일에 쓰기

---

