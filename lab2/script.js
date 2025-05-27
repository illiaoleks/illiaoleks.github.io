// Масив об'єктів з інформацією про уроки
const lessons = [
    {
        title: "Побутова лексика",
        level: "A2",
        category: "Лексика", 
        duration: "45 хв",
        language: "Українська",
        image: "https://i.pinimg.com/474x/22/37/c7/2237c7bf07262bcfcf2e9367b8a47c63.jpg",
        description: "Вивчіть основні слова та фрази для повсякденного використання у побуті.",
        progress: 25
    },
    {
        title: "Ділове спілкування", 
        level: "B1",
        category: "Лексика",
        duration: "60 хв", 
        language: "Англійська",
        image: "https://i.pinimg.com/736x/bf/89/06/bf8906c3d9ffbd5ba2631ef101f8c1e2.jpg",
        description: "Опануйте професійну лексику та фрази для ділових зустрічей та листування.",
        progress: 40
    },
    {
        title: "Граматика",
        level: "A2", 
        category: "Граматика",
        duration: "55 хв",
        language: "Українська", 
        image: "https://i.pinimg.com/474x/e3/2f/08/e32f08af59a42550fc12fcdca39c9886.jpg",
        description: "Основні правила української граматики з практичними прикладами.",
        progress: 20
    },
    // Решта уроків з попереднього HTML
    {
        title: "Туристичні фрази",
        level: "A2",
        category: "Лексика",
        duration: "40 хв",
        language: "Німецька", 
        image: "https://i.pinimg.com/474x/d7/d2/f2/d7d2f2f41775d5978beb0d07bc68a125.jpg",
        description: "Корисні фрази та слова для подорожей Україною.",
        progress: 10
    },
    {
        title: "Історії та діалоги",
        level: "B1",
        category: "Читання",
        duration: "30 хв", 
        language: "Французька",
        image: "https://i.pinimg.com/736x/26/61/43/26614316b32ba67856224f69f033e97d.jpg",
        description: "Короткі історії та діалоги для практики читання та розуміння.",
        progress: 60
    }
];

// Функція для генерації HTML картки уроку
function generateLessonCard(lesson) {
    return `
    <div class="lesson-card">
        <h3>${lesson.title}</h3>
        <div class="lesson-content">
            <div class="lesson-meta mb-2">
                <span class="badge bg-${lesson.level === 'A2' || lesson.level === 'A1' ? 'success' : lesson.level === 'B1' ? 'warning' : 'danger'}">${lesson.level}</span>
                <span class="badge bg-${lesson.category === 'Лексика' ? 'primary' : lesson.category === 'Граматика' ? 'danger' : lesson.category === 'Читання' ? 'info' : 'dark'}">${lesson.category}</span>
                <span class="badge bg-secondary">${lesson.duration}</span>
                <span class="badge bg-info">${lesson.language}</span>
            </div>
            <img src="${lesson.image}" alt="${lesson.title}">
            <p class="mt-2">${lesson.description}</p>
            <div class="progress mt-2 mb-3" style="height: 5px;">
                <div class="progress-bar bg-success" role="progressbar" style="width: ${lesson.progress}%;" aria-valuenow="${lesson.progress}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="lesson-media">
                <a href="video-lesson.html" class="btn btn-primary">Відео</a>
                <a href="audio-lesson.html" class="btn btn-secondary">Аудіо</a>
                <a href="text-lesson.html" class="btn btn-info text-white">Текст</a>
            </div>
        </div>
    </div>`;
}

// Функція для рендерингу всіх уроків
function renderLessons() {
    const lessonsContainer = document.querySelector('.lessons-grid');
    
    // Цикл for для генерації карток уроків
    for (let i = 0; i < lessons.length; i++) {
        const lessonCard = generateLessonCard(lessons[i]);
        lessonsContainer.innerHTML += lessonCard;
    }
}

// Виклик функції рендерингу при завантаженні сторінки
document.addEventListener('DOMContentLoaded', renderLessons);