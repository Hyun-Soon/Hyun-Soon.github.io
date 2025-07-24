---
title: "[DevLog] QuantumVerge 개발일지 #12"
excerpt: QuantumVerge 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - QuantumVerge
  - UnrealEngine
---
## 1. 날짜 (Date)

2025/07/21

---

## 2. 작업 목표 (Daily Goals)

- `SlowAuraAbility` 구현 완료 및 `Ions`에 적용 ✅

---

## 3. 진행 사항 (Progress)

- `SlowAuraAbility` 구현 완료 및 `Ions`에 적용 완료

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

#### 4-1. GameplayEffect Deprecated(5.3) 방식에서 최신 방식으로 변경

 GameplayEffectDubuffSlow에서 Multiplicitive 방식으로 Target의 BaseSpeed에 0.7을 곱하도록 했다. 그런데 곱하기가 아니라, -500씩 BaseSpeed가 감소했다. 또한 태그를 확인해 봤더니, `State.Slow`, `Effect.Slow` 아무 태그도 적용되지 않았다. BaseSpeed가 바뀌었다는건 Effect가 적용되긴 한 것 같은데.. 
 
 `warning C4996: 'UGameplayEffect::InheritableOwnedTagsContainer': Inheritable Owned Tags Container is deprecated. To configure, add a UTargetTagsGameplayEffectComponent. To access, use GetGrantedTags. Please update your code to the new API before upgrading to the next release, otherwise your project will no longer compile.` 
 
 빌드 경고를 보니, 파기된 방식인 것 같았다. `UTargetTagsGameplayEffectComponent` 헤더에 가보니 `SetAndApplyTargetTagChanges` 함수가 있다. 또한 `GameplayEffect` 헤더에 가보니 5.3 버전에서 이미 파기된 방식이었다.

