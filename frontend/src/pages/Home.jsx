import { Link } from 'react-router-dom';
import { personas } from '../data/personas';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <div className="home-hero">
                <h1 className="home-title">
                    🎯 FinBTI
                </h1>
                <p className="home-subtitle">
                    내 지갑 속의 금융 성향 진단 서비스
                </p>
                <p className="home-description">
                    MBTI처럼 재미있는 금융 성향 진단으로<br />
                    나에게 딱 맞는 금융 상품을 찾아보세요!
                </p>
                <Link to="/survey" className="start-button">
                    시작하기 →
                </Link>
            </div>

            <div className="personas-preview">
                <h2 className="preview-title">8가지 금융 페르소나</h2>
                <div className="personas-grid">
                    {personas.map((persona) => (
                        <div key={persona.id} className="persona-preview-card">
                            <div className="persona-preview-emoji">{persona.emoji}</div>
                            <h3 className="persona-preview-name">{persona.name}</h3>
                            <p className="persona-preview-desc">{persona.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="home-footer">
                <p>© 2024 FinBTI. Made with ❤️ for MZ Generation</p>
            </div>
        </div>
    );
}

export default Home;
