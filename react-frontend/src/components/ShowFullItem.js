import React, { useState } from "react";

function ShowFullItem(props) {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Пожалуйста, выберите размер");
      return;
    }
    props.onAdd({ ...props.item, selectedSize });
  };

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
        <p>{props.item.full_desc}</p>
        <p>{props.item.color}</p>
        <p>{props.item.number}</p>
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

        <div className="size-selector">
          <h3>Доступные размеры:</h3>
          <div className="size-buttons">
            {(Array.isArray(props.item.sizes)
              ? props.item.sizes
              : JSON.parse(props.item.sizes)
            ).map((size) => (
              <button
                key={size}
                className={`size-button ${
                  selectedSize === size ? "selected" : ""
                }`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div
          className="add-to-cart"
          onClick={handleAddToCart}
          style={{ cursor: "pointer" }}
        >
          +
        </div>
        <div className="add-text-order">Добавить в корзину</div>

        {selectedSize && (
          <p style={{ marginTop: "10px" }}>Выбран размер: {selectedSize}</p>
        )}
      </div>
    </div>
  );
}

export default ShowFullItem;
