# [Project] Concert-Bank Task List

본 문서는 `PRD.md`의 마일스톤을 기반으로 작성된 상세 업무 리스트입니다.

## 📅 Week 1: 기획 및 설계 (Requirements & Design)
- [ ] **요구사항 분석**
    - [ ] `PRD.md` 기반 기능 상세 정의
    - [ ] API 명세서 작성 (Swagger/Postman)
- [ ] **데이터베이스 설계**
    - [ ] ERD 작성 (Users, Concerts, Seats, Bookings)
    - [ ] 로컬 또는 클라우드 DB(Oracle/MySQL) 스키마 생성
- [ ] **프로젝트 세팅**
    - [ ] Spring Boot 프로젝트 초기화 (Dependencies: Web, JPA/MyBatis, Lombok)
    - [ ] GitHub Repository 생성 및 연동

## 🚀 Week 2: 핵심 비즈니스 로직 구현 (Core Implementation)
- [ ] **기본 CRUD 구현**
    - [ ] User, Concert 도메인 생성 및 API 구현
    - [ ] Seat(좌석) 조회 API 구현 (공연별 좌석 상태 확인)
- [ ] **예매/결제 로직 (Ver. 1 - 동시성 미고려)**
    - [ ] 좌석 선택 -> 예약 상태 변경 로직
    - [ ] 결제 API Mocking (실제 PG사 연동 전 가상 로직)
    - [ ] 기본 예매 Flow 통합 테스트 (JUnit)

## 🔒 Week 3: 동시성 제어 및 안정성 강화 (Concurrency Control)
- [ ] **동시성 테스트 환경 구축**
    - [ ] 동시성 이슈 재현 테스트 코드 작성 (ExecutorService 활용)
- [ ] **Lock 메커니즘 적용**
    - [ ] DB Lock (Pessimistic/Optimistic) 적용 및 테스트
    - [ ] Redis Distributed Lock (Redisson) 적용 및 테스트
- [ ] **비교 분석**
    - [ ] 각 방식의 성능/장단점 비교 문서화

## ⏳ Week 4: 대기열 시스템 및 최적화 (Queue & Optimization)
- [ ] **대기열 시스템 구현**
    - [ ] Redis Sorted Set 기반 대기열 순번 발급 로직
    - [ ] 대기열 진입 -> 토큰 발급 -> 예매 페이지 접근 허용 Flow
- [ ] **성능 테스트 (JMeter)**
    - [ ] 대용량 트래픽 시나리오 작성
    - [ ] TPS, 레이턴시 측정 및 병목 구간 파악

## 🧹 Week 5: 리팩토링 및 문서화 (Refactoring & Docs)
- [ ] **코드 리팩토링**
    - [ ] 중복 코드 제거 및 가독성 개선
    - [ ] 예외 처리(Exception Handling) 강화 (Custom Exception)
- [ ] **최종 문서화**
    - [ ] `README.md` 작성 (프로젝트 실행 방법, 기술적 의사결정)
    - [ ] 트러블슈팅 로그 정리 (동시성 문제 해결 과정 등)
