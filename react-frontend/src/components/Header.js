import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import ShowAutorized from "./headerComponent/ShowAutorized";
import Order from "./headerComponent/Order";
import ShowInfoUs from "./headerComponent/ShowInfoUs";
import ShowIsContact from "./headerComponent/ShowIsContanct";
import ShowProcessOrder from "./headerComponent/showProcessOrder/ShowProcessOrder";
import ShowProfile from "./headerComponent/showProfile/ShowProfile";

const showOrders = (props, setProcessOrderOpen) => {
  let summa = 0;
  let sumPrice = 0;
  props.orders.forEach((el) => {
    summa += 1;
    sumPrice += parseFloat(el.price.replace(/[^\d.]/g, ""));
  });
  const formattedSum = sumPrice.toFixed(2);
  return (
    <div>
      {props.orders.map((el) => (
        <Order onDelete={props.onDelete} key={el.id} item={el} />
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

export default function Header(props) {
  const [cartOpen, setCartOpen] = useState(false);
  const [accOpen, setAccOpen] = useState(false);
  const loginFormRef = React.useRef(null);
  const [isInfoUsOpen, setIsInfoUsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isProcessOrderOpen, setProcessOrderOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
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
            {props.orders.length > 0
              ? showOrders(props, setProcessOrderOpen)
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
        cartItems={props.orders}
      />
      <div className="presentation"></div>
    </header>
  );
}
