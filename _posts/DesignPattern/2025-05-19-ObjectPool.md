---
title: \[Design Pattern\] Object Pool
excerpt: 메모리 단편화와 동적 할당 오버헤드를 줄일 수 있는 오브젝트 풀에 대해 알아보자.
categories:
  - DesignPattern
tags:
  - ObjectPool
  - Cpp
  - DesignPattern
---
# 0. 메모리 단편화(memory fragmentation)

메모리 단편화란, 메모리 할당과 해제가 반복되면서 메모리 공간이 잘게 나뉘고 비효율적으로 사용되는 현상을 말한다.

## 0-1. 외부 단편화(External Fragmentation)

전체 사용 가능한 공간의 총 합은 충분하지만, 연속적인 큰 메모리 블록을 할당할 수 없는 상황을 말한다.
메모리 사이사이에 작고 끊어진 빈 공간(조각)들이 있는 상황.

| 사용중 | 사용중 | 빈 10KB | 사용중 | 빈 5KB | 사용중 | 빈 3KB |
| :-: | :-: | :----: | :-: | :---: | :-: | :---: |

위 메모리 상황에서 16KB를 할당하려고 할 때, 전체적인 여유공간은 18KB이지만 연속된 최대 공간은 10KB이기 때문에 할당에 실패한다.

## 0-2. 내부 단편화(Internal Fragmentation)

할당된 메모리 블록 내부에서 실제로 사용하지 않는 공간이 생기는 경우를 말한다.
고정된 크기의 블록을 할당하거나, 정렬 때문에 필요한 공간보다 더 많이 할당 될 때 발생한다.

예시로 바이트 패딩이 있다. 컴파일러는 성능 향상을 위해 CPU가 접근하기 쉬운 위치에 데이터를 배치한다. 예를 들어 64bit CPU의 경우 메모리에서 값을 읽어올 때, 한번에 8바이트씩 읽어 온다. 이 때 데이터의 주소가 애매하게 걸쳐있으면, 데이터가 8바이트보다 작더라도 두 번 읽어야 하는 경우가 생긴다. 이를 방지하기 위해, 클래스의 크기가 5바이트인 경우 3바이트의 패딩을 넣어 8바이트를 할당하게 된다. 이 때, 3바이트는 사용되지 않는 메모리 공간임에도 불구하고 할당되었기 때문에 내부 단편화에 해당한다.

## 0-3. 문제점 및 해결 방법

위에서 봤듯이, 메모리 단편화는 많은 문제를 일으킨다.

1. `메모리 낭비` : 총 여유 공간은 많아도 실제 필요한 만큼 연속 공간을 못 찾을 수 있음
2. `성능 저하` : 메모리 관리 오버헤드 증가
3. `할당 실패` : 큰 객체를 위한 메모리 확보가 어려워짐

해결 방법으로는
1. `압축(Compaction)` (외부 단편화 해결)
	- 메모리 재배치를 통해 단편화되어 있는 공간들을 하나로 합치는 기법
2. `통합(Coalescing)` (외부 단편화 해결)
	- 단편화로 인해 분산된 메모리 공간들 중 인접해 있는 공간끼리 통합시켜 큰 메모리 공간으로 합치는 기법
	- 압축은 재배치가 일어나지만 통합은 인접한 공간끼리 합해진다는 차이가 있다
	- 이미 인접해 있는데 합친다는 게 무슨 말일까? -> 메모리는 실제로 물리적으로 붙어 있어도, 관리 정보 상에서는 여러 조각으로 나뉘어 있을 수 있다. 따라서 통합은 운영체제가 인접한 자유 블록을 하나의 블록으로 관리하도록 구조를 바꾼다는 의미이다.
3. `페이징(Paging)` (외부 단편화 해결)
	- 프로세스의 가상 메모리를 고정 크기의 블록인 페이지(page) 단위로 분할하여 물리 메모리에 할당하는 기법
	- 페이지들은 논리적으로 연속적인 공간으로 할당되지만, 물리적으로는 분산되어 할당
	- 페이지 단위로 분할되어 할당되기 때문에 물리 메모리 내에 작은 공간이 남더라도 이를 페이지 크기로 합쳐 큰 공간으로 사용할 수 있기 때문에 외부 단편화 해결
4. `세그멘테이션(Segmentation)` (내부 단편화 해결)
	- 프로세스의 가상 메모리를 서로 다른 크기의 블록인 세그먼트(Segment) 단위로 분할하여 물리 메모리에 할당하는 기법
	- 프로세스의 크기가 동적으로 변하는 경우에 효율적으로 메모리를 할당할 수 있어 내부 단편화 해결
5. `메모리 풀(Memory Pool)` (내부 + 외부 단편화 해결)
	- 필요한 메모리 크기를 지정해 미리 할당을 받아 놓고, 필요할 때마다 일정 부분을 사용하는 기법
	- 할당받아놨던 메모리 공간을 가져다 쓰고, 사용 후에는 반납하며, 다른 용도가 생긴 경우 이를 다시 가져다 쓰기 때문에 메모리 할당과 해제로 인한 오버헤드와 외부 단편화가 발생하지 않는다.
	- 필요한 크기만큼만 할당을 할 경우, 내부 단편화도 발생하지 않는다.
	- `메모리 단편화로 인한 메모리 낭비량 < 메모리 풀을 만들었지만 쓰이지 않는 메모리 양`인 경우, 비효율적이다.
	- 미리 할당해 놓고 사용하지 않는 것도 메모리 누수로 볼 수 있으므로, 동적할당 및 해제가 빈번한 경우에 사용하는 것이 바람직하다.


