---
title: "[DevLog] Game Engine 개발일지 #13"
excerpt: Game Engine 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - QuantumVerge
  - UnrealEngine
---
## 1. 날짜 (Date)

2025/07/22

---

## 2. 작업 목표 (Daily Goals) ✅

- 오버랩 채널 플레이어만 검출 채널로 최적화 ✅
- 충돌 시 GameEffect 2번 발생하는 버그 확인 및 해결 ✅
- 충돌 지속 시, 시간 간격 당 데미지 ✅
- 넉백 -> 투사체 기획에 따라 넉백되고 안되는 것이 있어서 보류
- BosonLords (Boss) 
- 몬스터 디자인 구상

---

## 3. 진행 사항 (Progress)

- 충돌 시 GameEffect 2번 발생하는 버그 확인 및 해결
- 오버랩 채널 플레이어만 검출 채널로 최적화 완료
- 충돌 지속 시, 시간 간격 당 데미지 적용 완료
- BosonLords 디버프 1종(Stun) GE 구현

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

#### 4-1. GameplayEffect Deprecated(5.3) 방식에서 최신 방식으로 변경

어제 언리얼엔진 포럼에서 Effect의 Target에게 태그를 붙일 땐 `UTargetTagsGameplayEffectComponent`를 사용하면 된다는 정보를 얻었다. 그런데 추가적인 GE를 만들면서, GE 자체의 태그(기존 `InheritableOwnedTagsContainer`), Instigator에 붙는 태그, 무효처리 되어야 하는 상황 조건 태그(기존 `FInheritedTagContainer`) 등에 대한 자세한 정보는 여전히 찾을 수 없었다. 이에 포럼에서 얻은 단서로 엔진 코드를 살펴 보았다.

