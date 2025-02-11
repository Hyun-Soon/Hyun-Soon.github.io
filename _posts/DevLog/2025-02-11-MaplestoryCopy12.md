---
title: "[DevLog] Game Engine 개발일지 #12"
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

2024/02/11

---

## 2. 작업 목표 (Daily Goals)

Animation 클래스 구현하기
Camera 컴포넌트 구현하기
png, bmp 파일 투명하게 렌더링하기
필요한 리소스 정리 및 제작

---

## 3. 진행 사항 (Progress)

Animation 클래스 구현 완료
Camera 컴포넌트 구현 완료
png, bmp 파일 투명하게 렌더링 완료

필요한 리소스 정리 및 제작 진행 중

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

1. bmp파일이 alphablend로 그려지지 않음
-> 대부분의 online converter나 편집 프로그램이 bmp를 만들 때 24bit depth로 만든다. 8비트씩 색을 할당하므로 이 경우 alpha값은 존재하지 않는다. 이를 가지고 alpha값이 필요한 alphablend를 사용했기 때문에 출력이 되지 않았다. 투명해야하는 부분을 마젠타색(RGB(255, 0, 255))으로 바꾸고 transparentblt() 함수를 사용하여 해결

---

## 5. 다음 단계 (Next Steps)

스프라이트 이미지들 마젠타색 입히고 bmp 파일 하나로 묶기
FSM 구현하기

---

## 6. 회고 (Reflection)

혼자서 게임을 만드려니 리소스에도 시간이 많이 쓰인다..

---

## 7. 메모 (Notes)


---

