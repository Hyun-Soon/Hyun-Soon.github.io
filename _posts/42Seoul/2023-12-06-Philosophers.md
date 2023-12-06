---
title: Philosophers 가이드
excerpt: Dining Philosopher 문제를 해결해보자.
categories:
  - 42Seoul
tags:
  - 42Seoul
  - Philosophers
  - Dining_Philosophers
  - semaphore
  - mutex
  - race_condition
---

# 0. 과제 설명
	Dining Philosopher 문제를 해결해 본다. multi threads, multi processors 환경에서 발생할 수 있는 race condition 및 deadlock을 방지한다.

<br>

# 1. 필요 개념
<br>

## 1-1. 공유 자원

여러 프로세스 또는 스레드가 공동으로 사용하는 변수, 메모리, 파일 등의 자원이나 변수를 의미한다.

<br>

## 1-2. Thread

thread란 프로세스 내에서 작업이 실행되는 흐름의 단위를 말한다. 모든 프로세스에는 한 개 이상의 스레드가 존재하여 작업을 수행하며, 두 개 이상의 스레드를 가지는 경우를 멀티 스레드(multi threads)라고 한다. 아래 코드를 보자.
```c
int a = 0;

void increase_a()
{
	for (int i = 0; i < 1000000; i++)
		a++;
}

int main()
{
	pthread_t th1, th2;

	pthread_create(&th1, NULL, increase_a, NULL);
	pthread_create(&th2, NULL, increase_a, NULL);
	pthread_join(th1, NULL);
	pthread_join(th2, NULL);
	printf("a : %d\n", a);
	return 0;
}

```

pthread_create함수를 통해 실행 흐름의 단위인 스레드를 2개 만들었다. 각각의 thread는 increase_a 함수를 실행하고 pthread_join을 통해 종료될 것이다. 즉 increase_a 함수가 2번 실행된다는 것이고 printf의 결과로 2000000이 출력될 것을 예상할 수 있다.

<br>

## 1-3. Race Condition

1-2의 코드에서 우리는 결과가 2000000일 것이라고 예상했다. 하지만 실제로 코드를 실행해보면 출력이 2000000이 아닌 경우가 종종 발생한다. 왜 이런 현상이 발생할까? 

각각의 스레드가 a++을 한번씩 실행한다고 생각해보자.

| Thread 1 | Thread 2 |
|: --- :|: --- :|
| 메모리에서 CPU로 a 값을 가져온다 --- a = 0| |
| a++ --- a = 1| 메모리에서 CPU로 a 값을 가져온다 --- a = 0|
| a 값을 메모리에 업데이트 해준다 --- a = 1 | a++ --- a = 1 | 
| | a 값을 메모리에 업데이트 해준다 --- a = 1 |

a++이 총 2번 실행이 됐지만, thread 1이 값을 연산 후 메모리에 업데이트 해주기 전에 thread 2가 값을 확인했기 때문에 a = 1이 되는 상황이 발생했다. Race Condition은 이렇게 공유 자원에 대해 여러 프로세스 또는 스레드들이 동시에 접근을 시도하여 결과에 영향을 줄 수 있는 상태를 말한다. 

<br>

## 1-4. Critical Section

critical section이란 병렬 프로그래밍에서 스레드 또는 프로세스가 동시 접근을 해서는 안되는 코드 영역을 말한다. critical section의 목적은 공유 자원에 대한 동시 접근으로 인해 발생할 수 있는 race condition을 방지하고 데이터 일관성을 유지하는 것이다. 이를 위해서는 상호 배제(mutual exclusion) 매커니즘이 필요하며 대표적인 방법으로 mutex와 semaphore가 있다.

<br>

## 1-5. Mutex

critical section에 동시 접근을 막기 위한 기법 중 하나로 **Mut**ual **Ex**clusion을 줄여서 Mutex라고 부른다.
mutex는 lock과 unlock 두 가지 기능을 가진다.
공유 변수 a에 대한 동시 접근을 막고 싶다면 다음과 같이 mutex를 사용할 수 있다.

```c
.
.
.
//critical section 진입
mutex_lock();
a++;
mutex_unlock();
//critical section 탈출
.
.
.
```

thread 1이 mutex_lock을 실행하고 다음 줄인 a++로 갔을 때, thread 2가 mutex_lock()에 접근한다면 thread 2는 코드를 더 이상 진행하지 못하고 mutex_lock()에 멈춰있게 된다. thread 1이 a++ 실행 후 mutex_unlock()까지 실행해야 thread 2는 비로소 mutex_lock()을 실행하고 a++로 넘어가게 된다.

이런 식으로 mutex를 사용하면 한 스레드가 공유 변수에 접근했을 때 다른 스레드들의 접근을 배제함으로써 race condition을 방지하고 원자성을 보장할 수 있다.

<br>

## 1-6. Semaphore

mutex는 한 스레드가 critical section에 진입하면 다른 모든 스레드의 접근을 막는 방식으로 작동한다. 반면 Semaphore는 한 스레드가 critical section에 진입했더라도 가용할 수 있는 자원이 남아 있으면, 남은 수 만큼의 스레드의 접근을 허용한다.

백화점 화장실을 떠올려 보자. 

