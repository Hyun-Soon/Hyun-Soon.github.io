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
      }]
