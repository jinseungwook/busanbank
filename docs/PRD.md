# [Side Project] FinBTI: 내 지갑 속의 금융 성향 진단 서비스

## 1. 프로젝트 개요 (Project Overview)

본 프로젝트는 **"MBTI처럼 재미있는 금융 성향 진단"**을 통해 MZ세대의 금융 앱 이탈을 방지하고, 
게이미피케이션으로 포장된 **초개인화 상품 추천 시스템**입니다.

### 🎯 기획 배경 (Background)
- **Problem:** 기존 은행 앱의 PFM(자산관리)은 "지출을 줄이세요" 같은 잔소리형 → MZ세대 이탈
- **Insight:** 젊은 세대는 **'나를 규정하고 공유하는 문화'**(MBTI, 혈액형)에 익숙함
- **Solution:** 금융 데이터를 **8가지 위트 있는 페르소나**로 변환하여 재미와 실용성 동시 제공

### 💡 차별화 포인트
1. **Fun Banking:** 딱딱한 금융을 게임처럼 경험
2. **Hyper-Personalization:** 성향 기반 맞춤형 상품 추천
3. **Data Acquisition:** 정성적 고객 데이터 확보 (향후 마이데이터 연계)

---

## 2. 핵심 목표 (Key Objectives)

1. **사용자 참여 증대**
   - 평균 체류 시간 3분 이상 달성
   - SNS 공유율 30% 이상 (바이럴 마케팅)

2. **상품 전환율 향상**
   - 진단 후 상품 클릭률(CTR) 15% 이상
   - 실제 가입 전환율(CVR) 5% 이상

3. **데이터 자산 구축**
   - 월 1,000명 이상의 성향 데이터 수집
   - 향후 AI 추천 모델 학습 데이터로 활용

---

## 3. 기술 스택 (Tech Stack)

*부산은행 IT 직무 요구사항에 부합하는 실무 중심 구성*

| 구분 | 기술 (Technology) | 선정 이유 |
| --- | --- | --- |
| **Backend** | **Java 17, Spring Boot 3.x** | 금융권 표준, 안정적인 트랜잭션 처리 |
| **Frontend** | **React 18 + TypeScript** | 인터랙티브 UI/UX, 컴포넌트 재사용성 |
| **Database** | **MySQL 8.0** | SQLD 역량 활용, 정규화된 스키마 설계 |
| **State Management** | **Redux Toolkit** | 복잡한 진단 상태 관리 |
| **Styling** | **Tailwind CSS** | 빠른 프로토타이핑, 반응형 디자인 |
| **Deployment** | **Docker, AWS EC2** | 컨테이너 기반 배포 경험 |
| **Analytics** | **Google Analytics 4** | 사용자 행동 분석 |

---

## 4. 시스템 아키텍처 (System Architecture)

### 4.1 전체 구조도

```
┌─────────────────────────────────────┐
│   Frontend (React + TypeScript)     │
│   - 대화형 설문 UI                  │
│   - 결과 페이지 (8가지 페르소나)    │
│   - 상품 추천 카드                  │
└──────────────┬──────────────────────┘
               │ REST API
┌──────────────▼──────────────────────┐
│   Backend (Spring Boot)             │
│   - 설문 로직 처리                  │
│   - 점수 계산 알고리즘              │
│   - 페르소나 매칭 엔진              │
│   - 상품 추천 API                   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Database (MySQL)                  │
│   - Question_Meta                   │
│   - Persona_Type                    │
│   - User_Result_Log                 │
│   - Product_Catalog                 │
└─────────────────────────────────────┘
```

### 4.2 사용자 플로우 (User Flow)

1. **진입:** 랜딩 페이지 → "나의 금융 성향 알아보기" 버튼 클릭
2. **진단:** 12~15개 질문에 대화형으로 응답 (1~4점 척도)
3. **분석:** 백엔드에서 3가지 축(소비/위험/관계) 점수 계산
4. **결과:** 8가지 페르소나 중 하나 매칭 + 재미있는 설명
5. **추천:** 성향에 맞는 금융 상품 3개 제시
6. **공유:** SNS 공유 버튼 (이미지 자동 생성)

---

## 5. 8가지 금융 페르소나 (Persona Types)

| 유형 | 별명 | 특징 | 추천 상품 |
| :--- | :--- | :--- | :--- |
| **1. 극안전형** | 🐿️ 인간 다람쥐 | 쿠폰/포인트 집착, 절약의 달인 | 고금리 예금, 파킹통장 |
| **2. 극공격형** | 🦁 불나방 투자자 | "인생은 한 방!" 고위험 선호 | 채권형 펀드, 안전자산 |
| **3. 충동형** | 💸 걸어 다니는 ATM | 스트레스성 지출, 배달/택배 | 자동이체 적금, 소비 알림 |
| **4. 관계형** | 🎅 술자리 산타클로스 | "내가 쏠게!" 관계 중시 | 모임통장, 체크카드 |
| **5. 계획형** | 🤖 인간 엑셀 | 가계부 작성, 체리피커 | ISA, 연금저축 |
| **6. 방관형** | 🛌 잠자는 숲속의 예금 | "재테크 귀찮아.." | CMA, 자동 재예치 |
| **7. 유행형** | 👂 유행 따라 힙스터 | "요즘 핫한 거 뭐야?" | 공모주, 테마 펀드 |
| **8. 가치소비형** | 🕯️ 혼밥의 미식가 | 오직 나를 위한 소비 | 여행 적금, 문화 혜택 |

