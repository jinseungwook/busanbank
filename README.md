# 🎯 FinBTI: 내 지갑 속의 금융 성향 진단 서비스

> **"MBTI처럼 재미있는 금융 성향 진단으로 나에게 딱 맞는 금융 상품을 찾아보세요!"**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green)](https://spring.io/projects/spring-boot)

---

## 📌 프로젝트 소개 (About)

**FinBTI**는 MZ세대를 위한 게이미피케이션 기반 금융 성향 진단 서비스입니다.
12~15개의 재미있는 질문에 답하면, **8가지 위트 있는 페르소나** 중 하나로 분류되고,
성향에 맞는 맞춤형 금융 상품을 추천받을 수 있습니다.

### 🎯 핵심 가치
- **Fun Banking:** 딱딱한 금융을 게임처럼 경험
- **Hyper-Personalization:** 성향 기반 초개인화 추천
- **Viral Marketing:** SNS 공유를 통한 자연스러운 확산

---

## 🏆 8가지 금융 페르소나 (Persona Types)

| 유형 | 별명 | 한 줄 특징 |
| :---: | :--- | :--- |
| 🐿️ | **인간 다람쥐** | "소금기 가득! 내 사전에 낭비란 없다" |
| 🦁 | **불나방 투자자** | "인생은 한 방! 가즈아!" |
| 💸 | **걸어 다니는 ATM** | "금융치료가 필요해..." |
| 🎅 | **술자리 산타클로스** | "내가 쏠게! 가오는 살아야지" |
| 🤖 | **인간 엑셀** | "내 자산 관리에 빈틈은 없다" |
| 🛌 | **잠자는 숲속의 예금** | "재테크 귀찮아.. 그냥 둘래" |
| 👂 | **유행 따라 힙스터** | "요즘 이게 핫하다며?" |
| 🕯️ | **혼밥의 미식가** | "오직 나를 위해 쓴다" |

---

## 📂 프로젝트 구조 (Repository Structure)

```
busanbank/
├── docs/                    # 📄 기획 및 문서
│   ├── ideations.md        # 프로젝트 아이디어
│   ├── PRD.md              # 제품 요구사항 명세서
│   ├── TASKS.md            # 개발 태스크 체크리스트
│   ├── Tutorial.md         # 개발 가이드
│   └── presentation.md     # Marp 발표 자료
├── backend/                # 🔧 Spring Boot (예정)
├── frontend/               # ⚛️ React (예정)
└── README.md               # 👈 현재 문서
```

---

## 🚀 빠른 시작 (Quick Start)

### Prerequisites
- **Java:** JDK 17 이상
- **Node.js:** 18.x 이상
- **MySQL:** 8.0 이상
- **Docker:** (선택) 컨테이너 환경 구성 시

### 1. 저장소 클론
```bash
git clone https://github.com/jinseungwook/busanbank.git
cd busanbank
```

### 2. 백엔드 실행 (Spring Boot)
```bash
cd backend
./gradlew bootRun
# 서버 실행: http://localhost:8080
```

### 3. 프론트엔드 실행 (React)
```bash
cd frontend
npm install
npm start
# 개발 서버: http://localhost:3000
```

---

## 📊 기술 스택 (Tech Stack)

### Backend
- **Language:** Java 17
- **Framework:** Spring Boot 3.x
- **Database:** MySQL 8.0
- **ORM:** Spring Data JPA
- **Build Tool:** Gradle

### Frontend
- **Library:** React 18 + TypeScript
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Charts:** Chart.js / Recharts
- **HTTP Client:** Axios

### DevOps
- **Containerization:** Docker, Docker Compose
- **Deployment:** AWS EC2, Nginx
- **CI/CD:** GitHub Actions
- **Analytics:** Google Analytics 4

---

## 📝 주요 기능 (Key Features)

### 1️⃣ 대화형 설문
- 챗봇처럼 한 문항씩 등장하는 인터랙티브 UI
- 진행률 바 및 뒤로 가기 기능

### 2️⃣ 성향 분석
- 3가지 축(소비/위험/관계) 점수 계산
- Rule-Based 알고리즘으로 8가지 페르소나 매칭

### 3️⃣ 결과 페이지
- 페르소나 캐릭터 + 재미있는 설명
- 레이더 차트로 점수 시각화
- "전체 사용자 중 상위 X%" 통계

### 4️⃣ 상품 추천
- 페르소나별 맞춤형 금융 상품 3개 제시
- 실시간 금리 정보 (선택)

### 5️⃣ SNS 공유
- 카카오톡, 인스타그램 스토리 공유
- Canvas API로 결과 이미지 자동 생성

---

## 📖 문서 가이드 (Documentation)

- **기획 아이디어:** [`docs/ideations.md`](./docs/ideations.md) - 프로젝트 비전과 페르소나 정의
- **제품 명세서:** [`docs/PRD.md`](./docs/PRD.md) - 기능 정의 및 아키텍처
- **개발 일정:** [`docs/TASKS.md`](./docs/TASKS.md) - 주차별 체크리스트
- **개발 가이드:** [`docs/Tutorial.md`](./docs/Tutorial.md) - 환경 세팅 및 코드 예제
- **발표 자료:** [`docs/presentation.md`](./docs/presentation.md) - Marp 슬라이드

---

## 👤 작성자 (Author)

**진승욱 (Jin Seungwook)**
- 부산은행 IT 직군 지원자
- SSAFY 수료 | BNK경남은행 인턴 경험
- SQLD, ADSP 자격증 보유

---

## 📜 라이선스 (License)

이 프로젝트는 포트폴리오 목적으로 작성되었습니다.

---

## 🎉 기대 효과 (Expected Impact)

### 기술적 역량
- ✅ Full-Stack 개발 (React + Spring Boot)
- ✅ 데이터베이스 설계 (SQLD 역량)
- ✅ 알고리즘 구현 (ADSP 역량)

### 비즈니스 가치
- 📈 MZ세대 타겟 마케팅
- 🎯 높은 상품 전환율
- 🌐 바이럴 마케팅 효과
