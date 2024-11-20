# 실행 화면

![실행 화면](https://github.com/user-attachments/assets/6bb6d2a5-8ec4-4c27-bb88-a3a2ab7e7eae)

# 초기화

\my-app\\.env 파일에 API 키(브이월드 지도, 범죄주의구간 WMS) 저장

```env
REACT_APP_BJG_API_KEY={생활안전지도 범죄주의구간(전체) API 키}
REACT_APP_BASE_MAP_API_KEY={브이월드 지도 API 키}
```

이후 최상위 디렉토리 콘솔에서

```console
npm run prebuild
```

하시면 됩니다.

실행하시면 클라이언트 패키지 자동 설치 및 build 파일 생성&이동이 진행됩니다.




# 서버 실행 방법

최상위 디렉토리 콘솔에서

```console
npm run start
```

하시면 됩니다.

실행하시면 서버 패키지 자동 설치 및  서버&클라이언트 실행이 진행됩니다.

서버는 localhost:4000/api/cctv

클라이언트는 localhost:3000 으로 접속하시면 됩니다.
