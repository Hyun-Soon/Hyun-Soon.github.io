---
title: "[DevLog] QuantumVerge 개발일지 #01"
excerpt: QuantumVerge 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - UnrealEngine
  - QuantumVerge
---
## 1. 날짜 (Date)

2025/07/08

---

## 2. 작업 목표 (Daily Goals)

Enemy 클래스 구조 초안

---

## 3. 진행 사항 (Progress)

Enemy 클래스 구조 초안 완성

![EnemyClasses](https://raw.githubusercontent.com/Hyun-Soon/Hyun-Soon.github.io/refs/heads/main/_posts/asset/DevLog/EnemyClasses.png)

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- SVN에서 파일을 클립보드로 복사하여 브랜치에 넣어서, Merge할 때 같은 조상으로 인식하지 못해서 Merge 불가 문제 발생 : CopyTo를 사용하여 브랜치에 trunk를 복사
- SVN에서 받은 프로젝트를 빌드했는데 다음과 같은 에러가 발생했다. `Unable to find plugin 'VisualStudioTools' (referenced via ProjectQuantumVerge.uproject) Install it and try again, or remove it from the required plugin list.`
	`.uproject` 파일에서 VisualStudioTools가 Enabled로 되어있는데 해당 플러그인을 찾지 못했다. Unreal Engine 소스 Github는 잘 들어가지는데, VisualStudioTools Github는 404가 나온다. 프로젝트 기간이 짧으니 우선 Enabled : false로 진행하고 간간이 원인을 찾아야겠다.

---

## 5. 다음 단계 (Next Steps)

- GAS AttributeSet 사용하여 EnemyBase 구현

---

## 6. 회고 (Reflection)

처음으로 다른 환경에서 팀 프로젝트를 진행했는데, 아니나 다를까 악명 높은 환경 세팅 문제에 직면하고 말았다. 하루 종일 설치를 시도했으나 성공하지 못했다. 집 컴퓨터로 설치하고 옮겨야 하나..

게임 특성 상 몬스터가 복잡하지 않다. 더 힘 쓸 수 있는 부분을 생각해 보자.

---

## 7. 메모 (Notes)

**기획에 대한 궁금증**

1. 플라즈마 변형체의 "보다 넓은 충돌 범위"라는게, 다른 몬스터에 비해 몸집이 크다는 것인지? 아니면 몸집은 비슷한데 주변에 이펙트같은 것이 더해져서 더 넓은 충돌 범위를 갖는 것인지? 
	몸집이 큼

2. 엔트로피 특이체의 "시간 느려짐"은 인게임 시간을 의미하는 것인지?
	우선은 플레이어 이동 속도 슬로우

---

