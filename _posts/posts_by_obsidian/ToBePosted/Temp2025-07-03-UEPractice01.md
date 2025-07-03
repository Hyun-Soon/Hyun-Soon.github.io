---
title: "[DevLog] Unreal Engine 시행착오 #01"
excerpt: 언리얼 엔진 공부하면서 겪은 시행착오 정리
categories: 
  - DevLog
  - UnrealDevLog
tags:
  - UnrealEngine
---
1. 애니메이션 블루프린트를 켜놓고 플레이어를 조종하면서, 실시간으로 어떤 노드가 활성화되는지 확인하려고 했다. 이상하게 조작은 잘 되는데 노드 활성화가 안됐다. 계속 헤매다가, 빙의된 캐릭터의 블루프린트가 아니라 테스트 용으로 레벨에 배치된 캐릭터의 블루프린트를 보고 있었다는 것을 깨달았다..


2. Delegate 함수 등록에 실패했다. UFUNCTION()을 까먹지 말자. Delegate 함수 등록에 실패해도 빌드는 된다. 빌드는 되길래 함수는 등록된건가 싶어서 한참 해멨다. 언리얼 엔진이 델리게이트 등록에 실패했을 때 로그를 찍어주는 코드를 발견했다. 로그도 꼼꼼히 확인하자.

3. Input 회전 함수에 dt 안곱해줬더니 엄청 빨리 돌아감. 생각해보면 180도씩 돌리는데 당연한거지..
```c++
void APlayerCharacter::InputRotation(const FVector& Axis)
{
	float Dt = GetWorld()->GetDeltaSeconds();
	float RotPitch = Axis.Y * 180.f;// *Dt;
	float RotYaw = Axis.X * 180.f;// *Dt;

	mSpringArm->AddRelativeRotation(FRotator(RotPitch, RotYaw, 0.0));
}
```

4. NPC 클래스에서 `mBody = CreateDefaultSubobject<UCapsuleComponent>(TEXT("Body"))`로 `TObjectPtr<UCapsuleComponent> mBody;`를 설정하고 나서, 자식 클래스인 Monster 클래스에서 다시 `mBody = CreateDefaultSubobject<UCapsuleComponent>(TEXT("Body"))`를 설정했더니 엔진 크래시 발생.

5. 무기에 `BoxCollider`를 추가하고 overlap 시 로그가 찍히도록 했는데, 한번 오버랩 될 때마다 로그가 2번씩 찍혔다. 코드에서는 `mWeaponBox->SetCollisionEnabled(ECollisionEnabled::QueryAndPhysics/NoCollision);`으로 ECollisionEnabled를 변경하면서, 프로젝트 세팅의 Object channel에서는 Default Response를 Ignore로 변경했더니 로그가 한번만 찍혔다.

6. 대검을 휘두를 때 BoxCollider를 생성해서, Overlap 되는지 확인하고 overlap 시 FHitResult의 Impact Point를 찍어봤지만 정확한 포인트가 아니라 \<0,0,0\>이 출력됨. FHitResult를 생성하고 싶다면, 충돌을 Block으로 처리하여 Hit을 발생시켜야 함(sweep 필요).

7. `DECLARE_DYNAMIC_MULTICAST_SPARSE_DELEGATE_FiveParams( FComponentHitSignature, UPrimitiveComponent, OnComponentHit, UPrimitiveComponent*, HitComponent, AActor*, OtherActor, UPrimitiveComponent*, OtherComp, FVector, NormalImpulse, const FHitResult&, Hit );` 시그니쳐 따라서 Delegate에 등록할 함수를 정의했는데, 아무 생각없이 인자를 그대로 썼더니 컴파일 에러가 발생했다. FiveParams이니까 뒤에서부터 5개만 사용하자.

8. Arrow의 BoxComponent를 사용해서 world static과 충돌을 감지하려고 했는데, Profile을 잘 설정해줬음에도 충돌 체크가 되지 않았다(OnProjectileStop에 등록한 함수가 실행되지 않음). Arrow의 CollisionEnabled가 NoCollision으로 되어 있었다. 

9. AIPerception 등 AI 관련 모듈을 사용하려면, ProjectName.Build.cs 파일에서 "AIModule"을 PublicDependencyModuleNames에 추가해줘야 한다. 또한 AAIController 클래스는 UBrainComponent, UAIPerceptionComponent, UPathFollowingComponent 등 다양한 컴포넌트를 이미 가지고 있다. 자식에서 커스텀을 한 후, SetPerceptionComponent() 등의 함수로 세팅해줘야 동작한다.

10. GameMode에서 SetViewTarget() 함수를 실행했으나, 시점의 변화가 없었다. `GameMode`는 서버 전용 클래스이고, `PlayerController`는 실제 플레이어의 화면(시점)을 제어할 수 있는 클래스이기 때문에, 시점과 같은 정보를 다룰 때는 `PlayerController` 클래스에서 설정해야 한다. `GameMode`는 서버에 하나만 생성되기 때문에 멀티플레이 환경에서 유저들을 관리하기엔 부적절하다.

11.  왜 `InputAction`과 `InputMappingContext`는 에디터에서 만들고 ObjectFinder 함수로 찾아서 사용해야 할까? 이 클래스들은 `UObject` 기반이지만, 실질적으로는 데이터 에셋으로 설계되어 있다. 즉, C++ new나 NewObject\<UInputAction\>()으로 생성은 가능하지만, 이렇게 만든 액션은 엔진 내부적으로 Input 시스템에 등록되지 않는다.

12. 아래 코드에서 Crash가 발생했다.
```c++
void UPlayerAnimInstance::NativeBeginPlay()
{
	Super::NativeBeginPlay();

	mOwner = Cast<APlayerCharacter>(TryGetPawnOwner());
}

void UPlayerAnimInstance::NativeUpdateAnimation(float DeltaSeconds)
{
	Super::NativeUpdateAnimation(DeltaSeconds);

	UCharacterMovementComponent* Movement = mOwner->GetCharacterMovement();
	mSpeed = Movement->Velocity.Length();
}	
```

`BeginPlay()`, `UpdateAnimation()`이라는 이름 때문에, 에디터에서 플레이 할 때만 실행될 줄 알았는데 로그를 찍어보니 에디터 실행하자마자 호출됐다. Play 모드 외에, 에디터 뷰포트에서 미리보기 중에도 위의 함수들이 호출된다. `IsValid()`를 애용하자.

13. ACharacter 클래스에 카메라 컴포넌트를 만들고 SetupAttachment()로 연결해줬다. 이 카메라를 메인 카메라로 설정해줘야할 줄 알았는데, 바로 에디터 플레이모드에서 메인 카메라로 작동했다. 언리얼에서는 플레이어 컨트롤러가 Possess한 Pawn이 가지고 있는 활성 카메라 컴포넌트를 자동으로 메인 카메라로 사용한다고 한다.