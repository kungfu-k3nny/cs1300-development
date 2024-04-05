import "./App.css";
import { useState } from "react";
import PlayerLinesData from "./assets/player-lines.json";
import PlayerCard from "./components/PlayerCard.js";
import CartItem from "./components/CartItem.js";

PlayerLinesData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function convertTimeStringToDate(timeString) {
  const arbitraryDate = "2023-01-01"; // Arbitrary date
  const timeWithoutTimeZone = timeString.split(' ')[0]; // Removes the 'EST' part, adjust if needed
  const dateTimeString = arbitraryDate + " " + timeWithoutTimeZone;
  return new Date(dateTimeString + " EST"); // Appends time zone if needed, or consider it as local time
}

function convertKStringToNumber(str) {
  // Remove 'k' and any other non-numeric characters except for the decimal point
  const numericPart = str.replace(/k/gi, '');
  return parseFloat(numericPart);
}

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

  const [activeCategory, setActiveCategory] = useState(""); // Default to main, adjust as needed
  
  const [sortPreference, setSortPreference] = useState("popularity");

  const toggleActiveCategory = (buttonCategory) => {
    if (buttonCategory === activeCategory) {
      setActiveCategory("")
    }
    else {
      setActiveCategory(buttonCategory)
    }
  }
  const clearActiveCategory = () => {
    setActiveCategory("")
  }
  const reset = () => {
    setActiveCategory("");
    setSortPreference("popularity")
    setActiveTab("NBA")
  }

  return (
    <div><h1>Chug's Sports Book</h1>
      <div className="App">

        <div className="selection-section">
          <div>
            <div className="top-button-section">
              <button onClick={() => {setActiveTab("NBA");
              clearActiveCategory();}} style={{
                fontWeight: activeTab === "NBA" ? "bold" : "normal",
                backgroundColor: activeTab === "NBA" ? "#90a2f0" : "#F0EDEE"
              }}>NBA</button>
              <button onClick={() => {setActiveTab("LOL");
              clearActiveCategory();}} style={{
                fontWeight: activeTab === "LOL" ? "bold" : "normal",
                backgroundColor: activeTab === "LOL" ? "#90a2f0" : "#F0EDEE"
              }}>LOL</button>
            </div>

            <div className="sorting-section">
              <button onClick={() => toggleActiveCategory("main")} style={{
                fontWeight: activeCategory === "main" ? "bold" : "normal",
                backgroundColor: activeCategory === "main" ? "#90a2f0" : "#F0EDEE"
              }}>{activeTab === "NBA" ? 'Points' : 'Kills'}</button>
              <button onClick={() => toggleActiveCategory("alt")} style={{
                fontWeight: activeCategory === "alt" ? "bold" : "normal",
                backgroundColor: activeCategory === "alt" ? "#90a2f0" : "#F0EDEE"
              }}>{activeTab === "NBA" ? 'Rebounds' : 'Assists'}</button>
              <div className="sort-dropdown">
                <label htmlFor="sort">Sort by: </label>
                <select id="sort" value={sortPreference} onChange={e => setSortPreference(e.target.value)}>
                  <option value="popularity">Popularity</option>
                  <option value="time">Time</option>
                </select>
              </div>
              <button onClick={() => reset()}>Reset filters</button>
            </div>
          </div>

          <div className="player-cards">
            {PlayerLinesData.filter(item => {
              // For "NBA" and "main" category
              if (activeTab === "NBA" && activeCategory === "main") {
                return item.sport === activeTab && item.category === "points";
              }
              // For "NBA" and "alt" category
              else if (activeTab === "NBA" && activeCategory === "alt") {
                return item.sport === activeTab && item.category === "rebounds";
              }
              // For "LOL" and "main" category
              else if (activeTab === "LOL" && activeCategory === "main") {
                return item.sport === activeTab && item.category === "kills";
              }
              // For "LOL" and "alt" category
              else if (activeTab === "LOL" && activeCategory === "alt") {
                return item.sport === activeTab && item.category === "assists";
              }
              else if (activeTab === "LOL" && activeCategory === "") {
                return item.sport === activeTab;
              }
              else {
                return item.sport === activeTab;
              }
              return false;
            })
            .sort((a, b) => {
              if (sortPreference === "popularity") {
                // Assuming popularity is a number where higher is more popular
                const numA = convertKStringToNumber(a.popularity)
                const numB = convertKStringToNumber(b.popularity)
                return numB - numA;
              } 
              const dateA = convertTimeStringToDate(a.time);
              const dateB = convertTimeStringToDate(b.time);
              return dateA - dateB;
            })
            .map((item, index) => (
              <div>
                <PlayerCard name={item.name} image={item.image} team={item.team} game={item.game}
                line={item.line} category={item.category} popularity={item.popularity}
                time={item.time} addOver={addOverProp} addUnder={addUnderProp}/>
                <br></br>
              </div>
            ))}
          </div>
        </div>
        
        <div className="cart-section">
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
