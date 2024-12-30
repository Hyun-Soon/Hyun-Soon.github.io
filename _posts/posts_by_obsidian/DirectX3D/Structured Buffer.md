
### Compute Shader
- GPU의 강력한 병렬 처리 성능을 활용하여 그래픽 외의 계산 작업을 처리할 수 있는 셰이더 단계
- Direct3D 파이프라인에서 독립적으로 실행되며, 그래픽 렌더링 파이프라인과는 별개로 동작

#### 주요 특징
- 병렬 처리 : 워크그룹과 스레드 구조를 통해 대량의 데이터를 동시에 처리
- 유연한 데이터 처리 : 그래픽스와는 별개로 사용자 정의 계산을 수행 가능
- 입출력 리소스 : UAVs(Unordered Access Views), 텍스처, 버퍼 등을 통해 데이터를 읽고 쓰기
	- Unordered Access View : 순서가 지정되지 않은 액세스 리소스의 뷰. 여러 스레드에서 임시로 순서가 지정되지 않은 읽기/쓰기 권한을 허용한다. 즉, 메모리 충돌을 생성하지 않고 여러 스레드에서 이 리소스 종류를 동시에 읽고 쓸 수 있다. 이 동시 액세스는 원자성 함수 사용을 통해 처리된다.

### Structured Buffer
- 구조화된 데이터 배열을 GPU에 저장하기 위한 버퍼
- 각 데이터 항목은 동일한 크기와 구조를 가진 struct로 이루어져 있다.
- Shader Resource View(SRV)를 통해 읽기 전용 접근
- Unordered Access View(UAV)를 통해 읽기/쓰기 접근


#### 1. Structured Buffer 정의
```c++
struct Particle 
{ 
	float3 position;
	float3 velocity;
	float lifetime; 
};
```

```hlsl
// 읽기 전용 Structured Buffer
StructuredBuffer<Particle> particles : register(t0);

// 읽기/쓰기 가능한 Structured Buffer
RWStructuredBuffer<Particle> particlesRW : register(u0);

```

#### 2. Structured Buffer 생성 과정
2-1. 버퍼 데이터 준비
```c++
std::vector<Particle> particleData(numParticles);

// 초기 데이터 설정 (예: 입자 초기화)
for (size_t i = 0; i < numParticles; i++) {
    particleData[i].position = {0.0f, 0.0f, 0.0f};
    particleData[i].velocity = {1.0f, 1.0f, 0.0f};
    particleData[i].lifetime = 10.0f;
}

```

2-2. Buffer 생성
```c++
D3D11_BUFFER_DESC bufferDesc = {};
bufferDesc.BindFlags = D3D11_BIND_SHADER_RESOURCE | D3D11_BIND_UNORDERED_ACCESS;
bufferDesc.ByteWidth = sizeof(Particle) * numParticles;
bufferDesc.StructureByteStride = sizeof(Particle);
bufferDesc.MiscFlags = D3D11_RESOURCE_MISC_BUFFER_STRUCTURED;
bufferDesc.Usage = D3D11_USAGE_DEFAULT;

D3D11_SUBRESOURCE_DATA initData = {};
initData.pSysMem = particleData.data();

ID3D11Buffer* structuredBuffer = nullptr;
device->CreateBuffer(&bufferDesc, &initData, &structuredBuffer);

```

2-3. Shader Resource View(SRV) 생성
```c++
D3D11_SHADER_RESOURCE_VIEW_DESC srvDesc = {};
srvDesc.Format = DXGI_FORMAT_UNKNOWN; // Structured Buffer는 DXGI_FORMAT_UNKNOWN
srvDesc.ViewDimension = D3D11_SRV_DIMENSION_BUFFER;
srvDesc.Buffer.ElementWidth = numParticles;

ID3D11ShaderResourceView* srv = nullptr;
device->CreateShaderResourceView(structuredBuffer, &srvDesc, &srv);

```

2-4. Unordered Access View(UAV) 생성 (Optional)
```c++
D3D11_UNORDERED_ACCESS_VIEW_DESC uavDesc = {};
uavDesc.Format = DXGI_FORMAT_UNKNOWN; // Structured Buffer는 DXGI_FORMAT_UNKNOWN
uavDesc.ViewDimension = D3D11_UAV_DIMENSION_BUFFER;
uavDesc.Buffer.NumElements = numParticles;

ID3D11UnorderedAccessView* uav = nullptr;
device->CreateUnorderedAccessView(structuredBuffer, &uavDesc, &uav);

```

#### 3. HLSL에서 Structured Buffer 사용
3-1. 읽기 전용 Structured Buffer
```hlsl
StructuredBuffer<Particle> particles : register(t0);

[numthreads(256, 1, 1)]
void CSMain(uint3 dispatchThreadId : SV_DispatchThreadID) {
    Particle p = particles[dispatchThreadId.x];
    // 처리 로직 (읽기 전용)
}

```

3-2. 읽기/쓰기 가능한 Structured Buffer
```hlsl
RWStructuredBuffer<Particle> particlesRW : register(u0);

[numthreads(256, 1, 1)]
void CSMain(uint3 dispatchThreadId : SV_DispatchThreadID) {
    Particle p = particlesRW[dispatchThreadId.x];
    p.position += p.velocity * 0.1f; // 입자 위치 업데이트
    particlesRW[dispatchThreadId.x] = p; // 값 쓰기
}

```