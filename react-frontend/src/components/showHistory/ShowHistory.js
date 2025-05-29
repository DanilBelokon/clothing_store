import { useState } from "react";
import "./style.css";

const ShowHistory = ({ onClose, orders }) => {
  const [expandedOrderIds, setExpandedOrderIds] = useState([]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderIds(
      (prev) =>
        prev.includes(orderId)
          ? prev.filter((id) => id !== orderId) // Убираем, если уже открыт
          : [...prev, orderId] // Добавляем, если закрыт
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="close-button"
          onClick={onClose}
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
        <h2 className="history-title">История заказов</h2>

        {orders.length === 0 ? (
          <p>У вас пока нет заказов.</p>
        ) : (
          <ul className="order-history-list">
            {orders.map((order) => (
              <li key={order.id} className="order-history-item">
                <div className="order-summary">
                  <b>
                    Заказ №{order.id} Цена: {order.total}₽
                  </b>
                  <b>Дата оформления: {order.created_at.slice(0, 10)}</b>
                  <button
                    onClick={() => toggleOrderDetails(order.id)}
                    className="details-button"
                  >
                    {expandedOrderIds.includes(order.id)
                      ? "Скрыть"
                      : "Подробнее"}
                  </button>
                </div>

                {expandedOrderIds.includes(order.id) && (
                  <ul className="order-items-list">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="order-item">
                        <div>{item.title}</div>
                        <div>Размер: {item.size}</div>
                        <div>
                          {item.quantity} шт. —{" "}
                          {parseFloat(item.price).toFixed(2) * item.quantity}₽
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ShowHistory;
