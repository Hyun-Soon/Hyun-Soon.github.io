---
title: "[DevLog] Game Engine 개발일지 #13"
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

2024/11/26

---

## 2. 작업 목표 (Daily Goals)

3D Object texture 입히기

---

## 3. 진행 사항 (Progress)

- 정확한 색이 입혀지지 않음
- DirectXManager 내부 함수 분리

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- AMD 소프트웨어 에러 감지
	- VertexBuffer, IndexBuffer, VertexShader, PixelShader를 만들지 않고 swapChain->Present를 실행해서 발생

- vcpkg install stb 했는데 \#include <stb/stb_image.h> source file cannot find
	- \#include "stb/stb_image.h"
	- 설치했기 때문에 ""로 해야한다.

- stbi_failure_reason already defined in ...
	- \#define STB_IMAGE_IMPLEMENTATION
	- \#include "stb_image.h"
	- 위 두 문장을 헤더파일에 넣어놨기 때문에, 해당 헤더파일을 인클루드하는 모든 파일에서 STB_IMAGE_IMPLEMENTATION이 중복 정의되어 문제 발생
	- \#define STB_IMAGE_IMPLEMENTATION을 .cpp 파일 한곳에서 정의

---

## 5. 다음 단계 (Next Steps)

3D Object texture 입히기

---

## 6. 회고 (Reflection)

내 코드에서는 vertex와 index를 저장해놓고, buffer를 만들어도 기존의 vertex, index를 계속 가지고 다녀서 메모리 낭비가 있는데, 참고 코드에서는 directx에서만 사용할 변수들을 담은 구조체를 따로 만들어서 이 구조체만 사용한다.

unity에서 fbx를 추출하니 texture 파일의 경로가 제대로 설정되어 있지 않다. 직접 fbx 파일을 고치기에는 너무 많은 부분에 파일 위치가 명시되어 있고, 구조를 정확하게 아는게 아니라 불안하다. 방법이 뭐가 있을까..

---

## 7. 메모 (Notes)

- VertexContantBuffer를 Object에 두기 vs DXManager에 두고 공유해서 쓰기
	- Object에 둘 경우, mvp 변경사항이 생길 경우만 버퍼를 업데이트하면 된다.
	- DXManager에 둘 경우, Object를 렌더링할 때마다 buffer를 업데이트 해야 한다.
	- 그런데 camera 위치가 바뀔 경우, view matrix를 업데이트 해줘야 한다.
	- target object가 움직일 때 camera가 이를 따라 움직일 건데, 각 스테이지의 대부분 상황에서 카메라가 움직일 것이다.
	- Object에 두는 경우, camera와 물체가 움직이지 않는 경우 한정 효율이 좋겠지만, camera나 물체가 움직이기 시작하는 순간 DXmanager에 버퍼를 두는 것과 별 차이가 없을 것이고 로직은 더 복잡해 질 것 같다.

---

