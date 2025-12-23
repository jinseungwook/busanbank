# [Project] FinBTI Task List

본 문서는 `PRD.md`의 마일스톤을 기반으로 작성된 상세 업무 리스트입니다.

---

## 📅 Week 1: 기획 확정 및 개발 환경 구축

### 📋 기획 완성도 높이기
- [ ] 12~15개 설문 문항 작성 (3가지 축별 가중치 설정)
- [ ] 8가지 페르소나 캐릭터 디자인 (이모지 + 별명 + 설명)
- [ ] 페르소나별 추천 상품 매핑 테이블 작성

### 🗄️ 데이터베이스 설계
- [ ] ERD 작성 (Question_Meta, Persona_Type, User_Result_Log, Product_Catalog, Answer_History)
- [ ] MySQL 컨테이너 실행 (`docker run -d -p 3306:3306 mysql:8.0`)
- [ ] 스키마 생성 SQL 작성 및 실행
- [ ] 초기 데이터 삽입 (Seed Data: 질문, 페르소나, 상품)

### 🏗️ Spring Boot 프로젝트 초기화
- [ ] Spring Initializr로 프로젝트 생성
  - Dependencies: Web, JPA, MySQL Driver, Lombok, Validation
- [ ] `application.yml` 설정 (DB 연결, 포트)
- [ ] 패키지 구조 생성 (`controller`, `service`, `repository`, `entity`, `dto`)

### ⚛️ React 프로젝트 초기화
- [ ] `npx create-react-app finbti --template typescript`
- [ ] Tailwind CSS 설치 및 설정
- [ ] Redux Toolkit 설치 (`@reduxjs/toolkit`, `react-redux`)
- [ ] 폴더 구조 설계 (`components`, `pages`, `store`, `api`)

---

## 📅 Week 2: 핵심 비즈니스 로직 구현

### 💻 Backend API 개발 (Spring Boot)

#### Entity 작성
- [ ] `Question.java` - 질문 엔티티
- [ ] `Persona.java` - 페르소나 엔티티
- [ ] `UserResult.java` - 사용자 결과 로그
- [ ] `Answer.java` - 응답 이력

#### Repository 작성
- [ ] `QuestionRepository` - 질문 조회
- [ ] `PersonaRepository` - 페르소나 조회
- [ ] `UserResultRepository` - 결과 저장/조회

#### Service 작성
- [ ] `QuizService.getAllQuestions()` - 전체 질문 조회
- [ ] `AnalysisService.calculateScores(answers)` - 점수 계산
- [ ] `AnalysisService.matchPersona(scores)` - 페르소나 매칭
- [ ] `ProductService.getRecommendations(personaId)` - 상품 추천

#### Controller 작성
- [ ] `GET /api/quiz/questions` - 질문 목록 반환
- [ ] `POST /api/quiz/submit` - 답변 제출 및 결과 반환
- [ ] `GET /api/products/{personaId}` - 추천 상품 조회

### 🧪 API 테스트
- [ ] Postman으로 모든 엔드포인트 테스트
- [ ] JUnit으로 `AnalysisService` 단위 테스트 작성

---

## 📅 Week 3: Frontend UI/UX 구현

### 🎨 페이지 컴포넌트 개발

#### 랜딩 페이지 (`LandingPage.tsx`)
- [ ] 히어로 섹션 (메인 카피 + CTA 버튼)
- [ ] 서비스 소개 섹션
- [ ] "시작하기" 버튼 → 설문 페이지 이동

#### 설문 페이지 (`QuizPage.tsx`)
- [ ] 질문 한 개씩 표시 (대화형 UI)
- [ ] 진행률 바(Progress Bar) 구현
- [ ] 4지선다 버튼 (1~4점)
- [ ] 뒤로 가기 버튼 (이전 답변 수정)
- [ ] Redux로 답변 상태 관리

