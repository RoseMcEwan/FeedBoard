export default function FeedCalculation ({ label, value, unit = "KgMD/cow" }) {
    return (
        <div className="feed-metric">
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{unit}</small>
        </div>    
    );
}