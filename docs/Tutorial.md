# 🎓 개발 가이드 (Development Tutorial)

> **프로젝트를 처음 시작하는 분들을 위한 단계별 가이드**

---

## 📌 Step 1: 개발 환경 세팅

### 1.1 필수 도구 설치
- [ ] **JDK 17** 설치 및 환경변수 설정
- [ ] **IntelliJ IDEA** 또는 **Eclipse** 설치
- [ ] **MySQL** 또는 **Oracle XE** 설치
- [ ] **Git** 설치 및 GitHub 계정 연동

### 1.2 프로젝트 클론
```bash
git clone https://github.com/jinseungwook/busanbank.git
cd busanbank
```

---

## 📌 Step 2: Spring Boot 프로젝트 생성

### 2.1 Spring Initializr 사용
1. [start.spring.io](https://start.spring.io) 접속
2. 다음 설정 선택:
   - **Project:** Gradle - Groovy
   - **Language:** Java
   - **Spring Boot:** 3.2.x
   - **Java:** 17
   - **Dependencies:** Spring Web, Spring Data JPA, MySQL Driver, Lombok

3. **Generate** 클릭 후 다운로드
4. 압축 해제 후 프로젝트 루트에 배치

### 2.2 데이터베이스 연결 설정
`src/main/resources/application.yml` 파일 생성:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/concertbank?useSSL=false&serverTimezone=UTC
    username: root
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
```

---

## 📌 Step 3: 기본 엔티티 및 API 작성

### 3.1 User 엔티티 생성
```java
@Entity
@Table(name = "users")
@Getter @Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    
    private String name;
    private String email;
    private Integer point;
}
```

### 3.2 Repository 작성
```java
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
```

### 3.3 Controller 작성
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
```

---

## 📌 Step 4: 프론트엔드 연동 테스트

### 4.1 CORS 설정
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
```

### 4.2 HTML에서 API 호출
`frontend/index.html`에서:
```javascript
fetch('http://localhost:8080/api/users')
    .then(response => response.json())
    .then(data => console.log(data));
```

---

## 📌 Step 5: Redis 연동 (동시성 제어용)

### 5.1 Docker로 Redis 실행
```bash
docker run -d -p 6379:6379 redis:latest
```

### 5.2 의존성 추가 (build.gradle)
```gradle
implementation 'org.springframework.boot:spring-boot-starter-data-redis'
implementation 'org.redisson:redisson-spring-boot-starter:3.23.0'
```

### 5.3 Redisson 설정
```java
@Configuration
public class RedissonConfig {
    @Bean
    public RedissonClient redissonClient() {
        Config config = new Config();
        config.useSingleServer().setAddress("redis://localhost:6379");
        return Redisson.create(config);
    }
}
```

---

## 📌 Step 6: 테스트 작성

### 6.1 JUnit 테스트 예제
```java
@SpringBootTest
class UserServiceTest {
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void testCreateUser() {
        User user = new User();
        user.setName("홍길동");
        user.setEmail("hong@example.com");
        
        User saved = userRepository.save(user);
        assertNotNull(saved.getUserId());
    }
}
```

---

## 📌 Step 7: 배포 준비

### 7.1 JAR 빌드
```bash
./gradlew clean build
```

### 7.2 Docker 이미지 생성 (선택)
```dockerfile
FROM openjdk:17-jdk-slim
COPY build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

---

## 🎯 다음 단계

- [ ] 동시성 제어 로직 구현 (Week 3)
- [ ] JMeter 부하 테스트 (Week 4)
- [ ] README 및 트러블슈팅 문서 작성 (Week 5)

**참고 자료:**
- [Spring Boot 공식 문서](https://spring.io/projects/spring-boot)
- [Redisson 가이드](https://github.com/redisson/redisson)
