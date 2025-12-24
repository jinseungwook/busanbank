import './QuestionCard.css';

function QuestionCard({ question, onAnswer }) {
    return (
        <div className="question-card">
            <h2 className="question-text">{question.content}</h2>
            <div className="options-container">
                {question.options.map((option) => (
                    <button
                        key={option.value}
                        className="option-button"
                        onClick={() => onAnswer(option)}
                    >
                        <span className="option-number">{option.value}</span>
                        <span className="option-label">{option.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default QuestionCard;
