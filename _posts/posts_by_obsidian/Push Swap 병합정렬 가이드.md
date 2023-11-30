---
title: Push Swap 병합정렬 가이드
excerpt: 병합 정렬로 Push Swap을 해결해보자.
categories:
  - 42Seoul
tags:
  - 42Seoul
  - Push_Swap
  - Merge_sort
---
# 0. 과제 설명
	Stack A, Stack B가 있는 상황에서 Stack A에 숫자가 랜덤으로 들어온다. 주어진 명령어를 최소한으로 사용하여 Stack A에 숫자들을 오름차순으로 정렬한다.

<br>
<br>

# 1. 명령어

- `sa` : stack A의 맨 위 2개 요소의 위치를 바꾼다.
- `sb` : stack B의 맨 위 2개 요소의 위치를 바꾼다.
- `ss` : sa와 sb를 동시에 실행한다.
- `pa` : stack B 맨 위 1개 요소를 stack a의 맨 위로 옮긴다.
- `pb` : stack A 맨 위 1개 요소를 stack b의 맨 위로 옮긴다.
- `ra` : stack A의 요소들을 위로 한칸씩 올리고, 맨 위의 요소는 바닥으로 보낸다.
- `rb` : stack B의 요소들을 위로 한칸씩 올리고, 맨 위의 요소는 바닥으로 보낸다.
- `rr` : ra와 rb를 동시에 실행한다.
- `rra` : stack A의 요소들을 아래로 한칸씩 내리고, 맨 밑의 요소는 맨 위로 보낸다.
- `rrb` : stack B의 요소들을 아래로 한칸씩 내리고, 맨 밑의 요소는 맨 위로 보낸다.
- `rrr` : rra와 rrb를 동시에 실행한다.
</br>
</br>
# 2. Push Swap 병합 정렬

병합 정렬은 분할 정복 알고리즘의 하나로, 최악의 경우와 최선의 경우가 많이 차이 나지 않는 안정 정렬에 속한다.

stack a에 다음 그림과 같이 100개의 정렬되지 않은 숫자가 들어온다고 가정하자.

![[Pasted image 20231127003216.png]]

우리의 목표는 결과를 아래와 같이 만드는 것이다(stack A가 정렬됐다고 가정하고, 숫자의 크기에 비례하게 가로 길이를 표현해서 추상적으로 삼각형을 표현했다).

![[Pasted image 20231127002730.png]]

stack A에 위 그림과 같이 오름차순으로 쌓기 위해서는 큰 수부터 stack A에 쌓아야 하고, 적은 명령어로 stack A에 숫자를 쌓을 수 있는 위치로는 stack A의 bottom(`rra` 명령어를 사용), stack B의 top(`pa`), 그리고 stack B의 bottom(`rrb` + `pa`) 이렇게 3가지가 있다.

stack A에 하나의 정렬된 큰 삼각형을 만들기 위해, 그리고 최대한 명령어의 개수를 줄이기 위해 3 방향(stack A의 bottom, stack B의 top, stack B의 bottom)에서 병합을 실행할 것이다.

정방향(오름차순) 삼각형을 stack A에 만들기 위해서 stack A bottom, stack B top, stack B bottom에서 병합을 진행할 때, 각 위치에 존재하는 숫자들은 필요에 맞게 정렬되어 있어야 한다. 아래 그림을 보자.

![[Pasted image 20231130134131.png]]

stack A top에 정방향 삼각형을 만들기 위해 접근이 가장 빠른 stack A bottom, stack B bottom, stack B top에서 끝값들을 비교해 큰 순서대로 stack A에 값을 쌓아줬다. 각각의 작은 3개의 삼각형이 모두 사라질 때까지 반복하면 큰 정방향 삼각형을 만들 수 있다. 그렇다면 작은 3개의 삼각형은 어떤 삼각형을 합쳐야 만들 수 있을까? 

![[Pasted image 20231130140141.png]]

위 공식을 이용하면 다음과 같이 재귀적으로 stack A에 정방향 삼각형을 만들 수 있다.

![[Pasted image 20231130143847.png]]
