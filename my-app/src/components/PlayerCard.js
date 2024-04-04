export default function PlayerCard(props) {

  return (
    <div className="player-card">
        <hstack>
          <img src={props.image} />  
          <div><p>{props.name} - {props.team}</p>
          <p>{props.game}</p>
          <p>{props.line}</p>
          <p>{props.category}</p></div>
          <button onClick={() => props.addOver(props)}> Over </button>
          <button onClick={() => props.addUnder(props)}> Under </button>
        </hstack>
    </div>
  );
}