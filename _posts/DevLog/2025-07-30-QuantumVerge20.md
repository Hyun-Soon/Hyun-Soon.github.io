---
title: "[DevLog] Quantum Verge 개발일지 #20"
excerpt: Quantum Verge 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - QuantumVerge
  - UnrealEngine
---
## 1. 날짜 (Date)

2025/07/30

---

## 2. 작업 목표 (Daily Goals) ✅

- ContructorHelpers에서 HitVFX, DeathVFX 로딩 -> 운영 및 패치 유연성을 위해 DataTable + TSoftObjectPtr + 캐싱 방식으로 변경 ✅
- FXManager를 GameInstanceSubsystem 파생 클래스로 변경 및 VFX,SFX 데이터들 FXManager에서 중앙 관리식으로 리팩토링 ✅

---

## 3. 진행 사항 (Progress)

작업 목표 완료

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

#### 4-1. Enemy들이 공통적으로 사용하는 에셋에 대해서, 키를 다르게 해서 따로 구분을 하는게 맞을까?

나중에 게임 고도화되면 각 에너미마다 hit, death niagara system이 달라질 수 있으니, 에셋은 같더라도 key를 다르게 구분. 포인터를 사용하기 때문에 겹치는 VFX 에셋이 많아도 그렇게 큰 오버헤드는 없을 것임.


---

## 5. 다음 단계 (Next Steps)

- Attenuation 설정
- Slow Effect 확장성 있게 변경
- Enemy 히트박스 옵션 및 크기 디테일 조정

---


## 6. 회고 (Reflection)

TSoftObjectPtr을 넣어야 하는 곳에 다른 TObjectPtr 변수를 넣고 있었다. 형변환이 되나보다.. 에러가 안나와서 한참 찾았네

Enemy 이펙트, 사운드 꾸미기 시작하니까 재밌다. 며칠 뒤면 마무린데, 좀만 더 힘내자.

---

## 7. 메모 (Notes)

✅ `TSoftObjectPtr`란?

`TSoftObjectPtr<T>`는 `UObject`에 대한 **경로 기반 포인터**다.

- 실제 메모리에 로드되어 있지 않아도 사용할 수 있고,
    
- 필요할 때 `LoadSynchronous()`를 호출하면 실제 오브젝트를 메모리에 로드한다.
    
- 또는 `AsyncLoad`를 통해 비동기 로딩도 가능하다.
    

📌 예시

```
TSoftObjectPtr<UNiagaraSystem> SoftVFX = RowData->HitVFX; // 아직 리소스를 로드하지 않음  
UNiagaraSystem* LoadedVFX = SoftVFX.LoadSynchronous(); // 이 시점에만 실제 리소스를 메모리에 로드

```


- `TSoftObjectPtr`를 쓰는 이유

✅ **1. DataTable이 리소스를 직접 가지고 있을 수 있다**

- 예전에는 DataTable에서 NiagaraSystem을 직접 가질 수 없었지만, `TSoftObjectPtr` 덕분에 가능해졌다.
    
- 엑셀 기반의 DataTable에서 쉽게 이펙트 경로를 입력하고, 런타임에서 로드할 수 있다.
    

✅ **2. 처음 한 번만 로딩하고, 이후에는 캐시된 포인터만 사용**

- 여러 Enemy가 동일한 이펙트를 사용할 경우에도,  
    SoftObjectPtr로 한 번만 로딩해서 메모리에 공유할 수 있다.
   
✅ **3. 경로 기반이기 때문에 블루프린트나 외부 툴로 쉽게 수정 가능**

- 이펙트 경로만 바꾸면 새 리소스로 자동 연결됨 → **운영/패치에 매우 유리**
    


💡 `TSoftObjectPtr` 장점 요약

| 장점               | 설명                                           |
| ---------------- | -------------------------------------------- |
| 📦 **지연 로딩**     | 실제로 필요할 때만 로딩하여 초기 메모리 부담 감소                 |
| 🔁 **공유/캐싱 용이**  | 같은 리소스를 여러 오브젝트에서 재사용 가능 (Map으로 캐시 가능)       |
| 🛠 **유지보수 편리**   | 하드코딩 없이 경로 기반으로 관리 가능, DataTable과 궁합 좋음      |
| 🎯 **런타임 수정 가능** | BP/엑셀에서 쉽게 바꿀 수 있어 게임 밸런싱/운영에 적합             |
| 🔧 **비동기 로딩 가능** | LoadSynchronous 말고 Async 로딩도 가능하여 프레임 드랍 최소화 |


- ❌ `TMap<TSoftObjectPtr<>, UNiagaraSystem*>`가 비추천인 이유

1. 🔍 `TSoftObjectPtr`는 내부적으로 **경로 기반 포인터**

- `TSoftObjectPtr`는 UObject를 직접 가리키는 포인터가 아니라, **FSoftObjectPath**를 가지고 있는 래퍼이다.
    
- 즉, 아래 두 SoftPtr은 실제로 같은 NiagaraSystem을 가리킬 수 있어도, **경로 문자열이 다르면 다른 키**로 인식된다.
    

`TSoftObjectPtr<UNiagaraSystem> A(TEXT("/Game/VFX/Explosion.Effect")); TSoftObjectPtr<UNiagaraSystem> B(TEXT("/Game/VFX/Explosion.Effect"));  // 논리적으로 같지만 주소가 다름`

- 이런 특성 때문에, 같은 NiagaraSystem에 대해 여러 SoftPtr이 생성되면 **캐시에서 중복 항목이 생기거나 찾지 못할 수 있음**.