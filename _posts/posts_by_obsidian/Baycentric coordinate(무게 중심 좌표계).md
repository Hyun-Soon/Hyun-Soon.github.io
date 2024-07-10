---
title: Baycentric coordinate(무게 중심 좌표계)
excerpt: Interpolation, Baycentric coordinate에 대해 알아보자.
categories:
  - Graphics
tags:
  - LinearInterpolation
  - BaycentricCoordinate
  - Graphics
---
<br>
# 1. Linear Interpolation(선형 보간법)
<br>
선형 보간법(Linear Interpolation)은 양 끝점의 위치가 주어졌을 때 그 사이의 한 위치를 계산하는 방법이다.

![[Pasted image 20240710155622.png]]
[이미지 출처](https://ko.wikipedia.org/wiki/%EC%84%A0%ED%98%95_%EB%B3%B4%EA%B0%84%EB%B2%95)

2차원 공간 상의 점 $$p1(x_1, y_1), p2(x_2, y_2)$$ 사이에 있는 p의 위치를 알고 싶다고 하자.

p1과 p2 사이의 거리를 정규화하여 1로 놓으면, $$d1 = α, d2 = 1 - α(0<=α<=1)$$라고 할 수 있다.

d1의 길이가 커질수록 p는 p2에 가까워지고, d2의 길이가 커질수록 p는 p1에 가까워진다.
α를 가중치로 생각해 보면 다음과 같이 나타낼 수 있다.

$$p = (1 - α)p1 + αp2$$

<br>
# 2. Baycentric coordinate(무게 중심 좌표계)
<br>
이번엔 세 점으로 이루어진 삼각형 내의 점을 생각해 보자.

![[Pasted image 20240710162100.png]]
[이미지 출처](https://blog.naver.com/gt7461/220583985623)

1차원 직선에서 두 점 사이에 있는 점의 좌표를 직선간의 비율로 구했듯이, 2차원 평면에서 세 점 사이의 좌표를 넓이의 비율로 구할 수 있다.

삼각형 전체의 넓이를 S(= s1 + s2 + s3)라고 하면 점 A, B, C로 이루어진 삼각형 내의 점 P의 좌표는 다음과 같다.
$$P = w_a*A + w_b * B + w_c * C$$
$$ (w_a = s_2 / S, w_b = s_3 / S, w_c = s_1 / S) $$