![GEComponentAfterEngineVer5.3](https://raw.githubusercontent.com/Hyun-Soon/Hyun-Soon.github.io/refs/heads/main/_posts/asset/DevLog/GEComponentAfter_ver_5_3.png)

헤더 파일에 다행히 주석이 잘 달려있어서, 읽어보면서 `GE DebuffStun` 기능 구현에 성공했다.

```c++
UCLASS()
class PROJECTQUANTUMVERGE_API UGameplayEffectDebuffStun : public UGameplayEffectBase
{
	GENERATED_BODY()
	
public:
    UGameplayEffectDebuffStun()
    {
        DurationPolicy = EGameplayEffectDurationType::HasDuration;
        DurationMagnitude = FScalableFloat(1.0f); //Set By Ability

        //각 타겟이 Stack을 계산
        StackingType = EGameplayEffectStackingType::AggregateByTarget;
        //GE 최대 중첩 수
        StackLimitCount = 1;
        //적용될 때마다 갱신
        StackDurationRefreshPolicy = EGameplayEffectStackingDurationPolicy::RefreshOnSuccessfulApplication;

        // SetByCallerFloat 구조체 생성
        FSetByCallerFloat CallerFloat;
        FGameplayTag    StunChanceTag = FGameplayTag::RequestGameplayTag("Data.StunChance");
        CallerFloat.DataTag = StunChanceTag;

        //***************** UE 5.3 이후 아래의 방식들 사용 *****************

        //타겟에게 부여될 태그를 설정하는 컴포넌트
        UTargetTagsGameplayEffectComponent* TagsComponent = CreateDefaultSubobject<UTargetTagsGameplayEffectComponent>(TEXT("TargetTagsComponent"));
        GEComponents.Add(TagsComponent);
        FInheritedTagContainer GrantedTags = TagsComponent->GetConfiguredTargetTagChanges();
        GrantedTags.AddTag(FGameplayTag::RequestGameplayTag(FName("State.Stunned")));
        TagsComponent->SetAndApplyTargetTagChanges(GrantedTags);

        //타겟에게 이펙트를 적용할 확률을 설정하는 컴포넌트
        //TODO(현순) :: 스턴 확률 Ability에서 동적으로 전달하는 법 찾아보기
        FScalableFloat SFloat(0.3f); //Test //30%
        UChanceToApplyGameplayEffectComponent* ChanceComponent = CreateDefaultSubobject<UChanceToApplyGameplayEffectComponent>(TEXT("ChanceComponent"));
        GEComponents.Add(ChanceComponent);
        ChanceComponent->SetChanceToApplyToTarget(SFloat);

        //이 Effect가 적용되는 동안, Target이 사용하지 못하는 Ability Tag 지정
        UBlockAbilityTagsGameplayEffectComponent* BlockComponent = CreateDefaultSubobject<UBlockAbilityTagsGameplayEffectComponent>(TEXT("BlockComponent"));
        GEComponents.Add(BlockComponent);
        FInheritedTagContainer BlockedTags = BlockComponent->GetConfiguredBlockedAbilityTagChanges();
        BlockedTags.AddTag(FGameplayTag::RequestGameplayTag(FName("Skill")));
        BlockComponent->SetAndApplyBlockedAbilityTagChanges(BlockedTags);


        //GE를 적용하기 위해, 타겟에게 이미 적용되어 있어야 하는 태그를 설정하는 컴포넌트
        /** Specifies tag requirements that the Target (owner of the Gameplay Effect) must have if this GE should apply or continue to execute */
        //UTargetTagRequirementsGameplayEffectComponent* Requirements = CreateDefaultSubobject<UTargetTagRequirementsGameplayEffectComponent>(TEXT("RequirementTagsComponent"));
        //GEComponents.Add(Requirements);
        //...
    }
};
```

#### 4-2. 충돌 시 GameEffect 2번 발생하는 버그 확인 및 해결

OnComponentBeginOverlap Delegate를 2번 등록했다.

#### 4-3. 오버랩 채널 플레이어만 사용하는 채널로 최적화

ECC_Pawn 채널을 사용하여, Overlap Results에 Enemy도 포함되기 때문에 Player를 찾기에 비효율적임.

플레이어만 사용하는 `ECC_GameTraceChannel2` 채널로 OverlapMultiByChannel() 실행했는데, Neutrinos, StaticMeshActor 2개 검출됨.

`QueryParams.AddIgnoredActor(mOwnerEnemy.Get());` 적용.

PlayerCharacter 캐스팅 검사 없이, Results.Num() 있으면 바로 데미지 적용

##### 4-3-1. Collision Channel 개념 오해

OverlapMultiByChannel에서 Player를 검출하기 위해, Player가 사용하는 `ECC_GameTraceChannel2` 채널을 사용함. 그런데, Enemy가 계속 검출됨.

생각해보니, Player를 검출하기 위해선 오직 Player만 Overlap 처리되어 있는 `EnemySKill`의 채널을 사용하는 것이 맞았다.


---

## 5. 다음 단계 (Next Steps)

- DTEnemyAttribute에 `TSubClassOf<UEnemyAbilityBase>` 항목 추가하기
- `GameplayEffectDebuffStun`의 `UChanceToApplyGameplayEffectComponent`에 확률을 Ability에서 동적으로 전달하는 법 찾기
- BosonLords Debuff GE 추가 구현
- ShockWave Ability (For Entropic Singularities)
- VFX/SFX 옵션 UI 및 적용 방안 탐색

---

## 6. 회고 (Reflection)

상용 엔진을 쓰게 되면서, 최신 버전의 기능을 사용해야 하지만 정보가 없는 문제를 처음 마주했다. GPT도 내용이 업데이트가 안되어 있었고, 얻을 수 있는 정보는 Unreal Forum의 예시 코드 몇 줄이었다. 정보가 별로 없는 상황에서 정보를 찾아야 하는 상황. MacBook iTerm에서 명령어 매뉴얼 찾아서 읽고, IRC Chatting Server 구현할 때 RFC 문서 읽었던 경험이 도움이 됐다.

---

## 7. 메모 (Notes)

- Enemy 최적화를 위해 Tick에서 계속 플레이어를 따라가는 대신, Timer를 등록하고 interval마다 플레이어를 추적하게 했는데, 이 때문에 Enemy가 플레이어 주변에서 진동함. 플레이어 앞쪽으로 이동했을 때, 플레이어가 그 방향으로 이동하면 순간 데미지가 2번 들어감(Overlap 2번 호출) -> 데미지 적용 방식 바꾸면서 해결됨

- `C++ 클래스` vs `BP 클래스` 스폰 오버헤드?

- `DurationPolicy::Instant`는 값 변동 델리게이트에서는 이미 태그가 날라가서 처리 불가능. `PostGameplayEffect` 에서 태그 처리해야 Instant 휘발 태그도 저리 가능.


---

