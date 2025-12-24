import './PersonaCard.css';

function PersonaCard({ persona, showFull = false }) {
    return (
        <div className="persona-card">
            <div className="persona-emoji">{persona.emoji}</div>
            <h2 className="persona-name">{persona.name}</h2>
            <p className="persona-type">{persona.type}</p>
            <p className="persona-description">{persona.description}</p>

            {showFull && (
                <>
                    <p className="persona-full-description">{persona.fullDescription}</p>

                    <div className="persona-traits">
                        <h3>특징</h3>
                        <ul>
                            {persona.traits.map((trait, index) => (
                                <li key={index}>{trait}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="persona-products">
                        <h3>추천 상품</h3>
                        {persona.recommendedProducts.map((product, index) => (
                            <div key={index} className="product-item">
                                <div className="product-header">
                                    <span className="product-name">{product.name}</span>
                                    <span className="product-rate">{product.rate}</span>
                                </div>
                                <p className="product-description">{product.description}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default PersonaCard;
