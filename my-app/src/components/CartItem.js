export default function CartItem(props) {
  
  return (
    <div className="player-card">
        <hstack>
          <img src={props.image}/>
          <div><p>{props.name} - {props.team}</p>
          <p>{props.game}</p>
          <p>{props.line}</p>
          <p>{props.category}</p>
          <p>{props.isOver}</p></div>
          <button onClick={() => props.deletePlayer(props.name)}> Remove </button>
        </hstack>
    </div>
  );
}