# 1. 오브젝트 풀(Object Pool)

메모리 풀의 대표적인 활용 예이다. 게임은 몬스터, 파티클 등 객체의 생성과 소멸이 빈번히 발생한다. 만약 다인 보스 레이드에서 모든 유저의 스킬 이펙트를 동적 할당, 해제한다면 상당한 오버헤드와 메모리 단편화가 발생할 것이다. 이를 방지하기 위해서 오브젝트 풀링을 사용한다.

## 1-1. 생성자를 직접 호출하는 방식

```c++
#include <iostream>
#include <stack>

template <typename T, int PoolSize = 1024>
class MemoryPool
{
public:
	MemoryPool()
	{
		// 생성자 호출 없이, 순수하게 메모리만 할당하는 방식 // C언어의 malloc
		mMemory =(T*)(::operator new(PoolSize * sizeof(T)));

		for (int i = 0; i < PoolSize; ++i)
			mAllocMemory.push(mMemory + i);
	}

	~MemoryPool()
	{
		// C언어의 free
		::operator delete (mMemory);
	}

	T* Alloc()
	{
		if (mAllocMemory.size() == 0)
			return nullptr;

		T* ptr = mAllocMemory.top();
		mAllocMemory.pop();

		// placement new
		// 이미 할당된 메모리에 객체의 생성자를 호출
		::new (ptr) T;

		return ptr;
	}

	void DeAlloc(T* ptr)
	{
		//반환할 때 소멸자를 호출하고 싶다면
		ptr->~T();

		mAllocMemory.push(ptr);
	}

private:
	T* mMemory;
	std::stack<T*> mAllocMemory;

};

class Monster
{
public:
	Monster()
	{
		std::cout << "Constructor Called.\n";
	}

	~Monster()
	{
		std::cout << "Destructor Called.\n";
	}
};

int main()
{
	MemoryPool<Monster> memoryPool;

	Monster* monster = memoryPool.Alloc();

	memoryPool.DeAlloc(monster);

	return 0;
}
```

```text
출력 결과
Constructor Called.
Destructor Called.
```

## 1-2. operator new를 오버로딩하는 방식

```c++
#include <iostream>
#include <stack>

template <typename T, int PoolSize = 1024>
class MemoryPool
{
public:
	MemoryPool()
	{
		// 생성자 호출 없이, 순수하게 메모리만 할당하는 방식 // C언어의 malloc
		mMemory = (T*)(::operator new(PoolSize * sizeof(T)));

		for (int i = 0; i < PoolSize; ++i)
			mAllocMemory.push(mMemory + i);
	}

	~MemoryPool()
	{
		// C언어의 free
		::operator delete (mMemory);
	}

	T* Alloc()
	{
		if (mAllocMemory.size() == 0)
			return nullptr;

		T* ptr = mAllocMemory.top();
		mAllocMemory.pop();

		return ptr;
	}

	void DeAlloc(T* ptr)
	{
		mAllocMemory.push(ptr);
	}

private:
	T* mMemory;
	std::stack<T*> mAllocMemory;

};

class Monster
{
public:
	Monster()
	{
		std::cout << "Constructor Called.\n";
	}

	~Monster()
	{
		std::cout << "Destructor Called.\n";
	}

	static void* operator new (size_t size)
	{
		return mMonsterPool.Alloc();
	}

	static void operator delete (void* ptr)
	{
		mMonsterPool.DeAlloc((Monster*)ptr);
	}

private:
	static MemoryPool<Monster> mMonsterPool;
};

MemoryPool<Monster> Monster::mMonsterPool;

int main()
{
	Monster* monster1 = new Monster;
	Monster* monster2 = new Monster;

	delete monster1;
	delete monster2;
	return 0;
}
```

```text
출력 결과
Constructor Called.
Constructor Called.
Destructor Called.
Destructor Called.
```

그런데 여기서 이상한 점이 있다. 

1. 우리는 operator new에 size_t를 인자로 넣어준 적이 없다. 그런데 우리가 오버로딩한 new가 호출된다.
2. 오버로딩한 new 내부에서 생성자를 호출하지 않았는데 생성자가 호출된다.

이유가 뭘까?

```c++
Monster* monster1 = new Monster;
```

이 구문은 컴파일러에 의해, 다음과 같이 처리된다.

1. `operator new(size_t)` 호출 -> 메모리 확보
2. 생성자 호출 -> 확보한 메모리에 객체 초기화

즉, 다음과 같은 의미를 갖는다.

```c++
void* memory = Monster::operator new(sizeof(Monster)); //사용자 정의 operator new 호출
Monster* obj = static_cast<Monster*>(memory);
obj->Monster(); //생성자 호출
```


