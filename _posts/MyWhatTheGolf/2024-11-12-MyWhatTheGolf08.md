---
title: "[DevLog] What The Golf 모작 개발일지 #08"
excerpt: What The Golf 모작 개발일지
categories:
  - DevLog
  - MyWhatTheGolf
tags:
  - 개발일지
  - directX
  - WinAPI
---
## 1. 날짜 (Date)

2024/11/12

---

## 2. 작업 목표 (Daily Goals)

- Visual Studio Graphics Debugger 무한 로딩 원인 찾기
- Viewport의 MinDepth, MaxDepth / XMMatrixPerspectiveFovLH의 nearZ, farZ 개념 정리하기
- 삼각형 렌더링 과정에서 겪었던 문제들 원인 찾기

---

## 3. 진행 사항 (Progress)

- 목표 해결

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- Visual Studio Graphic Debugger 무한 로딩 이유
	- swapChain->Present() 함수를 한번만 실행해서, frame의 업데이트가 없어서 debugger가 새로운 프레임을 무한히 기다리며 무한 로딩이 걸리는 것 같다. swapChain->Present()를 무한 루프에 넣어서 실행했더니 해결됐다.
- `Viewport`의 `MinDepth`, `MaxDepth`를 조절해서 삼각형을 범위 안에 넣어도 렌더링되지 않았던 이유
	- Viewport의 MinDepth, MaxDepth는 NDC로 정규화할 때의 깊이의 최솟값과 최댓값을 의미한다. 렌더링되는 z값의 범위를 조절하려면 `XMMatrixPerspectiveFovLH`의 `nearZ`, `farZ`을 바꿔줘야 한다.
- vertex의 index 순서
	- vertex의 index 순서를 보는 방향 기준 왼손으로 감는 방향(시계 방향)이 아닌, 오른손으로 감는 방향(반시계 방향)으로 설정해줘서 렌더링되지 않았다(`D3D11_RASTERIZER_DESC`의 `CullMode`가 `D3D11_CULL_BACK`인 상황).
- View 행렬 함수
  - `XMMatrixLookAtLH()`와 `XMMatrixLookToLH()`로 View 행렬을 구성했을 때는 렌더링이 잘 되는데, `CreateLookAt()`함수로 View 행렬을 구성했을 때는 렌더링이 되지 않는다. Graphics Debugger를 실행했을 때, XMMatrix 함수들은 View 행렬이 단위행렬인 반면, CreateLookAt() 함수는 아예 DrawIndexed()조차 실행되지 않았다. XM 함수들은 DirectX::XMMatrix를 반환하고, CreateLookAt 함수는 DirectX::SimpleMath::Matrix를 반환한다. 검색결과 상호간에 변환이 자유롭게 되는 것 같은데 무엇이 문제인지 더 찾아봐야겠다. 왜 DrawIndexed()조차 실행되지 않았는지 생각해보자.

---

## 5. 다음 단계 (Next Steps)

- 3D 에셋 찾아보기
- 3D 에셋 렌더링하기

---

## 6. 회고 (Reflection)

14시간 동안 공부하느라 고생했다. 아쉬운 점은, 천천히 코드를 살펴보면서 의미를 살폈으면 더 빠르게 해결할 수 있지 않았나 싶다. 답답할 땐 억지로 앉아 있지 말고 잠깐 산책이나 다녀오자.

---

## 7. 메모 (Notes)

---

