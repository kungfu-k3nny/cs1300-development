export default function PlayerCard(props) {
  
  const twoFuncsOver = () => {
    props.deletePlayer(props.name);
    props.addOver(props);
  }

  const twoFuncsUnder = () => {
    props.deletePlayer(props.name);
    props.addUnder(props);
  }

  return (
    <div className="wrapper">
      <div className="inner-box">
          <hstack>
            <img src={props.image} />  
            <div>{props.name}</div>
            <div>{props.team}</div>
            <div>{props.game}</div>
            <div>{props.line}</div>
            <div>{props.category}</div>
            <button onClick={() => twoFuncsOver()}> Over </button>
            <button onClick={() => twoFuncsUnder()}> Under </button>
          </hstack>
      </div>
    </div>
  );
}