---
title: "[DevLog] Game Engine 개발일지 #10"
excerpt: Game Engine 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - QuantumVerge
  - UnrealEngine
---
## 1. 날짜 (Date)

2025/07/18

---

## 2. 작업 목표 (Daily Goals)

- 메인 화면 UI 구성 및 Transition ✅

---

## 3. 진행 사항 (Progress)

- 메인 화면 UI 구성 및 Transition 구현 완료
- UI Button용 SFX/VFX 에셋 추가
- 폰트 추가

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- MainMenu UI 배경에 동영상을 넣으려고, [유튜브 링크](https://www.youtube.com/watch?v=ot4X2MFISi8 )이 영상을 따라했는데 영상 썸네일만 보이고 재생이 안됐다. 영상 Source만 `Content/Movies`에 넣고 나머지는 내가 원하는 경로에 작업하고 있었는데, `Content/Movies`에 넣어봤더니 잘 동작했다.

- `UUserWidget::GetWidgetFromName()`은 `NativeOnInitialized()`나 `NativeConstruct()` 시점에서는 위젯 트리 내에 해당 이름의 위젯이 존재하지 않을 수 있다. 위젯 트리는 `NativeConstruct()` 이후에 완전히 구성된다. `GetWidgetFromName()`은 `NativeConstruct()` 또는 `NativeOnInitialized()` 이후에서 호출해야 유효한 결과를 얻을 수 있다.
```c++
UUILevelDescription::UUILevelDescription(const FObjectInitializer& ObjectInitializer) : UUserWidgetBase(ObjectInitializer) { 	mPlayButton = Cast<UButton>(GetWidgetFromName(TEXT("ButtonPlay"))); // ❌ 위험 }
```

---

## 5. 다음 단계 (Next Steps)

- Plasmorphs가 사용할 SizePulseAbility 구현하기

---

## 6. 회고 (Reflection)



---

## 7. 메모 (Notes)

- `TWeakPtr` vs `TWeakObjectPtr`

---

