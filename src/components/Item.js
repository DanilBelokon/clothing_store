function Item(props) {
  return (
    <div className="item">
      <img
        src={"./img/" + props.item.img}
        onClick={() => props.onShowItem(props.item)}
        alt=""
      />
      <h2>{props.item.title}</h2>
      <p>{props.item.shortDesc}</p>
      <p>{props.item.color_car}</p>
      <p>{props.item.number_car}</p>
      <b>{props.item.price}</b>
      <div className="add-to-cart" onClick={() => props.onAdd(props.item)}>
        +
      </div>
    </div>
  );
}

export default Item;
