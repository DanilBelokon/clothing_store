const ShowSingup = ({ onClose }) => {
  return (
    <div className="full-item">
      <div className="login-form">
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
        <h2 className="login-form__title">Регистрация</h2>
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

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Введите снова ваш Пароль:
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
            Зарегестрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShowSingup;
