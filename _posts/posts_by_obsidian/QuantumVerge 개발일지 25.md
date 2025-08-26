---
title: "[DevLog] Quantum Verge 개발일지 #25"
excerpt: Quantum Verge 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - QuantumVerge
  - UnrealEngine
---
## 1. 날짜 (Date)

2025/08/04

---

## 2. 작업 목표 (Daily Goals) ✅

- FXManager BGM 관리 기능(새로 재생 시, 이전 BGM 해제)
- 새로운 BGM 재생 시 BGM Fadeout/in 연결 기능 구현
- Tag `System.Freeze` 검출 시 델리게이트로 Ability 중지
- Enemy별 Ability DT에 정의

---

## 3. 진행 사항 (Progress)



---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

### 4-1. DataTable에 Struct를 넣었지만, Struct 내부 값을 입력할 수 없음

```c++
USTRUCT(BlueprintType)
struct FEnemyAbilityInfo
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere)
    float Cooldown;

    UPROPERTY(EditAnywhere)
    TSubclassOf<UEnemyAbilityBase> AbilityClass;
};
```

`UPROPERTY(EditAnywhere)`를 안써서 그랬다.


#### 4-2. Ability 유지 안하고, Timer마다 발동하게 변경
Teleport Ability의 죽었을 때 내부 Timer 동작 막기, Teleport Warning Decal 삭제 등 문제가 많음.

---

## 5. 다음 단계 (Next Steps)



---

## 6. 회고 (Reflection)

Ability를 Enemy 생존주기와 맞춰야된다고 생각했지만, 사실상 Ability는 동작을 안하고 메모리만 차지하고 있었다. 실제 동작은 Timer에 맡겨놨다.

---

## 7. 메모 (Notes)

1. 연출용 Actor 생성
2. 연출용 Actor에 Camera 부착(TickEnabled = false)
3. SpawnSystem이 Boss 죽음 감지하면 연출용 Actor TickEnable
4. 플레이어를 보고 있던 Camera를 Boss Enemy로 이동
5. Boss Enemy 포커싱 후, Mesh Scale  Shrink
6. 일정 크기 이상 줄어들면, 충격파 Niagara Spawn
7. 애니메이션 시간 끝난 후, SpawnSystem Complete 호출
