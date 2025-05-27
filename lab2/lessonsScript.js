
document.addEventListener('DOMContentLoaded', function() {
    const lessonCards = document.querySelectorAll('.lesson-card');
    
    lessonCards.forEach((card, index) => {
        const markButton = document.createElement('button');
        markButton.className = 'btn btn-outline-success mt-2';
        markButton.innerHTML = '<i class="bi bi-check-circle me-1"></i> Відзначити як пройдений';
        
        const lessonContent = card.querySelector('.lesson-content');
        lessonContent.appendChild(markButton);
        
        const lessonId = `lesson-${index}`;
        const isCompleted = localStorage.getItem(lessonId) === 'completed';
        
        if (isCompleted) {
            markAsCompleted(card, markButton);
        }
        
        markButton.addEventListener('click', function() {
            if (card.classList.contains('completed-lesson')) {
                localStorage.removeItem(lessonId);
                markAsNotCompleted(card, markButton);
            } else {
                localStorage.setItem(lessonId, 'completed');
                markAsCompleted(card, markButton);
            }
        });
    });
    
    function markAsCompleted(card, button) {
        card.classList.add('completed-lesson');
        card.style.opacity = '0.8';
        card.style.borderLeft = '5px solid #28a745';
        button.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> Урок пройдено';
        button.classList.remove('btn-outline-success');
        button.classList.add('btn-success');
        
        const progressBar = card.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = '100%';
        }
    }
    
    function markAsNotCompleted(card, button) {
        card.classList.remove('completed-lesson');
        card.style.opacity = '1';
        card.style.borderLeft = '';
        button.innerHTML = '<i class="bi bi-check-circle me-1"></i> Відзначити як пройдений';
        button.classList.remove('btn-success');
        button.classList.add('btn-outline-success');
        
        const progressBar = card.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = '25%';
        }
    }
});



