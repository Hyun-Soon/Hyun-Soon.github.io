---
title: \[Effective C++\] C++가 은근슬쩍 만들어 호출해 버리는 함수들에 촉각을 세우자
excerpt: Effective C++ 항목 05 정리
categories:
  - Cpp
tags:
  - Cpp
  - Cplusplus
  - EffectiveCplusplus
---
<br>
# 1. C++가 은근슬쩍 만들어 호출해 버리는 함수들에 촉각을 세우자
<br>
C++ 컴파일러는 빈 클래스를 훑고 지나갈 때 기본 생성자, 복사 생성자, 복사 대입 연산자, 소멸자를 생성한다. 이들은 모두 inline 함수이고, public이기 때문에 우리가 의도하지 않은 대로 동작할 수 있는 가능성이 생긴다.

예를 들어,
```c++
class Empty{};
//위의 코드는
//아래의 코드와 같다.
class Empty
{
	public:
		Empty() {...};
		Empty(const Empty& rhs) {...};
		~Empty() {...};
		Empty& operator=(const EMpty& rhs) {...};
}
```

물론 컴파일러가 이들이 꼭 필요하다고 판단할 때만 만들어지지만, 조건이 그리 대단한 것도 아니다.

```c++
Empty e1; //기본 생성자, 소멸자
Empty e2(e1); //복사 생성자
e2 = e1; //복사 대입 연산자
```

소멸자는 해당 클래스가 상속받은 기본 클래스의 소멸자가 가상 소멸자로 되어 있지 않으면 역시 비가상 소멸자로 만들어진다.

생성자의 경우, 인자를 받는 생성자가 클래스 안에 선언이 되어 있으면 컴파일러는 기본 생성자를 만들지 않는다. 즉, 인자를 받지 않는 생성자를 컴파일러가 눈치 없이 만들어서 우리의 의도가 무산될 걱정은 하지 않아도 된다.
```c++
template<typename T>
class NameObject
{
	public:
		NameObject(const char* name, const T& value);
		...
		//이런 경우에 컴파일러는 NameObject() {...}를 만들지 않는다.
}
```

이번엔 복사 대입 연산자에 대해 생각해보자.

```c++
template<class T>
class NameObject
{
	public:
		NameObject(std::string& name, const T& value);
		//oprator=은 선언되어 있지 않다.

	private:
		std::string& nameValue;
		const T objectValue;
}

int main()
{
	std::string newDog("DooBoo");
	std::string oldDog("BangWool");

	NameObject<int> p(newDog, 2);
	NameObject<int> s(oldDog, 36);

	p = s;
	return 0;
}
```


위 코드의 `p = s`에서  어떤 일이 발생할까?
reference는 원래 자신이 참조하고 있는 것과 다른 객체를 참조할 수 없기 때문에 p.nameValue가 s.nameValue가 참조하는 객체를 가리키도록 바뀌는 것은 불가능하다. 그렇다면 p.nameValue가 참조하는 string 객체 자체가 바뀌는 게 맞을까? 이 역시도 해당 string을 참조하거나 포인터를 갖고 있는 다른 객체에 영향을 주기 때문에 적절한 방식이 아니다.

이런 문제들에 대해, C++는 시원하게 컴파일을 거부해버린다. 따라서 reference를 데이터 멤버로 갖고 있는 클래스에 대해 대입 연산을 지원하려면 직접 복사 대입 연산자를 정의해줘야 한다. objectValue처럼 데이터 멤버가 상수인 경우에도 컴파일러가 비슷하게 동작한다.

상속 받는 기본 클래스가 복사 대입 연산자를 private로 선언해 놓은 경우, 자식 클래스는 암시적 복사 대입 연산자를 가질 수 없다. 자식 클래스에서 호출할 권한이 없기 때문에 이 역시 컴파일러가 거부해 버리기 때문이다.

🔔 컴파일러는 경우에 따라 클래스에 대해 기본 생성자, 복사 생성자, 복사 대입 연산자, 소멸자를 암시적으로 만들어 놓을 수 있다.
{: .notice--primary}