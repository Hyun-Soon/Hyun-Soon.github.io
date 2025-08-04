---
title: "[DevLog] Quantum Verge 개발일지 #16"
excerpt: Quantum Verge 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - QuantumVerge
  - UnrealEngine
---
## 1. 날짜 (Date)

2025/07/25

---

## 2. 작업 목표 (Daily Goals) ✅

- VFX/SFX 옵션 기능 문제 해결(GameInstance의 멤버 변수에 옵션 세팅값을 저장해서, 월드가 전환되어도 값을 유지하도록 하였으나 값이 바뀜)


---

## 3. 진행 사항 (Progress)

- FXManager 구조 변경 중

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

#### 4-1. 직접 GEngine의 AudioDevice에 접근해서 사운드 세팅하려고 했으나, 언리얼 코드 실행 순서 때문에 계속 Crash 유발

`UGameplayStatics::PushSoundMixModifier()`와 같은 제공 함수들을 사용하기로 결정.


#### 4-2. GameInstance의 멤버 변수로 FXManager를 인스턴스화하고, 여기에서 설정 정보를 저장하도록 했으나, 값이 유지되지 않음

로그를 찍어본 결과, Level Transition이 일어날 때, FXManager의 소멸자가 호출되었다.

1. UPROPERTY() 없을 땐, GC가 OepnLevel() 호출 이후에 FXManager의 Destructor를 호출해버림
```
LogTemp: Error: [0726] UCustomGameInstance Constructor Called!!!
LogTemp: Error: [0726] UCustomGameInstance Destructor Called!!!
LogTemp: Error: [0726] UGameFXManager Constructor Called!!!
LogTemp: Error: [0726] CustomGameInstance :: CustomGameInstance Pointer : 0000084162102580
LogTemp: Error: [0726] CustomGameInstance :: mFXManager Pointer : 00000840F57C6480
LogTemp: Warning: [0726] VFXCheckdBox State : true
LogTemp: Warning: [0726] DamageDisplayCheckdBox State : true
LogTemp: Error: [0726] UIOptions :: GameInstancePointer : 0000084162102580
LogTemp: Error: [0726] UIOptions :: mFXManager : 00000840F57C6480
LogTemp: Warning: [0726] Just Before OpenLevel() Called
LogTemp: Warning: [0726] Just After OpenLevel() Called
LogTemp: Error: [0726] UGameFXManager Destructor Called!!! //***여기서 호출됨***
LogTemp: Error: [0726] ACombatGameMode Constructor Called!!!
LogTemp: Warning: [0726] CombatGameMode:: StartPlay GameInstance : 0000084162102580
LogTemp: Warning: [0726] CombatGameMode:: StartPlay FXManager : 00000840F57C6480
LogTemp: Warning: [0726] CombatGameMode:: StartPlay bVFXEnabled: true
LogTemp: Warning: [0726] CombatGameMode:: StartPlay bDamageDisplayEnabled: true
```

2. CustomGameInstance의 FXManager멤버 변수 포인터에 UPROPERTY()를 붙였을 땐, Destructor 호출되지 않음.
```
LogTemp: Error: [0726] UCustomGameInstance Constructor Called!!!
LogTemp: Error: [0726] UGameFXManager Constructor Called!!!
LogTemp: Error: [0726] CustomGameInstance :: CustomGameInstance Pointer : 000008416FFF9D80
LogTemp: Error: [0726] CustomGameInstance :: mFXManager Pointer : 000008507D8139C0
LogTemp: Warning: [0726] VFXCheckdBox State : true
LogTemp: Warning: [0726] DamageDisplayCheckdBox State : true
LogTemp: Error: [0726] UIOptions :: GameInstancePointer : 000008416FFF9D80
LogTemp: Error: [0726] UIOptions :: mFXManager : 000008507D8139C0
LogTemp: Warning: [0726] Just Before OpenLevel() Called
LogTemp: Warning: [0726] Just After OpenLevel() Called
//********** Destructor 호출되지 않음.**********
LogTemp: Error: [0726] ACombatGameMode Constructor Called!!!
LogTemp: Warning: [0726] CombatGameMode:: StartPlay GameInstance : 000008416FFF9D80
LogTemp: Warning: [0726] CombatGameMode:: StartPlay FXManager : 000008507D8139C0
LogTemp: Warning: [0726] CombatGameMode:: StartPlay bVFXEnabled: true
LogTemp: Warning: [0726] CombatGameMode:: StartPlay bDamageDisplayEnabled: true
```

