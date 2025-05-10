import React, { Component } from "react";

export class ShowFullItem extends Component {
  render() {
    return (
      <div className="full-item">
        <div>
          <img
            src={"./img/" + this.props.item.img}
            onClick={() => this.props.onShowItem(this.props.item)}
            alt=""
          />
          <h2>{this.props.item.title}</h2>
          <p>{this.props.item.fullDesc}</p>
          <p>{this.props.item.color_car}</p>
          <p>{this.props.item.number_car}</p>
          <p>
            {this.props.item.sex === "Man"
              ? "Пол: Мужской"
              : this.props.item.sex === "Woman"
              ? "Пол: Женский"
              : "Пол: Универсальный"}
          </p>
          <p>Страна производитель: {this.props.item.country}</p>
          <p>Материалы: {this.props.item.materials}</p>
          <b>{this.props.item.price}</b>
          <div
            className="add-to-cart"
            onClick={() => this.props.onAdd(this.props.item)}
          >
            +
          </div>
          <div className="size-selector">
            <h3>Доступные размеры:</h3>
            <div className="size-buttons">
              {this.props.item.sizes.map((size) => (
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
        </div>
      </div>
    );
  }
}

export default ShowFullItem;
