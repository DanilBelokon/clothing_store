const ShowIsContact = (props) => {
  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content contacts-content">
          <button
            className="close-btn"
            onClick={() => props.setIsContactOpen(false)}
          >
            &times;
          </button>

          <h2>Наши контакты</h2>

          <div className="contact-info">
            <div className="contact-item">
              📞
              <div>
                <h3>Телефон</h3>
                <a style={{ color: "#000000" }} href="tel:+79991234567">
                  +7 (999) 123-45-67
                </a>
              </div>
            </div>

            <div className="contact-item">
              ✉️
              <div>
                <h3>Email</h3>
                <a style={{ color: "#000000" }} href="mailto:info@example.com">
                  info@example.com
                </a>
              </div>
            </div>

            <div className="contact-item">
              📍
              <div>
                <h3>Адрес</h3>
                <p>г. Москва, ул. Примерная, 123</p>
              </div>
            </div>

            <div className="contact-item">
              ⌚
              <div>
                <h3>Часы работы</h3>
                <p>Пн-Пт: 9:00 - 18:00</p>
                <p>Сб-Вс: 10:00 - 16:00</p>
              </div>
            </div>
          </div>

          <h3>Мы на карте:</h3>
          <div className="contact-map">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A516e56d28d85fbfb926a7361711ccb224c9dc6c79db2c813aae6a40237d84527&amp;source=constructor"
              width="100%"
              height="300"
              frameBorder="0"
              title="Карта с нашим местоположением"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowIsContact;
