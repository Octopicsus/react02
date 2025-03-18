import { useState } from "react";
import "./App.css";
import Card from "./widgets/Card/Card";
import data from "../public/data/data.json";

function App() {
  const heroes = Object.values(data);
  const [votes, setVotes] = useState([]);
  const [showWinner, setShowWinner] = useState(false);

  const handleVote = (heroId) => {
    return () => {
      setVotes([...votes, heroId]);
    };
  };

  const getVoteCount = (heroId) => {
    return votes.filter((id) => id === heroId).length;
  };

  const showOurHero = (votes) => {
    const voteCounts = [];
    let maxVotes = 0;
    let ourHero = "";

    for (let i = 0; i < votes.length; i++) {
      const heroId = votes[i];

      const heroIndex = voteCounts.findIndex((item) => item.heroId === heroId);

      if (heroIndex !== -1) {
        voteCounts[heroIndex].count++;
      } else {
        voteCounts.push({ heroId: heroId, count: 1 });
      }
    }

    voteCounts.forEach((item) => {
      if (item.count > maxVotes) {
        maxVotes = item.count;
        ourHero = item.heroId;
      }
    });

    return ourHero;
  };

  const handleShowHero = () => {
    if (showWinner) {
      setVotes([]);
      setShowWinner(false);
    } else {
      setShowWinner(true);
    }
  };

  return (
    <>
      <img src="../public/img/marvel-logo.svg" alt="logo" />
      <div className="cards-container">
        {!heroes.length && <span>No heroes</span>}
        {heroes.map((hero) => (
          <Card
            key={hero.id}
            img={hero.img}
            title={hero.title}
            lable={hero.lable}
            onVote={handleVote(hero.title)}
            count={getVoteCount(hero.title)}
            isWinner={showWinner && hero.title === showOurHero(votes)}
            hideButtons={showWinner}
          />
        ))}
      </div>
      <button className="show-hero" onClick={handleShowHero}>
        {showWinner ? "Play again" : "Who is our hero?"}
      </button>
      <div className="overlay-shadow"></div>
      <div className="space"></div>
    </>
  );
}

export default App;
