# 🚀 NestJS Authentication Project

이 프로젝트는 [NestJS](https://nestjs.com/)를 사용하여 구현된 인증 시스템입니다. JWT 기반의 로그인 및 가입 기능과 함께, API 요청 보안을 위한 가드(guard)를 구현합니다.

## 🌟 기능 

- **로그인**: 사용자는 이메일과 비밀번호를 사용하여 로그인할 수 있습니다.
- **회원가입**: 새로운 사용자는 이름, 이메일, 비밀번호 등의 정보를 제공하여 계정을 생성할 수 있습니다.
- **JWT 인증**: 로그인 성공 시, 사용자에게 JWT 토큰이 발급됩니다.
- **인증된 사용자만이 특정 API에 접근할 수 있습니다.**

## ⚙️ 설정

이 프로젝트를 사용하기 위해서는 다음과 같은 환경 설정이 필요합니다: 
- `.env` 파일에 `JWT_SECRET` 및 데이터베이스 설정을 포함시킵니다.
- 데이터베이스 연결을 위한 [TypeORM](https://typeorm.io/#/) 설정을 `app.module.ts`에 구성합니다.

## 🛠️ 개발 환경

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/#/)
- [MySQL](https://www.mysql.com/) (또는 다른 RDBMS)

## 📚 참고 문서 

- NestJS 공식 문서: [링크](https://nestjs.com/)
- JWT: [링크](https://jwt.io/)
