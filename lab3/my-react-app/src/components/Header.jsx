import React from 'react';

 export default function Header() {
  return (
    <header className="bg-primary text-white py-3">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="mb-0">Language Platform</h1>
            <p className="mb-0">Вивчайте мови де завгодно і коли завгодно</p>
          </div>
          <div className="col-md-6 text-md-end mt-3 mt-md-0">
            <div className="d-flex justify-content-md-end gap-2">
              <button className="btn btn-light btn-sm"><i className="bi bi-translate me-1"></i> Змінити мову</button>
              <button className="btn btn-outline-light btn-sm"><i className="bi bi-person-circle me-1"></i> Увійти</button>
              <button className="btn btn-success btn-sm"><i className="bi bi-box-arrow-in-right me-1"></i> Реєстрація</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

