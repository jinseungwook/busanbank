# [Project] BNK Local Bridge Task List

본 문서는 `PRD.md`의 마일스톤을 기반으로 작성된 상세 업무 리스트입니다.

---

## 📅 Week 1: 시스템 설계 및 기본 환경 구축

### 🔧 개발 환경 세팅
- [ ] JDK 17 설치 및 환경변수 설정
- [ ] Python 3.9+ 가상환경 생성 (`venv` or `conda`)
- [ ] IntelliJ IDEA / VS Code 설치 및 플러그인 설정
- [ ] Docker Desktop 설치 (MySQL 컨테이너용)

### 🗄️ 데이터베이스 설계
- [ ] ERD 작성 (Customers, Accounts, Products, Transactions, ConversationHistory)
- [ ] MySQL 컨테이너 실행 (`docker run -d -p 3306:3306 mysql:8.0`)
- [ ] 스키마 생성 및 초기 데이터 삽입 (Seed Data)
- [ ] 정규화 검증 (3NF 이상)

### 🏗️ Spring Boot 프로젝트 초기화
- [ ] Spring Initializr로 프로젝트 생성
  - Dependencies: Web, JPA, MySQL Driver, Lombok, Security, Validation
- [ ] `application.yml` 설정 (DB 연결, JWT Secret)
- [ ] 기본 패키지 구조 생성 (`controller`, `service`, `repository`, `entity`, `dto`)

### 🐍 Python 프로젝트 초기화
- [ ] Streamlit 프로젝트 생성 (`streamlit hello` 테스트)
- [ ] 필수 라이브러리 설치
  - `pip install langchain openai streamlit requests redis`
- [ ] `.env` 파일 생성 (OpenAI API Key 관리)

---

## 📅 Week 2: 핵심 비즈니스 로직 구현

### 💰 계좌 관리 API (Spring Boot)
- [ ] **Entity 작성**
  - [ ] `Customer.java`, `Account.java`, `Transaction.java`
- [ ] **Repository 작성**
  - [ ] `AccountRepository` (계좌 조회, 잔액 업데이트)
- [ ] **Service 작성**
  - [ ] `AccountService.getBalance(accountNo)` - 잔액 조회
  - [ ] `AccountService.transfer(from, to, amount)` - 이체 (트랜잭션 처리)
- [ ] **Controller 작성**
  - [ ] `GET /api/accounts/{accountNo}/balance`
  - [ ] `POST /api/accounts/transfer`

### 🏦 상품 조회 API (Spring Boot)
- [ ] **Entity 작성**
  - [ ] `Product.java` (상품 코드, 이름, 금리, 설명)
- [ ] **Service 작성**
  - [ ] `ProductService.searchProducts(keyword)` - 키워드 검색
  - [ ] `ProductService.recommendProducts(riskPropensity)` - 성향 기반 추천
- [ ] **Controller 작성**
  - [ ] `GET /api/products?keyword={keyword}`
  - [ ] `GET /api/products/recommend?risk={level}`

### 🧪 API 테스트
- [ ] Postman으로 모든 엔드포인트 테스트
- [ ] JUnit으로 Service 계층 단위 테스트 작성

---

## 📅 Week 3: AI 로직 구현 (LangChain 연동)

### 🤖 LangChain 기본 연동
- [ ] OpenAI API 연결 테스트 (`langchain.llms.OpenAI`)
- [ ] 간단한 질의응답 체인 구현 (`LLMChain`)

### 🌐 다국어 번역 기능
- [ ] `TranslationChain` 구현
  - [ ] 한국어 ↔ 영어
  - [ ] 한국어 ↔ 베트남어
  - [ ] 한국어 ↔ 중국어
- [ ] 금융 용어 사전(Glossary) 작성 및 Few-Shot 예제 추가

### 🎯 Intent Classification (의도 분류)
- [ ] Function Calling 구현
  - [ ] 사용자 입력 → JSON 변환 (`{ "intent": "CHECK_BALANCE", ... }`)
  - [ ] 지원 Intent: `CHECK_BALANCE`, `TRANSFER`, `SEARCH_PRODUCT`, `RECOMMEND_PRODUCT`
