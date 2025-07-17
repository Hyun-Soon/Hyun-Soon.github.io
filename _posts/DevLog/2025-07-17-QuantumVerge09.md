---
title: "[DevLog] Game Engine 개발일지 #9"
excerpt: Game Engine 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - QuantumVerge
  - UnrealEngine
---
## 1. 날짜 (Date)

2025/07/17

---

## 2. 작업 목표 (Daily Goals)

- TeleportIndicatorDecal이 업데이트(새로 생성 및 Enemy 죽었을 때 소멸)가 안되는 버그 해결(TeleportAbility Timer 하나 사용하도록 분기처리) ✅
- EnemyAttributeSet에 Cooldown 추가 ✅


---

## 3. 진행 사항 (Progress)

- Teleport Ability 구현 완료

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- CollisionProfile `EnemySkill` 에서 `Player` Overlap 처리 해놨는데, Overlap Delegate 함수 호출되지 않음 -> Player Profile에서도 EnemySkill Overlap 처리
- 헤더파일 양쪽에서 Template 함수 구현하면서, 순환 참조 발생.
	해당 함수는 cpp 내부에서만 사용되기 때문에, 함수 인스턴스화 단계에서 문제가 생기지 않으므로 `.cpp`에 구현

---

## 5. 다음 단계 (Next Steps)

- 메인 화면 UI 구현(Combat 레벨로 가는 기능까지)
- 보스 등장 타이머, ex. 30초 -> 0초 점점 줄어들게, 초 줄어들 때마다 심장박동처럼 커졌다 줄어들었다, 시간 점점 다가올 때마다 폰트 크게
- 몬스터 충돌 시 지속 데미지

---

## 6. 회고 (Reflection)

1. **Teleport 공격 순간 판정에 대한 고민**
---
Teleport 공격 판정을 구현 중인데, HitSphere를 생성하고 바로 Overlap 검사 수행이 불가능하다. 월드에 Sphere 생성, Overlap 검사 준비 등의 과정이 몇 프레임 뒤에 완료될 수도 있기 때문이다. SetTimer로 0.01초 정도 딜레이를 주고 검사를 수행하면 괜찮을까? Enemy, Projectile이 매우 많이 Spawn돼서 병목현상이 생겼을 때 이 방법이 안전하다고 할 수 있을까? 아닐 것 같다.. UI는 예를 들어 한번에 많은 레벨업을 하는 경우 약간의 딜레이를 주고 처리해도 게임 플레이에 크게 지장이 없어서 괜찮은데, Enemy는 플레이어 경험에 직접적인 영향을 주는 부분이라 많은 고민이 된다.

Timer 뿐만 아니라 Teleport 공격 Overlap 처리 로직도 마음에 들지 않는다. Sphere를 생성할 때 이미 Actor가 Overlap 위치에 있으면 BeginOverlap Delegate가 호출되지 않는다. 그래서 `GetOverlappingActors(TArray<AActor*>, TSubclassOf<AActor> ClassFilter)`를 사용했는데, Overlap 중인 Component를 다 확인하면서 ClassFilter에 맞는 Actor들을 TArray로 반환해주는 함수이다.

```c++
void UPrimitiveComponent::GetOverlappingActors(TArray<AActor*>& OutOverlappingActors, TSubclassOf<AActor> ClassFilter) const
{
	if (OverlappingComponents.Num() <= 12)
	{
		// TArray with fewer elements is faster than using a set (and having to allocate it).
		OutOverlappingActors.Reset(OverlappingComponents.Num());
		for (const FOverlapInfo& OtherOverlap : OverlappingComponents)
		{
			if (UPrimitiveComponent* OtherComponent = OtherOverlap.OverlapInfo.Component.Get())
			{
				AActor* OtherActor = OtherComponent->GetOwner();
				if (OtherActor && ((*ClassFilter) == nullptr || OtherActor->IsA(ClassFilter)))
				{
					OutOverlappingActors.AddUnique(OtherActor);
				}
			}
		}
	}
	else
	{
		// Fill set (unique)
		TSet<AActor*> OverlapSet;
		GetOverlappingActors(OverlapSet, ClassFilter);

		// Copy to array
		OutOverlappingActors.Reset(OverlapSet.Num());
		for (AActor* OverlappingActor : OverlapSet)
		{
			OutOverlappingActors.Add(OverlappingActor);
		}
	}
}
```

우리 게임은 Player 단 한명에, 무수히 많은 Enemy가 등장하는데 도저히 이 방법은 아닌 것 같다.

더 좋은 방법을 찾아보자. 정 안되면 확장성이 떨어지긴 하지만 공격 범위가 일단은 Sphere이니까 공격 타이밍에 단순 벡터 거리 계산으로 처리하자.

🚨SphereComponent를 생성 안하고도, `GetWorld()->OverlapMultiByChannel()`로 Overlap 판단하는 방법이 있었다. 


2. **vtable 개념 확인 디버깅**
---
`EnemyBase`는 여러 어빌리티를 `TArray<UEnemyAbilityBase*>`에 담아 관리한다. 어빌리티가 활성화 될 때는 자식 클래스에서 `ActivateAbility()`를 오버라이드하고, 그 안에서 `Super::ActivateAbility()`를 호출하도록 설계했다. 모든 어빌리티가 공통적으로 Owner Enemy에 자신의 this 주소를 넣어줘야 하기 때문에 이런 구조를 사용했다.

각 어빌리티 클래스에는 `Release()`라는 가상 함수가 정의되어 있어, 배열에 저장된 `UEnemyAbilityBase*` 포인터를 `UEnemyAbilityBase`에서 넣어줬다. EnemyBase에서 다운캐스팅 하지 않아도 바로 `Release()`를 호출하면 자식 클래스의 오버라이드 함수가 호출될 거라고 머리로는 알고 있었다. 하지만 실제로 자식 클래스의 함수가 문제없이 호출될지 약간의 불안함이 있었다.

그래서 직접 로그를 찍어 확인해본 결과, 예상대로 다운캐스팅 없이도 자식 클래스의 `Release()`가 잘 호출되는 것을 확인할 수 있었다. 다운캐스팅 비용 줄일 수 있겠다.



---

## 7. 메모 (Notes)

- `UEnemyTeleportAbility::TWeakObjectPtr<AEnemyBase>` : Enemy에서 AbilityInstance 정보를 받기 전에 EndPlay()가 호출되어버리는 상황을 대비하기 위해 TWeakObjectPtr 사용(GC 정보 기반 Enemy 유효하지 않으면 자체 Release()).

- TortoiseSVN Conflict 비교하는 창에서 Theirs, Mine 반대로 보여주는 버그가 있다. 

---

