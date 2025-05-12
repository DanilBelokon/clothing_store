function ShowFullItem(props) {
  return (
    <div className="full-item">
      <div>
        <button
          className="close-button"
          onClick={() => props.onShowItem(props.item)}
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ×
        </button>
        <img
          src={"./img/" + props.item.img}
          onClick={() => props.onShowItem(props.item)}
          alt=""
        />
        <h2>{props.item.title}</h2>
        <p>{props.item.fullDesc}</p>
        <p>{props.item.color_car}</p>
        <p>{props.item.number_car}</p>
        <p>
          {props.item.sex === "Man"
            ? "Пол: Мужской"
            : props.item.sex === "Woman"
            ? "Пол: Женский"
            : "Пол: Универсальный"}
        </p>
        <p>Страна производитель: {props.item.country}</p>
        <p>Материалы: {props.item.materials}</p>
        <b>Цена: {props.item.price}</b>
        <div className="add-to-cart" onClick={() => props.onAdd(props.item)}>
          +
        </div>
        <div className="size-selector">
          <h3>Доступные размеры:</h3>
          <div className="size-buttons">
            {props.item.sizes.map((size) => (
              <button
                key={size}
                className="size-button"
                onClick={() => console.log(`Выбран размер: ${size}`)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="add-text-order">Добавить в корзину</div>
      </div>
    </div>
  );
}

export default ShowFullItem;
