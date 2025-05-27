---
title: \[C++\] Smart Pointer
excerpt: C++11에 새롭게 도입된 스마트 포인터를 알아 보자.
categories:
  - Cpp
tags:
  - Cpp
  - Pointer
  - SmartPointer
---
# 0. 스마트 포인터 도입 배경

C++는 메모리를 직접 다룰 수 있는 언어인 만큼 빠른 속도를 자랑하지만, 장점만큼이나 큰 단점이 존재한다. 바로 `memory leak(메모리 누수)`다. 메모리 누수란 더 이상 사용하지 않는 메모리 공간이 반납되지 않고 계속해서 자리를 차지하고 있는 상황을 말한다. 누수가 발생하면 프로세스가 사용할 수 있는 주소 공간이 줄어들 뿐 아니라, 누수가 쌓인다면 메모리를 할당 받고 싶어도 불가능한 상황이 올 수도 있다. 이러한 문제를 방지하기 위해 스스로 메모리를 해제하는 스마트 포인터가 도입되었다.

# 1. RAII

`Resource Acquisition Is Initialization(자원의 획득은 초기화다)`의 줄임말. C++ 창시자인 비야네 스트로스트룹은 C++에서 자원을 관리하는 방법으로 `RAII` 디자인 패턴을 제안했다. 이는 자원 관리를 스택에 할당한 객체를 통해 수행하는 것이다.

```c++
void ex()
{
	int a = 4;
	int* stackPtr = &a;
	int* heapPtr = new int;
	
	throw std::exception();

	delete heapPtr;
}
```

위 코드에서 exception이 발생하면, 동적할당된 메모리는 해제되지 않지만 ex 함수의 스택에 정의되어 있는 모든 객체들은 빠짐없이 소멸자가 호출된다(`stack unwinding`). 그렇다면, 위의 heapPtr을 일반적인 포인터가 아니라 포인터 `객체`로 만들어서 자신이 소멸될 때 자신이 가리키고 있는 데이터도 같이 `delete`하게 한다면 메모리 누수를 방지할 수 있을 것이다. 즉, 메모리 관리를 스택의 객체를 통해 수행하게 되는 것이다.

# 2. 스마트 포인터의 종류

## 2-1. std::unique_ptr

어떠한 메모리 공간에 대해, 하나의 포인터만 해당 공간을 가리키는 것을 보장하는 포인터다.

```c++
int main()
{
	int* a = new int;
	b = a;

	//...

	delete a;
	delete b;
	return 0;
}
```

위 코드의 경우 `delete b;`를 실행할 때 double free 버그가 발생한다. 해제한 공간을 다시 해제하려고 하기 때문이다. 만약 포인터 a에 유일한 소유권을 부여해서, a 말고는 이 공간(객체)를 해제할 수 없도록 한다면, 이러한 문제는 발생하지 않을 것이다.

이렇게, 특정 메모리의 유일한 소유권을 부여하는 포인터 객체가 `unique_ptr`이다.

```c++
#include <iostream>
#include <memory>

class A
{
	A()
	{
		std::cout << "Constructor Called." << std::endl;
	}

	~A()
	{
		std::cout << "Destructor Called." << std::endl;
	}

	void print()
	{
		std::cout << "Hello!" << std::endl;
	}

	int a;
	int b;
};

int main()
{
	std::unique_ptr<A> ptrA(new A());
	ptrA->print();

	return 0;
}
```

```text
실행 결과
Constructor Called.
Hello!
Destructor Called.
```

`unique_ptr`를 스택에 정의함으로써 main() 함수가 종료될 때 자동으로 소멸자가 호출되고, 이 때 자신이 가리키고 있는 A가 할당된 주소를 해제한다.

복사 생성자가 명시적으로 삭제되었기 때문에 unique_ptr의 복사 생성은 불가능하다.

```c++
unique_ptr<T>(const T& other) = delete;
```

따라서 `std::vector` 같은 컨테이너에 unique_ptr을 담을 때는, `std::move`를 통해 전달하거나 `emplace_back()`을 사용해야 한다.

소유권은 이전 가능하다.

