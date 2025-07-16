---
title: "[DevLog] Game Engine 개발일지 #8"
excerpt: Game Engine 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - QuantumVerge
  - UnrealEngine
---
## 1. 날짜 (Date)

2025/07/16

---

## 2. 작업 목표 (Daily Goals)

- TeleportAbility 기능 구현(TeleportIndicator 파기)
- Enemy Ability 구조 생각하기

---

## 3. 진행 사항 (Progress)

- TeleportIndicatorDecal이 업데이트(새로 생성 및 Enemy 죽었을 때 소멸)가 안되는 버그 해결 중

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

```c++
template<typename T>
T* GiveEnemyAbility()
{
	FGameplayAbilitySpecHandle Handle =  mASC->GiveAbility(FGameplayAbilitySpec(T::StaticClass(), 1, 0));
	bool IsInstanced = mASC->TryActivateAbility(Handle);
	if (!IsInstanced)
	{
		UE_LOG(LogTemp, Warning, TEXT("[0716] TryActivateAbility() in GiveEnemyAbility() returned nullptr"));
		return nullptr;
	}
		if (Spec && Spec->Ability && Spec->Ability->IsInstantiated())
	{
		T* AbilityInstance = Cast<T>(Spec->GetPrimaryInstance());
		if (!AbilityInstance)
		{
			UE_LOG(LogTemp, Warning, TEXT("[0716] GetPrimaryInstance() in GiveEnemyAbility() returned nullptr"));
			return nullptr;
		}

		AbilityInstance->PostActivateInit(mCooldowns);

		mAbilities.Add(AbilityInstance);
		UE_LOG(LogTemp, Warning, TEXT("[0716] GiveEnemyAbility Succeeded"));
		return AbilityInstance;
	}
	UE_LOG(LogTemp, Warning, TEXT("[0716] GiveEnemyAbility() returned nullptr"));

	return nullptr;
}
```

위의 코드를 실행했을 때, `Spec->Ability->IsInstantiated()`에서 false가 되어 인스턴스를 받아오는 데 실패했다. 혹시 생성은 다음 프레임에 되거나, 너무 이른가 싶어 타이머를 통해 잠시 후에 조건을 확인해봤더니 이번에는 인스턴스를 잘 받아올 수 있었다.

```c++
		FTimerHandle TempHandle;
		GetWorld()->GetTimerManager().SetTimer(TempHandle, [this, Handle]()
			{
				FGameplayAbilitySpec* Spec = mASC->FindAbilitySpecFromHandle(Handle);
				if (Spec && Spec->Ability && Spec->Ability->IsInstantiated())
				{
					T* AbilityInstance = Cast<T>(Spec->GetPrimaryInstance());
					if (AbilityInstance)
					{
						UE_LOG(LogTemp, Warning, TEXT("[0716] Instance Get~!"));
						AbilityInstance->PostActivateInit(mCooldowns);
						mAbilities.Add(AbilityInstance);
					}
				}
			}, 0.01f, false);
```

- if-else 구문 \{\}로 안묶으면 컴파일 에러 발생 

---

## 5. 다음 단계 (Next Steps)

- TeleportIndicatorDecal이 업데이트(새로 생성 및 Enemy 죽었을 때 소멸)가 안되는 버그 해결

---

## 6. 회고 (Reflection)

1. 현재 처한 문제 상황
- Enemy는 살아 있는 동안 반복해서 스킬을 사용하므로, Enemy와 Ability의 생명 주기를 맞춰줘야 한다.
- 스킬을 반복적으로 사용하기 위해 Enemy 또는 Ability에서 Timer를 등록해야 한다.
- `Ability::EndAbility()`를 Enemy의 소멸에 맞춰서 호출해야 한다.
- InstancingPolicy = `InstancedPerActor`

2. 방안
- Enemy에서 Timer를 가지고 있고, 일정 시간마다 Ability 활성화 및 해제하기
	- 장점
		- Ability 객체를 알 필요 없이 Timer만 다루면 됨
	- 단점
		- 빈번한 Ability 생성 및 소멸(GC 비용 증가)
		- 빈번한 Timer 등록 및 해제
		- Ability의 단일 책임 위배 및 확장성 저해
		- TeleportAbility의 경우 텔레포트 위치 표시 Timer외에, 실제 텔레포트 용 Timer가 내부에 추가로 필요함. 이 경우 Enemy와 TeleportAbility 2개의 Timer를 따로 관리해야 함.
		

- Enemy에서 Ability를 생성, 해제하는 함수를 wrapping해서 TArray\<Ability\*\>에 인스턴스 저장 및 EnemyAbility::Init(), Release() 호출하기
	- 장점
		- Ability의 단일 책임 및 확장성 보장
		- Enemy 객체 하나 당 한번의 Ability Instancing
		- 
	- 단점
		- Ability Instance를 찾는 오버헤드 발생


- 만약 Enemy 객체 생성 -> TryActivateAbility() 호출했지만 Ability Instance 생성되지 않은 상황 -> Enemy가 한방에 죽어서 Release가 호출된다면?

- TeleportIndicatorDecal이 표시된 상황에서, Ability 소유한 객체가 죽었을 때 여전히 TeleportIndicatorDecal가 표시되고 있는 문제 발생 -> Timer 2개를 사용해서 ShowTeleportIndicator() 함수와 ExecuteTeleport() 함수를 각각의 타이머에 등록했다. ShowTeleportIndicator() 함수를 등록하고 5초 후에 ExecuteTeleport() 함수를 등록했는데, 각 타이머의 interval도 5초였기 때문에 이런 문제가 발생했다. ExecuteTeleport() 함수가 호출되는 타이밍을 약간 더 앞으로 당겨도, 렉이 걸려서 Timer의 업데이트가 밀리게 되면 비슷한 상황이 발생할 수 있다. Timer에 함수 하나만 등록하고, 그 안에서 분기 처리하자.

---

## 7. 메모 (Notes)

- 캐시 정리
	로컬 디스크 -> 사용자 -> (내 계정) -> AppData -> Local -> Temp
	이 곳에 있는 내용 정리했더니 200GB 공간 확보함


**전달 받은 기획**
- 메인 UI에서 플레이어 테스트 레벨로 가는 기능 구현
- 보스 등장 타이머, ex. 30초 -> 0초 점점 줄어들게, 초 줄어들 때마다 심장박동처럼 커졌다 줄어들었다, 시간 점점 다가올 때마다 폰트 크게,
---