1. 변기를 사용할 수 있는 칸이 5칸이 있다(어떤 공유 변수를 동시에 5개의 스레드까지 사용해도 상관 없는 경우 semaphore의 초기 값을 5로 초기화한다).
2. 한 명이 첫 번째 칸에 들어간다면 남아 있는 사용가능한 칸은 4칸이 있다(어떤 스레드가 공유 변수에 접근할 때 semaphore 값을 하나 내려서 4로 만든 뒤 공유 변수를 사용한다).
3. 다음 사람이 화장실에 들어왔을 때 남은 4칸 중 하나에 들어갈 것이고 남은 칸은 3칸이 된다(다른 스레드가 공유 변수에 접근할 때 semaphore 값을 하나 내려서 3으로 만든 뒤 공유 변수를 사용한다).
4. 한 명이 볼일이 끝나서 칸에서 나오게 되면 사용 가능한 칸은 1칸이 늘어난다(스레드 하나가 공유 변수 사용이 끝났으면 semaphore 값을 하나 올린다).
5. 모든 칸을 사용 중이라면 남은 칸은 0칸이 되고, 이후에 오는 사람은 한명이 나올 때 까지 기다려야 한다(스레드가 공유 변수에 접근하려고 할 때 해당 변수의 semaphore 값이 0이라면 양수가 될 때까지 기다려야 한다).

semaphore는 위와 같은 식으로 공유 변수에 대한 접근을 제한한다.

<br>

## 1-7. Dead Lock

둘 이상의 프로세스(스레드)가 다른 프로세스(스레드)가 점유하고 있는 자원을 얻기 위해 서로 기다리는 경우 무한 대기에 빠지는 상황을 말한다.
예를 들어, 한 스레드가 공유 자원 a, b에 접근하기 위해 다음과 같은 코드를 실행 중이라면
```c
.
.
.
mutex_lock(mutex_a);
a++;
mutex_lock(mutex_b);
b++;
mutex_unlock(mutex_a);
mutex_unlock(mutex_b);
.
.
.
```

아래 코드를 실행 중인 또 다른 스레드와 dead lock을 일으킬 수 있다(열심히 고민해 보자).
```c
.
.
.
mutex_lock(mutex_b);
b++;
mutex_lock(mutex_a);
b++;
mutex_unlock(mutex_a);
mutex_unlock(mutex_b);
.
.
.
```


### 1-7-1. DeadLock 발생조건 4가지

1. **상호 배제** : 한 번에 프로세스(스레드) 하나만 특정 공유 자원을 사용할 수 있다. 사용 중인 자원을 다른 프로세스(스레드)가 사용하려면 해당 자원에 걸린 제한이 해제될 때까지 기다려야 한다.
2. **점유 대기** : 자원을 최소한 하나 확보하고, 다른 자원을 점유하기 위해 대기하는 프로세스(스레드)가 존재해야 한다.
3. **비선점** : 다른 프로세스나 스레드가 점유한 자원을 강제로 빼앗을 수 없다.
4. **순환 대기** : 자원을 얻으려는 프로세스(스레드)가 순환 형태로 대기하고 있어야 한다.

### 1-7-2. DeadLock 해결법

1. **예방(Prevention)** : 데드락의 발생조건 4가지 중 하나도 만족하지 않게 설계하는 것. 시스템 처리량이나 효율을 떨어뜨리는 문제가 발생할 수 있다.
2. **회피(Avoidance)** : 데드락 발생 가능성을 허용하지만 적절하게 회피하는 방법. 프로세스들이 요청하는 모든 자원을, 데드락을 발생시키지 않으면서 차례로 모두에게 할당해 줄 수 있다면 **safe state**에 있다고 말한다. 또한 특정한 순서로 프로세스들에게 자원을 할당, 실행, 종료 등의 작업을 할 때 데드락이 발생하지 않는 순서를 **safe sequence**라고 한다. 회피 알고리즘은 자원을 할당한 후에도 시스템이 항상 safe state에 있을 수 있도록 할당을 허용하는 것이다.
3. **탐지 및 회복(Detection and Recovery)** : 시스템이 데드락 예방이나 회피를 하지 않았을 때, 데드락이 발생하면 이를 탐지하고 회복하는 알고리즘.

<br>

## 1-8. Context Switch

하나의 프로세스(스레드)가 CPU를 사용하던 상황에서 다른 프로세스(스레드)가 CPU를 사용하기 위해, 먼저 사용하고 있던 프로세스(스레드)의 상태를 저장해놓고 다음 프로세스(스레드)의 저장되어 있던 상태를 불러오는 것을 말한다.

프로세스 끼리는 메모리를 공유하지 않지만 스레드 끼리는 ``stack``영역을 제외한 ``code``, ``data``, ``heap`` 영역을 공유하기 때문에, 프로세스에서 다른 프로세스로 context switch가 일어나는 것보다, 한 프로세스 내의 스레드 사이에서 context switch가 발생하는 것이 overhead가 적다.

<br>

## 1-9. 효율적인 멀티스레딩

스레드를 많이 만든다고 무조건 좋은 프로그램이 아니다. 이는 하드웨어의 성능에 따라 달라진다.


[유튜브 포프tv](https://www.youtube.com/watch?v=M1e9nmmD3II&t=16s)

<br>

# 3. 시행착오 및 팁

- Mandatory
	1. philosopher가 1명일 때 프로그램을 종료하기 위해 pthread_detach()를 사용했는데, main thread에서 free를 완료하고 난 후, 아직 종료되지 않은 philo 스레드에서 free된 변수를 참조하면 segfault가 발생한다.
	2. 인자에 0이 오는 경우는 웬만하면 에러처리하자.
	3. 반복되는 계산은 변수에 담아서 계산을 줄이자.

- Bonus
	1.  스레드 없이 프로세스 자체에서 먹기, 자기, 생각하기를 하면서 죽는 시간을 계산하려고 했으나, 죽었는지 체크해주는 스레드가 없으면 usleep이 걸려있는 동안 자신이 죽었는지 확인할 방법이 없다.
	2. ``typedef int sem_t``로 선언되어 있어서 sem_t 변수에 직접 접근해서 값을 확인할 수 있을 줄 알았지만 불가능했다.