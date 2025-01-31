---
title: "[DevLog] Maplestory 모작 개발일지 #10"
excerpt: Maplestory 모작 개발일지
categories:
  - DevLog
  - GameEngine
  - WinAPI
  - Maplestory
tags:
  - 개발일지
  - WinAPI
  - Maplestory
---
## 1. 날짜 (Date)

2025/01/31

---

## 2. 작업 목표 (Daily Goals)

- Resource, Resources 클래스 구현
- Texture 클래스 구현

---

## 3. 진행 사항 (Progress)

- 작업 목표 구현 완료
- 구조 리팩토링(엔진 코드와 게임 코드의 결합도 제거) 중

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)



---

## 5. 다음 단계 (Next Steps)

리팩토링(엔진 코드와 게임 코드의 결합도 제거)

---

## 6. 회고 (Reflection)

Destructor 호출 순서를 테스트하다가 이상한 점을 발견했다.

```c++
#include <iostream>
#include <vector>

using namespace std;

class test2
{
public:
test2();
~test2();
};
  
test2::test2()
{
}

test2::~test2()
{
	cout << " test2 destructor called\n";
}

class test
{
private:
	string mName;

public:
	vector<test2> mVec;
	test();
	~test();
};

test::test()
{
}

test::~test()
{
	cout <<"test destructor called.\n";
}

int main()
{
	test v;

	{
		test2 c;
		test2 d;
		
		v.mVec.push_back(c);
		v.mVec.push_back(d);
		
		cout << "out\n";
	}

return 0;
}
```

위 코드를 실행했는데, 결과가 아래와 같았다.

```text
╰─ ./a.out     
 test2 destructor called
out
 test2 destructor called
 test2 destructor called
test destructor called.
 test2 destructor called
 test2 destructor called
```

내 생각대로라면 `test2`의 destructor가 4번 호출되어야 하는데, 출력을 보면 out 위에 destructor가 한번 더 호출되었다.
원인은 std::vector의 초기 메모리 할당이었다. 나는 컴파일러를 g++을 사용했는데, g++은 vector의 capacity를 지정해주지 않을 경우 초기값을 0으로 설정한다고 한다. 따라서 위에서 1번의 push_back을 실행했을 때, capacity를 1로 늘리고, c를 복사 생성한다. 이후 한번의 push_back이 추가로 실행됐을 때, capacity를 2배로 늘려 할당하고 기존의 메모리에 들어있던 값들을 복사해온다. 이 과정에서 원래 메모리의 해제와 함께 기존에 복사생성된 c의 destructor가 호출된다. 따라서 결과적으로 destructor가 5번 호출되었던 것이다.


---

## 7. 메모 (Notes)


---

