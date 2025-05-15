import React, { forwardRef, useState } from "react";
import ShowSingup from "./ShowSingUp";

const ShowAutorized = forwardRef(({ onClose }, ref) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  return (
    <div className="full-item">
      <div className="login-form" ref={ref}>
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
        <h2 className="login-form__title">Войдите в аккаунт</h2>
        <form className="login-form__content">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Введите ваш Email:
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="example@mail.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Введите ваш Пароль:
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Авторизоваться
          </button>
        </form>
        <div className="sing-up">
          <span>Еще не зарегестрированы? </span>
          <button
            href=""
            onClick={(e) => {
              e.preventDefault();
              setShowAuthModal(true);
            }}
          >
            Зарегестрируйтесь!
          </button>
        </div>
        {showAuthModal && (
          <ShowSingup onClose={() => setShowAuthModal(false)} />
        )}
      </div>
    </div>
  );
});

export default ShowAutorized;