❓그런데, 소멸자가 호출되고 생성자는 다시 호출되지 않았는데, 같은 메모리에 접근해도 Segmentation fault가 발생하지 않는다. 이유가 뭐지? 언리얼이 메모리 사용하는 방식과 연관이 있나? 당연히 크래쉬가 날거라고 생각해서 찾는데 너무 오래 걸렸다. TObjectPtr을 사용하면 스마트 포인터 내부에서 레퍼런스 카운팅을 통해 소멸되지 않을거라고 생각했는데, 다시 찾아봐야겠다.

```
"CustomGameInstance.cpp"
CustomGameInstance::Init()
{
	...
		//FXManager 생성
	mFXManager = NewObject<UGameFXManager>(this);
	if (mFXManager)
		mFXManager->InitFX(GetWorld()); //이거 때문일수도? //이거 때문에 메인메뉴 월드랑 묶여서, 같이 정리됐나?
	...
}

```



---

## 5. 다음 단계 (Next Steps)

- BGM, 효과음 SoundClass 연결하기
- CombatLevel UI에 Option창 토글로 적용하기

---


## 6. 회고 (Reflection)

- `UGameplayStatics::SetBaseSoundMix()`의 인자로 `WorldContextObject`를 넣어줘야 한다. 찾아보니 이 인자는 World를 탐색하는데 사용된다고 한다. 그러면 OpenLevel() 함수를 사용해 `MainMenuLevel`에서 `CombatLevel`로 넘어갈 때, 이 WorldContextObject를 업데이트 해줘야 하지 않을까? -> ProjectSetting - Audio - DefaultBaseSoundMix 설정


- DefaultBaseSoundMix를 설정했지만, 볼륨을 바꾸면 월드마다 이를 직접 적용해줘야 하는 줄 알았으나 오해였다.

이유: `SoundMix`는 전역(Global) 상태로 유지됨

Unreal의 `USoundMix`는 기본적으로 **전역적으로 한 번 설정하면 게임 전체에 적용**된다.  
특히 다음과 같은 조건을 만족하면, **레벨 전환 후에도 적용된 상태가 유지된다**:

1. `SetSoundMixClassOverride()`로 특정 SoundMix에 Override를 걸었다면
    
2. 해당 SoundMix가 `PushSoundMixModifier()` 또는 DefaultBaseSoundMix로 **활성화된 상태**라면
    
3. 그 Override 정보는 **엔진의 사운드 믹싱 시스템 내부에서 유지됨**
    

그래서 실제로는 `SetSoundMixClassOverride()`는 **월드에 바인딩되긴 하지만**,  
그 내부적으로는 `AudioDevice`를 통해 **전역적으로 관리**되고 있어서 다음 레벨에서도 유지된다.


---

## 7. 메모 (Notes)

- `NewObject` : 클래스 객체 동적 생성 함수
- `LoadObject` or `ConstructorHelpers::FObjectFinder<>` : 에셋 로드 함수

|     특성     | SetSoundMixClassOverride | PushSoundMixModifier |
| :--------: | ------------------------ | -------------------- |
| **적용 방식**  | 덮어쓰기 (Override)          | 누적 (Additive)        |
| **제거 방법**  | 다른 값으로 다시 호출             | PopSoundMixModifier  |
| **복수 적용**  | 마지막 호출만 유효               | 여러 개 동시 가능           |
| **세밀한 제어** | 개별 파라미터 제어 가능            | Sound Mix 파일 기준      |