- [ ] Spring Boot API 호출 로직 작성 (`requests.post()`)

### 💬 Conversation Memory 구현
- [ ] Redis 컨테이너 실행 (`docker run -d -p 6379:6379 redis`)
- [ ] `ConversationBufferMemory` 설정 (최대 10턴)
- [ ] 세션 ID 기반 대화 이력 저장/조회

---

## 📅 Week 4: 보안 강화 및 PII 보호

### 🔒 PII Masking Layer 구현
- [ ] 정규식 기반 마스킹 함수 작성
  - [ ] 계좌번호: `\d{3}-\d{4}-\d{2}-\d{3}` → `[ACCOUNT_NUM]`
  - [ ] 주민등록번호: `\d{6}-\d{7}` → `[SSN]`
  - [ ] 전화번호: `010-\d{4}-\d{4}` → `[PHONE]`
- [ ] NER (Named Entity Recognition) 추가 검증
  - [ ] spaCy 또는 Hugging Face Transformers 활용
- [ ] 로그 파일에도 마스킹 적용

### 🔐 JWT 인증 구현 (Spring Boot)
- [ ] `JwtTokenProvider` 클래스 작성
  - [ ] `generateToken(userId)` - 토큰 발급
  - [ ] `validateToken(token)` - 토큰 검증
- [ ] `JwtAuthenticationFilter` 작성
  - [ ] 모든 API 요청에서 JWT 검증
- [ ] Streamlit에서 JWT를 헤더에 포함하여 API 호출

### 🧪 보안 테스트
- [ ] PII 마스킹 테스트 (다양한 패턴 입력)
- [ ] JWT 만료/위조 시나리오 테스트
- [ ] SQL Injection 방어 확인 (Prepared Statement 사용)

---

## 📅 Week 5: UI/UX 개선 및 시연 준비

### 🎤 음성 인터페이스 구현 (Streamlit)
- [ ] STT (Speech-to-Text) 구현
  - [ ] `streamlit-audio-recorder` 라이브러리 사용
  - [ ] OpenAI Whisper API 연동
- [ ] TTS (Text-to-Speech) 구현
  - [ ] `gTTS` 또는 `pyttsx3` 라이브러리 사용
  - [ ] 느린 속도 옵션 추가 (고령층 배려)

### 🎨 UI 디자인 개선
- [ ] Streamlit 테마 커스터마이징 (부산은행 컬러 적용)
- [ ] 큰 글씨 모드 토글 버튼 추가
- [ ] 언어 선택 드롭다운 메뉴 구현

### 📊 RAG (검색 증강 생성) 구현
- [ ] Vector DB 설정 (Chroma 또는 FAISS)
- [ ] 상품 설명 임베딩 생성 (`OpenAIEmbeddings`)
- [ ] 유사도 검색 기반 상품 추천 로직

### 🎬 시연 영상 제작
- [ ] 주요 시나리오 스크립트 작성
  - [ ] 시나리오 1: 베트남어로 계좌 잔액 조회
  - [ ] 시나리오 2: 음성으로 이체 요청
  - [ ] 시나리오 3: 쉬운 말로 상품 설명 듣기
- [ ] OBS Studio로 화면 녹화
- [ ] 자막 추가 및 편집

### 📝 최종 문서화
- [ ] `README.md` 업데이트 (실행 방법, 환경변수 설정)
- [ ] 트러블슈팅 로그 작성 (겪었던 문제와 해결 방법)
- [ ] API 문서 작성 (Swagger 또는 Postman Collection)

---

## 🎯 추가 개선 사항 (Optional)

- [ ] 로컬 LLM 연동 (Ollama) - 오프라인 동작 가능
- [ ] 다크 모드 지원
- [ ] 대화 이력 내보내기 (PDF/Excel)
- [ ] 관리자 대시보드 (통계 조회)

---

## ✅ 완료 기준 (Definition of Done)

각 태스크는 다음 조건을 만족해야 완료로 간주합니다:
1. **코드 작성 완료** 및 Git 커밋
2. **단위 테스트 통과** (JUnit 또는 pytest)
3. **동작 확인** (수동 테스트 또는 시연)
4. **문서화** (주석 또는 README 업데이트)
