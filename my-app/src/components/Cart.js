const Cart = ({ items }) => {
  return (
    <div className="cart">
      <h3>Your Picks:</h3>
      {items.map(item => (
        <div key={item.name + item.pick} className="cart-item">
          <p>{item.name}: {item.pick}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;