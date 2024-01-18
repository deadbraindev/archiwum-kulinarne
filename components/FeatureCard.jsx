export default async function FeatureCard({ props }) {
  const { title, description, comingSoon } = props;
  return (
    <div className="FC">
      {comingSoon && <div className="FCbadge">coming soon</div>}
      <div className="FCimg">
        <div className="FCbackground">
          <svg />
        </div>
      </div>
      <h1 className="FCtitle">{title}</h1>

      <div className="FCdesc">{description}</div>
    </div>
  );
}
