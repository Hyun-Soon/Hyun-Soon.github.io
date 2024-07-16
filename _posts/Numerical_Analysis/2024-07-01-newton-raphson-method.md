---
title: \[수치해석\] 뉴턴-랩슨 방법(Newton-Raphson method)
excerpt: 뉴턴-랩슨 방법을 알아보자.
categories:
  - numerical-analysis
tags:
  - Newton-Method
  - Newton-Raphson-Method
---

# 0. Newton's method, Newton-Raphson method란?

Newton's method 및 Newton-Raphson method 라고 불리는 이 방법은 실숫값 함수의 영점을 근사하는 방법 중 하나이다.


# 1. 뉴턴-랩슨 방법의 이해

제곱근을 구하는 문제를 생각해보자. 

![Newton-Raphson_Method1](https://github.com/Hyun-Soon/Hyun-Soon.github.io/assets/66724166/4b50df00-cdbe-4552-80b6-1561a6176d63)

$$f(x)=x^2-N$$

위의 방정식에서 $f(x) = 0$이 되는 $x$값을 구하면 N의 제곱근을 구할 수 있다.

답을 모르는 상황에서 임의의 $x = a_1$에 대해 $f(a_1)$와 $f'(a_1)$를 구해보자.

![Newton-Raphson_Method2](https://github.com/Hyun-Soon/Hyun-Soon.github.io/assets/66724166/a4af5e61-ff9e-4166-bb0e-cccbbce52cc3)


$f'(a)$이 $x = a$에서 $f(x)$의 기울기임을 생각해보자.
$f(a) > 0$, $f'(a) > 0$ 일 때 $f(x) = 0$이 되는 $x$값은 $a$보다 작다는 것을 알 수 있다.

위 그림에서 $a_1$을 통해 $a_2$를 찾을 수 있고, 이런 식으로 접선을 그려 반복하면 실제 해에 가까워지는 것을 확인할 수 있다.

$$a_2=a_1-\frac{f(a_1)}{f'(a_1)}$$

$$(\because f'(a_1)=\frac{f(a_1)}{a_1-a_2})$$

<br>
이런 식으로 해에 가까운 $x$값을 찾다가 $x$의 변화량이 일정값 이하로 작아지면, 즉 $|a_1-a_2|$ < value(매우 작은 값)이 되면 $a_2$을 해로 상정한다.

즉, 뉴턴 방법(Newton's method)는 임의의 $x$값에서 접선을 그려 해당 접선과 $x$축이 만나는 곳으로 점점 x값을 옮기며 점진적으로 해를 찾는 방법이다.

# 2. 뉴턴-랩슨 방법의 제약

간단하지만 효과적인 이 방법에는 제약이 존재한다.

- 해가 없는 경우, 당연히 해를 찾을 수 없다.
- $f(x)$가 연속이고 미분 가능해야 한다.
- 해가 여러개인 경우, 뉴턴-랩슨 방법은 그 중 하나의 해를 찾아줄 뿐이며 초기값 $a_1$을 어떻게 설정하느냐에 따라 해가 달라질 수 있다.
