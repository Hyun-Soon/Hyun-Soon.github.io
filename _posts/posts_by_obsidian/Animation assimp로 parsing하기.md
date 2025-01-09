---
title: Animation assimp로 parsing하기
excerpt: Animation assimp로 parsing하기
categories:
  - DirectX11
  - Assimp
  - Animation
tags:
  - DirectX11
  - Assimp
  - Animation
---
Assimp::Importer의 ReadFile 함수로 aiScene\* 을 얻는다.

디버거로 aiScene의 구조를 살펴보자.

![[Pasted image 20250103160353.png]]

mesh, animation 등 다양한 정보가 들어있는 걸 확인할 수 있다.

1. vertex의 변형에 직접적으로 참여하는 뼈들의 목록을 만든다.
![[Pasted image 20250103162021.png]]
scene의 mNumMeshes만큼 mMeshes를 탐색하면서, mesh->HasBones() 함수를 호출하여 뼈가 있는지 확인한다.
뼈가 있다면 mesh->mNumBones만큼 반복문을 돌면서, map의 key를 bone->mName으로, value를 -1로 초기화한다.

```c++
for (uint32_t i = 0; i < scene->mNumMeshes; i++)
{
	const auto* mesh = scene->mMeshes[i];
	if (mesh->HasBones())
	{
		for (uint32_t i = 0; i < mesh->mNumBones; i++)
		{
			const aiBone* bone = mesh->mBones[i];

			// map<string, int> boneNameToId;
			mAniData.boneNameToId[bone->mName.C_Str()] = -1;
		}
	}
}
```

2. 트리 구조를 따라 업데이트 순서대로 뼈들의 인덱스를 결정한다.
scene의 mRootNode부터 시작해서 노드를 순회하면서, 노드의 이름이 1번에서 map에 저장한 bone의 이름과 같다면 value값을 순서대로 update한다. dfs 식으로 leaf를 찍고 나오는 식으로 id를 업데이트 해야, 나중에 뼈의 상관관계로 인한 변환행렬을 계산할 때 편하다.

```text
Assimp에서 bone의 이름과 node의 이름은 반드시 같다고 보장되지 않는다. 그러나 일반적으로 bone의 이름은 해당 bone이 영향을 미치는 노드의 이름과 같도록 설계된다. 이는 Assimp가 애니메이션 데이터와 노드 계층 구조를 연결하는 방식 때문이다.

1. Bone과 Node의 관계
**Bone**
- Bone은 스키닝 애니메이션에서 사용된다.
- 메쉬의 정점에 영향을 주는 transform matrix와, offset matrix(바인드 포즈에서 월드 공간으로 변환하는 행렬)
**Node**
- Node는 Assimp 씬 그래프의 기본 구성 요소로, 계층 구조를 나타낸다.
- Node는 이름, local transform, 자식/부모 관계를 포함한다.
- 씬 그래프에서 노드는 Bone과 연결될 수 있지만, 모든 노드가 Bone이 되는 것은 아니다.

2. 이름이 같은 이유
Bone의 이름은 보통 해당 Bone에 해당하는 Node의 이름과 같게 설정된다.
- Bone은 이름을 기반으로 애니메이션 키프레임 데이터를 찾는다.
- Assimp는 Bone의 이름을 씬 그래프에서 해당 Node를 찾는 데 사용한다.
- 따라서 Bone 이름과 Node 이름이 같아야 Assimp가 올바르게 작동한다.
```

3. Index를 Bone의 id로, 값을 Bone의 이름으로 하는 vector를 만든다.
이전의 map은 이름으로 뼈 id 조회, 여기서의 vector는 뼈 id로 이름 조회

4.  Index를 Bone의 id로, 값을 부모 뼈의 id로 하는 vector를 만든다

