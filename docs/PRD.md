# [Side Project] BNK Local Bridge: 하이브리드 금융 AI 비서

## 1. 프로젝트 개요 (Project Overview)

본 프로젝트는 **"금융 소외 계층(외국인, 고령층)을 위한 보안 강화형 AI 뱅킹 서비스"**입니다.
부산은행의 핵심 가치인 **지역 밀착형 금융**과 **디지털 혁신**을 결합하여, 복잡한 은행 업무를 **자연어(음성/채팅)**로 쉽게 처리할 수 있도록 돕습니다.

### 🎯 기획 배경 (Background)
- **BNK경남은행 인턴 경험:** 외국인 모드 기획 당시 느낀 "언어 장벽으로 인한 금융 접근성 문제"를 기술로 해결
- **차별화 포인트:** 개인정보(PII)를 외부 AI 서버로 전송하지 않는 **로컬 우선(Local-First) 아키텍처**
- **기술적 도전:** Spring Boot(금융 로직)와 Python(AI 로직)의 **이기종 시스템 통합**

---

## 2. 핵심 목표 (Key Objectives)

1. **보안 우선 설계 (Security First)**
   - 계좌번호, 주민번호 등 민감정보는 **PII Masking Layer**에서 자동 마스킹 후 AI 처리
   - 금융 거래는 100% Spring Boot에서만 실행 (AI는 의도 파악만 담당)

2. **다국어 지원 (Multilingual Support)**
   - 베트남어, 영어, 중국어 등 **5개 언어** 실시간 번역
   - LangChain의 `TranslationChain`을 활용한 자연스러운 번역

3. **사용자 경험 최적화 (UX Optimization)**
   - 음성 인터페이스(STT/TTS) 지원으로 **비대면 텔러** 경험 제공
   - 복잡한 금융 용어를 쉬운 말로 바꿔주는 **Easy-Talk 모드**

---

## 3. 기술 스택 (Tech Stack)

*금융권 표준(Java)과 AI 혁신(Python)의 하이브리드 구성*

| 구분 | 기술 (Technology) | 선정 이유 |
| --- | --- | --- |
| **Core Banking** | **Java 17, Spring Boot 3.x** | 부산은행 메인 시스템 표준. 트랜잭션 안정성 보장 |
| **AI Layer** | **Python 3.9+, LangChain** | LLM 연동 및 자연어 처리의 생산성 |
| **Frontend** | **Streamlit** | 빠른 프로토타이핑 및 음성 UI 구현 |
| **Database** | **MySQL 8.0 (Docker)** | 로컬 환경 구성 용이, SQLD 역량 활용 |
| **LLM** | **OpenAI API / Ollama** | 다국어 번역 및 의도 분류 (로컬 LLM 옵션 제공) |
| **Communication** | **REST API (JSON)** | 이기종 시스템 간 표준 통신 규약 |
| **Security** | **JWT, Regex/NER** | 인증 토큰 및 PII 탐지/마스킹 |

---

## 4. 시스템 아키텍처 (System Architecture)

### 4.1 레이어 구조 (Layer Structure)

```
┌─────────────────────────────────────┐
│   User Interface (Streamlit)        │  ← 음성/텍스트 입력
│   - STT (Speech-to-Text)            │
│   - TTS (Text-to-Speech)            │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Security Gateway (Python)         │  ← PII Masking
│   - Regex: 계좌번호/주민번호 탐지   │
│   - NER: 개인정보 엔티티 인식       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   AI Engine (LangChain + LLM)       │  ← 의도 파악
│   - Intent Classification           │
│   - Translation (5 languages)       │
│   - Function Calling (JSON)         │
└──────────────┬──────────────────────┘
               │ REST API (POST /api/intent)
┌──────────────▼──────────────────────┐
│   Core Banking (Spring Boot)        │  ← 금융 거래 실행
│   - 계좌 조회/이체                  │
│   - 상품 추천                       │
│   - 트랜잭션 관리                   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Database (MySQL)                  │
│   - Customers, Accounts, Products   │
└─────────────────────────────────────┘
```

### 4.2 데이터 흐름 예시 (Data Flow Example)

**시나리오:** "내 계좌 잔액 알려줘"

1. **User (음성):** "Tài khoản của tôi còn bao nhiêu tiền?" (베트남어)
2. **STT:** 음성 → 텍스트 변환
3. **Security Gateway:** 민감정보 없음 → 통과
4. **LLM (Translation):** 베트남어 → 한국어 번역 ("내 계좌 잔액이 얼마야?")
5. **LLM (Intent):** `{ "intent": "CHECK_BALANCE", "account_id": "user_token" }`
6. **Spring Boot:**
   - JWT 토큰으로 사용자 인증
   - DB에서 계좌 잔액 조회: `balance = 1,234,567원`
7. **LLM (Response):** "현재 잔액은 123만 4천 567원입니다" → 베트남어 번역
8. **TTS:** 텍스트 → 음성 출력

---

## 5. 주요 기능 명세 (Feature Specifications)

