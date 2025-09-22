---
title: \[Category\] MFC
excerpt:
categories:
tags:
---
# 0. MFC

Microsoft Foundation Classes, MFC  
  
Microsoft Windows 운영체제 환경에서 작동하는 GUI 응용프로그램을 개발하기 위해 Windows API의 C 언어 함수들을 Wrapping 하여 C++ 언어의 클래스화 한 GUI 프레임워크로, 1992년 발표되었다.  
  
윈도우 환경에서 COM(Component Object Model) 개발을 위한 라이브러리인 ATL과 CString 등의 기반 클래스를 공유하는 등 매우 밀접한 관련이 있다.

## 0-1. 사용 목적

Microsoft Windows용 GUI 응용프로그램을 개발하기 위해 별도의 라이브러리 없이 운영체제가 제공하는 C언어 기반의 Windows API를 직접 사용할 수도 있으나, Windows API는 단순히 운영체제의 여러 기능들을 노출시켜주는 함수들의 집합일 뿐이기 때문에 복잡한 UI를 작성하는 등의 고차원적인 작업을 할 때에는 필연적으로 코드 노가다가 수반되어 난이도가 높고 생산성이 떨어진다. 그리고 최신의 윈도 컨트롤과 같은 고차원적인 기능들은 Windows API가 아닌 COM 라이브러리로만 쓸 수 있기 때문에 Windows API만으로는 한계가 있다. 그래서 이걸 그나마 좀 편하게 C++ 클래스 형태로 쓸 수 있도록 해주는 것이 바로 MFC이다.

# MFC 1장

- MFC는 수많은 API 중 자주 사용되는 부분만 모아 C++ 라이브러리 형태로 제공하기 때문에 MFC를 이용하여 프로그램을 제작하더라도 API를 직접 호출하는 경우가 생긴다.
- **Message Handler** : 메시지를 받았을 때 동작을 결정하는 코드
- **Window Proceduer(WndProc)** : 메시지 핸들러의 집합
- 윈도우 운영체제가 제공하는 API는 DLL 형태로 제공되며, 프로그래머가 직접 필요한 기능을 DLL로 제작하기도 한다. 따라서 윈도우 응용 프로그램의 기능은 실행 파일 외에도 운영체제가 기본으로 제공하는 DLL과 사용자 정의 DLL에 분산되어 있다고 볼 수 있다.
- SDK : 개발 도구 모음. 컴파일러, 각종 개발 툴, 헤더 파일, 라이브러리 파일 등을 포함

- **HINSTANCE** : 실행 중인 프로그램의 인스턴스를 식별하는 핸들. 윈도우 클래스 등록(RegisterClassEX), 리소스 로딩(LoadIcon, LoadCursor등)에 사용
- **HDC(Handle to Device Context)** : 출력 장치(모니터, 프린터 등)에 대한 "그리기 환경"을 나타내는 핸들
- **WPARAM & LPARAM** : 메시지 처리(`WndProc`)에서 추가 정보를 담는 매개변수.

- `WPARAM`: 주로 **작은 값**(정수, 키보드 가상 키 코드, 컨트롤 ID 등)을 전달.
    
- `LPARAM`: 주로 **포인터 또는 큰 값**(좌표, 윈도우 핸들, 구조체 포인터 등)을 전달.
- **HWND** : 윈도우(창)를 식별하는 핸들. 특정 윈도우에 메시지를 보내거나 속성을 변경할 때 사용.

- **공유 DLL에서 MFC 사용**
	프로그램이 실행될 때, 운영체제에 있는 `MFCxxx.dll` (예: `MFC140.dll`, `MFC140U.dll`)을 로드해서 사용.
    
	실행 파일 자체는 비교적 **작아짐** (MFC 라이브러리를 포함하지 않으니까).
    
	하지만 실행 환경에 **해당 DLL이 반드시 설치**되어 있어야 함.
    
	여러 프로그램이 동시에 같은 MFC DLL을 공유 가능 → 메모리 절약.
![[Pasted image 20250922151337.png]]

# MFC 2장

