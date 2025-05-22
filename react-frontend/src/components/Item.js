function Item(props) {
  console.log(props.item.shortDesc);
  return (
    <div className="item">
      <img
        src={"./img/" + props.item.img}
        onClick={() => props.onShowItem(props.item)}
        alt=""
      />
      <h2>{props.item.title}</h2>
      <p>{props.item.short_desc}</p>
      <p>{props.item.color}</p>
      <p>{props.item.number}</p>
      <b>{props.item.price}</b>
      <div className="add-to-cart" onClick={() => props.onShowItem(props.item)}>
        »
      </div>
    </div>
  );
}

export default Item;
