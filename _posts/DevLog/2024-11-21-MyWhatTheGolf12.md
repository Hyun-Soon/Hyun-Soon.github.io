---
title: "[DevLog] Game Engine 개발일지 #12"
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

2024/11/21

---

## 2. 작업 목표 (Daily Goals)

주요 클래스 구현

---

## 3. 진행 사항 (Progress)

Object 클래스 구현
shader에서 사용하는 구조체 ShaderData.h에 분리
DirectXManager::Render() 구현 중

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)


---

## 5. 다음 단계 (Next Steps)

DirectXManager::Render()에서 VertexConstantBuffer 업데이트하기

---

## 6. 회고 (Reflection)

환절기 알레르기 미치겠다. 

DirectXManager의 device에서 리소스를 만들 때, Object 클래스의 많은 정보들을 getter로 받아서 사용하고 있다. getter가 너무 많은데, 좀 더 깔끔한 방법이 없을까?
CreateBuffer의 경우, ComPtr::GetAddressOf()를 CreateBuffer 함수 인자 전달하는 곳에서 실행하면 잘 동작하는데, GetAddressOf를 다른 곳에서 실행 후 결과를 받아서 전달하면 호환이 안된다. 그래서 ComPtr\<ID3D11Buffer\>를 레퍼런스로 받아서 GetAddressOf를 실행하고 있는데, 이렇게 하면 getter에서 const를 붙일 수 없기 때문에 안전하지 않아 보인다.

VertexConstantBuffer 생성을 최대한 안하고 싶어서 DirectXManager에 하나만 만들어놓고, 각 Object가 같은 형식의 ConstantData를 이 버퍼에 업데이트 후 사용하려고 했다. 그런데 물체들은 대부분 안움직이는 경우가 많으로, 각각의 Object가 VertexConstantBuffer를 가지고 있으면 GPU에 데이터를 업데이트할 필요 없이 그대로 사용하면 된다. 글을 쓰다 보니 이게 더 효율적인 것 같다. 오브젝트가 많은 게임도 아니니 이렇게 구현해야겠다.

---

## 7. 메모 (Notes)

- `D3D11_SUBRESOURCE_DATA`의 pSysMem에 ConstantBuffer에서 필요한 구조체 변수의 주소를 넘겨주고, `D3D11_BUFFER_DESC`에서 구조체의 크기를 넘겨줬는데, 왜 CreateBuffer() 실행 후 바로 Map/Unmap을 통해 데이터를 또 넘겨주는지 이해를 못했다.
	- Map/Unmap을 하지 않아도 처음 CreateBuffer()를 실행했을 때 구조체의 데이터가 GPU에 전달되어 있다. Map/Unmap은 버퍼 데이터를 업데이트할 때 사용하면 된다.

- `클래스 멤버 초기화` vs `생성자 초기화 리스트`
	1. 멤버 초기화 방식
		```c++
		class MyClass
		{
		    DirectX::SimpleMath::Vector3 mPosWorld = { 0.0f, 0.0f, 0.0f };
		};

		```
		- 멤버의 기본값이 모든 생성자에서 동일할 때
		- 코드의 가독성을 높이고 싶을 때

	2. 생성자 초기화 리스트
		```c++
		class MyClass
		{
		public:
		    MyClass() : mPosWorld(0.0f, 0.0f, 0.0f) {}
		};

		```
		- 생성자마다 다른 기본값을 사용하고 싶을 때
		- 멤버 변수에 `const` 또는 `reference`가 있을 때
		- 복잡한 초기화 로직이 필요할 때

- `MACRO` vs `using`
	- `\#define`은 전처리기에 의해 단순히 텍스트 치환되므로 빠르고 간단하다. 하지만 컴파일러가 타입 체크를 수행하지 못하므로, 잘못된 타입 전달이 런타임 에러를 유발할 수 있다.
	- `using`은 실제 타입을 컴파일러가 이해하므로 타입 체크를 수행하여 안전하다.

- `Blob` : DirectX에서 데이터를 저장하거나 관리하는 데 사용하는 인터페이스 객체이다. 주로 쉐이더 코드 컴파일 결과(바이트코드)를 저장하는 용도로 사용된다.

---

