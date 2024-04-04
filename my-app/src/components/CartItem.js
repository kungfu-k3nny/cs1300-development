export default function CartItem(props) {
  
  return (
    <div className="wrapper">
      <div className="inner-box">
          <hstack>
            <img src={props.image}/>
            <div>{props.name}</div>
            <div>{props.team}</div>
            <div>{props.game}</div>
            <div>{props.line}</div>
            <div>{props.category}</div>
            <div>{props.isOver}</div>
            <button onClick={() => props.deletePlayer(props.name)}> Delete </button>
          </hstack>
      </div>
    </div>
  );
}