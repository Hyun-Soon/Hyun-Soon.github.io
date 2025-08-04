---
title: "[DevLog] Quantum Verge 개발일지 #18"
excerpt: Quantum Verge 개발일지
categories:
  - DevLog
tags:
  - 개발일지
  - QuantumVerge
  - UnrealEngine
---
## 1. 날짜 (Date)

2025/07/28

---

## 2. 작업 목표 (Daily Goals) ✅

- Enemy 몸체용 Niagara 추가 생성 및 적용 ✅
- PostProcessing Outline 적용 ✅

---

## 3. 진행 사항 (Progress)

- Enemy CapsuleComponent -> SphereComponent로 변경
- Enemy 몸체용 Niagara 추가 생성 및 적용 완료
- PostProcessing Outline 적용

---

## 4. 문제점 및 해결 방법 (Challenges & Solutions)

- 아래 코드와 같이 USphereComponent에 StencilBuffer 값을 지정하고 Outline을 그리려고 했지만, Outline이 그려지지 않음.
```c++
	//PostProcess
	mSphere->SetRenderCustomDepth(true);
	//Outline을 표시할 물체 StencilBuffer에 마킹
	mSphere->SetCustomDepthStencilValue(1);
	mSphere->SetCustomDepthStencilWriteMask(ERendererStencilMask::ERSM_Default);
```

생각해보니, DepthBuffer는 Vertex로 이루어진 메쉬를 화면에 그릴지 말지 깊이 정보를 가지고 판단하는 버퍼인데, Mesh가 설정되어있지 않으니 Depth 버퍼에 값이 제대로 들어 있을 리가 없었다. DirectX 공부해놓은 것이 도움이 됐다.


---

## 5. 다음 단계 (Next Steps)

- Enemy HitBox
- Enemy Niagara Effect 적용 
- Ions SlowDebuff 중복 적용 버그 해결
- 밸런스 패치 
- FollowingFloor 적용 후, TeleportIndicatorDecal 보이지 않는 문제 해결

---


## 6. 회고 (Reflection)

Outline을 그리는 데는 성공했으나, Material이 Opaque일 때만 그려진다. Translucent일 때는 왜 안그려질까? 아마 투명해서 뒤의 물체가보여야 하니까 Depth 버퍼에 값을 기록하지 않을 수도 있을 것 같다. 



---

## 7. 메모 (Notes)

- 조명 여러 개 렌더링 할 때 성능이 좋지 않음 -> 디퍼드 렌더링 등장

- BackBuffer -> SwapBuffer 하기 전, 화면에 출력할 Color들을 저장해 놓은 버퍼
- DepthBuffer -> Z-Depth를 저장한 버퍼, 
- StencilBuffer -> 0~255 사이의 원하는 값을 픽셀 당 저장해 놓은 버퍼
- BackBuffer가 FHD(1920x1080)라면, DepthBuffer와 StencilBuffer도 FHD 크기로 만들어진다.
- 화면의 해상도에 따라, 한 픽셀의 너비가 결정된다 -> TexelSize : 현재 화면에서 한 픽셀의 크기


✅ Texel이란?

**Texel (Texture Element)** 은 **텍스처 맵 안의 픽셀 한 칸**을 말한다.  
즉, **이미지(텍스처)의 좌표 공간에서의 단위**이다.

예를 들어, 512x512 크기의 텍스처가 있다면, 총 262,144개의 texel이 있고, 각 texel은 텍스처 이미지에서 색상 정보를 갖고 있다.

✅ Pixel이란?

**Pixel (Picture Element)** 은 **화면(모니터)에 표시되는 단위 픽셀**이다.  
예를 들어, 1920x1080 해상도의 화면이라면 총 2,073,600개의 픽셀이 존재한다.

✅ Texel vs Pixel

| 항목     | Texel                         | Pixel           |
| ------ | ----------------------------- | --------------- |
| 의미     | 텍스처 이미지 안의 픽셀                 | 화면에 그려지는 픽셀     |
| 좌표계    | 텍스처 좌표 (UV, 보통 0~1 또는 텍셀 인덱스) | 화면 좌표           |
| 위치     | GPU의 텍스처 메모리                  | 디스플레이 출력 버퍼     |
| 해상도 의존 | 텍스처 해상도에 따라 달라짐               | 모니터 해상도에 따라 달라짐 |

✅ 해상도에 따라 픽셀의 너비가 달라지나?

실제 **화면 상에서의 픽셀 크기(너비)** 는 **모니터 해상도와 크기(PPI/DPI)** 에 따라 달라진다.

예:

- **1920x1080 해상도**를 24인치 모니터에 출력하는 것과
    
- **1920x1080 해상도**를 15인치 노트북에 출력하는 것은  
    → 같은 픽셀 수지만 **각 픽셀의 물리적 너비**는 다르다 (더 작아짐).
    

하지만 **"1픽셀 = 1픽셀"**의 개념은 그대로이며, **픽셀 자체의 수학적 너비**는 항상 1로 생각해도 된다.  
다만 텍스처가 화면에 얼마나 확대/축소되어 표시되느냐에 따라 **1 픽셀에 몇 texel이 들어가느냐**, 또는 **1 texel이 몇 픽셀로 확대되느냐**가 달라진다.

✅ 예시 (텍셀과 픽셀의 관계)

- 256x256 텍스처를 512x512 영역에 그린다면?
    
    - 1 texel = 4 pixels (텍스처 확대됨)
        
- 512x512 텍스처를 256x256 영역에 그린다면?
    
    - 1 texel = 0.25 pixel (텍스처 축소됨, 디테일 손실 가능)
        

이 때 GPU는 **필터링 (Bilinear, Trilinear, Mipmap)** 등을 통해 여러 텍셀을 혼합하여 픽셀을 채우게 된다.

✅ 정리

- **Texel**은 텍스처 공간의 픽셀,
    
- **Pixel**은 화면의 픽셀.
    
- 해상도에 따라 **화면 픽셀의 물리적 크기**는 달라지지만, 논리적인 크기는 항상 `1픽셀`이다.
    
- Texel과 Pixel의 비율은 렌더링 시 텍스처가 얼마나 확대/축소되었느냐에 따라 달라진다.


0. ProjectSetting -> Rendering -> PostProcessing -> Custom Depth-Stencil Pass = `Enabled with Stencil`로 설정해야 Depth Buffer와 Stencil Buffer를 사용할 수 있다.
1. 포스트 프로세스 볼륨 생성 및 배치
2. Outline 검출할 Material Function 생성
3. Function 활용하여 8방향 Depth 확인하여 테두리 검출하는 Material 생성
4. Blendable Location에서 어느 순간에 적용할 지 설정해줘야 함.
5. 이제 StencilBuffer(커스텀 뎁스)를 활용하여, 원하는 물체에만 Outline이 그려지게 해야함.


