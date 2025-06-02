import '../App.css';
import React, { useState, useEffect } from 'react';

export default function LessonsPage() {
  // Стилі для компонентів
  const styles = {
    lessonsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px'
    },
    lessonCard: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease'
    },
    lessonImage: {
      width: '100%',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '6px'
    },
    lessonMedia: {
      display: 'flex',
      gap: '10px',
      marginTop: '15px' // Збільшено відступ зверху
    },
    completionButton: {
      marginTop: '10px',
      marginBottom: '10px' // Додано відступ знизу
    }
  };

  // Медіа-запити для адаптивності
  const mediaQuery = `
    @media (max-width: 992px) {
      .lessons-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
    @media (max-width: 768px) {
      .lessons-grid {
        grid-template-columns: 1fr !important;
      }
      .lesson-media {
        flex-direction: column;
      }
    }
  `;

  // Всі доступні уроки
  const allLessons = [
    {
      id: 1,
      title: 'Побутова лексика',
      level: 'A2',
      category: 'Лексика',
      duration: '45 хв',
      language: 'Українська',
      image: 'https://i.pinimg.com/474x/22/37/c7/2237c7bf07262bcfcf2e9367b8a47c63.jpg',
      description: 'Вивчіть основні слова та фрази для повсякденного використання у побуті.',
      progress: 25,
      formats: ['video', 'text']
    },
    {
      id: 2,
      title: 'Ділове спілкування',
      level: 'B1',
      category: 'Лексика',
      duration: '60 хв',
      language: 'Англійська',
      image: 'https://i.pinimg.com/736x/bf/89/06/bf8906c3d9ffbd5ba2631ef101f8c1e2.jpg',
      description: 'Опануйте професійну лексику та фрази для ділових зустрічей та листування.',
      progress: 40,
      formats: ['video', 'audio', 'text']
    },
    {
      id: 3,
      title: 'Граматика',
      level: 'A2',
      category: 'Граматика',
      duration: '55 хв',
      language: 'Українська',
      image: 'https://i.pinimg.com/474x/e3/2f/08/e32f08af59a42550fc12fcdca39c9886.jpg',
      description: 'Основні правила української граматики з практичними прикладами.',
      progress: 20,
      formats: ['video', 'interactive']
    },
    {
      id: 4,
      title: 'Туристичні фрази',
      level: 'A2',
      category: 'Лексика',
      duration: '40 хв',
      language: 'Німецька',
      image: 'https://i.pinimg.com/474x/d7/d2/f2/d7d2f2f41775d5978beb0d07bc68a125.jpg',
      description: 'Корисні фрази та слова для подорожей Україною.',
      progress: 10,
      formats: ['audio', 'text']
    },
    {
      id: 5,
      title: 'Історії та діалоги',
      level: 'B1',
      category: 'Читання',
      duration: '30 хв',
      language: 'Французька',
      image: 'https://i.pinimg.com/736x/26/61/43/26614316b32ba67856224f69f033e97d.jpg',
      description: 'Короткі історії та діалоги для практики читання та розуміння.',
      progress: 60,
      formats: ['text', 'interactive']
    },
    {
      id: 6,
      title: 'Сучасний сленг',
      level: 'B2',
      category: 'Лексика',
      duration: '35 хв',
      language: 'Англійська',
      image: 'https://i.pinimg.com/736x/18/c2/50/18c25011a12118aeaf3b528043169e61.jpg',
      description: 'Сучасні вирази та сленг, які використовують молоді українці.',
      progress: 60,
      formats: ['video', 'audio']
    },
    {
      id: 7,
      title: 'Українська культура',
      level: 'A2',
      category: 'Культура',
      duration: '50 хв',
      language: 'Українська',
      image: 'https://i.pinimg.com/474x/05/1c/2f/051c2fec9a0d038d0f7f6c71c5d007d6.jpg',
      description: 'Огляд української культури, традицій та звичаїв.',
      progress: 15,
      formats: ['video', 'text']
    },
    {
      id: 8,
      title: 'Фразеологізми',
      level: 'B2',
      category: 'Лексика',
      duration: '45 хв',
      language: 'Німецька',
      image: 'https://i.pinimg.com/474x/2e/34/f6/2e34f6604840f942bfd3bcabdb13ff87.jpg',
      description: 'Популярні українські фразеологізми та їх значення.',
      progress: 55,
      formats: ['text']
    },
    {
      id: 9,
      title: 'Ділова комунікація',
      level: 'B2',
      category: 'Читання',
      duration: '65 хв',
      language: 'Англійська',
      image: 'https://i.pinimg.com/736x/a2/2f/7a/a22f7ab2341eec9ca0a99d50a8eb9ff8.jpg',
      description: 'Вивчіть важливі навички ділового спілкування та етикету.',
      progress: 50,
      formats: ['video', 'audio', 'interactive']
    },
  ];

  // Стани для фільтрів
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  
  // Тимчасові стани для фільтрів (до застосування)
  const [tempSelectedLevels, setTempSelectedLevels] = useState([]);
  const [tempSelectedCategories, setTempSelectedCategories] = useState([]);
  const [tempSelectedFormats, setTempSelectedFormats] = useState([]);
  const [tempSelectedLanguages, setTempSelectedLanguages] = useState([]);

  // Ініціалізація фільтрів при першому рендері
  useEffect(() => {
    setTempSelectedLevels([...selectedLevels]);
    setTempSelectedCategories([...selectedCategories]);
    setTempSelectedFormats([...selectedFormats]);
    setTempSelectedLanguages([...selectedLanguages]);
  }, []);

  // Фільтрація уроків
  const filteredLessons = allLessons.filter(lesson => {
    // Фільтр за рівнями
    if (selectedLevels.length > 0 && !selectedLevels.includes(lesson.level)) {
      return false;
    }
    // Фільтр за категоріями
    if (selectedCategories.length > 0 && !selectedCategories.includes(lesson.category)) {
      return false;
    }
    // Фільтр за мовами
    if (selectedLanguages.length > 0 && !selectedLanguages.includes(lesson.language)) {
      return false;
    }
    // Фільтр за форматами
    if (selectedFormats.length > 0) {
      const hasSelectedFormat = lesson.formats.some(format => selectedFormats.includes(format));
      if (!hasSelectedFormat) return false;
    }
    return true;
  });

  // Обробники зміни фільтрів
  const handleTempLevelChange = (level) => {
    setTempSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level) 
        : [...prev, level]
    );
  };

  const handleTempCategoryChange = (category) => {
    setTempSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleTempFormatChange = (format) => {
    setTempSelectedFormats(prev => 
      prev.includes(format) 
        ? prev.filter(f => f !== format) 
        : [...prev, format]
    );
  };

  const handleTempLanguageChange = (language) => {
    setTempSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(l => l !== language) 
        : [...prev, language]
    );
  };

  // Застосування фільтрів
  const applyFilters = () => {
    setSelectedLevels([...tempSelectedLevels]);
    setSelectedCategories([...tempSelectedCategories]);
    setSelectedFormats([...tempSelectedFormats]);
    setSelectedLanguages([...tempSelectedLanguages]);
  };

  // Скидання фільтрів
  const resetFilters = () => {
    setTempSelectedLevels([]);
    setTempSelectedCategories([]);
    setTempSelectedFormats([]);
    setTempSelectedLanguages([]);
    setSelectedLevels([]);
    setSelectedCategories([]);
    setSelectedFormats([]);
    setSelectedLanguages([]);
  };

  // Додаємо медіа-запити при завантаженні компонента
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = mediaQuery;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Компонент картки уроку
  const LessonCard = ({ title, level, category, duration, language, image, description, progress, id, formats }) => {
    const levelColors = { A1: 'bg-primary', A2: 'bg-success', B1: 'bg-warning', B2: 'bg-danger', C1: 'bg-dark' };
    const categoryColors = {
      Лексика: 'bg-primary',
      Граматика: 'bg-danger',
      Читання: 'bg-info',
      Культура: 'bg-dark',
      'Розмовна мова': 'bg-warning',
    };

    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
      const lessonId = `lesson-${id}`;
      const completed = localStorage.getItem(lessonId) === 'completed';
      setIsCompleted(completed);
    }, [id]);

    const toggleLessonCompletion = () => {
      const lessonId = `lesson-${id}`;
      if (isCompleted) {
        localStorage.removeItem(lessonId);
      } else {
        localStorage.setItem(lessonId, 'completed');
      }
      setIsCompleted(!isCompleted);
    };

    // Генеруємо кнопки для доступних форматів
    const formatButtons = formats.map(format => {
      const formatLabels = {
        video: 'Відео',
        audio: 'Аудіо',
        text: 'Текст',
        interactive: 'Інтерактив'
      };
      
      const formatClasses = {
        video: 'btn-primary',
        audio: 'btn-secondary',
        text: 'btn-info text-white',
        interactive: 'btn-success'
      };
      
      return (
        <a 
          key={format} 
          href={`${format}-lesson.html?id=${id}`} 
          className={`btn ${formatClasses[format]}`}
        >
          {formatLabels[format]}
        </a>
      );
    });

    return (
      <div 
        style={{
          ...styles.lessonCard,
          opacity: isCompleted ? 0.8 : 1,
          borderLeft: isCompleted ? '5px solid #28a745' : '1px solid #ddd'
        }}
        className={isCompleted ? 'completed-lesson' : ''}
      >
        <h3>{title}</h3>
        <div className="lesson-meta mb-2">
          <span className={`badge ${levelColors[level] || 'bg-secondary'} me-1`}>{level}</span>
          <span className={`badge ${categoryColors[category] || 'bg-secondary'} me-1`}>{category}</span>
          <span className="badge bg-secondary me-1">{duration}</span>
          <span className="badge bg-info">{language}</span>
        </div>
        <img src={image} alt={title} style={styles.lessonImage} />
        <p className="mt-2">{description}</p>
        <div className="progress mt-2 mb-3">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: isCompleted ? '100%' : `${progress}%` }}
            aria-valuenow={isCompleted ? 100 : progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        
        {/* Кнопка відмітки про проходження з відступами */}
        <div style={styles.completionButton}>
          <button 
            className={`btn ${isCompleted ? 'btn-success' : 'btn-outline-success'} w-100`}
            onClick={toggleLessonCompletion}
          >
            <i className={`bi ${isCompleted ? 'bi-check-circle-fill' : 'bi-check-circle'} me-1`}></i>
            {isCompleted ? 'Урок пройдено' : 'Відзначити як пройдений'}
          </button>
        </div>
        
        {/* Контейнер для кнопок форматів з класом для адаптивності */}
        <div style={styles.lessonMedia} className="lesson-media">
          {formatButtons}
        </div>
      </div>
    );
  };

  // Компонент фільтрів
  const FilterCard = () => {
    const levels = [
      { id: 'level-a1', label: 'A1 (Початковий)', value: 'A1' },
      { id: 'level-a2', label: 'A2 (Елементарний)', value: 'A2' },
      { id: 'level-b1', label: 'B1 (Середній)', value: 'B1' },
      { id: 'level-b2', label: 'B2 (Вище середнього)', value: 'B2' },
      { id: 'level-c1', label: 'C1 (Просунутий)', value: 'C1' },
    ];

    const categories = [
      { id: 'cat-vocab', label: 'Лексика', value: 'Лексика' },
      { id: 'cat-grammar', label: 'Граматика', value: 'Граматика' },
      { id: 'cat-speaking', label: 'Розмовна мова', value: 'Розмовна мова' },
      { id: 'cat-reading', label: 'Читання', value: 'Читання' },
      { id: 'cat-writing', label: 'Письмо', value: 'Письмо' },
      { id: 'cat-culture', label: 'Культура', value: 'Культура' },
    ];

    const formats = [
      { id: 'format-video', label: 'Відео', value: 'video' },
      { id: 'format-audio', label: 'Аудіо', value: 'audio' },
      { id: 'format-text', label: 'Текст', value: 'text' },
      { id: 'format-interactive', label: 'Інтерактивні', value: 'interactive' },
    ];

    const languages = [
      { id: 'lang-ukrainian', label: 'Українська', value: 'Українська' },
      { id: 'lang-english', label: 'Англійська', value: 'Англійська' },
      { id: 'lang-german', label: 'Німецька', value: 'Німецька' },
      { id: 'lang-french', label: 'Французька', value: 'Французька' },
    ];

    return (
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Фільтри</h5>
        </div>
        <div className="card-body">
          <h6>Рівень складності</h6>
          {levels.map(({ id, label, value }) => (
            <div className="form-check" key={id}>
              <input
                className="form-check-input"
                type="checkbox"
                id={id}
                checked={tempSelectedLevels.includes(value)}
                onChange={() => handleTempLevelChange(value)}
              />
              <label className="form-check-label" htmlFor={id}>{label}</label>
            </div>
          ))}
          <hr />
          <h6>Категорії</h6>
          {categories.map(({ id, label, value }) => (
            <div className="form-check" key={id}>
              <input
                className="form-check-input"
                type="checkbox"
                id={id}
                checked={tempSelectedCategories.includes(value)}
                onChange={() => handleTempCategoryChange(value)}
              />
              <label className="form-check-label" htmlFor={id}>{label}</label>
            </div>
          ))}
          <hr />
          <h6>Формат</h6>
          {formats.map(({ id, label, value }) => (
            <div className="form-check" key={id}>
              <input
                className="form-check-input"
                type="checkbox"
                id={id}
                checked={tempSelectedFormats.includes(value)}
                onChange={() => handleTempFormatChange(value)}
              />
              <label className="form-check-label" htmlFor={id}>{label}</label>
            </div>
          ))}
          <hr />
          <h6>Вибір мови</h6>
          {languages.map(({ id, label, value }) => (
            <div className="form-check" key={id}>
              <input
                className="form-check-input"
                type="checkbox"
                id={id}
                checked={tempSelectedLanguages.includes(value)}
                onChange={() => handleTempLanguageChange(value)}
              />
              <label className="form-check-label" htmlFor={id}>{label}</label>
            </div>
          ))}
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={applyFilters}>
              Застосувати фільтри
            </button>
            <button className="btn btn-outline-secondary" onClick={resetFilters}>
              Скинути
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Компонент досягнень
  const AchievementsCard = () => (
    <div className="card mb-4" style={{ width: '100%' }}>
      <div className="card-header bg-success text-white">
        <h5 className="mb-0">Ваші досягнення</h5>
      </div>
      <div className="card-body">
        <p><strong>Поточна серія:</strong> 7 днів</p>
        <div className="progress mb-3">
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{ width: '70%' }}
            aria-valuenow="70"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            7/10 днів
          </div>
        </div>
        <p><strong>Завершено уроків:</strong> 14</p>
        <p><strong>Зароблено балів:</strong> 2750</p>
        <p><strong>Наступний рівень:</strong> 250 балів</p>
        <div className="d-grid gap-2 mt-3">
          <a href="myProgress.html" className="btn btn-outline-success">
            Переглянути весь прогрес
          </a>
        </div>
      </div>
    </div>
  );

  // Компонент секції уроків
  const LessonsSection = () => (
    <div className="col-lg-9">
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Уроки</h2>
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              id="sortDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Сортувати за
            </button>
            <ul className="dropdown-menu" aria-labelledby="sortDropdown">
              <li><a className="dropdown-item" href="#">Рекомендовані</a></li>
              <li><a className="dropdown-item" href="#">Нові</a></li>
              <li><a className="dropdown-item" href="#">Популярні</a></li>
              <li><a className="dropdown-item" href="#">За рівнем складності</a></li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className="alert alert-info" role="alert">
        <h5>
          <i className="bi bi-info-circle-fill me-2"></i>Рекомендовано для вас
        </h5>
        Базуючись на вашому рівні, радимо почати з уроків побутової лексики та основ граматики.
      </div>
      <div className="lessons-grid" style={styles.lessonsGrid}>
        {filteredLessons.length > 0 ? (
          filteredLessons.map(lesson => (
            <LessonCard key={lesson.id} {...lesson} />
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-warning">
              Уроків за обраними критеріями не знайдено. Спробуйте змінити параметри фільтрів.
            </div>
          </div>
        )}
      </div>
      <nav aria-label="Навігація по сторінках" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">
              Попередня
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">1</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">2</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">3</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">Наступна</a>
          </li>
        </ul>
      </nav>
    </div>
  );

  // Головний JSX
  return (
    <div className="container">
      <div className="row my-4">
        <div className="col-lg-3">
          <div style={{ position: 'relative' }}>
            <FilterCard />
            <div style={{ width: '100%', marginBottom: '20px' }}>
              <AchievementsCard />
            </div>
          </div>
        </div>
        <LessonsSection />
      </div>
    </div>
  );
}