# 🎓 FinBTI 개발 가이드 (Development Tutorial)

> **프로젝트를 처음 시작하는 분들을 위한 단계별 가이드**

---

## 📌 Step 1: 개발 환경 세팅

### 1.1 필수 도구 설치
- [ ] **JDK 17** 설치 및 환경변수 설정
- [ ] **Node.js 18.x** 설치
- [ ] **MySQL 8.0** 설치 (또는 Docker 사용)
- [ ] **IntelliJ IDEA** 또는 **VS Code** 설치
- [ ] **Git** 설치 및 GitHub 계정 연동

### 1.2 프로젝트 클론
```bash
git clone https://github.com/jinseungwook/busanbank.git
cd busanbank
```

---

## 📌 Step 2: 데이터베이스 설계 및 생성

### 2.1 MySQL 데이터베이스 생성
```sql
CREATE DATABASE finbti CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE finbti;
```

### 2.2 테이블 생성 (ERD 기반)

#### Question_Meta 테이블
```sql
CREATE TABLE question_meta (
    question_id INT PRIMARY KEY AUTO_INCREMENT,
    content VARCHAR(500) NOT NULL,
    question_order INT NOT NULL,
    spending_weight DECIMAL(3,2) DEFAULT 0,
    risk_weight DECIMAL(3,2) DEFAULT 0,
    social_weight DECIMAL(3,2) DEFAULT 0
);
```

#### Persona_Type 테이블
```sql
CREATE TABLE persona_type (
    persona_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    emoji VARCHAR(10),
    description TEXT,
    min_spending INT,
    max_spending INT,
    min_risk INT,
    max_risk INT
);
```

#### User_Result_Log 테이블
```sql
CREATE TABLE user_result_log (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    session_id VARCHAR(255),
    spending_score INT,
    risk_score INT,
    social_score INT,
    matched_persona_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (matched_persona_id) REFERENCES persona_type(persona_id)
);
```

### 2.3 초기 데이터 삽입 (Seed Data)
```sql
-- 페르소나 데이터 예시
INSERT INTO persona_type (name, emoji, description, min_spending, max_spending, min_risk, max_risk)
VALUES 
('인간 다람쥐', '🐿️', '소금기 가득! 내 사전에 낭비란 없다', 0, 30, 0, 30),
('불나방 투자자', '🦁', '인생은 한 방! 가즈아!', 60, 100, 70, 100);
```

---

## 📌 Step 3: Spring Boot 백엔드 개발

### 3.1 프로젝트 생성
1. [start.spring.io](https://start.spring.io) 접속
2. 설정:
   - **Project:** Gradle - Groovy
   - **Language:** Java
   - **Spring Boot:** 3.2.x
   - **Java:** 17
   - **Dependencies:** Spring Web, Spring Data JPA, MySQL Driver, Lombok, Validation

3. **Generate** 후 `backend/` 폴더에 압축 해제

### 3.2 application.yml 설정
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/finbti?useSSL=false&serverTimezone=UTC
    username: root
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: true
    properties:
      hibernate:
        format_sql: true

server:
  port: 8080
```

### 3.3 Entity 작성 예시

#### Question.java
```java
@Entity
@Table(name = "question_meta")
@Getter @Setter
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer questionId;
    
    private String content;
    private Integer questionOrder;
    private BigDecimal spendingWeight;
    private BigDecimal riskWeight;
    private BigDecimal socialWeight;
}
```

### 3.4 Service 로직 예시

#### AnalysisService.java
```java
@Service
public class AnalysisService {
    
    public String calculatePersona(List<AnswerDto> answers) {
        int spendingScore = 0;
        int riskScore = 0;
        int socialScore = 0;
        
        for (AnswerDto ans : answers) {
            Question q = questionRepository.findById(ans.getQuestionId())
                .orElseThrow();
            
            spendingScore += ans.getValue() * q.getSpendingWeight().intValue();
            riskScore += ans.getValue() * q.getRiskWeight().intValue();
            socialScore += ans.getValue() * q.getSocialWeight().intValue();
        }
        
        // Threshold Mapping
        if (riskScore > 80 && spendingScore > 60) {
            return "불나방 투자자";
        } else if (spendingScore < 30 && riskScore < 30) {
            return "인간 다람쥐";
        }
        // ... 나머지 조건
        
        return "혼밥의 미식가"; // 기본값
    }
}
```

---

## 📌 Step 4: React 프론트엔드 개발

### 4.1 프로젝트 생성
```bash
npx create-react-app frontend --template typescript
cd frontend
```

### 4.2 Tailwind CSS 설치
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**tailwind.config.js 수정:**
```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 4.3 Redux Toolkit 설치
```bash
npm install @reduxjs/toolkit react-redux
```

### 4.4 컴포넌트 예시

#### QuizPage.tsx
```typescript
import React, { useState } from 'react';

const QuizPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (value: number) => {
    setAnswers([...answers, value]);
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(currentQuestion / 15) * 100}%` }}
            />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">
          질문 {currentQuestion + 1} / 15
        </h2>
        
        <p className="text-lg mb-8">
          {/* 질문 내용 */}
        </p>
        
        <div className="space-y-3">
          {[1, 2, 3, 4].map((value) => (
            <button
              key={value}
              onClick={() => handleAnswer(value)}
              className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
            >
              선택지 {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
```

---

## 📌 Step 5: API 연동

### 5.1 Axios 설치
```bash
npm install axios
```

### 5.2 API 클라이언트 설정

#### api/client.ts
```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getQuestions = () => apiClient.get('/quiz/questions');
export const submitAnswers = (answers: any) => apiClient.post('/quiz/submit', answers);
export const getProducts = (personaId: number) => apiClient.get(`/products/${personaId}`);

export default apiClient;
```

---

## 📌 Step 6: 배포 준비

### 6.1 Docker Compose 설정

#### docker-compose.yml
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: finbti
    ports:
      - "3306:3306"
  
  backend:
    build: ./backend
    ports:
      - "8080:8080"
    depends_on:
      - mysql
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
```

### 6.2 실행
```bash
docker-compose up -d
```

---

## 🎯 다음 단계

- [ ] SNS 공유 기능 구현 (Kakao SDK)
- [ ] Google Analytics 연동
- [ ] AWS EC2 배포
- [ ] 시연 영상 제작

**참고 자료:**
- [Spring Boot 공식 문서](https://spring.io/projects/spring-boot)
- [React 공식 문서](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
