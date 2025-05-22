import React, { forwardRef, useState } from "react";
import ShowSignup from "./ShowSignup";

const ShowAuthorized = forwardRef(({ onClose }, ref) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("user", JSON.stringify(result.user));
        onClose();
        window.location.reload(); // чтобы Header перерисовался
      } else {
        setError(result.error || "Неверный email или пароль");
      }
    } catch (err) {
      setError("Ошибка соединения с сервером");
    }
  };

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
        <form className="login-form__content" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Введите ваш Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              className="form-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Авторизоваться
          </button>
          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
          )}
        </form>

        <div className="sing-up">
          <span>Еще не зарегистрированы? </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowAuthModal(true);
            }}
          >
            Зарегистрируйтесь!
          </button>
        </div>

        {showAuthModal && (
          <ShowSignup onClose={() => setShowAuthModal(false)} />
        )}
      </div>
    </div>
  );
});

export default ShowAuthorized;
