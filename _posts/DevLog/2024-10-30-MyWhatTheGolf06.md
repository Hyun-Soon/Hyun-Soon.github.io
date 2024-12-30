---
title: "[DevLog] Game Engine 개발일지 #06"
excerpt: Game Engine 개발일지
categories:
  - DevLog
  - MyWhatTheGolf
tags:
  - 개발일지
  - directX
  - WinAPI
---
## 1. 날짜 (Date)

2024/10/30

---

## 2. 작업 목표 (Daily Goals)

삼각형 렌더링

---

## 3. 진행 사항 (Progress)

- D3D11_INPUT_ELEMENT_DESC 생성
- Vertex Shader 구현

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)


---

## 5. 다음 단계 (Next Steps)

- Pixel Shader 구현

---

## 6. 회고 (Reflection)

- GPU 구조를 공부할 필요성을 느낀다.
- Shader 코드 짤 때, pipeline 흐름 생각하면서 짜면 실수가 줄어들 것 같다.

---

## 7. 메모 (Notes)

- `SM` : Streaming Multiprocessor. CPU에 Core가 있다면, GPU에는 SM이 있다. SM은 병렬 처리를 수행하는 GPU의 핵심 연산 장치이다. 각 SM은 수백 개 이상의 작은 코어(CPU에서의 코어와 다름)를 가지고 있으며, 동시에 다수의 스레드를 처리하여 높은 연산 성능을 제공한다. GPU의 SM의 코어는 `CUDA Core` 또는 `ALU`라고 부르기도 한다.
- `SM의 주요 기능`
	1. 스레드 그룹화 및 동기화
		SM은 스레드를 `Warp`라는 작은 그룹(일반적으로 32개)으로 관리한다. 모든 스레드는 동시에 같은 명령어를 실행하며, 동일한 메모리 영역에 접근할 수 있어 높은 연산 효율을 낸다.
	2. 병렬 연산 지원
		SM의 각 코어는 정수 연산, 부동소수점 연산 등을 담당한다. 병렬 처리로 인해 다수의 데이터 요소에 대한 계산을 동시에 수행할 수 있어, 특히 영상 처리나 신경망 훈련에 큰 성능 향상을 제공한다.
	3. 레지스터 및 공유 메모리
		SM은 각 스레드가 사용하는 레지스터와 여러 스레드가 함께 사용하는 shared memory를 가지고 있다. 공유 메모리는 낮은 대기 시간으로 데이터에 접근할 수 있어 스레드 간 데이터 교환이 원활하다.
	4. SIMD(Single Instruction, Multiple Data)
		SM은 동일한 명령어를 여러 데이터에 적용하는 SIMD 방식을 채택해 높은 성능을 유지한다.

- `CPU vs SM`
	- CPU Core : 낮은 지연 시간과 고속 처리를 위해 설계되었다. 복잡한 연산과 논리 제어를 빠르게 수행할 수 있도록 고성능 메모리 계층과 고급 제어 유닛을 갖추고 있다.
	- GPU의 SM의 Core : GPU의 코어는 대규모 병렬 연산을 처리하는 데 최적화되어 있다. 개별 코어는 단순하지만 동시에 수많은 코어가 병렬로 작업을 수행해 고속 처리가 가능하다.

- `D3D11_INPUT_ELEMENT_DESC` : VertexShader에 들어오는 각 input의 구조를 설명하는 구조체.

---

