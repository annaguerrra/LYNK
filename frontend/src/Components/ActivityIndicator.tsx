import "./Styles/activityIndicator.css";

type ActivityIndicatorProps = {
  size?: "small" | "medium" | "large";
};

export default function ActivityIndicator({
  size = "medium",
}: ActivityIndicatorProps) {
  return (
    <div className={`activity-indicator ${size}`}>
      <div className="top-box" />
      <div className="bottom-box" />
    </div>
  );
}