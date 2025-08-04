---
title: "[DevLog] Quantum Verge 개발일지 #19"
excerpt: Quantum Verge 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - QuantumVerge
  - UnrealEngine
---
## 1. 날짜 (Date)

2025/07/29

---

## 2. 작업 목표 (Daily Goals) ✅

- Enemy HitBox ✅
- Enemy Niagara Effect 적용 
- Ions SlowDebuff 중복 적용 버그 해결 ✅
- 밸런스 패치 
- FollowingFloor 적용 후, TeleportIndicatorDecal 보이지 않는 문제 해결 ✅

---

## 3. 진행 사항 (Progress)

- Enemy HitBox 완료
- Enemy Niagara Effect 적용 완료
- 밸런스 패치 완료
- FollowingFloor 적용 후, TeleportIndicatorDecal 보이지 않는 문제 해결 완료

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

#### 4-1. SlowDebuff가 중복 적용되는 현상
	GE의 Stack 설정을 변경
```c++
        //스택을 카운트하는 주체
        StackingType = EGameplayEffectStackingType::AggregateByTarget;
        //GE 최대 중첩 수
        StackLimitCount = 1;
        //적용될 때마다 갱신
        StackDurationRefreshPolicy = EGameplayEffectStackingDurationPolicy::NeverRefresh;
```

#### 4-2. Niagara의 UserParameter로 Radius를 조절했는데, 사이즈가 일정 크기 아래로 줄어들지 않음.

Sprite의 Size가 너무 커서 그랬음.

#### 4-3. StaticMeshComponent->GetStaticMesh()->SetMaterial()을 실행했는데, 게임 내에서 Material이 적용되지 않음.

`StaticMesh`에 이미 설정된 Material을 런타임에 바꾸고 싶다면, `StaticMeshComponent`에서 `SetMaterial()`을 사용해야 한다.  
나는 `StaticMesh` 자체에 `SetMaterial()`을 호출하고 있었다. 이는 에셋 자체에 접근하는 방식.

- `StaticMesh` 자체는 에셋이며, 에디터에서 설정된 기본 머티리얼 슬롯 정보를 가진다.
    
- `SetMaterial()`은 `UStaticMeshComponent`에서 호출해야 **해당 인스턴스에만 런타임 머티리얼을 적용**한다.
    
- `mSphereMeshComp->GetStaticMesh()->SetMaterial()`은 **원본 StaticMesh 에셋의 데이터를 바꾸려고 하는 것**이라 에디터가 아닌 이상 실행 중에는 적용되지 않는다.

---

## 5. 다음 단계 (Next Steps)

- ContructorHelpers에서 HitVFX, DeathVFX 로딩 -> 운영 및 패치 유연성을 위해 DataTable + TSoftObjectPtr + 캐싱 방식으로 변경 
- FXManager를 GameInstanceSubsystem 파생 클래스로 변경 및 VFX,SFX 데이터들 FXManager에서 중앙 관리식으로 리팩토링

---


## 6. 회고 (Reflection)





---

## 7. 메모 (Notes)

