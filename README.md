<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
  &nbsp;&nbsp;
  <a href="https://bun.sh/" target="_blank">
    <img src="https://bun.sh/logo.svg" width="60" alt="Bun.js Logo" />
  </a>
  &nbsp;&nbsp;
  <a href="https://vitejs.dev/" target="_blank">
    <img src="https://vitejs.dev/logo.svg" width="60" alt="Vite Logo" />
  </a>
</p>

<h2 align="center">📺 SDEK팀 비디오 관련 서비스 API</h2>

<h1 align="center">Wacherry Streaming Platform</h1>

<p align="center">
  세명대학교 스마트IT학부 SDEK팀<br />
  🏆 <strong>캡스톤디자인 우수작품 수상</strong>
</p>

---

## 👨‍🏫 지도 및 참여자

- **지도교수**: 이명호
- **지도지원**: 조면균

### 👨‍💻 팀 구성

| 역할    | 이름   | 담당                       |
| ------- | ------ | -------------------------- |
| 팀 리더 | 이성혁 | 아키텍처 설계 및 총괄 책임 |
| 팀원    | 최민성 | 동영상 자료 수집           |
| 팀원    | 정호성 | 작동 테스트                |
| 팀원    | 박윤호 | 동영상 편집 및 업스케일링  |

---

## 🌐 서버 및 기술 스택

- **웹 서버**: 최신 버전 NGINX, HTTPS 적용
- **백엔드 프레임워크**: NestJS (최신 버전 유지)
- **런타임**: Bun.js
- **보안**: SHA-256 기반 암호화
- **호스팅**: Amazon Web Services (AWS)

---

## ⚙️ 주요 기능

- Nest.js + Bun 기반 백엔드 구현
- **비디오 업로드**
- **HLS 기반 스트리밍 제공**
- **실시간 채팅 (WebSocket)**
- **HTTPS 보안 통신**

---

## 의존 S/W 컴포넌트

```
   "@nestjs-modules/mailer": "^2.0.2",
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/passport": "^10.0.3",
    "@nestjs/platform-express": "^10.4.6",
    "@nestjs/platform-socket.io": "^10.4.6",
    "@nestjs/typeorm": "^10.0.2",
    "@nestjs/websockets": "^10.4.5",
    "bcryptjs": "^2.4.3",
    "class-transformer": "^0.5.1",
    "class-validate": "^0.0.1",
    "multer": "^1.4.5-lts.1",
    "mysql2": "^3.11.3",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "reflect-metadata": "^0.2.0",
    "rxjs": "^7.8.1",
    "socket.io": "^4.8.0",
    "typeorm": "^0.3.20",
    "uuid": "^10.0.0"
    개발용 의존:
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^5.0.0",
    "@types/jest": "^29.5.2",
    "@types/multer": "^1.4.12",
    "@types/node": "^20.3.1",
    "@types/passport-local": "^1.0.38",
    "@types/supertest": "^6.0.0",
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "@typescript-eslint/parser": "^8.0.0",
    "eslint": "^9.0.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "jest": "^29.5.0",
    "prettier": "^3.0.0",
    "source-map-support": "^0.5.21",
    "supertest": "^7.0.0",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
```

## 아키텍처 구성

1. 비디오 플레이어, 사용자 UI 제공
2. 모던 UI 프레임워크 적용
3. 실시간 데이터 업데이트
4. 비디오 플레이어 HLS 기술 적용

## 작동 방법

### 의존성 설치

```
bun install
```

### 개발 서버 실행

```
bun run start:dev
```

### 최종 빌드

```
bun run build
```

## 문의

해당 Repository 문의는 이메일: merci726@yahoo.com 문의하세요.

## 라이선스

해당 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 LICENSE 파일을 참고하세요.
