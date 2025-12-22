# [Side Project] High-Performance Ticketing & Payment System (가칭: Concert-Bank)

## 1. 프로젝트 개요 (Project Overview)
본 프로젝트는 **'대규모 트래픽 상황에서의 데이터 무결성 보장'**을 목표로 하는 고성능 예매/결제 시스템입니다.
부산은행과 같은 제1금융권의 핵심 요구사항인 **시스템 안정성(Stability)**과 **동시성 제어(Concurrency Control)** 역량을 증명하기 위해 기획되었습니다.

### 🎯 기획 의도 (Why this project?)
- **금융권 기술 적합성:** 실제 은행 시스템에서 가장 중요한 '돈(예산/잔액)'과 '재고(좌석)'의 정확한 트랜잭션 처리를 구현합니다.
- **기술적 난이도 해결:** 선착순 예매 시 발생하는 **Race Condition(경쟁 상태)**을 해결하며 백엔드 딥다이브(Deep Dive) 역량을 보여줍니다.
- **성능 최적화 경험:** 대용량 트래픽 상황을 가정하고 부하 테스트(JMeter)를 통해 병목 구간을 찾아 개선합니다.

---

## 2. 핵심 목표 (Key Objectives)
1. **동시성 제어 완벽 구현:** 다중 접속 환경에서 좌석 중복 예약이 0건이어야 함 (Redis 분산 락, DB Lock 활용).
2. **데이터 정합성 보장:** 결제 실패, 타임아웃 등 예외 상황 발생 시 완벽한 트랜잭션 롤백(Rollback) 처리.
3. **대용량 트래픽 대응:** 대기열(Waiting Queue) 시스템을 도입하여 서버 과부하 방지.

---

## 3. 기술 스택 (Tech Stack)
*부산은행의 레거시 및 최신 스택을 모두 아우르는 하이브리드 구성*

| 구분 | 기술 (Technology) | 선정 이유 |
| --- | --- | --- |
| **Language** | **Java 17** | 금융권 표준 언어 및 LTS 버전 활용 |
| **Framework** | **Spring Boot 3.x** | 생산성 및 최신 생태계 활용 |
| **Database** | **Oracle (XE or Cloud)** | 부산은행 주력 DBMS 경험 (PL/SQL, 힌트 사용 경험 어필) |
| **ORM/Mapper** | **MyBatis** + JPA | 복잡한 쿼리 제어(MyBatis)와, 간단한 CRUD(JPA) 혼용 능력 증명 |
| **Cache/NoSQL** | **Redis** | 분산 락 구현, 대기열(Sorted Set) 관리, 캐싱 |
| **Testing** | JUnit5, JMeter | 단위 테스트 및 부하 테스트 도구 |
| **DevOps** | Docker, Jenkins/Github Actions | 컨테이너 환경 및 CI/CD 파이프라인 구축 경험 |

---

## 4. 주요 기능 명세 (Feature Specifications)

### 4.1. 대기열 시스템 (Waiting Queue)
- **기능:** 트래픽 폭주 시 즉시 DB에 접근하지 않고, Redis를 활용해 대기 순번을 발급.
- **Flow:** 접속 → 토큰 발급 (Redis Sorted Set) → 내 순서 도달 시 입장 가능.
- **Key Point:** `Netty` 기반의 비동기 처리를 고려하거나, Redis 성능 최적화.

### 4.2. 좌석 예약 및 결제 (Booking & Payment)
- **기능:** 좌석 선택 후 '예약 선점' 상태로 변경 및 결제 진행.
- **Flow:** 좌석 선택 → **분산 락 획득** → 좌석 상태 변경(예약중) → 결제 요청 → **결제 성공 시 확정(Commit) / 실패 시 락 해제 및 롤백**.
- **Key Point:** 
    - `Redisson` 라이브러리를 이용한 분산 락 구현.
    - DB 격리 수준(Isolation Level)에 대한 이해와 적용.

### 4.3. 예매 내역 조회 및 취소
- **기능:** 사용자의 예매 내역 조회 및 취소에 따른 환불 로직.
- **Key Point:** 취소 시 재고(좌석)를 다시 원상복구시키는 보상 트랜잭션(Compensating Transaction) 로직.

---

## 5. 데이터베이스 설계 (ERD Draft)

### Users (사용자)
- `user_id` (PK), `name`, `email`, `point` (가상 잔액)

### Concerts (공연)
- `concert_id` (PK), `title`, `open_date`, `total_seats`

### Seats (좌석)
- `seat_id` (PK), `concert_id` (FK), `seat_no`, `status` (AVAILABLE, PENDING, SOLD), `version` (낙관적 락 사용 시)

### Bookings (예매)
- `booking_id` (PK), `user_id` (FK), `seat_id` (FK), `status` (CONFIRMED, CANCELLED), `created_at`

---

## 6. 예상 문제점 및 해결 방안 (Troubleshooting Plan)

| 예상되는 문제 (Problem) | 해결 방안 (Solution) |
| --- | --- |
| **동시성 오류** (좌석 초과 판매) | Redis Distributed Lock 또는 DB `SELECT ... FOR UPDATE` (비관적 락) 적용 비교 분석 |
| **DB 부하** (조회 쿼리 급증) | Redis Caching 전략 (Look-aside) 적용, 인덱스 튜닝 |
| **네트워크 지연** (결제 타임아웃) | 멱등성(Idempotency) 보장 키 설계, 재시도(Retry) 로직 구현 |

---

## 7. 향후 일정 (Milestone)
1. **1주차:** 요구사항 분석, ERD 설계, 세팅
2. **2주차:** 핵심 로직 구현 (좌석 조회, 예약 - 동시성 제어 제외)
3. **3주차:** 동시성 제어 로직(Lock) 적용 및 테스트
4. **4주차:** 대기열 시스템 구현 및 JMeter 부하 테스트
5. **5주차:** 리팩토링 및 문서화 (README, 트러블슈팅 로그 작성)

