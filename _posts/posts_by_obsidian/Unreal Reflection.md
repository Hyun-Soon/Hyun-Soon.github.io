---
title: \[UE\] Reflection
excerpt: 
categories: 
tags:
---
# 0. Reflection

`Reflection`은 C++처럼 정적인 언어에서 런타임에 객체의 구조(클래스, 변수, 함수 등)에 접근하고 조작할 수 있게 해주는 시스템이다.

# 1. Unreal에서 리플렉션이 왜 필요할까?

Unreal Engine은 다음과 같은 기능을 위해 리플렉션이 반드시 필요하다. 

1. 블루프린트 연동 : C++ 클래스, 변수, 함수가 블루프린트에서 자동으로 노출
2. 직렬화 / 저장 : 게임 저장, 네트워크 전송 시 객체의 속성을 자동으로 읽고 저장
3. 에디터 노출 : C++ 속성을 에디터 UI에서 볼 수 있음(`VisibleAnywhere` 등)
4. Garbage Collection : 어떤 객체가 메모리에 살아있는지 추적
5. 로딩 / 스폰 : 이름만으로 클래스 생성 가능(`FindClass`, `SpawnActor`)

# 2. Unreal Reflection 시스템 구성 요소

1. `UCLASS()` : 클래스가 Unreal Reflection에 등록됨(ex. `AActor`, `UObject`)
2. `UPROPERTY()` : 변수(속성)를 Reflection 시스템에 등록
3. `UFUNCTION()` : 함수를 Reflection + Blueprint에서 호출 가능
4. `GENERATED_BODY()` : 리플렉션 정보를 자동으로 삽입(매크로로 실제 코드 삽입됨)

# 3. UHT가 만든 메타정보 

Unreal의 리플렉션은 UHT(Unreal Header Tool)가 `*.generated.h` 파일에 자동 생성한 코드 덕분에 가능하며, 이 코드가 런타임에 클래스 구조를 관리할 수 있게 해준다.