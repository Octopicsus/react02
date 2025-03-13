import "./LikeButton.css";

export default function LikeButton({ count, onClick }) {
  const maxCount = 99;

  if (count > maxCount) {
    count = "99";
  }

  if (count === 0) {
    count = "";
  }

  return (
    <button className="btn-wrapper" onClick={onClick}>
      <div className={`count ${count > 0 ? "backgroundCount" : ""}`}>
        {count}
      </div>
      <div className="icon"></div>
    </button>
  );
}
