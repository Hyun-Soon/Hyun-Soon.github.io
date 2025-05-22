# 사용법 정리
0. 로컬 테스트
   1. bundle exec jekyll serve

1. sidebar 관리
   1. /data/navigation.yml
   2. /includes/nav_list_main
   3. /pages

2. latex 수식
   1. inline : \$...\$
   2. block : \$\$...\$\$
   
3. design 관리
   1. _config.yml -> minimal_mistakes_skin    : 설정

3-1. skin 관리
	1. /_sass/minimal-mistakes/skins

4. 이미지 첨부
   1. _posts/asset/카테고리 해당하는 폴더에 이미지 넣고 푸쉬
   2. chrome으로 github 블로그 레포 들어가서 해당 이미지까지 들어가기(ex. https://github.com/Hyun-Soon/Hyun-Soon.github.io/blob/main/_posts/asset/C%2B%2B/RTTI_debug.png)
   3. 우클릭 - 이미지 주소 복사
   4. 크롬 주소창에 입력 후 이동
   5. 이동하면 주소창에 주소가 바뀜
   6. 바뀐 해당 주소 복사 후, 글에 첨부(양식 : ![이름](복사한 주소))