---
title: "[DevLog] Game Engine 개발일지 #05"
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

2024/10/29

---

## 2. 작업 목표 (Daily Goals)

삼각형 렌더링

---

## 3. 진행 사항 (Progress)

- Vertex Buffer, Index Buffer, 생성
- Vertex Constant Buffer, Pixel Constant Buffer 생성

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)


---

## 5. 다음 단계 (Next Steps)

- D3D11_INPUT_ELEMENT_DESC 설정
- vertex shader, pixel shader

---

## 6. 회고 (Reflection)

확실히 직접 짜보는게 머리에 잘 남고 정리가 잘된다.

---

## 7. 메모 (Notes)

- GPU에 메모리를 할당하는 작업은 `D3D11Device`에서 수행한다.
- SUBRESOURCE를 만들 때 일관된 작업을 거쳐야 한다. 예를 들어 Buffer를 만들 때, `D3D11_BUFFER_DESC`과 `D3D11_SUBRESOURCE_DATA`가 필요하다. DESC로 SUBRESOURCE의 특징을 정의하고, DATA로 실제 데이터가 들어있는 주소를 넘겨준다.

---

