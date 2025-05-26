---
title: \[Graphics\] Shader(셰이더)란?
excerpt: Shader를 알아보자.
categories:
  - Graphics
tags:
  - Shader
  - Graphics
---
<br>
# 0. Shader란?
<br>
컴퓨터 그래픽스 분야에서 `Shader`는 주로 GPU에서 렌더링 효과를 계산하는 데 사용되는 프로그램을 말한다.

우리의 모니터에 어떤 3D 모델을 띄운다고 하자. 이 3D 모델은 여러개의 삼각형으로 구성되어 있다. 이 모델을 렌더링하기 위해 각 삼각형의 꼭짓점(vertex)들을 원하는 위치로 이동, 회전한 후 그 위치에서의 빛의 세기, 각도 등을 계산한다. 이런 과정등을 통해 화면에서 각 픽셀의 색을 결정한 후 우리 화면에 렌더링한다. 이러한 그래픽스 파이프라인에서 각각의 계산을 수행하는 프로그램들을 Shader라고 한다.

아래는 Direct3D의 그래픽 파이프라인이다. Shader를 거치며 최종적인 픽셀의 색을 결정하는 과정을 확인할 수 있다. 가장 일반적으로 사용되는 Shader는 `Vertex Shader`와 `Pixel Shader`다.

![image](https://github.com/user-attachments/assets/9ab9a459-a062-4d78-a9c0-2ef8b1fb37b9)

[이미지 출처](https://learn.microsoft.com/ko-kr/windows/uwp/graphics-concepts/graphics-pipeline)
<br>
# 1. Vertex Shader
<br>
위에서는 vertex를 삼각형의 꼭짓점으로만 설명했지만, 실제로는 위치를 나타내는 x, y, z값 뿐만 아니라 색상(r, g, b), 텍스쳐, 조명 정보 등이 될 수도 있다.

Vertex Shader는 3D 모델의 각 vertex를 처리한다. 모델의 정점 데이터를 입력받아 이동, 변환, 꼭짓점 별 조명 등의 작업을 수행한 후 출력한다. 단, 기존의 정점을 지우거나 새로운 정점을 추가하는 등의 작업은 할 수 없다.

<br>
# 2. Pixel Shader
<br>
Pixel Shader는 렌더링 될 각 픽셀들의 색을 계산한다. 텍스쳐로부터 색을 읽어오거나, 빛을 적용하는 것, bump mapping, 그림자, 반사광, 투명처리 등의 기능을 수행한다.

이 Shader는 각각의 픽셀들이 렌더링될 때마다 수행되기 때문에, 다른 픽셀들과 아무런 연관이 없다. 따라서 주변의 픽셀이나 그리는 도형에 대한 정보를 알 수 없기 때문에 스스로 매우 복잡한 효과를 만들어 낼 수는 없다.

Z-Buffer(z축 깊이 정보를 담은 버퍼)를 사용하기도 한다.