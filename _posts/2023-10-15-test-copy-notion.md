---
title: "Makefile"
excerpt: "의존성 관리 및 빌드 과정을 편하게 해주는 Makefile에 대해 알아보자."
categories: [42Seoul]
tags: [42Seoul, Makefile]
---
    
## Make란?
"의존성 관리" 기능을 갖춘 빌드 도구.  

**의존성 관리**
---

빌드 과정에서 의존성에 따른 빌드 순서는 무척 중요하다.
a.c로 a.o를 만들고, a.o로 a.out을 만드는 상황을 가정하자.
여기서 a.out은 a.o에, a.o는 a.c에 의존성이 있다고 할 수 있다.

![a](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3f306945-3f5d-41a7-8e01-2ad3953ed329/Untitled.png)

만약 의존성 그래프가 아래와 같이 복잡해지면 어떨까?

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fc0d1c94-9a0a-47d7-b363-a89b3d0f00b6/Untitled.png)

test를 수행하기 위해 순서를 잘 지키면서 과정을 따라가야 한다.
make는 규칙을 정의하면 그 규칙에서 적절한 작업 순서를 찾아서, 그 순서대로 작업을 수행한다.
이것을 “의존성 관리”라고 한다.

**증분 빌드**

이전 그림에서 ft_a.c와 testee_sub2.c가 바뀌면 그 변경사항을 test에 어떻게 반영해야 할까?

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/24b595e8-a2b1-4e60-94c4-4bc7b6341778/Untitled.png)

의존성 그래프에서 변경사항을 추적해서 변경이 필요한 것들만 다시 만들면 된다.
하지만 이 과정은 두통을 유발할 수 있다.
make는 규칙을 잘 정의하면 무언가가 변경되었을 때, 변경이 필요한 것들만 다시 만들어준다.
이것을 “증분 빌드”라고 한다.

</aside>

## Makefile

<aside>
💡 **makefile이란?**

linux상에서 반복적으로 발생하는 컴파일을 쉽게하기 위해서 사용하는 make 프로그램의 설정 파일.
make가 규칙을 정의하면 변경이 필요한 것만 만들어 주는 프로그램이라면,
Makefile은 그 규칙을 정의하는 파일이다.

</aside>

<aside>
💡 **규칙**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/14460adf-0d07-4b4e-98ae-a4745eb121d8/Untitled.png)

여기서 a.c는 사람이 직접 만들 파일이므로 a.c를 만드는 규칙은 필요하지 않다.
이 경우에는 아래의 두 가지 규칙을 필요로 한다.

1. a.c를 컴파일해서 a.o를 만드는 규칙

- 의존성 : a.c
- 만드는 법 : cc -c a.c
1. a.o를 링킹해서 a.out을 만드는 규칙
- 의존성 : a.o
- 만드는 방법 : cc a.o -o a.out

이를 Makefile 문법으로 나타내면 다음과 같다.

```makefile
a.o: a.c
	cc -c a.c
a.out: a.o
	cc a.o -o a.out
```

우선 (만들 파일1) (만들 파일2) …: (의존성1) (의존성2) … 처럼 의존 관계를 정의하고, 다음 줄부터 만드는 방법을 한 줄씩 탭으로 들여쓰기 해서 차례대로 쓰면 된다.

---

**변수**

같은 이름을 여러번 쓰는 것은 좋지 않다.
****예를 들어 특정 파일의 이름을 여러번 쓴다면, 파일 이름이 바뀔 때마다 그 파일 이름을 쓴 모든 곳을 수정해야 하고, 그 중 한 곳이라도 수정하는 것을 잊으면 제대로 동작하지 않을 수 있다.
이런 문제를 줄이기 위해 변수를 사용한다.

변수는 변수명 = 값 으로 정의하고, $(변수명)으로 사용할 수 있다.

```makefile
#변수 정의
CC = cc
A_C = a.c
A_O = a.o
TARGET = a.out

#변수 사용
$(A_O): A_C
	$(CC) -c $(A_C)
$(TARGET): $(A_O)
	$(CC) $(A_O) -o $(TARGET)
```

이렇게 변수를 정의해두면 파일명이나 컴파일러가 바뀌어도 그 파일명이나 컴파일러가 쓰인 모든 곳을 바꿀 필요 없이 변수를 정의한 곳만 바꾸면 된다.

---

**자동 변수, 패턴 규칙**

위처럼 모든 파일마다 규칙을 만들어야 한다면 Makefile을 쓰더라도 길이가 매우 길어질 것이다.

다행히 (gnu make에는) 규칙에 패턴을 지정할 수 있다.

