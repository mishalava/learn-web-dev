export default function Footer() {
  return (
    <footer>
      <div className="footerContainer">
        <div className="footerLogo">
          <h3>#МНОГОСТИЛЯ</h3>
          <p>У нас работают профессионалы</p>
        </div>
        <div className="contact">
          <span>КОНТАКТЫ</span>
          <div id="adres" className="adres">
            <img src="/img/Vector.svg" alt="" />
            <p>ул. Садовая, 15, Москва</p>
          </div>
          <div id="phone" className="phone">
            <img src="/img/Vector (1).svg" alt="" />
            <p>+7 (495) 123-45-67</p>
          </div>
        </div>
        <div className="dateTime">
          <span>РЕЖИМ РАБОТЫ</span>
          <p>Пн–Пт: 9:00 – 21:00</p>
          <p>Сб–Вс: 10:00 – 19:00</p>
        </div>
      </div>
      <div className="footerContainerEnd">
        <p>© 2026. Все права защищены.</p>
        <p id="politika">Политика конфиденциальности</p>
      </div>
    </footer>
  );
}