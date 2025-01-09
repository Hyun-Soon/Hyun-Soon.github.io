---
title: "[DevLog] Game Engine 개발일지 #07"
excerpt: Game Engine 개발일지
categories:
  - DevLog
  - GameEngine
  - DirectX11
tags:
  - 개발일지
  - directX
  - WinAPI
---
## 1. 날짜 (Date)

2024/11/11

---

## 2. 작업 목표 (Daily Goals)

삼각형 렌더링

---

## 3. 진행 사항 (Progress)

삼각형 렌더링 성공

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- View 행렬을 단위 행렬로 설정
	- MVP에서 View Matrix를 DirectX::SimpleMath::Matrix() 기본 생성자로 넣어놨음. 단위행렬이라 변환에 영향이 없어서 잘 보일 줄 알았는데, 렌더링 되지 않음. CreateLookAt() 함수를 사용하여 해결.


---

## 5. 다음 단계 (Next Steps)

- Visual Studio 2022 Graphics debugger 무한 로딩 원인 찾기
- vertex 위치가 y축 기준으로 반전되는 문제 원인 찾기(directX는 row-major, hlsl은 column-major이므로 shader에 matrix 넘길 때, transpose 해줘야 함. 이걸 안해서 생기는 문제인 것 같다)
- Viewport의 minDepth = 0.0f, maxDepth = 1.0f로 설정했는데, vertex의 위치가 0.0f에 가깝거나, 0.9f를 넘어가도 렌더링되지 않는 이유 찾기.
- 3D object 찾아보기

---

## 6. 회고 (Reflection)

앞으로 여러 오브젝트를 렌더링하게 될텐데, 각 오브젝트의 특징에 따라 Vertex 구조체와 Constant buffer에 담길 정보들이 달라져야 할 수도 있다. vertices, indices, texture, buffer 등을 오브젝트 클래스의 멤버로 놓고 각자 렌더링하는 방식이 좋을까? 더 효율적인 방법이 있을지 고민해보자. 분위기를 통일성 있게 렌더링하면 굳이 다르지 않아도 될 것 같기도 하다.

---

## 7. 메모 (Notes)

- `Matrix order`
	- DirectX : Row-Major
	- HLSL : Column-Major
- `Map과 Unmap` : DirectX3D 11에서 GPU 리소스를 CPU에서 수정하려면 일시적으로 해당 리소스를 맵핑해야 한다. 구조체 `D3D11_MAPPED_SUBRESOURCE`는 Map 함수 호출 시 얻은 CPU 메모리 포인터를 저장하여 데이터를 GPU 리소스에 쓸 수 있도록 한다. 아래의 코드에서, GPU의 constantBuffer(ID3D11Buffer 타입)를 CPU에서 접근할 수 있도록 잠금 상태로 설정한다. Map 함수가 성공적으로 실행되면 ms.pData는 CPU에서 직접 접근할 수 있는 메모리 위치를 가리키게 된다. 이후 memcpy를 통해 GPU의 constantBuffer 메모리로 데이터를 전송하고 Unmap으로 맵핑을 해제한다.
```c++
D3D11_MAPPED_SUBRESOURCE ms;
context->Map(constantBufferPtr, ...);
memcpy(ms.pData, ...);
context->Unmap(...);
```

---

