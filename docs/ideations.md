# [Project] BNK Local Bridge: 외국인/고령층을 위한 하이브리드 금융 AI 비서

## 1. 프로젝트 비전 (Project Vision)
> **"Security First, Intelligence Second: 보안이 보장된 로컬 금융 AI"**

이 프로젝트는 인터넷 뱅킹 사용이 어려운 **금융 소외 계층(외국인 근로자, 유학생, 디지털 취약 어르신)**을 위해, **자연어(음성/채팅)**로 은행 업무를 수행할 수 있게 돕는 **AI Agent**입니다.
가장 큰 특징은 **"개인정보(PII)는 절대 외부 AI(ChatGPT 등)로 전송되지 않는다"**는 보안 원칙을 아키텍처 레벨에서 강제하는 것입니다.

---

## 2. 구체적 해결 과제 (Problem & Solution)

| 페인 포인트 (Pain Point) | 기술적 해결 방안 (Solution) |
| :--- | :--- |
| **언어 장벽** (금융 용어 난해함) | **LLM 기반 다국어 번역 및 Easy-Talk(쉬운 말 변환) 모듈** 적용 |
| **복잡한 메뉴 구조** | **Intent Classification(의도 분류)**로 메뉴 탐색 없이 바로 기능 실행 |
| **AI 보안 우려** (정보 유출) | **PII Masking Layer**를 두어 계좌번호/주민번호는 외부 전송 전 `***` 처리 |
| **할루시네이션** (거짓 정보) | **RAG (검색 증강 생성) & Spring Boot Actuator**로 검증된 은행 데이터만 답변에 참조 |

---

## 3. 상세 기술 아키텍처 (Technical Architecture)

### 🏗️ Hybrid System Structure
*   **Frontend (Python/Streamlit)**: 마이크 마크를 누르면 음성을 텍스트로 변환(STT)하고, 답변을 음성으로 읽어줌(TTS).
*   **Security Gateway (Python Middleware)**: 사용자의 질문에서 민감정보(주민등록번호, 전화번호)를 Regex/NER로 탐지하여 마스킹.
*   **Core Banking (Spring Boot)**: 실제 계좌 조회, 이체, 상품 가입 등 **돈과 관련된 모든 로직**을 담당. 
*   **LLM Engine (OpenAI/LocalLLM)**: 마스킹된 텍스트를 받아 번역하거나, 사용자의 의도(Intent)를 JSON 형태로 정형화.

### 🔄 Data Flow (Sequence)
1.  **사용자:** "내 부산은행 계좌 112-2222-33-444에 5만 원만 엄마한테 보내줘"
2.  **Security Layer:** `112-2222-33-444` -> `[ACCOUNT_NUM]`으로 치환.
3.  **LLM:** 텍스트 분석 --> `{ intent: "TRANSFER", amount: 50000, target: "mom" }` JSON 추출.
4.  **Spring Boot:**
    *   `token` 검증 및 실제 사용자 인증.
    *   "엄마"가 자주 쓰는 계좌 목록에 있는지 DB 조회.
    *   실제 계좌번호(DB 내부 데이터)를 매핑하여 트랜잭션 준비.
5.  **보안 검증:** "000님에게 50,000원을 이체하시겠습니까?" (Spring이 생성한 신뢰할 수 있는 메시지)
6.  **사용자:** "응, 보내줘" (생체 인증/비밀번호 입력) -> **이체 실행**

---

## 4. 핵심 구현 기능 (Key Features)

### 🌟 기능 1: 다국어 "AI 텔러" (Multilingual Teller)
*   **구현:** LangChain의 `TranslationChain`과 `RouterChain` 활용.
*   **시나리오:** 베트남어 입력 -> 한국어로 변환 -> Spring Boot 금융 상품 검색(예: "외국인 전용 적금") -> 검색 결과(JSON)를 베트남어로 요약 답변.

### 🌟 기능 2: 스마트 문맥 파악 (Context-Aware Chat)
*   **구현:** Redis를 활용한 **Conversation Memory** 구현.
*   **시나리오:** 
    *   User: "지금 환율 얼마야?"
    *   AI: "미국 달러 기준 1,320원입니다."
    *   User: "그럼 100불 바꾸면 얼마 필요해?" (문맥 유지)
    *   AI: "약 13만 2천 원이 예상됩니다 (우대율 미포함)."

### 🌟 기능 3: 디지털 소외 계층을 위한 "큰 글씨 요약"
*   **구현:** LLM 프롬프트 엔지니어링 (`Role: Explain complex financial terms like I'm 5 years old`).
*   **시나리오:** "주택청약종합저축이 뭐야?" -> "집을 살 때 순서를 받기 위해 미리미리 조금씩 돈을 넣어두는 통장이에요!"

---

## 5. 데이터베이스 설계 (ERD Draft)

> 복잡한 은행 시스템의 MVP(최소 기능) 버전

*   **Customers:** `customer_id`, `name`, `risk_propensity` (투자 성향), `language_pref` (선호 언어)
*   **Accounts:** `account_no`, `customer_id`, `balance`, `account_type` (SAVINGS, DEPOSIT)
*   **Products:** `product_code`, `product_name`, `min_rate`, `max_rate`, `description` (Vector Search 대상)
*   **Transactions:** `tx_id`, `account_no`, `amount`, `tx_type`, `tx_time`, `balance_snapshot`

---

## 6. 개발 로드맵 (Roadmap)

| 주차 | 목표 | 상세 내용 |
| :--- | :--- | :--- |
| **Week 1** | **아키텍처 구축** | Spring Boot REST API 설계, Streamlit UI 연동 테스트 |
| **Week 2** | **Core Service** | 계좌 조회/이체(가상), 상품 조회 API 구현 (with MySQL) |
| **Week 3** | **AI Logic** | LangChain 연동, **Function Calling** 구현 (자연어 -> API 호출) |
| **Week 4** | **Security & PII** | 민감정보 마스킹 로직, JWT 인증 기반 사용자 매핑 |
| **Week 5** | **Polish** | 다국어 프롬프트 튜닝, 시연용 시나리오 영상 제작 |

---

## 7. 기대 효과 (Expected Outcome)
*   **기술적:** "Spring Boot의 **안정성**과 Python AI의 **유연성**을 MSA(Microservice) 형태로 결합할 수 있는 통합 역량 증명"
*   **비즈니스:** 부산은행의 글로벌 전략 및 ESG 경영(시니어/외국인 포용)에 정확히 부합하는 서비스 제안
