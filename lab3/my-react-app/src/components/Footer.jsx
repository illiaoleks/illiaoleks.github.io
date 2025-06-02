import React from 'react';

export default function Footer() {
  return (
    <footer className="footer mt-5 py-4 bg-light border-top">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>Про платформу</h5>
            <p>Сучасна платформа для вивчення мов. Різноманітні уроки, практичні завдання та персоналізований підхід.</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Швидкі посилання</h5>
            <ul className="list-unstyled">
              <li><a href="#lessons" className="text-decoration-none">Уроки</a></li>
              <li><a href="#progress" className="text-decoration-none">Мій прогрес</a></li>
              <li><a href="#practice" className="text-decoration-none">Практика</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Зв'язатися з нами</h5>
            <ul className="list-unstyled">
              <li><i className="bi bi-envelope"></i> info@ukrmova.com</li>
              <li><i className="bi bi-telephone"></i> +380-00-000-000</li>
            </ul>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 text-center">
            <p className="mb-0">© 2025 Українська мова онлайн. Всі права захищені.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

