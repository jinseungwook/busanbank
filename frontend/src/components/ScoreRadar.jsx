import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import './ScoreRadar.css';

function ScoreRadar({ scores }) {
    const data = [
        { axis: '소비성향', value: scores.spending, fullMark: 100 },
        { axis: '위험감수', value: scores.risk, fullMark: 100 },
        { axis: '관계지향', value: scores.social, fullMark: 100 }
    ];

    return (
        <div className="radar-container">
            <h3 className="radar-title">나의 금융 성향 분석</h3>
            <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={data}>
                    <PolarGrid stroke="#e0e0e0" />
                    <PolarAngleAxis
                        dataKey="axis"
                        tick={{ fill: '#666', fontSize: 14 }}
                    />
                    <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fill: '#999', fontSize: 12 }}
                    />
                    <Radar
                        name="점수"
                        dataKey="value"
                        stroke="#646cff"
                        fill="#646cff"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
            <div className="score-details">
                <div className="score-item">
                    <span className="score-label">소비성향</span>
                    <span className="score-value">{scores.spending}점</span>
                </div>
                <div className="score-item">
                    <span className="score-label">위험감수</span>
                    <span className="score-value">{scores.risk}점</span>
                </div>
                <div className="score-item">
                    <span className="score-label">관계지향</span>
                    <span className="score-value">{scores.social}점</span>
                </div>
            </div>
        </div>
    );
}

export default ScoreRadar;
