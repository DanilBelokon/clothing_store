import { FaTrash } from "react-icons/fa";

function Order(props) {
  console.log(props.item);
  return (
    <div className="item">
      <img src={"./img/" + props.item.img} alt="" />
      <h2>{props.item.title}</h2>

      <b>{props.item.price}</b>
      {props.item.size && (
        <b className="selected-size">Размер: {props.item.size}</b>
      )}
      <b className="selected-size">Штук: {props.item.quantity}</b>
      <b
        className="quantity-minus"
        onClick={() =>
          props.handleQuantityChange(props.item.id, props.item.quantity - 1)
        }
      >
        -
      </b>
      <b
        className="quantity-plus"
        onClick={() =>
          props.handleQuantityChange(props.item.id, props.item.quantity + 1)
        }
      >
        +
      </b>
      <FaTrash
        className="delete-icon"
        onClick={() => props.onDelete(props.item.id)}
      />
    </div>
  );
}

export default Order;
