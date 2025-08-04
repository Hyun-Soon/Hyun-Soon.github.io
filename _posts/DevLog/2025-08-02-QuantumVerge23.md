---
title: "[DevLog] Quantum Verge 개발일지 #23"
excerpt: Quantum Verge 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - QuantumVerge
  - UnrealEngine
---
## 1. 날짜 (Date)

2025/08/02

---

## 2. 작업 목표 (Daily Goals) ✅

- 메인메뉴 고도화(Play 버튼 -> 레벨 리스트 -> 레벨 디스크립션 -> 레벨 이동) ✅
- 현재 재생중인 BGM의 볼륨 조절 기능 ✅
- EnemyAbility 클리어 애니메이션 재생 중 동작 안하게 처리 -> Ability 인스턴스 계속 유지하면서 타이머로 반복 재생 중이라 BlockedTag가 아니라 태그 기반 델리게이트로 처리해야할 듯

---

## 3. 진행 사항 (Progress)

- 메인메뉴 고도화(Play 버튼 -> 레벨 리스트 -> 레벨 디스크립션 -> 레벨 이동) 완료
- 현재 재생중인 BGM의 볼륨 조절 기능 완료

---
## 4. 문제점 및 해결 방법 (Challenges & Solutions)

---
## 5. 다음 단계 (Next Steps)


---
## 6. 회고 (Reflection)



---

## 7. 메모 (Notes)

- WindowMap
Key를 FName vs EnumClass -> FName하면 휴먼 에러를 줄이기 위해 위젯 이름을 어디에 const FName 처럼 정해놓고 가져다 써야 한다. 옵션창, 레벨 선택창 등등이 같은 종류가 여러개 생길 일은 없을 것 같으니(여러개 생기면 map에 저장할 때 문제됌) uint8 enum class를 사용하자.

- FXManager에서 FadeOut 기능을 제공하려고 했으나, FXManager에서 AudioComponent를 관리하기 보다, PlayBGM 함수에서 `AudioComponent*`를 리턴해주고 이를 사용하는 객체가 직접 FadeOut 함수를 호출하는게 낫다고 판단. PlayBGM의 사운드 재생 함수를 `PlaySound2D`에서 `SpawnSound2D`로 변경 후, AudioComponent를 리턴.


- FName : 객체 생성 시점에 자동으로 부여되는 고유 이름(클래스이름 뒤에 인스턴스 번호가 붙음)








