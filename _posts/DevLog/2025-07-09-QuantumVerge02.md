---
title: "[DevLog] QuantumVerge 개발일지 #02"
excerpt: QuantumVerge 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - UnrealEngine
  - QuantumVerge
---
## 1. 날짜 (Date)

2025/07/09

---

## 2. 작업 목표 (Daily Goals)


- GAS AttributeSet 사용하여 EnemyBase 구현

---

## 3. 진행 사항 (Progress)

- GAS AttributeSet 사용하여 EnemyBase 구현

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- CreateDefaultSubobject\<UStaticMeshComponent\>() 없이 mMesh->SetStaticMesh() 호출해서 크래쉬 발생

- EnemyController에서 PrimaryActorTick.bCanEverTick = true;를 안해줘서 Tick이 호출되지 않음
	- Controller가 아닌, EnemyBase::Tick()에서 업데이트함

- GAS AttributeSet을 편하게 사용하기 위해 Getter, Setter, Initter를 만드는 매크로를 사용했는데, protected 영역에 적어놔서 권한 문제 발생. 아래와 같이 해결함.
```c++
UCLASS()
class PROJECTQUANTUMVERGE_API UEnemyAttributeSet : public UAttributeSet
{
	GENERATED_BODY()
	
public:
	UEnemyAttributeSet();

public:
	ATTRIBUTE_ACCESSORS(UEnemyAttributeSet, HP);
	ATTRIBUTE_ACCESSORS(UEnemyAttributeSet, HPMax);
	ATTRIBUTE_ACCESSORS(UEnemyAttributeSet, BaseSpeed);
	ATTRIBUTE_ACCESSORS(UEnemyAttributeSet, BaseDamage);

protected:
	// [Var] mHP
	// Description: Enemy의 현재 체력
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Attribute")
	FGameplayAttributeData	HP;
	
	// [Var] mHPMax
	// Description: Enemy의 최대 체력
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Attribute")
	FGameplayAttributeData	HPMax;
	
	// [Var] mSpeed
	// Description: Enemy의 기반 속도
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Attribute")
	FGameplayAttributeData	BaseSpeed;
	
	// [Var] mSpeed
	// Description: Enemy의 기반 데미지
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Attribute")
	FGameplayAttributeData	BaseDamage;	
};
```

- `UPROPERTY(BlueprintReadWrite)`는 `private` 멤버에 불가능

---

## 5. 다음 단계 (Next Steps)

- 구체적인 Enemy 클래스들 구현

---

## 6. 회고 (Reflection)


---

## 7. 메모 (Notes)

- SceneComponent와 ActorComponent의 차이가 뭘까?
	- `USceneComponent`는 위치, 회전, 스케일을 가지는 컴포넌트이고, 
	- `UActorComponent`는 `Transform`이 없는 일반 기능용 컴포넌트이다.
```text
UObject
 └─ UActorComponent
      └─ USceneComponent
           └─ UPrimitiveComponent (Mesh, Light, Camera 등)

```

- AttributeSet, GamePlayEffect, GamePlayQueue 이 3가지가 GAS의 핵심이다.

---

