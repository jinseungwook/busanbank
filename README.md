# 🏦 BusanBank IT Portfolio Projects

> **부산은행 IT 직군 지원을 위한 기술 역량 증명 프로젝트 모음**

이 저장소는 **금융권 IT 개발자**로서 필요한 핵심 역량을 실제 프로젝트로 구현하여 증명하기 위해 기획되었습니다.

---

## 📂 프로젝트 구조 (Repository Structure)

```
busanbank/
├── docs/                    # 📄 기획 및 문서
│   ├── ideations.md        # 프로젝트 아이디어 (BNK Local Bridge)
│   ├── PRD.md              # 제품 요구사항 명세서 (Concert-Bank)
│   ├── TASKS.md            # 개발 태스크 체크리스트
│   └── presentation.md     # Marp 발표 자료
├── frontend/               # 🎨 프론트엔드 프로토타입
│   └── index.html          # Concert-Bank 랜딩 페이지
└── README.md               # 👈 현재 문서
```

---

## 🎯 주요 프로젝트 (Main Projects)

### 1️⃣ Concert-Bank: 고성능 티켓팅 시스템
**목표:** 대규모 트래픽 환경에서 동시성 제어 및 데이터 무결성 보장

- **핵심 기술:** Java 17, Spring Boot, Redis, Oracle
- **주요 기능:** 분산 락, 대기열 시스템, 트랜잭션 관리
- **상세 문서:** [`docs/PRD.md`](./docs/PRD.md)

### 2️⃣ BNK Local Bridge: 하이브리드 금융 AI 비서
**목표:** 외국인/고령층을 위한 보안이 강화된 AI 뱅킹 서비스

- **핵심 기술:** Spring Boot + Python, LangChain, PII Masking
- **주요 기능:** 다국어 지원, 음성 인터페이스, 의도 분류
- **상세 문서:** [`docs/ideations.md`](./docs/ideations.md)

---

## 🚀 빠른 시작 (Quick Start)

### Prerequisites
- **Java:** JDK 17 이상
- **Python:** 3.9 이상 (AI 프로젝트용)
- **Database:** MySQL 8.0 또는 Oracle XE
- **IDE:** IntelliJ IDEA / VS Code

### 프로젝트 클론
```bash
git clone https://github.com/jinseungwook/busanbank.git
cd busanbank
```

### 프론트엔드 미리보기
```bash
cd frontend
# index.html을 브라우저에서 열기
start index.html  # Windows
```

---

## 📊 기술 스택 요약 (Tech Stack)

| 분류 | 기술 |
|:---|:---|
| **Backend** | Java 17, Spring Boot 3.x, MyBatis, JPA |
| **Database** | Oracle, MySQL, Redis |
| **AI/ML** | Python, LangChain, OpenAI API |
| **Frontend** | HTML/CSS/JS, Streamlit |
| **DevOps** | Docker, Git, GitHub Actions |
| **Testing** | JUnit5, JMeter |

---

## 📝 문서 가이드 (Documentation)

- **기획 아이디어:** [`docs/ideations.md`](./docs/ideations.md) - 프로젝트 비전과 상세 설계
- **제품 명세서:** [`docs/PRD.md`](./docs/PRD.md) - Concert-Bank 기능 정의
- **개발 일정:** [`docs/TASKS.md`](./docs/TASKS.md) - 주차별 체크리스트
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
