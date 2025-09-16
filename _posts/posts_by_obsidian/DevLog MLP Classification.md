---
title: \[DevLog\] MLP Classification
excerpt: MLP Classification 모델 C++ 구현
categories:
  - DevLog
tags:
  - MLP
  - Cpp
  - NeuralNet
---
# 0. Issue

- 왜 Hidden Layer Activation Function으로 ReLU를 사용하면, -nanf이 나올까?
	- Learning Rate 줄이기(relu는 기울기가 0아니면 1로 매우 큼)

- input : (1,4), hidden weight : (4, 4), output weight : (3, 4)일 때 왜 hidden layer 개수를 많이 할 수록 학습률이 떨어질까(cross entropy가 줄어드는 간격이 좁아질까)?
	- 기울기 손실(sigmoid)

