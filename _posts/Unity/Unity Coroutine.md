---
title: \[Unity\] Coroutine
excerpt: 작업을 다수의 프레임에 분산할 수 있게 해주는 Coroutine을 알아보자.
categories:
  - Unity
tags:
  - Unity
---
# 0. Coroutine

Unity에서 **Coroutine**은 시간 지연이나 반복 작업을 관리할 때 매우 유용한 기능이다. 일반적인 함수는 호출되면 한 번에 끝나지만, Coroutine은 **프레임 단위로 실행을 나눠서 처리**할 수 있다.

# 1. 특징

- **비동기적 실행**: 다른 코드 실행을 막지 않고 병렬적으로 처리할 수 있다.
    
- **시간 기반 지연**: `WaitForSeconds` 등과 함께 사용하면 일정 시간 동안 기다릴 수 있다.
    
- **프레임 단위 반복**: `yield return null`을 사용하면 다음 프레임까지 실행을 일시 중지할 수 있다.

# 2. 예제

```c#
using UnityEngine;
using System.Collections;

public class CoroutineExample : MonoBehaviour
{
    void Start()
    {
        // 코루틴 시작
        StartCoroutine(PrintMessage());
    }

    IEnumerator PrintMessage()
    {
        Debug.Log("Coroutine 시작");
        
        // 2초 대기
        yield return new WaitForSeconds(2f);
        
        Debug.Log("2초 후 실행");
        
        // 다음 프레임까지 대기
        yield return null;
        
        Debug.Log("다음 프레임에서 실행");
    }
}

```

- `IEnumerator` 타입 함수가 Coroutine이다.
    
- `StartCoroutine`을 통해 실행한다.
    
- `yield return`을 사용해 **일시 중지**를 제어할 수 있다.

# 3. yield 옵션

|            옵션             |         설명          |
| :-----------------------: | :-----------------: |
|          `null`           |     다음 프레임까지 대기     |
| `WaitForSeconds(seconds)` |    지정한 시간 동안 대기     |
|  `WaitForFixedUpdate()`   | 다음 물리 업데이트 시점까지 대기  |
|   `WaitForEndOfFrame()`   | 현재 프레임 렌더링이 끝난 후 실행 |
| `CustomYieldInstruction`  |  직접 정의한 조건에서 대기 가능  |

# 4. Coroutine 중단

`StopCoroutine(coroutine)` 또는 `StopAllCoroutines()`로 Coroutine을 중단할 수 있다.

```c#
Coroutine myCoroutine;

void Start()
{
    myCoroutine = StartCoroutine(PrintMessage());
}

// 중단 예시
void StopMyCoroutine()
{
    StopCoroutine(myCoroutine);
}

```

# 5. Coroutine 활용 사례

- **딜레이 처리**: 특정 시간 후 이벤트 실행
    
- **애니메이션 제어**: 프레임 단위로 움직임 제어
    
- **네트워크 요청**: 서버 응답 대기 중 UI 블로킹 방지
    
- **루프 처리**: 일정 시간마다 반복 실행