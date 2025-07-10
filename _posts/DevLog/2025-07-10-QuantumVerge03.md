---
title: "[DevLog] QuantumVerge 개발일지 #03"
excerpt: QuantumVerge 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - UnrealEngine
  - QuantumVerge
---
## 1. 날짜 (Date)

2025-07-10

---

## 2. 작업 목표 (Daily Goals)

- Enemy 구체화
- PlayerCharacter Overlap 감지

---

## 3. 진행 사항 (Progress)

- Enemy용 Niagara 에셋 추가
- EnemyBase에 Niagara System 추가
- Enemy와 PlayerCharacter Overlap 감지
- Editor용 BaseColor 추가

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- `Wavelets::BeginPlay()`에서 자신 근처에 자기와 같은 클래스의 개체를 생성하도록 해서 `EXCEPTION_STACK_OVERFLOW` 발생. 스폰 시스템에서 처리해야할 것 같다.
```c++
	for (int SpawnCnt = 0; SpawnCnt < mColonyNum; ++SpawnCnt)
	{
		AEnemyBase* SpawnedEnemy = GetWorld()->SpawnActor<AEnemyBase>(
			AWavelets::StaticClass(),
			SpawnBasePosition + SpawnOffset,
			FRotator::ZeroRotator,
			SpawnParams
		);

		SpawnOffset.RotateAngleAxis(dTheta, FVector::ZAxisVector);
	}
```

- EnemyBase 클래스의 Overlap delegate 함수가 호출되지 않음
	- UFUNCTION() 매크로를 Delegate 등록 함수에 적어주지 않았다.. 한참 헤맸네

---

## 5. 다음 단계 (Next Steps)

- Neutrinos 텔레포트 공격 구현

---

## 6. 회고 (Reflection)

전에 코인 먹기 플랫폼 게임을 만들 때도 Delegate 등록될 함수에 `UFUNCTION()`을 안붙여서 호출이 안됐었다. 오늘 똑같은 실수를 해서 시간을 많이 잡아먹었다. 무거운 엔진을 사용하다보니 고려해야할 것이 많다. 아직 많이 익숙하지 않으니 Unreal 동작 방식에 대해서도 종종 되짚어 보자.

처음엔 충분이 한 달 안에 가능한 프로젝트 규모라고 생각했는데, 언리얼이 서툴러 개발이 많이 더디다. 팀원한테 민폐 안끼치게 열심히 하자.

---

## 7. 메모 (Notes)

- GAS AttributeSet은 상속받아서 구현하는 것을 추천하지 않는다.
	- GAS는 `UAbilitySystemComponent::GetAttributeSet` 등을 통해 명확한 `UCLASS()` 타입을 기준으로 등록, 관리, 동기화한다.
	- `UEnemyAttributeSet* AttrSet = ASC->GetSet<UEnemyAttributeSet>();`
	- GAS는 `UAttributeSet`의 `ReplicatedUsing = OnRep_...` 시스템을 이용해 값을 자동으로 동기화 하는데, 이 때 복제는 `AttributeSet`의 구조체 이름과 클래스 타입에 기반하여 처리된다.
	- 만약 `UBossAttributeSet : public UEnemyAttributeSet`처럼 다단계 상속하면 GAS 내부에서는 직접 등록한 `AttributeSet` 클래스만 인식하기 때문에, `UEnemyAttributeSet`에 정의된 값이 복제될지, `UBossAttributeSet`으로 복제될 지 혼란이 생긴다.

- 데미지 주는 함수 호출 방식 -> 데미지를 일으키는 객체가 데미지를 받는 객체의 함수 호출하기(받는 객체가 감지 X)

---

