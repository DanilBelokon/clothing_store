import React from "react";
import "./style.css";

const ShowProfile = React.forwardRef(({ user, onClose }, ref) => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    onClose();
    window.location.reload();
  };

  return (
    <div className="full-item">
      <div className="profile-modal" ref={ref}>
        <button
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
        <h2 className="profile-modal__title">Личный кабинет</h2>
        <div className="profile-modal__content">
          <p>Имя: {user.username}</p>
          <p>Фамилия: {user.surname}</p>
          <p>Email: {user.email}</p>
          <button className="profile-button" onClick={handleLogout}>
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
});

export default ShowProfile;
