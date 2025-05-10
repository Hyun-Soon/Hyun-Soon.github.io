---
title: \[C++\] nullptr에 ->(멤버 접근 연산자)를 사용하면 무조건 segmentation fault가 발생할까?
excerpt: this 포인터와 non-static 멤버 함수가 호출되는 과정을 이해해보자.
categories:
  - Cpp
tags:
  - Cpp
  - Compile
  - Function
---
# 0. non-static(비정적) 멤버 함수의 컴파일 과정

비정적 멤버 함수가 컴파일되는 과정을 살펴 보자.

```c++
class Test
{
public:
	void FuncUsingA()
	{
		std::cout << a << '\n';
	}

	void FuncNotUsingA()
	{
		std::cout << "hello\n";
	}

private:
	int a = 42;
};

int main()
{
	Test* t = nullptr;
	t->FuncUsingA(); // 실제로는 Test::FuncUsingA(Test* this)처럼 동작
	t->FuncNotUsingA();
	return 0;
}
```

컴파일러는 non-static 멤버 함수를, this를 첫번째 인자로 받는 함수 호출 코드 형태로 변환한다. 즉, `t->FuncUsingA()`는 `Test::FuncUsingA(t)`, `t->FuncNotUsingA()`는 `Test::FuncNotUsingA(t)`로 변환된다. 멤버 함수가 실행되면서 실제 객체의 멤버 변수를 참조해야할 수 있으니, 실제 객체의 주소(this pointer)를 넣어주는 것이다. 함수를 실행하는 과정에서 실제 멤버 변수의 값이 필요하면 이 this포인터를 통해 값을 참조한다.


# 1.  non-static 멤버 함수가 실행되는 과정

이제 멤버 함수가 실행되는 과정을 생각해 보자.
위의 예시 코드에서 `t`에 `nullptr`을 넣어줬으므로, 각각 `FuncUsingA(nullptr)`, `FuncNotUsingA(nullptr)`를 거쳐 실행코드(기계어)로 만들어졌을 것이다.

`FuncUsingA`를 먼저 살펴보자. 멤버 변수 `a`의 값을 출력해야 하기 때문에, 인자로 전달받은 this 포인터를 참조하여 a의 값을 찾으려고 할 것이다. 이 때, this 포인터가 nullptr이기 때문에 segmentation fault가 발생한다.

`FuncNotUsingA`는 어떨까? nullptr로 된 this 포인터를 전달받긴 하나, 멤버 변수를 참조할 일이 없으므로 this 포인터를 참조하지 않는다. 따라서 `nullptr->FuncNotUsingA`처럼 사용했음에도 segmentation fault가 발생하지 않는다. 하지만, 동작한다고 하더라도 이는 Undefined Behavior에 해당하기 때문에 사용하지 않는 것이 바람직하다.