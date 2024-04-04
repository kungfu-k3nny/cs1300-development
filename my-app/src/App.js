import "./App.css";
import { useState } from "react";
import PlayerLinesData from "./assets/player-lines.json";
import PlayerCard from "./components/PlayerCard.js";
import CartItem from "./components/CartItem.js";

PlayerLinesData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function App() {
  const [cartItems, setCartItems] = useState([]);
  const addOverProp = (playerCard) => {
    const item = {
      playerCard: playerCard,
      isOver: "Over"
    }
    const updatedCartItems = cartItems.filter(cartCard => cartCard.playerCard.name !== playerCard.name);
    setCartItems([...updatedCartItems, item]);
  }
  const addUnderProp = (playerCard) => {
    const item = {
      playerCard: playerCard,
      isOver: "Under"
    }
    const updatedCartItems = cartItems.filter(cartCard => cartCard.playerCard.name !== playerCard.name);
    setCartItems([...updatedCartItems, item]);
  }
  const deletePlayer = (playerName) => {
    const updatedCartItems = cartItems.filter(item => item.playerCard.name !== playerName);
    setCartItems(updatedCartItems);
  }
  const nothing = () => {}
  
  const [activeTab, setActiveTab] = useState("NBA"); // Default to NBA, adjust as needed

  return (
    <div><h1>Chug's Sports Book</h1>
      <div className="App">
        <div className="view-section">
          <button onClick={() => setActiveTab("NBA")} style={{ fontWeight: activeTab === "NBA" ? "bold" : "normal" }}>NBA</button>
          <button onClick={() => setActiveTab("LOL")} style={{ fontWeight: activeTab === "LOL" ? "bold" : "normal" }}>LOL</button>
          <div className="player-cards">
            {PlayerLinesData.filter(item => item.sport === activeTab).map((item, index) => (
              <div>
                <PlayerCard name={item.name} image={item.image} team={item.team} game={item.game}
                line={item.line} category={item.category} addOver={addOverProp} addUnder={addUnderProp}
                deletePlayer={deletePlayer}/>
                <br></br>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h1>Your Lines</h1>
          <div className="cart-container">
            
            {cartItems.map((item, index) => (
              <div>
                <CartItem name={item.playerCard.name} image={item.playerCard.image}
                team={item.playerCard.team} game={item.playerCard.game} line={item.playerCard.line}
                category={item.playerCard.category} isOver={item.isOver} deletePlayer={deletePlayer}></CartItem>
                <br></br>
              </div>
            ))}
          </div>
          <button onClick={() => nothing()}> Submit </button>
        </div>
      </div>
    </div>
  );
}

export default App;