```c++
std::unique_ptr<A> ptrA = (new A());
std::unique_ptr<A> anotherPtrA = std::move(ptrA);
```

### std::make_unique

C++14부터 `std::unique_ptr`을 간단히 만들 수 있는 `std::make_unique` 함수를 제공한다.

```c++
class Example
{
	Example(int a, int b)
		: mA(a)
		, mB(b)
	{
	}

	~Example()
	{
	}

	int mA;
	int mB;
};

int main()
{
	std::unique_ptr<Example> example = std::make_unique<Example>(3, 5);
	//std::unique_ptr<Example> example = std::make_unique<Example>(new Example(3, 5));
	return 0;
}
```

make_unique() 함수는 템플릿 인자로 전달된 클래스의 생성자에, 자신이 전달받은 인자를 그대로 전달한다.

## 2-2. std::shared_ptr

하지만 대부분 동적 할당된 포인터를 여러 곳에서 들고 사용하는 경우가 많다. 이런 상황에는 `std::shared_ptr`을 사용하면 된다. shared_ptr은 자신이 가리키고 있는 메모리를 몇 개의 shared_ptr이 가리키고 있는지 숫자를 세는 `reference count`를 수행한다. 따라서 어떤 shared_ptr이 scope를 벗어나는 경우, reference count를 확인하여 해당 메모리를 아직 다른 곳에서 참조하고 있다면 메모리 해제를 하지 않는다.


```c++
#include <memory>
#include <iostream>

class Test
{
public:
	Test();
	~Test();

private:

};

Test::Test()
{
	std::cout << "Constructor Called.\n";
}

Test::~Test()
{
	std::cout << "Destructor Called.\n";
}

int main()
{
	std::cout << "1\n";
	{
		std::shared_ptr<Test> sPtr1(new Test); // reference count : 1
		std::cout << "2\n";
		std::shared_ptr<Test> sPtr2(sPtr1); // reference count : 2
		std::cout << "3\n";
		std::shared_ptr<Test> sPtr3(sPtr2); // reference count : 3
	}
	std::cout << "4\n";

	return 0;
}
```


```text
실행 결과

1
Constructor Called.
2
3
Destructor Called.
4
```


하나의 주소를 가리키는 shared_ptr들은 각 객체가 하나의 reference count를 공유해야 하므로, `Control Block` 을 동적 할당한 후, 각 객체가 여기에 접근해 reference count를 확인/변경한다. 위의 예시 코드의 경우 sPtr2를 만들 때, sPtr1을 넘겨줬고 해당 shared_ptr이 control block 주소를 가지고 있으므로 sPtr2은 control block을 할당할 필요 없이 reference count 값만 올려주게 된다.

### 주의할 점 1

그런데 아래의 경우에는 어떻게 될까?

```c++
Test* testPtr = new Test;
std::shared_ptr<Test> sPtr1(testPtr);
std::shared_ptr<Test> sPtr2(testPtr);
```

sPtr1은 testPtr을 가리키는 shared_ptr이 자신 혼자이므로 control block을 할당 후, reference count를 1로 바꾼다. sPtr2의 경우 단순히 reference count를 2로 올리면 좋겠지만, sPtr2 입장에서는 testPtr의 reference count가 어디에 존재하는 지 알 방법이 없다. 따라서 sPtr2도 control block을 할당하게 된다. 이 경우, 각각의 shared_ptr이 소멸됨에 따라 동적 해제가 2번 발생하여 double free 에러가 발생한다.

### std::make_shared

```c++
std::shared_ptr<Test> testPtr(new Test);
```

위의 코드는 바람직한 shared_ptr 생성 방법이 아니다. 동적 할당이 `new Test`에서 한번, shared_ptr의 control block을 할당하는 데에서 한번, 즉 두 번이 발생하기 때문이다. 동적 할당은 비용이 비싼 연산이므로, 이를 줄이는 것이 좋아 보인다.

```c++
std::shared_ptr<Test> testPtr = std::make_shared<Test>();
```

