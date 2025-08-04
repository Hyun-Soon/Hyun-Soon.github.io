---
title: "[DevLog] Quantum Verge 개발일지 #21"
excerpt: Quantum Verge 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - QuantumVerge
  - UnrealEngine
---
## 1. 날짜 (Date)

2025/07/31

---

## 2. 작업 목표 (Daily Goals) ✅

- Attenuation 설정 ✅
- Slow Effect 확장성 있게 변경
- Enemy 크기 디테일 조정 ✅

---

## 3. 진행 사항 (Progress)

- Attenuation 설정 완료
- Enemy 크기 디테일 조정 완료

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

#### 4-1. FSlateBrush, FSliderStyle 등을 사용하려고 했지만, 심볼을 찾지 못함.
```text
PublicDependencyModuleNames.AddRange(new string[] {
    "Slate", 
    "SlateCore"
});

// 위 모듈 추가
```

#### 4-2. OptionsWidget의 Animation이 맵에 등록되지 않음.

부모 클래스인 UserWidgetBase의 NativeConsturct()에서 Map에 캐싱해 놓는 구조였는데, 저장이 안되었다. OptionsWidget에서 `Super::NativeConstruct();`를 실행 안했다..


#### 4-3. 전투 레벨 진입 시, Option UI의 NativeOnInitialize, NativeConstruct 함수가 2번씩 호출됨

this 포인터를 출력해보니 서로 다른 인스턴스였다. 코드에서 한번, Blueprint에서 한번 생성하고 계셨다.

---

## 5. 다음 단계 (Next Steps)

- 전투 레벨에서 UIOption NativeOnInitialize(), NativeConstruct() 2번 호출되는 문제 해결
- Option Save 기능
- MainMenuLevel에서 OptionUI 체크박스를 체크해도, CombatLevel에서 체크박스 State 유지되지 않는 문제 해결 
- 메인메뉴 고도화(Play 버튼 -> 레벨 리스트 -> 레벨 디스크립션 -> 레벨 이동)
- 현재 재생중인 BGM의 볼륨 조절 기능
- InGame Option UI 토글 Close Button이 아닌 키 입력 형식으로 전환, Option UI 등장 시 뒤에 검은 투명한 배경 

---


## 6. 회고 (Reflection)



---

## 7. 메모 (Notes)

- `SaveGame` vs `LocalPlayerSaveGame`
제작중인 게임은 여러 명의 로컬 멀티플레이(ex. Split Screen) 등을 지원하지 않을 계획이다. 플레이어가 한명이므로 SaveGame으로도 충분할 것 같다.

---
UMG(Unreal Motion Graphics)와 Slate는 **Unreal Engine의 UI 시스템**을 구성하는 두 핵심 요소입니다. 각각의 목적과 역할, 사용 방식은 다르지만 서로 긴밀하게 연결되어 있습니다.

---

## 🧩 요약 비교: UMG vs Slate

| 항목     | **UMG (Unreal Motion Graphics)** | **Slate**                                       |
| ------ | -------------------------------- | ----------------------------------------------- |
| 계층     | 엔진의 **상위 UI 레이어**                | 엔진의 **하위 UI 시스템(저수준)**                          |
| 사용자 대상 | 디자이너와 개발자                        | 주로 개발자 (특히 에디터용 UI)                             |
| 사용 방식  | Blueprint + C++                  | 순수 C++ 코드                                       |
| 주 사용처  | **게임 내 UI** (HUD, 인벤토리 등)        | **에디터 UI**, 커스텀 위젯, 저수준 제어                      |
| 스타일링   | `WidgetStyle`, `UMG Designer`    | `FSlateBrush`, `FSliderStyle`, `FButtonStyle` 등 |
| 성능     | 상대적으로 무거움                        | 더 가볍고 빠름                                        |
| 렌더링    | 엔진에서 자동 처리                       | Custom Slate Renderer 사용                        |

---

## 🎮 UMG란?

> **UMG**는 Unreal Engine에서 게임 내 UI를 만들기 위한 **비주얼 UI 시스템**입니다.

### ✅ 특징

- Blueprint 기반 UI 제작 가능
    
- 버튼, 슬라이더, 이미지, 텍스트 등 **시각적인 위젯 제공**
    
- 디자이너와 협업 용이
    
- C++에서도 `UUserWidget` 상속으로 확장 가능
    

### ✅ 대표 클래스

- `UUserWidget`: UMG 위젯의 기본 클래스
    
- `UButton`, `UImage`, `UTextBlock`, `USlider` 등
    
- `NativeConstruct()`, `NativeOnInitialized()` 등 UI 초기화 함수 존재
    

### ✅ UMG 예시 (Blueprint에서)

---

## 🧱 Slate란?

> **Slate**는 Unreal Engine의 UI 렌더링 및 입력 시스템의 **기반 프레임워크**로, 저수준에서 모든 UI를 처리합니다.

### ✅ 특징

- **C++ 코드로만 구성**
    
- 렌더링, 입력 처리, 스타일 등 모든 것을 직접 제어 가능
    
- **에디터 UI** 대부분 Slate로 구성됨
    
- `SNew()`, `TSharedRef`, `FArguments`, `OnClicked()` 같은 패턴 사용
    

### ✅ Slate 예시

cpp

복사편집

`TSharedRef<SButton> MyButton = SNew(SButton)     .Text(FText::FromString("Click Me"))     .OnClicked(this, &MyClass::OnButtonClicked);`

---

## 🧬 둘의 관계

- **UMG는 Slate 위에 구축**되어 있음.
    
- `UButton`은 내부적으로 `SButton`을 생성하고 관리함.
    
- `UMG → Slate → Low-Level Rendering` 구조
    

즉, **UMG는 Slate의 고급 래퍼(wrapper)**로, C++ 또는 Blueprint에서 쉽게 사용할 수 있도록 만들어진 겁니다.

---

## 🔧 C++ 개발자 시선에서 요약

| 목적                              | 추천 시스템                        | 비고                           |
| ------------------------------- | ----------------------------- | ---------------------------- |
| **게임 UI** (인게임 버튼, 인벤토리 등)      | UMG                           | Blueprint와 C++ 혼용 가능         |
| **에디터 확장 UI**                   | Slate                         | `SNew`, `FArguments` 등 직접 사용 |
| **정밀 커스터마이징** (스타일, 이벤트, 그리기 등) | Slate (또는 UMG + Slate 커스터마이징) | UMG 내부에서 Slate 접근 가능         |
