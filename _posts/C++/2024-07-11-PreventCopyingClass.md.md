---
title: \[C++\] 클래스의 복사를 막는 방법
excerpt: 컴파일러가 자동으로 생성하는 복사 생성자, 복사 할당 연산자를 제한하는 방법을 알아보자
tags:
  - Cpp
categories:
  - Cpp
---
```c++
class TempClass {};

int main()
{
	TempClass a;
	TempClass b(a); // copy constructor
	TempClass c = a; // copy assignment operator
}
```

copy constructor와 copy assignment operator가 선언되어있지 않은 클래스 `TempClass`가 있다. 하지만 main문에서 TempClass의 copy constructor와 copy assignment operator를 호출하고 있기 때문에, 컴파일러는 이를 알아서 정의해 버린다. 따라서 구현하지 않는다고 해서 클래스의 복사를 막을 수는 없다. 그렇다면 어떻게 복사를 막을까?

이들을 private으로 정의하는 방법을 먼저 떠올릴 수 있을 것이다. 클래스 밖에서 TempClass를 복사하려고 할 때 private으로 되어 있으면 호출이 불가능하다. 그러나 여전히 클래스의 멤버 함수나 friend 함수가 호출할 수 있는 위험이 있다. 이런 위험까지 방지하려면 private에 선언만 해놓으면 된다.

```c++
class TempClass
{
	private:
		TempClass(const TempClass& other);
		TempClass& operator=(const TempClass& other);
};
```

copy constructor와 copy assignment operator가 선언이 되어 있기 때문에 컴파일러가 이들을 생성하지는 않지만, 구현부가 없기 때문에 링크 과정에서 에러가 발생할 것이다.

🔔 **링크 과정에서 에러가 발생하는 이유**<br>
컴파일러는 코드를 어셈블리어로 바꿔주는 역할을 한다. 이 때, 컴파일러가 굳이 다른 소스 파일의 구현까지 자세히 알 필요는 없기 때문에 컴파일 과정에서는 문제가 발생하지 않는다. 하지만 object file들을 연결하며 하나의 프로그램을 만드는 링크 과정에서는 실제의 동작을 알아야 하기 때문에 구현이 없는 경우 에러가 발생한다.
{: .notice--primary}

에러 시점을 링크 과정이 아닌 컴파일 과정으로 앞당기고 싶다면 부모 클래스를 활용해야 한다.
```c++
class Uncopyable
{
	protected:
		Uncopyable() {}
		~Uncopyable() {}

	private:
		Uncopyable(const Uncopyable& other);
		Uncopyable& operator=(const Uncopyable& other);
};

class TempClass : private Uncopyable { ... };
```

위 코드에서 Uncopyable 클래스를 TempClass에서 상속 받는다. copy constructor, copy assignment operator가 없는 TempClass에 대해 컴파일러가 이들을 생성할 때, 부모 클래스의 것들과 호환이 되도록 생성하려고 할 것이다. 하지만 부모클래스에서 이들이 private으로 선언되어 있기 때문에 TempClass에서는 접근할 방법이 없고, 결국 컴파일러가 에러를 뱉게 된다.