`std::make_shared` 함수는 템플릿 클래스 생성자의 인자들을 받아서(위의 경우에는 없지만), 템플릿 클래스의 객체와 control block을 한 번에 동적 할당 후 shared_ptr을 리턴한다.

### 주의할 점 2 (순환 참조)

shared_ptr은 reference count를 통해 메모리 관리 부담을 줄여준다. 그런데, 객체를 더 이상 사용하지 않는데도 불구하고 reference count가 0이 될 수 없어 메모리 누수가 발생하는 경우가 있다.

```c++
#include <iostream>
#include <memory>

class CauseLeak
{
public:
	CauseLeak()
	{
		std::cout << "Constructor Called.\n";
	};

	~CauseLeak()
	{
		std::cout << "Destructor Called.\n";
	};

	void SetOther(std::shared_ptr<CauseLeak> other)
	{
		mOther = other;
	}

private:
	std::shared_ptr<CauseLeak> mOther;
};


int main()
{
	std::shared_ptr<CauseLeak> ptr1 = std::make_shared<CauseLeak>();
	std::cout << ptr1.use_count() << '\n';
	
	std::shared_ptr<CauseLeak> ptr2 = std::make_shared<CauseLeak>();
	std::cout << ptr2.use_count() << '\n';
	
	ptr1->SetOther(ptr2);
	std::cout << ptr2.use_count() << '\n';
	
	ptr2->SetOther(ptr1);
	std::cout << ptr1.use_count() << '\n';

	return 0;
}
```

```text
실행 결과

Constructor Called.
1
Constructor Called.
1
2
2
```

소멸자가 실행되지 않은 것을 알 수 있다. 이유가 뭘까?

출력에서 알 수 있듯이, 각 CauseLeak 클래스 내부에서 서로를 참조함으로써 reference count가 2가 되었다.

main 함수가 종료되면서 shared_ptr의 소멸자가 호출 되었지만, reference count가 0이 되지 않아 가리키고 있는 메모리의 해제를 하지 않는다. 즉, CauseLeak 클래스가 동적 할당된 두 공간의 메모리 누수가 발생한다.

## 2-3. weak_ptr

`weak_ptr`는 일반 포인터와 shared_ptr 사이에 있는 스마트 포인터로, 스마트 포인터처럼 객체를 안전하게 참조할 수 있게 해주지만, shared_ptr와는 다르게 reference count를 늘리지 않는다. 따라서 위에서 본 shared_ptr의 순환 참조 문제를 해결하는 데 사용할 수 있다. 

하지만 weak_ptr 역시 조심해야 할 문제가 있다. shared_ptr의 reference count가 0이 되서 메모리를 해제한 경우, weak_ptr을 통해 무작정 해당 메모리에 접근할 경우 문제가 될 수 있다. 이러한 상황을 막기 위해 `lock()` 함수를 사용한다.

```c++
#include <iostream>
#include <memory>

class Test
{
public:
	Test();
	~Test();

private:

};

Test::Test()
{
}

Test::~Test()
{
}

int main()
{
	std::weak_ptr<Test> weakPtrOutside;
	{
		std::shared_ptr<Test> sharedPtr = std::make_shared<Test>();
		std::weak_ptr<Test> weakPtr(sharedPtr); //생성자 인자로 weak_ptr 또는 shared_ptr을 받을 수 있다.
		weakPtrOutside = sharedPtr;

		std::cout << sharedPtr.use_count() << '\n';

		std::shared_ptr<Test> lockResult = weakPtr.lock();
		if (lockResult)
		{
			std::cout << lockResult.use_count() << '\n';
		}
		else
		{
			std::cout << "Already Deallocated.\n";
		}
	}

	std::shared_ptr<Test> lockResultOutside = weakPtrOutside.lock();
	if (lockResultOutside)
	{
		std::cout << lockResultOutside.use_count() << '\n';
	}
	else
	{
		std::cout << "Already Deallocated.\n";
	}


	return 0;
}
```

```text
실행 결과

1
2
Already Deallocated.
```


두 번째 출력에서 2가 나오는 이유는 `weakPtr.lock()`을 통해 shared_ptr을 하나 더 생성했기 때문이다.