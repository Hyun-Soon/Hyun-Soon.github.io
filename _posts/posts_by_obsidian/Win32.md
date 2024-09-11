---
title: "[Win32]"
---
Windows program은 2가지 함수를 가지고 있다.
하나는 Win32 Console의 main() 함수이고, 다른 하나는 event를 감지할 수 있게 해주는 함수이다.

이벤트가 발생하면 Windows는 message에 이벤트 정보를 기록하고, 이벤트가 발생한 프로그램의 message queue에 추가한다.