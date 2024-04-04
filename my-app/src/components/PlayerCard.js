export default function PlayerCard(props) {
  
  return (
    <div class="wrapper">
      <div class="inner-box">
          <hstack>
            <img src={props.image} />  
            <div>{props.name}</div>
            <div>{props.team}</div>
            <div>{props.game}</div>
            <div>{props.line}</div>
            <div>{props.category}</div>
            <button onClick={() => props.addOver(props)}> Over </button>
            <button onClick={() => props.addUnder(props)}> Under </button>
          </hstack>
      </div>
    </div>
  );
}