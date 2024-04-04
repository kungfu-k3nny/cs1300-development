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
              <div>{props.isOver}</div>
              <button onClick={() => props.deletePlayer()}> Delete </button>
            </hstack>
        </div>
      </div>
    );
  }