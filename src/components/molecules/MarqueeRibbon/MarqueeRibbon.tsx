import './MarqueeRibbon.css';

export default function MarqueeRibbon() {

    const items: string[] = [
        'FULLSTACK DEVELOPER',
        'REACT 19',
        'TYPESCRIPT',
        'PYTHON / FLASK',
        'POSTGRESQL',
        'NODE.JS & APIS',
        'UI/UX CRAFT',
        'FRAMER MOTION',
        'AI INTEGRATION & RAG',
        'CLEAN CODE'
    ];

    return (
        <div className="marquee-ribbon-wrapper" aria-hidden="true">
            <div className="marquee-ribbon-content">
                {[...items, ...items, ...items, ...items].map((item, idx) => (
                    <div key={idx} className="marquee-item">
                        <span className="marquee-star">✦</span>
                        <span className="marquee-text">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
