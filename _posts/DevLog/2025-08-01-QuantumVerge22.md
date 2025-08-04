---
title: "[DevLog] Quantum Verge 개발일지 #22"
excerpt: Quantum Verge 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - QuantumVerge
  - UnrealEngine
---
## 1. 날짜 (Date)

2025/08/01

---

## 2. 작업 목표 (Daily Goals) ✅

- 전투 레벨에서 UIOption NativeOnInitialize(), NativeConstruct() 2번 호출되는 문제 해결 ✅
- Option Save 기능 ✅
- MainMenuLevel에서 OptionUI 체크박스를 체크해도, CombatLevel에서 체크박스 State 유지되지 않는 문제 해결 ✅
- 메인메뉴 고도화(Play 버튼 -> 레벨 리스트 -> 레벨 디스크립션 -> 레벨 이동)
- 현재 재생중인 BGM의 볼륨 조절 기능
- InGame Option UI 토글 Close Button이 아닌 키 입력 형식으로 전환, Option UI 등장 시 뒤에 검은 투명한 배경 ✅

---

## 3. 진행 사항 (Progress)

- 전투 레벨에서 UIOption NativeOnInitialize(), NativeConstruct() 2번 호출되는 문제 해결 완료
- Option Save 기능 완료
- MainMenuLevel에서 OptionUI 체크박스를 체크해도, CombatLevel에서 체크박스 State 유지되지 않는 문제 해결 완료
- InGame Option UI 토글 Close Button이 아닌 키 입력 형식으로 전환, Option UI 등장 시 뒤에 검은 투명한 배경 완료

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

#### 4-1. MainMenuLevel에서 OptionUI 체크박스를 체크해도, CombatLevel에서 체크박스 State 유지되지 않는 문제

BlueprintWidget에서 Default로 체크되어있는 값이 Native함수들 이후에 적용되어 값이 덮어씌워지는 것 같다. BlueprintWidget의 체크를 해제하고, 모든 Check State를 C++로 통제하도록 변경.


#### 4-2. SetGamePaused()로 게임을 멈췄을 때, UIOption Toggle 키가 입력되지 않음.

Enhanced Input은 Pause 중에 작동하지 않도록 설계되어 있음. `InputMode UI Only` or `Game and UI`로 설정 + 위젯에서 키 입력 처리

1. `InputMode`를 `GameAndUI`로 설정해 UI에서도 키 입력 허용

2. `UUserWidget::OnKeyDown()` 또는 `OnPreviewKeyDown()` 오버라이드

3. `InputAction`과 키를 직접 연결 (예: ESC = CancelAction)

Option UI에 Focus를 주고, NativeOnPreviewKeyDown() 함수를 사용하여 위젯이 직접 키 입력 감지하도록 설정

#### 4-3. OnPreviewKeyDown() 함수가 호출되지 않음.

위젯의 SetIsFocusable()을 true로 설정해줘야 함.

#### 4-4. 전투 레벨에서 UIOption NativeOnInitialize(), NativeConstruct() 2번 호출되는 문제 해결

코드에서 동적 생성하고 블루프린트에도 넣어두셔서 2번 생성하고 있었음.

---

## 5. 다음 단계 (Next Steps)

- 메인메뉴 고도화(Play 버튼 -> 레벨 리스트 -> 레벨 디스크립션 -> 레벨 이동)
- 현재 재생중인 BGM의 볼륨 조절 기능
- EnemyAbility 클리어 애니메이션 재생 중 동작 안하게 처리 -> 지금 반복 재생 중이라 BlockedTag가 아니라 EndAbility 호출되게 해야할 듯

---


## 6. 회고 (Reflection)



---

## 7. 메모 (Notes)


UI의 Focus 이해하기


