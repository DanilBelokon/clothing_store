import { useState } from "react";
import "./style.css";

const ShowProcessOrder = ({ isOpen, onClose, cartItems }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    comment: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Убираем ошибку при изменении поля
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const totalSum = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, ""));
    return sum + price * (item.quantity || 1);
  }, 0);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Введите ФИО";
    if (!formData.phone.trim()) newErrors.phone = "Введите телефон";
    if (!formData.address.trim()) newErrors.address = "Введите адрес";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = (paymentType) => {
    if (!validateForm()) {
      return; // Остановка если есть ошибки
    }

    const itemsText = cartItems
      .map(
        (item) => `${item.title} (${item.price}) × ${item.quantity || 1} шт.`
      )
      .join("\n");

    const message =
      `Новый заказ:\n\nКлиент:\nИмя: ${formData.name}\nТелефон: ${formData.phone}\n` +
      `Email: ${formData.email || "не указан"}\nАдрес: ${
        formData.address
      }\n\n` +
      `Товары:\n${itemsText}\n\nИтого: ${totalSum.toFixed(2)}$\n\n` +
      `Комментарий: ${formData.comment || "нет"}`;

    if (paymentType === "whatsapp") {
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/79529794890?text=${encodedMessage}`, "_blank");
    } else if (paymentType === "ymoney") {
      window.open(
        `https://yoomoney.ru/quickpay/confirm?receiver=4100119150612930` +
          `&quickpay-form=shop&targets=Оплата заказа` +
          `&sum=${totalSum}&label=ORDER_${Date.now()}`,
        "_blank"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="order-modal__overlay">
      <div className="order-modal__content">
        <button className="order-modal__close-btn" onClick={onClose}>
          &times;
        </button>
        <h2 className="order-modal__title">Оформление заказа</h2>

        <div className="order-modal__scroll-container">
          <div className="order-modal__items">
            <h3 className="order-modal__items-title">Ваш заказ:</h3>
            <ul className="order-modal__items-list">
              {cartItems.map((item) => {
                const price = parseFloat(item.price.replace(/[^\d.]/g, ""));
                const quantity = item.quantity || 1;
                return (
                  <li
                    key={`${item.id}-${item.selectedSize}`}
                    className="order-modal__item"
                  >
                    <span className="order-modal__item-name">{item.title}</span>
                    <span className="order-modal__item-quantity">
                      × {quantity} шт.
                    </span>
                    <span className="order-modal__item-price">
                      {(price * quantity).toFixed(2)}₽
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="order-modal__total">
              Итого: <span>{totalSum.toFixed(2)}₽</span>
            </div>
          </div>

          <form className="order-modal__form">
            <div className="order-modal__field-group">
              <label className="order-modal__label">ФИО:</label>
              <input
                type="text"
                name="name"
                className={`order-modal__input ${errors.name ? "error" : ""}`}
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="order-modal__field-group">
              <label className="order-modal__label">Телефон:</label>
              <input
                type="tel"
                name="phone"
                className={`order-modal__input ${errors.phone ? "error" : ""}`}
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>

            <div className="order-modal__field-group">
              <label className="order-modal__label">
                Email (необязательно):
              </label>
              <input
                type="email"
                name="email"
                className="order-modal__input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="order-modal__field-group">
              <label className="order-modal__label">Адрес доставки:</label>
              <textarea
                name="address"
                className={`order-modal__textarea order-modal__textarea--address ${
                  errors.address ? "error" : ""
                }`}
                value={formData.address}
                onChange={handleChange}
                rows="2"
                required
              />
              {errors.address && (
                <span className="error-message">{errors.address}</span>
              )}
            </div>

            <div className="order-modal__field-group">
              <label className="order-modal__label">
                Комментарий к заказу:
              </label>
              <textarea
                name="comment"
                className="order-modal__textarea order-modal__textarea--comment"
                value={formData.comment}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="order-modal__buttons-container">
              <button
                type="button"
                className="order-modal__submit-btn"
                onClick={() => handlePayment("whatsapp")}
              >
                Перейти к оплате через WhatsApp
              </button>
              <button
                type="button"
                className="order-modal__submit-btn-ymoney"
                onClick={() => handlePayment("ymoney")}
              >
                Перейти к оплате через ЮMoney
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShowProcessOrder;