---

## 6. 주요 기능 명세 (Feature Specifications)

### 6.1 대화형 설문 (Interactive Quiz)
- **기능:** 챗봇처럼 한 문항씩 등장하는 설문 UI
- **구현:** React `useState`로 현재 질문 인덱스 관리, 애니메이션 효과
- **Key Point:** 
  - 진행률 바(Progress Bar) 표시
  - 뒤로 가기 버튼으로 이전 답변 수정 가능

### 6.2 점수 계산 알고리즘 (Scoring Logic)
- **기능:** 사용자 응답을 3가지 축으로 분석
- **구현:** Spring Boot Service 계층에서 Rule-Based 로직
- **예시 코드:**
```java
public String calculatePersona(List<Answer> answers) {
    int spendingScore = 0;
    int riskScore = 0;
    int socialScore = 0;
    
    for (Answer ans : answers) {
        Question q = questionRepository.findById(ans.getQuestionId());
        spendingScore += ans.getValue() * q.getSpendingWeight();
        riskScore += ans.getValue() * q.getRiskWeight();
        socialScore += ans.getValue() * q.getSocialWeight();
    }
    
    // Threshold Mapping
    if (riskScore > 80 && spendingScore > 60) {
        return "불나방 투자자";
    } else if (spendingScore > 80 && socialScore > 70) {
        return "술자리 산타클로스";
    }
    // ... (8가지 조건문)
}
```

### 6.3 결과 페이지 (Result Page)
- **기능:** 페르소나 캐릭터 이미지 + 재미있는 설명 + 통계
- **구현:** 
  - Canvas API로 결과 이미지 동적 생성 (SNS 공유용)
  - "전체 사용자 중 상위 15%입니다!" 같은 상대 비교
- **Key Point:** 공유 욕구를 자극하는 카피라이팅

### 6.4 상품 추천 (Product Recommendation)
- **기능:** 페르소나별 맞춤형 금융 상품 3개 제시
- **구현:** 
  - DB에 `Persona_Product_Mapping` 테이블 설계
  - 실시간 금리 정보 크롤링 (선택)
- **Key Point:** "지금 가입하면 우대금리 0.3%p!" 같은 CTA

### 6.5 SNS 공유 (Social Sharing)
- **기능:** 카카오톡, 인스타그램 스토리 공유
- **구현:** 
  - Kakao SDK 연동
  - Open Graph 메타 태그 설정
- **Key Point:** 공유 시 추천인 코드 삽입 (바이럴 추적)

---

## 7. 데이터베이스 설계 (ERD)

### Question_Meta (질문 메타데이터)
- `question_id` (PK), `content` (질문 내용), `order` (순서)
- `spending_weight`, `risk_weight`, `social_weight` (가중치)

### Persona_Type (페르소나 정의)
- `persona_id` (PK), `name` (별명), `emoji`, `description`
- `min_spending`, `max_spending`, `min_risk`, `max_risk` (점수 범위)

### User_Result_Log (사용자 결과 이력)
- `log_id` (PK), `user_id` (FK, 선택), `session_id` (비회원 추적)
- `spending_score`, `risk_score`, `social_score`
- `matched_persona_id` (FK), `created_at`

### Product_Catalog (상품 카탈로그)
- `product_id` (PK), `product_name`, `category`, `interest_rate`
- `target_persona_ids` (JSON 배열)

### Answer_History (응답 이력)
- `answer_id` (PK), `log_id` (FK), `question_id` (FK), `value` (1~4)

---

## 8. 예상 문제점 및 해결 방안 (Troubleshooting)

| 예상 문제 | 해결 방안 |
| :--- | :--- |
| **중복 참여 방지** | 쿠키/세션 ID 기반 중복 체크, IP 제한 |
| **결과 조작** | 답변 패턴 분석, 이상치 탐지 로직 |
| **서버 부하** | Redis 캐싱, CDN 활용 |
| **개인정보 이슈** | 비회원도 참여 가능, 선택적 정보 수집 |

---

## 9. 향후 일정 (Milestone)

1. **Week 1:** DB 설계, Spring Boot API 구조 설계, React 프로젝트 초기화
2. **Week 2:** 설문 로직 구현, 점수 계산 알고리즘 개발
3. **Week 3:** 결과 페이지 UI/UX 구현, 페르소나 매칭 테스트
4. **Week 4:** 상품 추천 API 연동, SNS 공유 기능
5. **Week 5:** 배포, 성능 테스트, 시연 영상 제작

---

## 10. 기대 효과 (Expected Impact)

### 기술적 역량 증명
- **Full-Stack 개발:** React + Spring Boot 통합 경험
- **데이터 설계:** SQLD 역량을 활용한 정규화된 스키마
- **알고리즘 구현:** ADSP 지식 기반 Rule-Based 분석 로직

### 비즈니스 가치
- **Young Image:** 보수적인 지방은행 → 트렌디한 디지털 뱅킹
- **Viral Marketing:** SNS 공유를 통한 자연스러운 브랜드 홍보
- **Data-Driven Sales:** 성향 데이터 기반 높은 상품 전환율
