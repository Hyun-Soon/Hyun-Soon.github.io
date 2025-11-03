
- Visual Studio에서 Unity class 및 함수를 인식 못함.
![[Pasted image 20251016111542.png]]



- 키보드로 카메라 움직이는 코드 작성했으나 아래의 문제 발생
Error : you are trying to read input using the unityengine.input class, but you have swtiched active input handling to input system package

해결 방법 : [Edit] - [Project Settings] - [Player] - [Other Setting] - [Configuration] - [Active Input Handling*]를 Both로 변경