#### 결과 페이지 (`ResultPage.tsx`)
- [ ] 페르소나 캐릭터 이미지 + 별명 표시
- [ ] 재미있는 설명 텍스트
- [ ] 3가지 축 점수 시각화 (레이더 차트 or 바 차트)
- [ ] "전체 사용자 중 상위 X%입니다" 통계
- [ ] SNS 공유 버튼 (카카오톡, 인스타그램)

#### 상품 추천 섹션 (`ProductCard.tsx`)
- [ ] 추천 상품 3개 카드 형태로 표시
- [ ] 상품명, 금리, 특징, CTA 버튼
- [ ] "자세히 보기" 클릭 시 외부 링크 이동

### 🔗 API 연동
- [ ] Axios 설치 및 API 클라이언트 설정
- [ ] `GET /api/quiz/questions` 호출하여 질문 로드
- [ ] `POST /api/quiz/submit` 호출하여 결과 받기
- [ ] `GET /api/products/{personaId}` 호출하여 상품 표시

---

## 📅 Week 4: 고급 기능 및 최적화

### 📊 데이터 시각화
- [ ] Chart.js 또는 Recharts 설치
- [ ] 3가지 축 점수를 레이더 차트로 표시
- [ ] 페르소나별 분포 도넛 차트 (관리자용)

### 🎁 SNS 공유 기능
- [ ] Kakao SDK 연동
  - [ ] 카카오 개발자 앱 등록
  - [ ] JavaScript SDK 설치
  - [ ] 공유하기 버튼 구현
- [ ] Open Graph 메타 태그 설정 (동적 이미지 생성)
- [ ] Canvas API로 결과 이미지 생성 (페르소나 + 점수)

### ⚡ 성능 최적화
- [ ] React.memo로 불필요한 리렌더링 방지
- [ ] Lazy Loading (React.lazy + Suspense)
- [ ] 이미지 최적화 (WebP 포맷, CDN 활용)

### 🔒 보안 및 데이터 관리
- [ ] CORS 설정 (Spring Boot)
- [ ] 중복 참여 방지 (세션 ID 기반)
- [ ] 개인정보 처리 방침 페이지 작성

---

## 📅 Week 5: 배포 및 마케팅 준비

### 🚀 배포
- [ ] Docker Compose로 MySQL + Spring Boot 통합
- [ ] AWS EC2 인스턴스 생성
- [ ] Nginx 리버스 프록시 설정
- [ ] React 빌드 (`npm run build`) 및 정적 파일 서빙
- [ ] 도메인 연결 및 HTTPS 설정 (Let's Encrypt)

### 📈 Analytics 설정
- [ ] Google Analytics 4 설치
- [ ] 이벤트 추적 설정
  - 설문 시작
  - 설문 완료
  - 상품 클릭
  - SNS 공유

### 🎬 시연 영상 제작
- [ ] 주요 시나리오 스크립트 작성
  - 시나리오 1: 랜딩 → 설문 → 결과 확인
  - 시나리오 2: SNS 공유 플로우
  - 시나리오 3: 상품 추천 클릭
- [ ] OBS Studio로 화면 녹화
- [ ] 자막 추가 및 편집

### 📝 최종 문서화
- [ ] `README.md` 업데이트
  - 프로젝트 소개
  - 실행 방법
  - 환경변수 설정
  - 스크린샷
- [ ] API 문서 작성 (Swagger 또는 Postman Collection)
- [ ] 트러블슈팅 로그 작성

---

## 🎯 추가 개선 사항 (Optional)

- [ ] 관리자 대시보드 (통계 조회, 페르소나별 분포)
- [ ] 다크 모드 지원
- [ ] 결과 PDF 다운로드 기능
- [ ] 이메일로 결과 전송 기능
- [ ] A/B 테스트 (질문 순서, 카피 변경)

---

## ✅ 완료 기준 (Definition of Done)

각 태스크는 다음 조건을 만족해야 완료로 간주합니다:
1. **코드 작성 완료** 및 Git 커밋
2. **단위 테스트 통과** (JUnit 또는 Jest)
3. **동작 확인** (로컬 환경에서 수동 테스트)
4. **문서화** (주석 또는 README 업데이트)
