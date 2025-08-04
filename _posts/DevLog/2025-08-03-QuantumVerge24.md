---
title: "[DevLog] Quantum Verge 개발일지 #24"
excerpt: Quantum Verge 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - QuantumVerge
  - UnrealEngine
---
## 1. 날짜 (Date)

2025/08/03

---

## 2. 작업 목표 (Daily Goals) ✅

- FXManager CachendSoundMap의 Key를 직접 FString 입력하는 방식에서 SoundAsset SoftPtr의 GetAssetPath() 결과값을 넘기는 방식으로 변경 ✅
- n초 동안 fadeout 후, m초 동안 fadein 해주는 BGM용 함수 작성
- Entropic Singularities 죽을 때 큰 이펙트 연출하기 ✅

---

## 3. 진행 사항 (Progress)

- FXManager 리팩토링 완료
- Boss 죽을 때 이펙트 연출 완료

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

---

## 5. 다음 단계 (Next Steps)

- BGM 관리 기능 구현(BGM 사운드 겹치지 않게)
- n초 동안 fadeout 후, m초 동안 fadein 해주는 BGM용 함수 작성

---


## 6. 회고 (Reflection)

팀원분이 SoftObjectPtr에 익숙하지 않으셔서 `if (SoftPtr.IsNull())`로 체크해야 하는 것을 `if (SoftPtr)`로 체크하고 계셨다. 나도 겪었던 문제였는데 주석을 더 자세히 달거나, 조심하라고 말씀드렸으면 더 좋았을 것 같다.

---

## 7. 메모 (Notes)










