---
title: "[DevLog] Game Engine 개발일지 #14"
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

2024/12/31

---

## 2. 작업 목표 (Daily Goals)

애니메이션 구현

---

## 3. 진행 사항 (Progress)

물체가 괴상하게 움직임

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- `context->IASetVertexBuffers(0, 1, mesh->vertexBuffer.GetAddressOf(), &mesh->stride, 0);` : 마지막 인자가 pointer라서 의미가 없으면 nullptr을 넣으면 될 줄 알았는데, offset값이라 0이 들어있는 변수 포인터를 넣어줘야 한다.
- vertex shader에서 view 행렬을 안곱해줬다..

---

## 5. 다음 단계 (Next Steps)

애니메이션 구현

---

## 6. 회고 (Reflection)

Unity에서는 제대로 작동하는 에셋이 Blender에서는 이상하게 보인다. 같은 fbx도 툴마다 다르게 보일 수가 있나?

---

## 7. 메모 (Notes)


---

