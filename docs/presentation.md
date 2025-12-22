---
marp: true
theme: gaia
paginate: true
backgroundColor: #fff
style: |
  section {
    font-family: 'Pretendard', 'Apple SD Gothic Neo', sans-serif;
  }
  h1 {
    color: #d7191f; /* Busan Bank Red */
  }
  h2 {
    color: #333;
    border-bottom: 2px solid #d7191f;
    padding-bottom: 10px;
  }
---

<!-- _class: lead -->
# Concert-Bank
## High-Performance Ticketing & Payment System

**부산은행 IT 직무 역량 어필 프로젝트**
대규모 트래픽에서의 데이터 무결성 보장

---

## 1. 프로젝트 개요 (Overview)

### 🎯 Concert-Bank란?
**"대규모 트래픽 상황에서도 0.1초의 오차 없는 고성능 예매/결제 시스템"**

제1금융권의 핵심 요구사항인 **시스템 안정성(Stability)**과 **데이터 정합성(Integrity)**을 기술적으로 증명하기 위한 사이드 프로젝트입니다.

---

## 2. 기획 의도 (Why this Project?)

1.  **금융권 기술 적합성 (Financial Fit)**
    *   돈(Money)과 재고(Stock)의 정확한 트랜잭션 처리가 핵심인 은행 시스템 모사
2.  **기술적 챌린지 (Technical Challenge)**
    *   선착순 이벤트 시 발생하는 **Race Condition(경쟁 상태)** 제어
3.  **대용량 트래픽 대응 (Optimization)**
    *   JMeter 부하 테스트를 통한 병목 구간 튜닝 및 성능 최적화 경험

---

## 3. 핵심 목표 (Key Objectives)

*   **🔒 동시성 제어 (Concurrency Control)**
    *   Redis 분산 락, DB Lock을 활용하여 **좌석 중복 예약 0건** 달성
*   **🛡️ 데이터 정합성 (Data Integrity)**
    *   결제 실패/타임아웃 발생 시 완벽한 **Transaction Rollback**
*   **🚦 대기열 시스템 (Traffic Queue)**
    *   순번 대기 시스템을 도입하여 서버 과부하 원천 차단

---

## 4. 기술 스택 (Tech Stack)

*   **Language:** Java 17
*   **Framework:** Spring Boot 3.x
*   **Database:** Oracle (Banking Standard)
*   **ORM:** MyBatis (Complex Query) + JPA (Productivity)
*   **Cache/NoSQL:** Redis (Lock, Queue, Cache)
*   **Test:** JUnit, JMeter
*   **DevOps:** Docker, Jenkins/GitHub Actions

---

## 5. 주요 기능 명세 (Core Features)

### 🚀 대기열 시스템 (Waiting Queue)
*   트래픽 폭주 시 DB 보호를 위한 순번 발급
*   Redis `Sorted Set` 활용, 효율적인 대기열 관리

### 🎫 좌석 예약 및 결제 (Booking)
*   **분산 락(Redisson)**을 이용한 동시성 안전지대 확보
*   결제 성공 시 Commit, 실패 시 100% Rollback 보장

---

## 6. 예상 문제 및 해결 (Troubleshooting)

| 예상 문제 | 해결 방안 |
| :--- | :--- |
| **동시성 오류** (좌석 초과) | Redis Distributed Lock vs Pessimistic Lock 비교 적용 |
| **DB 조회 부하** | Redis Cache (Look-aside) 전략으로 부하 분산 |
| **결제 타임아웃** | 멱등성(Idempotency) 키 설계를 통한 중복 결제 방지 |

---

## 7. 개발 일정 (Milestone)

*   **Week 1:** 요구사항 분석, DB(ERD) 설계, 환경 세팅
*   **Week 2:** 핵심 비즈니스 로직(CRUD) 구현
*   **Week 3:** **동시성 제어(Lock) 로직 적용 및 테스트** (Key Week) 🌟
*   **Week 4:** 대기열 시스템 구현 & 부하 테스트
*   **Week 5:** 리팩토링 및 기술 문서(README) 작성

---

<!-- _class: lead -->
# Q&A
### 감사합니다
