---
title: "[DevLog] What The Golf 모작 개발일지 #11"
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

2024/11/15

---

## 2. 작업 목표 (Daily Goals)

코드 정리

---

## 3. 진행 사항 (Progress)

- Rigidbody를 컴포넌트로 구현하는 것을 고민 중
- Object 클래스 구현 중

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

없음

---

## 5. 다음 단계 (Next Steps)

코드 정리

---

## 6. 회고 (Reflection)

Object를 상속받아서 Cylinder, Cube 등의 클래스를 만든다고 할 때, 각 인스턴스의 특성을 어떻게 정해야할지 고민이다. Rigidbody 클래스를 Object의 컴포넌트로 만들면, 필요한 인스턴스에서만 사용할 수 있다. 하지만 현재 구상에서는 대부분의 물체가 강체이기 때문에 동적 할당으로 인해 런타임 성능이 떨어진다. 그렇다고 Object 클래스 자체에 Rigidbody를 넣어 놓자니 불필요한 메모리가 생기게 된다. 이후에 강체가 아닌 물체를 많이 추가할 지 모르기 때문에 웬만하면 불필요한 메모리 사용을 줄이고 싶다. 컴포넌트로 하는 경우, 스테이지를 로딩하는 화면을 만들어서 시간을 끌어도 된다. 아직 어떤 방향이 최선인지 잘 모르겠다.

물리 엔진 클래스에서 Object와 Rigidbody 내부 값들을 다루는 방식도 고민이다. 엔진이 어디까지 접근할 수 있는게 좋을까. 객체지향이란 뭘까.

---

## 7. 메모 (Notes)

- `std::vector::emplace_back`
	- 객체를 벡터에 직접 생성하므로, 불필요한 복사를 방지한다.

- `static_assert`
	- 컴파일 시간에 조건을 검사하여 컴파일 에러를 발생시킨다.

- `ID3D11DeviceContext::DrawIndexedInstanced`
	- 동일한 메쉬를 사용하는 여러 오브젝트를 렌더링할 때, GPU의 효율성을 높이는 기술. 각 오브젝트는 같은 메쉬(버텍스와 인덱스 데이터)를 공유하지만, 각 인스턴스별로 다른 변환 데이터(mvp 등)를 적용한다.

- `텍스쳐가 포함된 FBX` vs `텍스쳐 파일이 따로 있는 FBX`
	- 재활용성이나 로딩 시간 등 많은 부분에서 텍스쳐 파일이 따로 있는 것이 효율적이다.

---

