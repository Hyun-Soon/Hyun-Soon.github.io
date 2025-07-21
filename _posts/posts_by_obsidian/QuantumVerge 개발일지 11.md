---
title: "[DevLog] Game Engine 개발일지 #11"
excerpt: Game Engine 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - QuantumVerge
  - UnrealEngine
---
## 1. 날짜 (Date)

2025/07/20

---

## 2. 작업 목표 (Daily Goals)

 - `SizePulseAbility` 구현 및 `Plasmorphs`에 적용 ✅

---

## 3. 진행 사항 (Progress)

- `SizePulseAbility` 구현 및 `Plasmorphs`에 적용 완료
- `Enemy DataTable` 생성
- `SlowAuraAbility` 구현 중

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

1.  Sin함수로 Enemy 크기 조절 하려고 했는데, 생각한 주기보다 너무 빠르게 진동함.
	Sin함수의 인자는 Radian을 받는데, Degree를 넣었음.

2. FTableRowBase 멤버 변수 추가하고, 라이브 코딩 실행했는데, DT에 추가된 변수 반영이 안됨.
	에디터 재부팅 하니까 반영됐다.

3. SlowAuraAbility에서 MaterialInterface를 사용해 MaterialInstanceDynamic을 생성한 뒤, 이를 인자로 하여 `UGameplayStatics::SpawnDecalAtLocation` 함수를 호출해 DecalComponent를 생성했다. 이후 이 DecalComponent를 `SetupAttachment()`를 통해 OwnerEnemy에 부착했지만, OwnerEnemy의 위치를 따라가지 않았다. 
	`SetupAttachment()`는 컴포넌트가 아직 `RegisterComponent()` 되기 전, 초기화시점에서만 유효하다. 생성자 이후 단계에서 동적으로 생성한 Component를 붙이려면 `AttachToComponent()`를 사용하자. 그래야 콜리전, Delegate 등이 잘 작동한다.

| 항목      | `SetupAttachment()`                  | `AttachToComponent()`            |
| ------- | ------------------------------------ | -------------------------------- |
| 용도      | 컴포넌트가 생성되기 **전** (BeginPlay 이전)      | 컴포넌트가 **이미 생성되고 등록된 후**          |
| 주 사용 위치 | 생성자 또는 PostInitProperties 등 초기 설정 구간 | 런타임 중 컴포넌트를 동적으로 붙일 때            |
| 작동 조건   | `RegisterComponent()` 전에만 안전하게 사용 가능 | 언제든 사용 가능                        |
| 콜리전 동작  | 컴포넌트가 아직 World에 없으므로 콜리전 작동안 함       | World에 부착되므로 콜리전 및 Overlap 정상 동작 |

---

## 5. 다음 단계 (Next Steps)

- `SlowAuraAbility` 구현 완료 및 `Ions`에 적용

---

## 6. 회고 (Reflection)

- C++에서 생성자는 `부모 -> 자식` 순으로 호출된다. 따라서 부모 클래스인 EnemyBase 생성자에서 `GetClass()->GetName()`을 호출하면 `EnemyBase`가 출력될 줄 알았는데, 자식 클래스 이름인 `Plasmorphs`가 반환됐다. `virtual 함수`가 있었기 때문에 `RTTI`를 활용해서 출력한 건가? 자식 클래스 생성자가 호출 안된 상태에서 `this` 포인터를 사용하면 위험할 것 같은데? 이는 언리얼의 객체 생성 과정을 통해 이해할 수 있었다. 언리얼의 객체 생성 과정은 다음과 같다.
	`UObject::StaticConstructObject_Internal() (C++ new)    -> CDO 생성 (Class Default Object)    -> UClass* 연결    -> 부모 생성자 호출 (EnemyBase)    -> 자식 생성자 호출 (Plasmorphs)`
	
	생성자는 객체 메모리를 할당하고 난 후 실행된다. 즉, 이미 `this`는 `Plasmorphs` 객체로 메모리에 잡혀 있고, VTable 및 `UClass*` 정보도 Plasmorphs 기준으로 설정되어 있다. 따라서 `EnemyBase` 생성자 내에서 `this->GetClass()`를 호출하면, 이미 `Plasmorphs`의 `UClass`가 연결된 상태이다.

- Enemy 유형 확장 기한이 오늘까지라서, 급한 마음에 GPT에게 구상을 맡기고 최대한 빨리 쳐내려고 했다. SlowAura를 구현하고 있었는데, GPT는 Ability에서 Timer를 등록하고, 시간간격마다 OverlapMultiByChannel을 이용해서 확인하라고 했다. 그런데 구현하려고 생각해보니, 어차피 플레이어가 영역 내에 들어오면 Slow 태그 부여, 영역 밖으로 나가면 Slow 태그 해제만 하면 되는데 계속 Timer에서 함수를 호출하는 것은 비효율적이라고 생각했다. 이에 OwnerEnemy에게 SphereComponent를 부착하고 BeginOverlap, EndOverlap시에 호출될 Delegate 함수를 등록하는 식으로 변경했다. 급하다고 무작정 AI를 맹신하지 말자.

- 어차피 함수는 주소 아닌가? 왜 SetTimer의 인자(함수)에 &를 안붙이면 아래의 에러가 날까?
```text
 C:\Users\ASSORTROCK09\hyuim\QuantumVerge\FeatureIons\Source\ProjectQuantumVerge\GAS\Abilities\Enemy\EnemySlowAuraAbility.cpp(15): error C3867: 'UEnemySlowAuraAbility::TickAura': non-standard syntax; use '&' to create a pointer to member
```
	우선, 클래스 멤버 함수는 일반 함수 포인터가 아니라 멤버 함수 포인터이다.
	
	`void (UEnemySlowAuraAbility::*)()`
	
	멤버 함수 포인터는 객체(instance)와 함께 써야 한다:
	
	`UEnemySlowAuraAbility* Obj = ...; (Obj->*(&UEnemySlowAuraAbility::TickAura))(); // 호출`
	
	만약 그냥 이름을 넘긴다면, C++은 이를 멤버 함수의 주소로 암시적으로 해석하지 못한다.



---

## 7. 메모 (Notes)

- Teleport Indicator Decal을 Dynamic Material로 바꿔서 위험 신호(깜빡깜빡) 주기
- SlowAura는 Decal로 할 지, Niagara로 할 지 고민하기
- `UMaterialInstanceDynamic` 사용하면 머터리얼 노드 변수 값을 C++로 동적으로 변경 가능
- `UFUNCTION()`을 사용해야 Delegate 함수 등록(AddDynamic)이 가능한 이유

---