### 5.1 다국어 AI 텔러 (Multilingual Teller)
- **기능:** 5개 언어(한국어, 영어, 중국어, 베트남어, 타갈로그어) 실시간 번역
- **구현:** LangChain `TranslationChain` + OpenAI GPT-4
- **Key Point:** 금융 전문 용어 번역 정확도 향상을 위한 Few-Shot Prompting

### 5.2 문맥 유지 대화 (Context-Aware Chat)
- **기능:** 이전 대화 내용을 기억하여 자연스러운 대화 흐름 유지
- **구현:** Redis를 활용한 Conversation Memory (세션당 최대 10턴)
- **Key Point:** 개인정보는 메모리에 저장하지 않고 세션 ID만 관리

### 5.3 음성 인터페이스 (Voice Interface)
- **기능:** 마이크 입력 → STT → AI 처리 → TTS → 스피커 출력
- **구현:** Streamlit `audio_recorder` + OpenAI Whisper (STT) + gTTS (TTS)
- **Key Point:** 고령층을 위한 느린 속도 TTS 옵션 제공

### 5.4 Easy-Talk 모드 (쉬운 말 변환)
- **기능:** 복잡한 금융 용어를 초등학생도 이해할 수 있는 쉬운 말로 변환
- **구현:** LLM 프롬프트 엔지니어링 (`Explain like I'm 5 years old`)
- **예시:** "주택청약종합저축" → "집을 사려고 미리 돈을 모아두는 통장"

### 5.5 상품 추천 (Product Recommendation)
- **기능:** 사용자의 투자 성향과 목표에 맞는 금융 상품 추천
- **구현:** RAG (Retrieval-Augmented Generation) + Vector DB (Chroma)
- **Key Point:** 실제 부산은행 상품 데이터를 임베딩하여 검색

---

## 6. 데이터베이스 설계 (ERD Draft)

### Customers (고객)
- `customer_id` (PK), `name`, `language_pref` (선호 언어), `risk_propensity` (투자 성향)

### Accounts (계좌)
- `account_no` (PK), `customer_id` (FK), `balance`, `account_type` (SAVINGS, CHECKING)

### Products (상품)
- `product_code` (PK), `product_name`, `min_rate`, `max_rate`, `description`, `embedding` (Vector)

### Transactions (거래 내역)
- `tx_id` (PK), `account_no` (FK), `amount`, `tx_type` (DEPOSIT, WITHDRAW, TRANSFER), `tx_time`

### ConversationHistory (대화 이력)
- `session_id` (PK), `customer_id` (FK), `messages` (JSON), `created_at`, `expires_at`

---

## 7. 보안 설계 (Security Design)

### 7.1 PII Masking Layer
```python
def mask_pii(text: str) -> str:
    # 계좌번호 패턴: 123-4567-89-012
    text = re.sub(r'\d{3}-\d{4}-\d{2}-\d{3}', '[ACCOUNT_NUM]', text)
    # 주민등록번호 패턴: 123456-1234567
    text = re.sub(r'\d{6}-\d{7}', '[SSN]', text)
    return text
```

### 7.2 인증 흐름 (Authentication Flow)
1. 사용자 로그인 → Spring Boot에서 JWT 발급
2. Streamlit에서 JWT를 헤더에 포함하여 API 호출
3. Spring Boot에서 JWT 검증 후 사용자 정보 추출

---

## 8. 예상 문제점 및 해결 방안 (Troubleshooting Plan)

| 예상 문제 | 해결 방안 |
| :--- | :--- |
| **할루시네이션** (거짓 정보 생성) | RAG 패턴 적용: DB에서 검증된 데이터만 LLM에 제공 |
| **번역 정확도** | 금융 용어 사전(Glossary)을 Few-Shot 예제로 제공 |
| **응답 속도** | Redis 캐싱 + 자주 묻는 질문(FAQ) 사전 생성 |
| **PII 유출** | 정규식 + NER 이중 검증, 로그에도 마스킹 적용 |

---

## 9. 향후 일정 (Milestone)

1. **Week 1:** Spring Boot API 설계, MySQL 스키마 생성, Streamlit UI 프로토타입
2. **Week 2:** 계좌 조회/이체 API 구현, LangChain 기본 연동
3. **Week 3:** 다국어 번역 및 Intent Classification 구현
4. **Week 4:** PII Masking Layer 구현, 보안 테스트
5. **Week 5:** 음성 인터페이스 추가, 시연 영상 제작

---

## 10. 기대 효과 (Expected Impact)

### 기술적 역량 증명
- **이기종 시스템 통합:** Java와 Python의 협업 아키텍처 설계 능력
- **보안 설계:** 금융권 필수 요구사항인 PII 보호 구현
- **AI 활용:** LLM을 실무에 안전하게 적용하는 방법론 제시

### 비즈니스 가치
- **부산은행 ESG 경영:** 금융 소외 계층 포용 (외국인, 고령층)
- **글로벌 전략:** 다국어 지원으로 해외 진출 기반 마련
- **디지털 혁신:** AI를 활용한 차세대 뱅킹 서비스 선도
