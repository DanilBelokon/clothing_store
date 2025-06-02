const PaymentConfirmationModal = ({ isVisible, onClose, onConfirm }) => {
  if (!isVisible) return null;

  return (
    <div className="order-modal__overlay">
      <div className="order-modal__content">
        <h2 className="order-modal__title">Подтверждение оплаты</h2>
        <p style={{ marginBottom: "20px", paddingLeft: "20px" }}>
          Оплата прошла успешно?
        </p>
        <div className="order-modal__buttons-container">
          <button
            className="order-modal__submit-btn-ok"
            onClick={() => {
              localStorage.removeItem("awaitingPaymentConfirmation");
              localStorage.removeItem("checkoutFormData");
              localStorage.removeItem("selectedPaymentType");
              onConfirm();
            }}
          >
            Завершить заказ
          </button>
          <button
            className="order-modal__submit-btn-return"
            onClick={() => {
              localStorage.removeItem("awaitingPaymentConfirmation");
              localStorage.removeItem("checkoutFormData");
              localStorage.removeItem("selectedPaymentType");
              onClose();
            }}
          >
            Вернуться к оформлению
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationModal;
