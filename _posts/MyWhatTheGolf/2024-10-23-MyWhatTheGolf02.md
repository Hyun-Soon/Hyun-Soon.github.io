---
title: \[DevLog\] What The Golf 모작 개발일지 \#02
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

2024/10/22

---

## 2. 작업 목표 (Daily Goals)

DirectX 초기화

---

## 3. 진행 사항 (Progress)

- dirverType 설정
- device, context, swapChain 생성
- viewport, rasterizer description 설정

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- `LNK2019 unresolved external symbol D3D11CreateDevice` : 헤더 파일은 포함했지만 Direct3D 11 라이브러리가 링커에 제대로 연결되지 않았기 때문에 에러 발생. D3D11CreateDevice 함수는 d3d11.lib라는 라이브러리 파일에 정의되어 있다. 이를 링커에 추가해줘야 한다.
	1. Project > MyWhatTheGolf Properties > Linker > Input
	2. Additional Dependencies에 `d3d11.lib` 추가

---

## 5. 다음 단계 (Next Steps)

- DirectX 초기화하기
- 화면에 삼각형 렌더링하기

---

## 6. 회고 (Reflection)

- 강의를 열심히 들어놔서 초반은 무난하게 진행되고 있다.

---

## 7. 메모 (Notes)

- `device` : GPU에 접근하고, DirectX 리소스(버퍼, 셰이더, 텍스처 등)를 생성하는 데 필요한 객체이다. 하드웨어와 관련된 작업을 설정하고, 이러한 리소스를 관리한다.
- `deviceContext` : 그래픽 파이프라인의 상태를 설정하고, 렌더링 명령을 실행하는 데 사용된다. 즉, device가 생성한 리소스를 이용해 실제로 GPU에서 작업을 실행하는 역할을 한다.
- `COM` : Component Object Model. 마이크로소프트가 개발한 소프트웨어 기술로, 다양한 언어와 플랫폼 간의 재사용 가능한 객체를 만든다. 주로 Windows 시스템에서 소프트웨어 모듈 간의 통신을 담당하며, DirectX, Windows의 많은 API에서 핵심적인 기술로 사용된다. COM이 사용된 객체는 접두어 I를 붙이는 것이 관례이다. 예로 ID3D11Device가 있다.
- `COM`의 주요 개념과 특징
	1. 객체 지향 프로그래밍 모델
		- 객체 지향을 기반으로 하며, 객체 간의 캡슐화와 상호 운용성을 지원한다. 이를 통해 다양한 애플리케이션이나 라이브러리가 독립적으로 개발된 객체들을 사용할 수 있다. COM 객체는 인터페이스를 통해 서로 상호작용한다. 이는 COM이 객체와 상호작용하는 유일한 방법이다.
	2. 언어와 플랫폼 간의 상호 운용성
		- COM은 여러 프로그래밍 언어(C, C++ 등)로 개발된 모듈들이 서로 호환될 수 있도록 설계되었다. 이를 위해 바이너리 수준에서 상호작용하며, 각기 다른 언어로 작성된 프로그램들이 함께 사용될 수 있다.
	3. 인터페이스 기반 설계
		- COM은 인터페이스 기반 설계되었으며, 객체는 직접 사용되지 않고 인터페이스를 통해 사용된다.
		- 인터페이스는 그 객체가 제공하는 기능의 집합을 나타내며, 구현에서 독립적이다. 즉, 클라이언트는 객체의 내부 구현을 알 필요 없이, 해당 인터페이스만 알면 객체를 사용할 수 있다.
		- 모든 COM 객체는 기본적으로 IUnknown 인터페이스를 구현해야 하며, 이를 통해 참조 카운트 및 인터페이스 쿼리를 관리한다.
	4. 참조 카운팅과 메모리 관리
		- COM은 참조 카운팅을 통해 메모리 관리를 자동화한다. 각 COM 객체는 자신을 참조하는 클라이언트의 수를 관리하며, 더 이상 참조하는 클라이언트가 없을 때 자동으로 메모리를 해제한다.
- `ComPtr` : DirectX와 같은 COM 기반 API에서 자주 사용되는 스마트 포인터로, Microsoft의 Windows Runtime C++ Template Library(WRL)에 포함되어 있다. ComPtr은 COM 객체의 참조 카운트 관리와 메모리 관리를 자동화하는 데 사용된다.
- `ComPtr`의 주요 특징과 기능
	1. 참조 카운트 관리 자동화
		- COM 객체는 IUnknown::AddRef()와 IUnknown::Release()를 통해 참조 카운트를 관리한다. ComPtr을 사용하면 직접 AddRef나 Release를 호출할 필요 없이, 객체의 생명 주기를 자동으로 관리한다. 따라서 메모리 누수가 발생할 위험이 없다(스마트 포인터 기능).
	2. 메서드 호출을 위한 포인터 자동 변환
		- ComPtr은 내부적으로 관리하는 실제 포인터를 제공하는 `operator->()`와 `opreator*()`를 오버로딩하여, 일반 포인터처럼 COM 객체의 메서드를 호출할 수 있게 해준다.
- `RenderTargetView` : RTV는 DirectX 11에서 렌더링할 때 화면에 출력할 수 있는 버퍼를 관리하는 중요한 개념이다. "GPU가 렌더링한 결과물을 출력할 대상"을 정의하는 인터페이스로, 주로 back buffer나 텍스처 같은 리소스에 그려진 데이터를 화면에 표시하거나 다른 후처리 단계에서 사용할 수 있게 해준다. DirectX에서 모든 렌더링은 특정 대상에 그려지며, 그 대상이 바로 render target이다. 일반적으로 render target은 swap chain의 back buffer이거나, 특정 texture2D일 수 있다. 즉 render target은 화면에 렌더링하거나 중간 결과물인 텍스처에 렌더링 하기 위해 사용될 수 있다.
- `Depth-Stencil Buffer` : 3D 그래픽스에서 렌더 타겟과 함께 사용하는 것이 depth-stencil buffer이다. 이는 픽셀의 깊이 정보를 저장하여, 깊이에 따른 가려짐 효과를 구현한다. 일반적으로 렌더 타겟과 스텐실 버퍼는 함께 바인딩된다.

---
