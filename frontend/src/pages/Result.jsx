import { useLocation, useNavigate, Link } from 'react-router-dom';
import PersonaCard from '../components/PersonaCard';
import ScoreRadar from '../components/ScoreRadar';
import { calculateRank } from '../utils/scoring';
import './Result.css';

function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const { scores, persona } = location.state || {};

    // 데이터가 없으면 홈으로 리다이렉트
    if (!scores || !persona) {
        navigate('/');
        return null;
    }

    const rank = calculateRank(persona.id);

    return (
        <div className="result-container">
            <div className="result-header">
                <h1 className="result-title">진단 결과</h1>
                <p className="result-subtitle">
                    당신의 금융 성향은...
                </p>
            </div>

            <div className="result-content">
                <PersonaCard persona={persona} showFull={true} />

                <div className="result-stats">
                    <div className="stat-card">
                        <div className="stat-icon">📊</div>
                        <div className="stat-text">
                            <span className="stat-label">희소성</span>
                            <span className="stat-value">상위 {rank}%</span>
                        </div>
                    </div>
                </div>

                <ScoreRadar scores={scores} />

                <div className="result-actions">
                    <button className="share-button">
                        📤 결과 공유하기
                    </button>
                    <Link to="/" className="home-button">
                        🏠 처음으로
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Result;
