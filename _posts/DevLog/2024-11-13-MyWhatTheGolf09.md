---
title: "[DevLog] Game Engine 개발일지 #09"
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

2024/11/13

---

## 2. 작업 목표 (Daily Goals)

3D Asset 렌더링

---

## 3. 진행 사항 (Progress)

프로그램은 실행되나, 제대로 렌더링 되지 않음
Index 문제인 것으로 생각됨

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- Unity Asset Store에서 Import한 에셋들이 분홍색을 띄며 제대로 보이지 않음
	- Unity를 최신 버전으로 업데이트해서 해결

- Assimp::Importer로 fbx 파일을 읽었을 때, Microsoft C++ exception: std::length_error 발생
	- fbx 파일을 ASCII -> binary로 변경, 우선 vertex와 index만 추출


---

## 5. 다음 단계 (Next Steps)

3D Asset 렌더링

---

## 6. 회고 (Reflection)

fbx 파일에서 읽어온 vertex 수와 index의 수가 같다. fbx 파일을 blender에서 import 했을 때 잘 보이는 것으로 봐서는 파일 문제는 아닌 것 같다(색은 원본과 달리 단색으로만 보인다). 내가 삼각형을 렌더링할 때는 indices 버퍼에서 순서대로 3개씩 묶어서 하나의 삼각형을 만들었기 때문에 같은 index가 중복되어 들어있었다. index를 중복되지 않게 표현하는 방법이 있는지 찾아봐야겠다.

index를 잘못읽어온 경우도 생각해보자(vertex와 수가 정확히 같은걸 봐서는 잘못 읽어온 건 아닌 것 같긴 하다. 내일 다른 에셋도 테스트 해보자.).

---

## 7. 메모 (Notes)

- `Assimp`
	- `Importer` : 모델 데이터를 불러오는 역할을 하는 가장 기본적인 클래스. FBX 파일을 포함한 다양한 파일 형식을 읽어올 수 있다. `ReadFile()` 함수를 통해 파일을 로드하며, 반환되는 `aiScene`의 포인터를 통해 파일에 대한 정보를 얻을 수 있다.
	- `aiScene` : 모델의 메인 데이터 구조로, mesh, camera, lighting, animation 등 모든 정보를 포함하고 있다. aiScene은 모든 메쉬 데이터를 포함하는 `mMeshes`, 전체 노드 구조를 나타내는 `mRootNode` 등의 멤버를 가진다.
	- `aiMesh` : aiScene 내에 포함된 각 메쉬 데이터를 나타내는 클래스. 메쉬는 기본적으로 정점, 인덱스, 법선, UV 좌표 등의 데이터를 포함한다. 메쉬마다 다른 버텍스, 인덱스, 텍스처 좌표 등이 포함될 수 있으며, `mVertices`, `mFaces`, `mNormals`, `mTextureCoords` 등의 멤버로 각 정보를 접근할 수 있다.
	- `aiNode` : 장면을 계층적으로 구성하기 위해 사용되는 클래스. FBX 파일은 일반적으로 계층 구조를 가지기 때문에, 이 구조를 재현하는 데 중요한 역할을 한다. aiNode는 트리 구조로 구성되어 있다.
	
---

