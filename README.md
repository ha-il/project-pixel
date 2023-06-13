# 공간이 있는 웹 뮤직 플레이어, "당신의 작업실"
![Group 1](https://github.com/ha-il/project-pixel/assets/108077643/ee17c6e7-6823-4694-99c7-603d1ece4590)


<br/>

## 1. "당신의 작업실"은 어떤 프로젝트인가요?

"당신의 작업실"은 유저에게 자신만의 공간과 함께 웹 뮤직플레이어를 제공하기 위해 만들어진 개인 프로젝트입니다.

<br/>

## 2. "당신의 작업실"을 만드는 사람

|[김형우](https://github.com/sungwoo-shin)|TMI|
| :-: | - |
|<img src="https://avatars.githubusercontent.com/ha-il" width=150px><br />|- 프론트엔드 개발자를 지망하고 있습니다 🧑🏻‍💻<br />- 바닐라 자바스크립트로 코딩하는 것을 좋아합니다 🍨 <br />- 픽셀아트를 좋아하고 취미로 제작하고 있습니다 👾<br />- https://www.instagram.com/hail.pixel/<br />- 달리기를 좋아해서 하프 마라톤에 참가한 경험이 있습니다 🏃🏻‍♂️<br />- 일본어를 전공했습니다 🗼|

<br/>

## 3. "당신의 작업실"을 만들게 된 이유

"당신의 작업실"을 만들게 된 **개인적인 이유**로는 **나만의 작업실**을 갖고 싶다는 마음에서 생겨났습니다. '**내 취향으로 꾸며진** **나만의 작업실에서** **내가 좋아하는 음악을 들으면서** 개발을 할 수 있으면 좋겠다.'라는 생각을 자주 하곤 했습니다. 웹 페이지라는 가상 공간에 **뮤직플레이어가 있는 작은 작업실**을 만들 수 있다면 꽤 재미있는 프로젝트가 될 것 같았고, 저와 같은 욕망을 가진 다른 분들께도 웹사이트라는 가상공간을 통해 자신만의 작업실을 드리고 싶었습니다.

"당신의 작업실"을 만들게 된 **기술적인 이유**로는 **바닐라 자바스크립트로 SPA를 구현**해보고 싶었고 **컴포넌트 단위로 설계**해보고 싶었습니다. 이 두 가지 목표는 리액트와 같은 라이브러리를 사용하면 쉽게 달성할 수 있지만, "내가 **리액트 없이 컴포넌트단위로 SPA를 구현할 수 있을까**?"라는 호기심이 생겨서 바닐라 자바스크립트만으로 프론트엔드 작업을 하는 프로젝트를 해보고 싶었습니다.

<br/>

## 4. "당신의 작업실"을 만드는 기술
**프론트엔드**: JavaScript
**백엔드**: Express.js
**데이터베이스**: MongoDB
**스타일링**: SCSS
**배포**: Heroku

<br/>

## 5. 디렉터리 구조
```
├── images # 프로젝트 이미지 파일
├── src
│   ├── client
│   │   ├── js
│   │   │   ├── components # Component Class를 확장시킨 컴포넌트 파일
│   │   │   ├── core # Component Class 파일
│   │   │   ├── utils # 유틸 함수
│   │   │   └── main.js
│   │   └── scss
│   ├── controllers # 클라이언트 요청을 서버에서 처리하는 함수 파일
│   ├── models # Music, Playlist, User 모델
│   ├── routers # api 라우터
│   ├── views # 서버 측 렌더링 pug 파일
│   ├── db.js # DB 연결 파일
│   ├── init.js
│   └── server.js
├── .gitignore
├── babel.congif.json
├── nodemon.json
├── package-lock.json
├── READEME.md
└── webpack.config.js
```

<br/>

## 6. 주요기능

**프로젝트 링크**: https://pixel-workroom.herokuapp.com/

> 테스트 계정
> - 사용자 이름: test1234
> - 비밀번호: test1!


### 6.1 회원가입/로그인

| 회원가입/로그인 |
| :-: | 
| 모니터 오브젝트 클릭 → 가입하기 클릭 → 가입 정보 입력 → 가입하기 클릭 → 로그인 정보 입력 → 로그인하기 클릭 |
| ![sginup-login](https://github.com/ha-il/project-pixel/assets/108077643/a7761245-2ef5-4a9e-8006-b8ce6051a79e) | 

### 6.2 유튜브 URL로 음악 추가하기
| 유튜브 URL로 음악 추가하기 |
| :-: | 
| 스마트폰 아이콘 클릭 → 음악 아이콘 클릭 → 유튜브 주소 입력 → 영상 찾기 클릭 → 곡 정보 수정 → 음악 등록 클릭 |
| ![music-registration](https://github.com/ha-il/project-pixel/assets/108077643/d31f16cb-f9f5-4c6b-8626-6f9802231579) | 
### 6.3 플레이리스트 만들기
| 플레이리스트 만들기 |
| :-: | 
| 스마트폰 아이콘 클릭 → 리스트 아이콘 클릭 → 플레이리스트 정보 입력 → 플레이리스트 생성 클릭 → 상세 페이지로 이동 → 뒤로가기 버튼 클릭 → 장식장에 플레이리스트 추가 확인 → 플레이리스트 클릭 → 상세페이지로 이동 |
|![playlist-creation](https://github.com/ha-il/project-pixel/assets/108077643/4c8e8e1e-9bab-455c-8459-19def0163441)|
### 6.4 플레이리스트에 인기차트 곡 추가하기
| 플레이리스트에 인기차트 곡 추가하기 |
| :-: | 
| 최초 렌더링시 하단에 인기차트 곡 추천 → `+` 버튼 클릭 → 플레이리스트에 곡 추가 확인 |
| ![add-music](https://github.com/ha-il/project-pixel/assets/108077643/2ba87994-6032-4360-8ffb-039f39367cce) |
### 6.5 음악 검색하고 검색된 음악 추가하기
| 음악 검색하고 검색된 음악 추가하기 |
| :-: | 
| 검색어 입력 → 검색 버튼 클릭 또는 엔터 키 입력 → 검색된 곡 확인 → `+` 버튼 클릭 → 플레이리스트에 곡 추가 확인 |
| ![music-searching](https://github.com/ha-il/project-pixel/assets/108077643/648817ef-814f-4381-a8ff-120cb92a3c08) |
### 6.6 플레이리스트 재생하기
| 플레이리스트 재생하기 |
| :-: | 
| 재생 버튼 클릭 → 음악 재생 → 하단 뮤직 플레이어 클릭 → 현재 재생 중인 곡과 재생 목록 확인 |
|![playing-playlist](https://github.com/ha-il/project-pixel/assets/108077643/dde92e5e-fd1c-4661-9269-6bfd5ffc2e42)|
### 6.7 뮤직 플레이어 기능
| 뮤직 플레이어 기능|
| :-: | 
| 재생/일시정지 버튼으로 재생 조작하기 → 이전곡, 다음곡 버튼으로 곡 변경하기 → 우측 재생목록에서 곡 선택하여 재생하기 → 재생 타임라인 클릭하여 재생 조작하기 → 볼륨 바 클릭하여 음량 조절하기|
|![music-player](https://github.com/ha-il/project-pixel/assets/108077643/5cd6a685-121b-4d95-85a9-c746a235912f)|

### 6.8 인기차트
| 인기차트 |
| :-: | 
| 홈 화면에서 '뮤직뱅크' 오브젝트 클릭 → 인기차트 확인 → 재생 버튼 클릭 → 인기차트 곡 재생|
|![chart](https://github.com/ha-il/project-pixel/assets/108077643/e5a4c8de-ac19-4f2d-a1a7-efad918958fc)|
### 6.9 로그아웃
| 로그아웃 |
| :-: | 
| 홈 화면에서 침대 오브젝트 클릭 → 확인 버튼 클릭 → 로그아웃|
|![logout](https://github.com/ha-il/project-pixel/assets/108077643/4bf80da8-0d00-42a9-935a-0f1ee641af31)|

<br/>

## 7. 개발자 환경 실행 방법

이 항목은 **개발자 환경**에서 프로젝트를 실행하고 싶은 분들을 위한 내용이 담겨져 있습니다. 

**개발자 환경**에서 실행해보고 싶은 분들은 **아래의 실행 방법**을 따라주시면 됩니다.

> </br>
> <h3>실행하기 전에</h3>
> 
>  1. MongoDB Community Edition이 설치되어 있어야 합니다.
>
>  - 설치 링크: https://www.mongodb.com/docs/manual/administration/install-community/
>
> 2. 유튜브 URL로 음악 등록하려면 Google API 키가 필요합니다.
> - 해당 기능을 이용하실 분은 아래 링크로 이동하여 "시작하기 전에" 항목을 따르시고 API Key를 발급받으셔야 합니다.
> - 가이드 링크: https://developers.google.com/youtube/v3/getting-started?hl=ko#before-you-start
> - API 키가 없어도 프로젝트 실행은 가능합니다.
> </br>

</br>

1. 터미널에 아래 명령어를 입력하여 의존성(dependencies)을 설치합니다.
    ```
    npm install
    ```
2. 프로젝트 루트 경로에 환경 변수 파일(.env)을 만들고 아래와 같이 입력해주세요.
    ```
    // ${my-app}에 원하는 이름을 넣어주세요.
    DB_URL=mongodb://127.0.0.1:27017/${my-app}

    // ${my-cookie}에 알파벳 대문자, 알파벳 소문자, 특수문자가 무작위로 포함된 40자 이상의 문자열을 입력해주세요.
    COOKIE_SECRET=${my-cookie}

    // 유튜브 URL로 음악 등록 기능을 사용할 분들만 ${my-api-key}에 자신의 구글 API 키를 입력해주세요.
    // 입력하지 않아도 프로젝트는 실행됩니다.
    YOUTUBE_DATA_API_KEY=${my-api-key}
    ```
3. 터미널에 아래 명령어를 입력합니다.
    ```
    npm run dev:assets // assets 폴더를 생성합니다
    ```
4. 새로운 터미널 창에 아래 명령어를 입력합니다.
    ```
    npm run dev:server // 서버를 실행합니다.
    ```
5. "http://localhost:4000/"으로 접속합니다.

<br/>

## 8. 수상 실적
| 수상 일자 | 대회명 | 최종 실적 | 관련 URL |
| :- | :- | :- | :- |
| 23.06.01  | 노마드코더 멜론 클론코딩 컨테스트 2기 | 준우승 | https://nomadcoders.co/community/thread/7949 |

<br/>

## 9. 라이센스
MIT © 김형우, Inc. See [LICENSE](./LICENSE) for details.