![DeprecatedMethods](https://raw.githubusercontent.com/Hyun-Soon/Hyun-Soon.github.io/refs/heads/main/_posts/asset/DevLog/GameplayEffectDeprecated.png)

https://forums.unrealengine.com/t/where-should-gecomponents-be-created-in-c/1582158/3
위 링크에서 실마리를 얻을 수 있었다.

```c++
FGameplayTagContainer Tags1;
Tags1.AddTag(FGameplayTag::RequestGameplayTag("State.Slow"));
TArray<FActiveGameplayEffectHandle> Effects1 = mASC->GetActiveEffectsWithAllTags(Tags1);
UE_LOG(LogTemp, Display, TEXT("[0721] Player ActiveEffect(\"State.Slow\") Num : %d"), Effects1.Num());
for (auto& handles1 : Effects1)
{
				UE_LOG(LogTemp, Warning, TEXT("	- ActiveGameEffectsHandle to string : %s"), *handles1.ToString());
}
```
위 방식으로 플레이어에 잘 적용됐는지 확인했을 때는 ActiveEffect가 0개로 나왔는데,

```c++
FGameplayEffectQuery Query;
Query.EffectDefinition = UGameplayEffectDebuffSlow::StaticClass();

TArray<FActiveGameplayEffectHandle> Handles = mASC->GetActiveEffects(Query);
UE_LOG(LogTemp, Warning, TEXT("[0721] ActiveEffectHandle Num : %d"), Handles.Num());
```

`Query` 방식으로 Effect를 검출했더니 잘 적용되고 있는 것을 확인할 수 있었다.

Effect(DurationPolicy = Infinite) 제거도 마찬가지로 `RemoveActiveEffectsWithTags(Tags)` 대신, Query기반 함수를 사용했더니, 잘 동작했다.

```c++
FGameplayEffectQuery Query;
Query.EffectDefinition = UGameplayEffectDebuffSlow::StaticClass();
TargetASC->RemoveActiveEffects(Query);
```

기존 방식과 최신방식을 섞어서 사용했던 것이 문제였다. 

#### 4-2. 마지막 Aura가 EndOverlap 됐을 때만 Effect 제거하기

SlowAuraAbility에서 `inline static int32 mOverlapCnt` 변수를 선언해 플레이어와 몇 개의 오라가 겹쳤는지 판별하고, 마지막 남은 오라가 Overlap이 해제됐을 때 DebuffSlow GameEffect를 해제하려고 했다. 처음엔 잘 동작했는데, 2번째 플레이에서 Effect가 적용되지 않았다. 게임 플레이는 끝났지만 Editor 프로세스는 종료되지 않았으므로, static 변수가 그대로 남아있던 것이 문제였다. Ability에서 Enemy.OnEndPlay에 Delegate를 등록하여 `if (EndPlayReason == EEndPlayReason::EndPlayInEditor || EndPlayReason == EEndPlayReason::LevelTransition)`일 경우 초기화 하려고 했지만, 이러면 level에 이 ability를 가진 Enemy가 없는 상황에서 level transition이 발생하면 초기화가 되지 않는다. 

게임마다 초기화가 중요하므로 CombatGamemode::BeginPlay()에서 초기화를 했다(플레이어가 Aura 안에서 시작하는 경우는 없다는 전제).

플레이어가 Aura 안에 있는 상황에서 Enemy를 죽였을 때도 직접 OverlapCount를 처리해줘야 할 줄 알았는데, EndOverlap Delegate가 호출되어서 고마웠다.

#### 4-3. SetByCaller 전달 값 오류

SetByCaller로 전달한 값(0.7)이 자꾸 0이 됐다. `GetSetByCallerMagnitude`로 찍어봤더니 값이 제대로 전달이 안됐다.
```c++
FSetByCallerFloat CallerFloat;
CallerFloat.DataName = FName("Data.SlowRatio");
//FGameplayTag    SlowTag = FGameplayTag::RequestGameplayTag("Data.SlowRatio");
//CallerFloat.DataTag = SlowTag;
```

DataName 대신, Tag 방식으로 변경했더니 성공했다.

#### 4-4. 기획 의도 오해

`"방해 효과를 부여함(슬로우)."`

단순히 이 문장만 보고, 내 임의대로 생각해 버렸다.
- 원래 기획 의도 : 슬로우 영역 내에 플레이어가 들어오면 지속시간 부여 및 일정 주기로 지속시간 갱신, 영역 밖으로 나가도 지속시간 유지
- 내가 생각한 방식 : 슬로우 영역 안으로 들어오면 즉시 슬로우 적용, 영역 밖으로 나가는 순간 즉시 슬로우 해제

기획에 애매하거나 명확하지 않은 부분이 있다면, 잘 캐치하고 항상 물어보도록 하자. 거의 하루 동안 고민한 구조 문제가 물거품이 되었다.

---

## 5. 다음 단계 (Next Steps)

- 보스(`Entropic Singularities`)
- 충돌 시 오버랩 2번 발생하는 버그 확인 및 해결
- 넉백

---

## 6. 회고 (Reflection)

- 플레이어가 SlowAura 안에 있는 상태에서 몬스터를 죽일 경우, mOverlapCnt를 직접 줄여줘야할 줄 알았는데, EndOverlap Delegate가 호출되면서 처리할 필요가 없었다.
- 기획을 내가 임의로 해석하고 있진 않은지, 항상 의심하자. 일 두 번 하기 싫으면..

---

## 7. 메모 (Notes)

- 플레이어 SlowAura 디버그 코드
```c++
//debug
{
	static float debugTime = 0;
	if (debugTime >= 3)
	{
		debugTime = 0;
		const UPlayerAttributeSet* EAS = mASC->GetSet<UPlayerAttributeSet>();
		FGameplayAttribute BaseSpeedAttr = EAS->GetBaseSpeedAttribute();
		float BaseSpeed = mASC->GetNumericAttribute(BaseSpeedAttr);
		UE_LOG(LogTemp, Warning, TEXT("[0721] Player Speed : %.2f"), BaseSpeed);

		FGameplayEffectQuery Query;
		Query.EffectDefinition = UGameplayEffectDebuffSlow::StaticClass();

		TArray<FActiveGameplayEffectHandle> Handles = mASC->GetActiveEffects(Query);
		UE_LOG(LogTemp, Warning, TEXT("[0721] UGameplayEffectDebuffSlow Num : %d"), Handles.Num());

		UE_LOG(LogTemp, Warning, TEXT("[0721] DebuffSlow::mOverlapCnt : %d"), UEnemySlowAuraAbility::mOverlapCnt);
		
	}
	debugTime += DeltaTime;
}
```

---

