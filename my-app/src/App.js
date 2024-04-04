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
    setCartItems([...cartItems, item]);
  }
  const addUnderProp = (playerCard) => {
    const item = {
      playerCard: playerCard,
      isOver: "Under"
    }
    setCartItems([...cartItems, item]);
  }

  const deletePlayer = (playerName) => {
    console.log("Deleting player:", playerName); // Debugging log
    const updatedCartItems = cartItems.filter(item => item.playerCard.name !== playerName);
    console.log("Updated Cart Items:", updatedCartItems); // Debugging log
    setCartItems(updatedCartItems);
  }

  return (
    <div className="App">
      <div className="player-cards">
        {PlayerLinesData.map((item, index) => (
          <div>
            <PlayerCard name={item.name} image={item.image} team={item.team} game={item.game} line={item.line} category={item.category} addOver={addOverProp} addUnder={addUnderProp} deletePlayer={deletePlayer}/>
            <br></br>
          </div>
        ))}
      </div>
      <div className="cart-container">
        {cartItems.map((item, index) => (
          <div>
            <CartItem name={item.playerCard.name} image={item.playerCard.image} team={item.playerCard.team} game={item.playerCard.game} line={item.playerCard.line} category={item.playerCard.category} isOver={item.isOver} deletePlayer={deletePlayer}></CartItem>
            <br></br>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
