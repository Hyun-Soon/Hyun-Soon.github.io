---
title: "[DevLog] Game Engine 개발일지 #10"
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

2024/11/14

---

## 2. 작업 목표 (Daily Goals)

3D Asset Rendering

---

## 3. 진행 사항 (Progress)

3D Asset 단색으로 Rendering 성공

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- Assimp import 후, hlsl 파일만 수정하고 빌드 시 에러 발생
	- cpp 파일 아무거나 의미없는 수정 후 다시 빌드
	- Assimp와 같은 외부 라이브러리를 사용할 때, Visual Studio는 빌드할 때만 프로젝트 폴더에 필요한 DLL 파일을 복사해 놓는다. HLSL 파일은 셰이더 코드로서 빌드 과정에 직접적으로 포함되지 않으며, 컴파일 단계에서 DLL 파일을 참조할 필요가 없기 때문에 cpp 파일을 수정하지 않으면 프로젝트가 빌드 과정을 거치지 않는다. 이 때문에 HLSL 파일만 수정 후 빌드하면 DLL 복사가 트리거되지 않고, Assimp DLL을 찾을 수 없어 실행 오류가 발생한다.

- 삼각형이 일부만 렌더링되고 일부는 렌더링되지 않는 현상 발생
	- `DirectX::SimpleMath::Vector3`와 `DirectX::XMFLOAT3`를 혼용해서 사용하고 있던 것을 Vector3로 통일함.

---

## 5. 다음 단계 (Next Steps)

- 화살표 에셋 찾기
- 물체의 단순한 움직임 구현하기
- 코드 정리

---

## 6. 회고 (Reflection)

어떻게 vertex의 수와 index의 수가 같을 수가 있나 고민했는데, 직접 찍어보니 하나의 vertex를 중복해서 넣어 둔 것이었다.

vertex의 타입을 바꿔줄 때마다 여러 Desc의 설정을 바꿔줘야 하는데, 이를 효율적으로 작성할 수 있는 방법을 생각해 봐야겠다. 당장 떠오르는건 typeof인데, 더 좋은 방법이 있을 것 같다.

정리하다가 문득 row-major column-major 변환할 필요 없이 곱 순서를 한쪽에서 바꿔주면 되지 않을까 생각해봤는데, 그냥 순서를 바꾸자니 행렬곱이 성립이 안되고, 행렬곱을 만드려고 다 transpose 해버리면 결국 row-major로 계산하고 마지막에 한번에 transpose 해주는게 효율적이라는 걸 깨달았다. 까비.

---

## 7. 메모 (Notes)

- `SimpleMath` vs `DirectXMath(XM)`
	- SimpleMath는 내부적으로 XMVECTOR를 wrapping하지만, 최적화된 SIMD 명령어를 직접 활용하지 않으므로 XM보다 성능이 낮다. C++ 연산자 오버로딩을 사용하여 직관적이고, 코드를 간결하게 작성할 수 있다.
	- XMVECTOR는 SSE와 같은 SIMD 명령어를 직접 활용하여 성능 최적화가 뛰어나다. 또한 16바이트 정렬을 요구해 CPU의 캐시 활용을 극대화하며, 대규모 벡터 연산에서 메모리 사용이 효율적이다.



---

