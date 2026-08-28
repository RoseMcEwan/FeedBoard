export default function HerdTitle({ herd }) {
  return (
    <div className={`herd-title ${herd.colour}`}>
      <span className="herd-dot" />

      <h2>{herd.name}</h2>

      <span className="animal-pill">
        {herd.animals} cows
      </span>
    </div>
  );
}