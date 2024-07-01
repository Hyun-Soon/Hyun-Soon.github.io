var store = [{
        "title": "Markdown 사용법",
        "excerpt":"0. 들어가며 Github를 구경하다 보면 .md 파일을 자주 만나게 된다. 이런 파일들은 Markdown 문법으로 작성된 파일이다. 본 게시글도 Markdown으로 작성되었다. 1. Markdown이란? Markdown은 일반 텍스트 기반의 경량 마크업 언어이다. 마크업 언어란 태그 등을 이용해 문서나 데이터의 구조 등을 명시하는 언어를 말한다. Markdown은 일반 텍스트로 서식이 있는 문서를 작성하는 데 사용되며,...","categories": ["Etc"],
        "tags": ["Etc","Markdown"],
        "url": "/etc/Markdown/",
        "teaser": null
      },{
        "title": "Libft",
        "excerpt":"0. 과제 설명 libc에 있는 함수 및 앞으로의 문제를 푸는 데 유용한 함수들을 구현하고 library로 만든다. 1. Library 1-1. Library란? 라이브러리는 주로 소프트웨어를 개발할 때 컴퓨터 프로그램이 사용하는 비휘발성 자원의 모임이다. 비휘발성 자원의 예로는 미리 작성된 코드, 함수, 클래스, 자료형 등이 있다. 라이브러리는 재사용이 필요한 기능의 반복적인 코드 작성을 피하고, 언제든지 필요한 곳에서 호출하여...","categories": ["42Seoul"],
        "tags": ["42Seoul","Libft","Archive","Library"],
        "url": "/42seoul/Libft/",
        "teaser": null
      },{
        "title": "Makefile 문법 및 예시",
        "excerpt":"0. 들어가며 빌드를 쉽게 해주는 make와 Makefile에 대해 알아보자. 1. make란? \"의존성 관리”와 “증분 빌드” 기능을 갖춘 빌드 도구. 1-1. 의존성 관리 빌드 과정에서 의존성에 따른 빌드 순서는 무척 중요하다. 컴파일, 즉 a.c로 a.o를 만들고, a.o로 a.out을 만드는 상황을 가정하자. 여기서 a.out은 a.o에, a.o는 a.c에 의존성이 있다고 할 수 있다....","categories": ["42Seoul"],
        "tags": ["42Seoul","Linux","Make","Makefile"],
        "url": "/42seoul/Makefile/",
        "teaser": null
      },{
        "title": "Born2beroot",
        "excerpt":"0. 과제 설명 가상 머신을 이용해 엄격한 규칙들로 이루어진 나만의 서버를 구현한다. 1. 필요 개념 Server 클라이언트의 요청을 받으면 서비스, 데이터를 제공하는 컴퓨터 혹은 프로그램(요청을 받으면 데이터를 보내주는 기계) 닭갈비집 알바생으로 비유하면 이해가 쉽다. 닭갈비 2인분 주세요~ 하면 닭갈비 2인분을 가져다 주는 것 처럼, 웹서버도 마찬가지로 네이버 웹툰 페이지 주세요~...","categories": ["42Seoul"],
        "tags": ["42Seoul","Born2beroot","가상머신","VM","virtual_machine"],
        "url": "/42seoul/Born2beroot/",
        "teaser": null
      },{
        "title": "Fract'ol",
        "excerpt":"0. 과제 설명 mlx 라이브러리를 이용해 다양한 Fractal을 구현한다. 1. 필요 개념 Fractal 프랙탈은 일부 작은 조각이 전체와 비슷한 기하학적 형태 즉, 자기 유사성을 가지는 기하학적 구조이다. 자기 유사성은 같은 패턴에 대해 재귀 또는 반복을 이용해 구현한다. 복소 평면에서 각 점이 점화식에서 발산하는지, 발산하지 않는지에 따라 프랙탈 집합이 결정된다. 프랙탈을...","categories": ["42Seoul"],
        "tags": ["42Seoul","Fractol","Fractal","mlx"],
        "url": "/42seoul/Fract'ol/",
        "teaser": null
      },{
        "title": "ft_printf",
        "excerpt":"0. 과제 설명 printf 함수를 구현한다. 1. 가변 인자(variable argument) 가변 인자는 말 그대로 개수가 변할 수 있는 인자이다. 함수 printf를 사용하는 경우를 생각해보자. #include &lt;stdio.h&gt; int main() { printf(\"%s %d\\n\", \"this is an example.\", 123); printf (\"%d\\n\", 456); } 위 코드에서 첫 번째 printf에 \"%s %s\\n\", \"this is an...","categories": ["42Seoul"],
        "tags": ["printf","42Seoul","ft_printf"],
        "url": "/42seoul/ft_printf/",
        "teaser": null
      },{
        "title": "get_next_line",
        "excerpt":"0. 과제 설명 파일에서 한 줄씩 읽어오는 함수 get_next_line을 구현한다. 1. fd(File Descriptor) File Descriptor 파일을 대표하기 위해 시스템으로부터 할당 받은 음수가 아닌 정수 각각의 프로세스에서 열린 파일의 목록을 관리하는 테이블의 인덱스 흔히 유닉스 시스템에 존재하는 모든 것은 파일이라고 한다. 유닉스 시스템에서는 프로세스가 파일들에 접근할 때 ‘파일 디스크립터’라는 개념을 사용한다....","categories": ["42Seoul"],
        "tags": ["42Seoul","get_next_line","fd"],
        "url": "/42seoul/get_next_line/",
        "teaser": null
      },{
        "title": "Push Swap 병합정렬 가이드",
        "excerpt":"0. 과제 설명 \bStack A, Stack B가 있는 상황에서 Stack A에 숫자가 랜덤으로 들어온다. 주어진 명령어를 최소한으로 사용하여 Stack A에 숫자들을 오름차순으로 정렬한다. 1. 명령어 sa : stack A의 맨 위 2개 요소의 위치를 바꾼다. sb : stack B의 맨 위 2개 요소의 위치를 바꾼다. ss : sa와 sb를 동시에...","categories": ["42Seoul"],
        "tags": ["42Seoul","Push_Swap","Merge_sort"],
        "url": "/42seoul/Push_swap/",
        "teaser": null
      },{
        "title": "Philosophers 가이드",
        "excerpt":"0. 과제 설명 Dining Philosopher 문제를 해결해 본다. multi threads, multi processors 환경에서 발생할 수 있는 race condition 및 deadlock을 방지한다. 1. 필요 개념 1-1. 공유 자원 여러 프로세스 또는 스레드가 공동으로 사용하는 변수, 메모리, 파일 등의 자원이나 변수를 의미한다. 1-2. Thread thread란 프로세스 내에서 작업이 실행되는 흐름의 단위를 말한다....","categories": ["42Seoul"],
        "tags": ["42Seoul","Philosophers","Dining_Philosophers","semaphore","mutex","race_condition"],
        "url": "/42seoul/Philosophers/",
        "teaser": null
      },{
        "title": "pipex 가이드",
        "excerpt":"0. 과제 설명 프로세스간 통신을 도와주는 pipe에 대해 이해하고 사용해보자. 1. Pipe 1-1. IPC(Inter Process Communication) 프로세스란 메모리에 올라와 실행되고 있는 프로그램을 말한다. 각각의 프로세스는 고유의 메모리 공간을 가지기 때문에 한 프로세스가 다른 프로세스의 데이터에 접근하는 것이 불가능하다. 이런 문제를 해결하기 위해 여러가지 방법이 있는데, 이런 방법들을 IPC라고 한다. 1-2....","categories": ["42Seoul"],
        "tags": ["42Seoul","process","fd","pipe"],
        "url": "/42seoul/Pipex/",
        "teaser": null
      },{
        "title": "01.네트워크 기초",
        "excerpt":"1. 컴퓨터 네트워크란? 네트워크란 사람과 사람, 도로와 철도, 물류 등 다양한 분야에서 연결을 나타내는 단어다. 컴퓨터 간의 연결을 컴퓨터 네트워크(이하 네트워크)라고 부른다. 우리는 네트워크를 통해 컴퓨터 간의 데이터 전송, 웹사이트 열람, 메일 송수신과 같은 일을 할 수 있다. 인터넷은 전 세계의 작은 네트워크부터 큰 네트워크까지를 연결하는 거대한 네트워크를 말한다. 2....","categories": ["Network"],
        "tags": ["Network","Packet","LAN","WAN"],
        "url": "/network/network01/",
        "teaser": null
      },{
        "title": "02.네트워크의 기본 규칙",
        "excerpt":"1. Protocol이란? 한국인과 멕시코인이 있을 때, 사용 언어가 다르기 때문에 소통에 문제가 생긴다. 영어를 사용하자는 등 약속을 해야 소통이 가능해질 것이다. 이처럼 네트워크에서도 문제없이 통신하려면 규칙(약속)을 지켜야 한다. 이와 같은 규칙을 Protocol(프로토콜)이라고 한다. 2. OSI 모델이란? OSI 모델은 네트워크 기술의 기본이 되는 모델(표준 규격)이다. 데이터의 송수신 과정 동안 컴퓨터 내부에서...","categories": ["Network"],
        "tags": [],
        "url": "/network/network02/",
        "teaser": null
      },{
        "title": "03.물리 계층",
        "excerpt":"1. 전기 신호 전기 신호의 종류에는 2가지가 있다. 아날로그 신호 : 물결 모양의 전기 신호로, 라디오 방송 등에서 사용된다. 디지털 신호 : 사각형이 반복되는 모양으로, 0과 1로 이루어진 비트 집합을 전기 신호로 전송할 때 사용된다. 2. 물리 계층과 LAN 카드 컴퓨터는 네트워크를 통해 데이터를 송수신할 수 있도록 LAN 카드(내장형 또는...","categories": ["Network"],
        "tags": ["cable","LAN","repeater","hub"],
        "url": "/network/network03/",
        "teaser": null
      },{
        "title": "04.데이터 링크 계층",
        "excerpt":"1. Ethernet OSI 모델의 2계층인 데이터 링크 계층에서는 네트워크 장비 간에 신호를 주고 받는 규칙을 정한다. 이 때 가장 많이 사용되는 규칙이 Ethernet이다. 즉, LAN에서 데이터를 어떻게 주고받을 지에 대한 약속이다. 허브에 3개의 컴퓨터가 연결되어 있다고 가정하자. 만약 컴퓨터 1에서 컴퓨터 3에 데이터를 보내기 위해 허브에 데이터를 전달하면, 허브는 컴퓨터...","categories": ["Network"],
        "tags": ["Ethernet","MacAddress","Switch"],
        "url": "/network/network04/",
        "teaser": null
      },{
        "title": "05.네트워크 계층",
        "excerpt":"1. 다른 네트워크 간의 통신 네트워크 계층에서는 네트워크 간의 통신을 가능하게 한다. 같은 네트워크 상의 컴퓨터로 정보를 전달할 때는 Ethernet과 스위치를 통해 소통이 가능했지만, 다른 네트워크 상의 컴퓨터로 데이터를 보내려면 MAC주소 외에 네트워크 주소가 추가로 필요하다. 네트워크를 식별하는 데 사용되는 주소를 IP 주소라고 한다. IP(Internet Protocol)는 네트워크 계층에서 사용되는 프로토콜이다....","categories": ["Network"],
        "tags": ["Network","Subnet","IP"],
        "url": "/network/network05/",
        "teaser": null
      },{
        "title": "06.전송 계층",
        "excerpt":"1. 전송 계층의 역할 데이터가 신뢰할 수 있는 데이터인지 검사하고, 오류가 있으면 재전송을 요청한다. 받은 데이터를 필요로 하는 어플리케이션에 전달한다. 전송 계층의 통신 방식으로 2가지를 꼽을 수 있다. 연결형 통신 : 신뢰, 정확성을 우선으로 하여 통신 과정에서 여러 번 확인 절차를 거친다. 비연결형 통신 : 동영상 같이 빠른 전송이 필요한...","categories": ["Network"],
        "tags": ["TCP","Port","UDP"],
        "url": "/network/network06/",
        "teaser": null
      },{
        "title": "07.응용 계층",
        "excerpt":"1. 응용 계층의 역할 서비스를 제공하는 측을 서버, 서비스를 요청하는 측에서 사용하는 프로그램을 클라이언트라고 한다. 이런 어플리케이션은 응용 계층에서 동작한다(여기서 응용 계층은 5계층의 세션 계층과 6계층의 표현 계층을 포함하는 의미). 응용 계층에서는 클라이언트의 요청을 서버 프로그램이 이해할 수 있는 데이터로 변환하고 전송한다. 클라이언트 측 어플리케이션과 서버 측 어플리케이션이 통신해야 하기...","categories": ["Network"],
        "tags": ["HTTP","DNS","www"],
        "url": "/network/network07/",
        "teaser": null
      },{
        "title": "08.OSI 모델",
        "excerpt":"1. OSI 모델의 각 계층 응용 계층(세션 계층 + 표현 계층) : 어플리케이션 등에서 사용하는 데이터를 송수신하는 데 필요하다. 전송 계층 : 목적지에 데이터를 정확하게 전달하는 데 필요하다. 네트워크 계층 : 다른 네트워크에 있는 목적지에 데이터를 전달하는 데 필요하다. 데이터 링크 계층 : 랜에서 데이터를 송수신하는 데 피룡하다. 물리 계층...","categories": ["Network"],
        "tags": ["OSI"],
        "url": "/network/network08/",
        "teaser": null
      },{
        "title": "09.무선 랜",
        "excerpt":"1. 무선 랜 무선 랜은 WAP(Wireless Access Point)와 무선 클라이언트(컴퓨터나 스마트폰 등)로 구성된다. 컴퓨터가 WAP(무선 공유기)와 통신하려면 무선 랜 칩(chip)과 무선 랜 어댑터(adapter)가 필요하다. 무선 랜 어댑터는 USB 메모리 방식과 컴퓨터 카드 방식이 있다. 2. 무선 랜 연결 방식 infrastructure : WAP를 통해 통신하는 방식 Ad Hoc : 무선 클라이언트끼리...","categories": ["Network"],
        "tags": ["LAN","Push_Swap","SSID","Channel","beacon"],
        "url": "/network/network09/",
        "teaser": null
      },{
        "title": "뉴턴-랩슨 방법(Newton-Raphson method)",
        "excerpt":"0. Newton’s method, Newton-Raphson method란? Newton’s method 및 Newton-Raphson method 라고 불리는 이 방법은 실숫값 함수의 영점을 근사하는 방법 중 하나이다. 1. 뉴턴-랩슨 방법의 이해 제곱근을 구하는 문제를 생각해보자. \\[f(x)=x^2-N\\] 위의 방정식에서 f(x) = 0이 되는 x값을 구하면 N의 제곱근을 구할 수 있다. 답을 모르는 상황에서 임의의 x = a_1에...","categories": ["numerical-analysis"],
        "tags": ["Newton-Method","Newton-Raphson-Method"],
        "url": "/numerical-analysis/newton-raphson-method/",
        "teaser": null
      }]
