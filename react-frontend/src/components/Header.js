import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineHistory } from "react-icons/md";
import ShowAutorized from "./headerComponent/ShowAutorized";
import Order from "./headerComponent/Order";
import ShowInfoUs from "./headerComponent/ShowInfoUs";
import ShowIsContact from "./headerComponent/ShowIsContanct";
import ShowProcessOrder from "./headerComponent/showProcessOrder/ShowProcessOrder";
import ShowProfile from "./headerComponent/showProfile/ShowProfile";
import { getCart } from "../api/cart";
import { updateQuantity } from "../api/cart";
import ShowHistory from "./showHistory/ShowHistory";

const showOrders = (
  orders,
  onDelete,
  setProcessOrderOpen,
  handleQuantityChange
) => {
  let summa = 0;
  let sumPrice = 0;
  orders.forEach((el) => {
    summa += el.quantity;
    sumPrice += el.quantity * parseFloat(el.price.replace(/[^\d.]/g, ""));
  });
  const formattedSum = sumPrice.toFixed(2);
  return (
    <div>
      {orders.map((el) => (
        <Order
          onDelete={onDelete}
          key={el.id}
          item={el}
          handleQuantityChange={handleQuantityChange}
        />
      ))}
      <p className="summa">Количество товаров: {summa}</p>
      <p className="summa-price">Общая цена: {formattedSum}₽</p>
      <button onClick={() => setProcessOrderOpen(true)}>Оформить заказ</button>
    </div>
  );
};

const showNothing = () => {
  return (
    <div className="empty">
      <h2>Одежды в корзине нет</h2>
    </div>
  );
};

export default function Header({ orders, onDelete, setOrders }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [ordersHistory, setOrdersHistory] = useState([]);
  const [accOpen, setAccOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const loginFormRef = React.useRef(null);
  const [isInfoUsOpen, setIsInfoUsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isProcessOrderOpen, setProcessOrderOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      getCart(parsedUser.id)
        .then((cartItems) => {
          setOrders(cartItems);
        })
        .catch((err) => console.error("Ошибка загрузки корзины:", err));
    }
  }, [setOrders]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    fetch("http://localhost:8000/getOrders.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setOrdersHistory(data.orders);
        else alert("Ошибка: " + data.error);
      })
      .catch((err) => alert("Сетевая ошибка: " + err.message));

    if (localStorage.getItem("awaitingPaymentConfirmation") === "true") {
      setProcessOrderOpen(true);
    }
  }, []);

  const handleClickOutside = (event) => {
    if (loginFormRef.current && !loginFormRef.current.contains(event.target)) {
      setAccOpen(false);
    }
  };

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      setAccOpen(false);
    }
  };

  useEffect(() => {
    if (accOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [accOpen]);

  const handleQuantityChange = async (cartId, newQuantity) => {
    if (newQuantity > 0) {
      const res = await updateQuantity(cartId, newQuantity);
      if (res.success) {
        setOrders((prev) =>
          prev.map((el) =>
            el.id === cartId ? { ...el, quantity: newQuantity } : el
          )
        );
      }
    }
  };

  return (
    <header>
      <div>
        <span className="logo">Магазин одежды</span>
        <ul className="nav">
          <li onClick={() => setIsInfoUsOpen(true)}>Про нас</li>
          <li onClick={() => setIsContactOpen(true)}>Контакты</li>
          <li
            onClick={() => {
              const searchPanel = document.getElementById("style-test");
              if (searchPanel) {
                searchPanel.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Посмотреть каталог
          </li>
        </ul>
        <VscAccount
          onClick={() => setAccOpen(!accOpen)}
          className={`acc-cart-button ${accOpen && "active"}`}
        />

        <span className="AuthSpan" onClick={() => setAccOpen(!accOpen)}>
          {user ? user.username : "Авторизуйтесь"}
        </span>

        <FaShoppingCart
          onClick={() => setCartOpen(!cartOpen)}
          className={`shop-cart-button ${cartOpen && "active"}`}
        />
        <MdOutlineHistory
          onClick={() => setHistoryOpen(!historyOpen)}
          className={`history-cart-button ${historyOpen && "active"}`}
        ></MdOutlineHistory>
        <span
          onClick={() => setHistoryOpen(!historyOpen)}
          className="historySpan"
        >
          История заказов
        </span>
        {historyOpen && (
          <ShowHistory
            orders={ordersHistory}
            onClose={() => setHistoryOpen(false)}
          ></ShowHistory>
        )}
        {accOpen &&
          (user ? (
            <ShowProfile
              ref={loginFormRef}
              user={user}
              onClose={() => setAccOpen(false)}
            />
          ) : (
            <ShowAutorized
              ref={loginFormRef}
              onClose={() => setAccOpen(false)}
            />
          ))}
        {cartOpen && (
          <div className="shop-cart">
            {orders.length > 0
              ? showOrders(
                  orders,
                  onDelete,
                  setProcessOrderOpen,
                  handleQuantityChange
                )
              : showNothing()}
          </div>
        )}
        {isInfoUsOpen && (
          <ShowInfoUs setIsInfoUsOpen={setIsInfoUsOpen}></ShowInfoUs>
        )}
      </div>
      {isContactOpen && (
        <ShowIsContact setIsContactOpen={setIsContactOpen}></ShowIsContact>
      )}
      <ShowProcessOrder
        isOpen={isProcessOrderOpen}
        onClose={() => setProcessOrderOpen(false)}
        cartItems={orders}
        setOrders={setOrders}
        setOrdersHistory={setOrdersHistory}
      />
      <div className="presentation"></div>
    </header>
  );
}
