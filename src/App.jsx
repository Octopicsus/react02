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
    const voteCounts = {};
    let maxVotes = 0;
    let ourHero = "";

    for (let i = 0; i < votes.length; i++) {
      let heroId = votes[i];

      if (voteCounts[heroId]) {
        voteCounts[heroId]++;
      } else {
        voteCounts[heroId] = 1;
      }
    }

    for (let hero in voteCounts) {
      if (voteCounts[hero] > maxVotes) {
        maxVotes = voteCounts[hero];
        ourHero = hero;
      }
    }

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

  // const winner = showWinner ? showOurHero(votes) : null;

  return (
    <>
      <img src="/public/marvel-logo.svg" alt="logo" />
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
    </>
  );
}

export default App;
