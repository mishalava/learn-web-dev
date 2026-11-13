export default function Progress() {
  return (
    <div className="progress">
      <div className="container">
        <img src="/img/Frame.svg" alt="" />
        <span id="master">Мастер</span>
      </div>
      <div className="container">
        <img src="/img/Frame (1).svg" alt="" />
        <span id="work">Услуга</span>
      </div>
      <div className="container">
        <img src="/img/Frame (2).svg" alt="" />
        <span id="dateTime">Дата и время</span>
      </div>
      <div className="container">
        <img src="/img/Frame (3).svg" alt="" />
        <span id="contact">Контакты</span>
      </div>
      <div className="container">
        <img src="/img/Frame (4).svg" alt="" />
        <span id="accept">Подтверждение</span>
      </div>
    </div>
  );
}