---
title: "[DevLog] Quantum Verge 개발일지 #15"
excerpt: Quantum Verge 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - QuantumVerge
  - UnrealEngine
---
## 1. 날짜 (Date)

2025/07/24

---

## 2. 작업 목표 (Daily Goals) ✅

- VFX/SFX 옵션 및 UI 구현
- 보스용 공간왜곡 매터리얼 생성 ✅

---

## 3. 진행 사항 (Progress)

- VFX/SFX UI 구현 완료
- 보스용 공간왜곡 매터리얼 생성 완료

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

#### 4-1. Widget 생성자에서 GetWidgetFromName 호출하여 Crash 발생

생성자 시점에서는 아직 Slate 위젯 트리가 생성되지 않았기 때문에, GetWidgetFromName()은 항상 nullptr을 반환한다.

#### 4-2. VFX/SFX 매니저는 Level이 바뀌어도 계속 객체가 살아있어야 함.

레벨 단위로 갱신되는 클래스에 VFX/SFX Manager를 생성/해제하면 설정이 유지되지 않음. 게임 동안 단 하나의 객체로 유지되는 UGameInstance를 상속받은 클래스에서 생성/해제하기로 결정.

#### 4-3. 일반 C++ 클래스에서는 SoundClass, SoundClassMix 등 언리얼 리소스를 읽어올 수 없음.

FX 매니저를 UObject 상속 받아서 만들기로 결정. 하나의 객체가 게임의 수명 동안 모든 관리를 담당하기 위해 GameInstance에서 이를 관리.

---

## 5. 다음 단계 (Next Steps)

- VFX/SFX 옵션 기능 문제 해결(GameInstance의 멤버 변수에 옵션 세팅값을 저장해서, 월드가 전환되어도 값을 유지하도록 하였으나 값이 바뀜)

---

## 6. 회고 (Reflection)

Delegate 동작 방식 제대로 이해하자. 자꾸 미루니까 Delegate 등록할 함수에 `UFUNCTION()`을 자꾸 까먹고 떠올리는 데도 오래 걸린다.

InstantSlowAuraAbility `State.Slow.Instant` 적용 안되는 현상이 문제인 줄 알았으나, DurationPolicy가 Instant여서 발생한 현상이었다.

---

## 7. 메모 (Notes)

- `USoundBase` 클래스에서 `SoundClass` 설정 가능
- `UObject` 기반 클래스는 C++ 표준 방식인 `new`로 생성 불가. 이러한 클래스들은 반드시 `NewObject<>` 또는 `DuplicateObject<>` 사용하여 생성.
- `USoundBase` : 실제 재생되는 사운드의 추상적인 기반 클래스. `USoundWave`, `USoundCue`가 이를 상속함.
- `USoundMix` : 사운드 클래스(`USoundClass`)에 대한 전역적인 조정 설정. 여러 `USoundClass`의 볼륨, 피치, EQ 등을 동시에 조정하는 믹스. 설정을 오버라이드하거나 페이딩을 주고 싶을 때 사용한다. 옵션 메뉴의 마스터 볼륨 조절, 음소거 등 런타임에서 사운드 조절용으로 유용하다.
- `EQ` : `Equalizer`의 줄임말로, 오디오 신호의 특정 주파수 대역의 음량을 조절하여 소리의 톤을 조절하는 기술
- `Pitch` : 소리의 높낮이, 즉 음의 높고 낮음. 진동수가 높을수록 고음.

-  **UObject 상속 클래스로 만드는 경우**
✔ 일반적인 특징:

- Unreal의 GC 대상 → 메모리 자동 관리 가능
    
- `StaticLoadObject`, `GetWorld()`, `UGameplayStatics` 사용 가능
    
- Reflection 시스템 (Blueprint, UPROPERTY, UFUNCTION 등)
    
- 다른 UObject와 쉽게 연동 가능 (ex. SoundMix, Material 등)
    
- `WorldContext` 접근 필요시 유리
    

✔ 예시 용도:

- 애셋을 직접 다루는 매니저 (ex. VFX, SFX, UI)
    
- 블루프린트와 연동되는 경우
    
- 월드에 의존하는 작업이 필요한 경우

---

