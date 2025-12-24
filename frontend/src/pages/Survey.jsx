import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import { calculateScores, matchPersona } from '../utils/scoring';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import './Survey.css';

function Survey() {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;

    const handleAnswer = (option) => {
        const newAnswers = [...answers, option];
        setAnswers(newAnswers);

        if (currentIndex < totalQuestions - 1) {
            // 다음 질문으로
            setCurrentIndex(currentIndex + 1);
        } else {
            // 마지막 질문 - 결과 계산
            const scores = calculateScores(newAnswers);
            const persona = matchPersona(scores);

            // 결과 페이지로 이동 (점수와 페르소나 ID 전달)
            navigate(`/result/${persona.id}`, {
                state: { scores, persona }
            });
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setAnswers(answers.slice(0, -1));
        }
    };

    return (
        <div className="survey-container">
            <div className="survey-header">
                <h1 className="survey-title">FinBTI 진단</h1>
                <ProgressBar current={currentIndex + 1} total={totalQuestions} />
            </div>

            <div className="survey-content">
                <QuestionCard
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                />
            </div>

            <div className="survey-footer">
                {currentIndex > 0 && (
                    <button className="back-button" onClick={handleBack}>
                        ← 이전 질문
                    </button>
                )}
            </div>
        </div>
    );
}

export default Survey;
