---
title: "[DevLog] QuantumVerge 개발일지 #04"
excerpt: QuantumVerge 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - UnrealEngine
  - QuantumVerge
---
## 1. 날짜 (Date)

2025/07/11

---

## 2. 작업 목표 (Daily Goals)

- Wavelets, Neutrinos 구현
- GAS(Gameplay Ability System) 이해

---

## 3. 진행 사항 (Progress)

- GAS 공부 중

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- 텔레포트 시 순간적인 플레이어와의 Overlap을 검사하려고 했다. 이 경우 `GetOverlappingActors()` 또는 `UKismetSystemLibrary::SphereOverlapActors()`를 사용해야 하는데, 이렇게 되면 Overlap된 모든 Actor들 중 Player를 탐색해야 한다. 이 게임에는 하나의 플레이어와 매우 많은 몬스터가 존재하기 때문에, 이러한 방법은 매우 비효율적이다. GAS 세팅이 끝나면 바뀌겠지만, 우선 Enemy 텔레포트 시의 위치와 Target(Player)와의 벡터 길이를 통해 처리했다.

```c++
TArray<AActor*> OverlappingActors;
MyCollisionComponent->GetOverlappingActors(OverlappingActors, APlayerCharacter::StaticClass());

for (AActor* Actor : OverlappingActors)
{
	APlayerCharacter* PC = Cast<APlayerCharacter>(Actor);
	if (IsValid(PC))
	{
		UE_LOG(LogTemp, Warning, TEXT("Overlap Detected with Player!"));
		// 데미지 주기 등 처리
	}
}

//또는

TArray<AActor*> HitActors;
FVector CheckLocation = GetActorLocation();
float Radius = 100.f;

UKismetSystemLibrary::SphereOverlapActors(
	GetWorld(),
	CheckLocation,
	Radius,
	TArray<TEnumAsByte<EObjectTypeQuery>>{ EObjectTypeQuery::ObjectTypeQuery3 }, // Pawn
	APlayerCharacter::StaticClass(),
	TArray<AActor*>(),
	HitActors
);

for (AActor* Actor : HitActors)
{
	APlayerCharacter* PC = Cast<APlayerCharacter>(Actor);
	if (IsValid(PC))
	{
		UE_LOG(LogTemp, Warning, TEXT("Overlapped with player on teleport!"));
		// 데미지 처리 등
	}
}
```



---

## 5. 다음 단계 (Next Steps)

- EnemyBase에 GAS AttributeSet 적용

---

## 6. 회고 (Reflection)

Ability의 ExecuteTeleport() 함수를 TeleportIndicator가 Delegate로 호출해볼까 했지만, 어차피 이 객체는 자신을 생성한 Ability와 1:1 소통만 하면 되니 Delegate 사용하지 않기로 결정.

---

## 7. 메모 (Notes)

- GamePlayAbility.h 주석
```text

	//	The important functions:
	//	
	//		CanActivateAbility()	- const function to see if ability is activatable. Callable by UI etc
	//
	//		TryActivateAbility()	- Attempts to activate the ability. Calls CanActivateAbility(). Input events can call this directly.
	//								- Also handles instancing-per-execution logic and replication/prediction calls.
	//		
	//		CallActivateAbility()	- Protected, non virtual function. Does some boilerplate 'pre activate' stuff, then calls ActivateAbility()
	//
	//		ActivateAbility()		- What the abilities *does*. This is what child classes want to override.
	//	
	//		CommitAbility()			- Commits reources/cooldowns etc. ActivateAbility() must call this!
	//		
	//		CancelAbility()			- Interrupts the ability (from an outside source).
	//
	//		EndAbility()			- The ability has ended. This is intended to be called by the ability to end itself.

```


---

