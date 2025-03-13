import LikeButton from "../LikeButton/LikeButton";
import "./Card.css";

export default function Card({ img, title, lable, onVote, count, isWinner, hideButtons }) {
  const heroImg = {
    backgroundImage: `url(${img})`,
  };

  const heroLable = {
    backgroundImage: `url(${lable})`,
  };

  const handleClick = () => {
    onVote(title);
  };

  return (
    <>
      <div className="card" style={heroImg}>
        {!hideButtons && <LikeButton onClick={handleClick} count={count} />}
        <div className={`overlay ${isWinner ? "hidden" : ""}`}></div>
        <div className="lable" style={heroLable}></div>
        <div className="shadow"></div>
      </div>
    </>
  );
}