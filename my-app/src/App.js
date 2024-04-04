import "./App.css";
import { useState } from "react";
import PlayerLinesData from "./assets/player-lines.json";
import PlayerCard from "./components/PlayerCard.js";
import CartItem from "./components/Cart.js";

PlayerLinesData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function App() {
  const [cartItems, setCartItems] = useState([]);
  const addOverProp = (playerCard) => { setCartItems([...cartItems, playerCard])}
  const addUnderProp = (playerCard) => { setCartItems([...cartItems, playerCard])}

  const deletePlayer = (playerName) => { /*setCartItems(cartItems.filter(item => item.name !== playerName))*/ }

  return (
    <div className="App">
      <div className="player-cards">
        {PlayerLinesData.map((item, index) => (
          <div>
            <PlayerCard name={item.name} image={item.image} team={item.team} game={item.game} line={item.line} category={item.category} addOver={addOverProp} addUnder={addUnderProp}/>
            <br></br>
          </div>
        ))}
      </div>
      <div className="cart-container">
        {cartItems.map((item, index) => (
          <div>
            <CartItem name={item.name} image={item.image} team={item.team} game={item.game} line={item.line} category={item.category} isOver={item.isOver} deletePlayer={deletePlayer}/>
            <br></br>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