하지만 패턴에 대해 알아보기 전에 자동 변수를 먼저 간단히 알아보자.

자동 변수는 규칙 안에서 사용할 수 있는, 그때그때 자동으로 만들어지는 변수이다.

ex.

- $@ : 만들려는 파일 이름
- $< : 의존성 중 첫번째
- $^ : 모든 의존성
- $? : 현재의 목표 파일보다 최근에 갱신된 의존성의 이름들
- …

```makefile
a.o: a.c
	cc -c $<
a.out: a.o
	cc $^ -o $@
```

패턴 규칙(pattern rule)은 반복되는 패턴을 하나의 규칙으로 단순화시킬 때 사용된다.
패턴 규칙에서는 wildcard(%)가 사용된다. %는 어떠한 것과도 매치될 수 있다.

이런 자동 변수와 패턴을 결합하면 여러 파일에 대한 규칙을, 규칙 하나로 커버할 수 있게 된다.

```makefile
EXECUTABLE_TARGETS = a.out

%.o: %.c            //%.o가 foo.o라면 %.c도 foo.c가 된다.
	cc -c $<
$(EXECUTABLE_TARGETS):
	cc $^ -o $@
a.out: a.o
```

---

**내장 변수, 내장 규칙**

GNU Make에는 많은 변수와 규칙이 내장되어있다.

make -p 명령어로 내장 변수와 내장 규칙을 확인할 수 있다.

- 자주 쓰이는 내장 변수
    - CC : C 컴파일러. 기본값은 cc
    - CFLAGS : C 컴파일러 플래그
    - CXX : C++ 컴파일러. 기본값은 c++
    - CXXFLAGS : C++ 컴파일러 플래그
    - LDFLAGS : 링커 플래그
    - CPPFLAGS : C 전처리기 플래그. C와 C++에 모두 사용
    
- 내장 규칙
    
    ```makefile
    %.o: %.c
    	$(CC) $(TARGET_ARCH) $(CPPFLAGS) $(CFLAGS) -o $@ -c $<
    %.o: %.cpp
    	$(CXX) $(TARGET_ARCH) $(CPPFLAGS) $(CXXFLAGS) -o $@ -c $<
    %: %.o
    	$(CC) $(TARGET_ARCH) $(LOADLIBES) $(LDLIBS) $(LDFLAGS) -o $@ $^
    ```
    
    이런 내장 규칙을 활용해서 Makefile의 길이를 쉽게 줄일 수 있다.
    
    ---
    
    **.PHONY 규칙**
    
    무언가를 만들려는 건 아니지만 자주 쓰는 명령어를 make에 alias처럼 등록해서 쓸 수 있다.
    
    ```makefile
    clean:
    	rm -f *.o
    ```
    
    하지만 이렇게 쓰는 경우에는 clean이라는 파일이 있으면 make clean이 아무것도 실행하지 않는다.
    
    이런 문제를 해결하기 위해 clean을 가짜를 의미하는 .PHONY 타겟으로 지정할 수 있다.
    
    ```makefile
    .PHONY: clean
    clean:
    	rm -f *.o
    ```
    
    이렇게 clean을 .PHONY 타겟으로 지정하면 clean이라는 파일이 있어도 make clean이 의도대로 동작한다.
    
    ---
    
    **매크로 치환(Macro substitution)**
    
    필요에 의해 매크로의 내용을 조금 바꾸어야 할 때가 있다. 매크로 내용의 일부만 바꾸기 위해서는 $(MACRO_NAME:OLD=NEW)와 같은 형식을 이용하면 된다.
    
    ```makefile
    MY_NAME = Michael Jackson
    YOUR_NAME = $(NAME: Jack=Jook)
    ```
    
    위의 예제에서는 Jack이란 부분이 Jook으로 바뀌게 된다. 즉 YOUR_NAME이란 매크로의 값은 Michael Jookson이 된다.
    
    ```makefile
    OBJS = main.o read.o write.o
    SRCS = $(OBJS:.o=.c)
    ```
    
    **(*****OBJS : .o = .c처럼 예쁘게 쓰려고 띄어쓰지 말자. 띄어쓰면 변환안돼서 개고생한다..)**
    
    위의 예제에서는 OBJS에서 .c가 .o로 바뀌게 된다. 즉 아래와 같다.
    
    ```makefile
    SRCS = main.c read.c write.c
    ```
    
</aside>

## **📬 Reference**
[GNU Make 강좌](http://doc.kldp.org/KoreanDoc/html/GNU-Make/GNU-Make.html#toc3)