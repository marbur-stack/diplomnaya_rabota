document.addEventListener('DOMContentLoaded', function() {
    const questionsContainer = document.getElementById('questionsContainer');
    const submitBtn = document.getElementById('submitTest');
    const retryBtn = document.getElementById('retryTest');
    const resultDiv = document.getElementById('result');
    const scoreSpan = document.getElementById('score');
    const totalQuestionsSpan = document.getElementById('totalQuestions');
    const messageP = document.getElementById('resultMessage');


const questions = [
    {
        question: "Какой из следующих методов относится к оптимизационным алгоритмам СППР?",
        options: ["Метод экспертных оценок", "Метод анализа иерархий", "Метод ветвей и границ", "SWOT-анализ"],
        answer: 2
    },
    {
        question: "Какой критерий называется критерием крайнего пессимизма?",
        options: ["критерий максимина", "критерий Сэвиджа", "критерий Гурвица", "нет правильного ответа"],
        answer: 0
    },
    {
        question: "Динамическое программирование эффективно при:",
        options: ["Задачи классификации", "Повторяющиеся подзадачи", "Рандомизация", "Обучение с подкреплением"],
        answer: 1
    },
    {
        question: "Какой метод используют в анализе решений с неопределённостью?",
        options: ["Фаззи-логика", "Случайный лес", "Градиентный бустинг", "Нейросети"],
        answer: 0
    },
    {
        question: "Графическое представление дерева решений помогает:",
        options: ["Улучшить стиль интерфейса", "Предсказать риски", "Оптимизировать логистику", "Упростить восприятие модели"],
        answer: 3
    },
    {
        question: "Какой метод относят к многокритериальным алгоритмам?",
        options: ["Метод анализа иерархий", "Метод k-средних", "Метод ближайших соседей", "Метод наименьших квадратов"],
        answer: 0
    },
    {
        question: "Какой подход рассматривает организацию как совокупность взаимосвязанных элементов?",
        options: ["функциональный подход", "воспроизводственный подход", "системный подход", "ситуационный подход"],
        answer: 2
    },
    {
        question: "Это является численным выражением предпочтения:",
        options: ["вероятность", "полезность", "математическое ожидание"],
        answer: 1
    },
    {
        question: "Критерий Ходжа-Лемана это:",
        options: ["комбинация критериев Байеса -Лапласа и Гурвица", "комбинация критериев недостаточного основания Лапласа и Гурвица", "комбинация критериев Байеса -Лапласа и ММ -критерия", "комбинация критериев Гурвица и ММ -критерия"],
        answer: 2
    },
    {
        question: "Какой формальный критерий использует коэффициент оптимизма",
        options: ["Гурвица", "Лапласа", "Вальда"],
        answer: 0
    }
];

    // Генерация вопросов
    function renderQuestions() {
        questionsContainer.innerHTML = '';
        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.id = `question-${index}`;
            
            const optionsHTML = q.options.map((option, i) => {
                return `
                    <label id="option-${index}-${i}">
                        <input type="radio" name="q${index}" value="${i}">
                        ${option}
                    </label>
                `;
            }).join('');
            
            questionDiv.innerHTML = `
                <h3>${index + 1}. ${q.question}</h3>
                <div class="options">${optionsHTML}</div>
            `;
            
            questionsContainer.appendChild(questionDiv);
        });
        totalQuestionsSpan.textContent = questions.length;
    }

    // Проверка ответов
    submitBtn.addEventListener('click', function() {
        let score = 0;
        let answeredAll = true;

        // Проверяем каждый вопрос
        questions.forEach((q, index) => {
            const questionDiv = document.getElementById(`question-${index}`);
            const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
            
            // Проверка на ответ
            if (!selectedOption) {
                answeredAll = false;
                return;
            }

            const selectedValue = parseInt(selectedOption.value);
            const isCorrect = selectedValue === q.answer;
            
            // Подсветка результатов
            questionDiv.classList.add(isCorrect ? 'correct' : 'incorrect');
            
            // Подсветка правильного ответа
            document.getElementById(`option-${index}-${q.answer}`).classList.add('correct-answer');
            
            // Подсветка неправильного выбора
            if (!isCorrect) {
                document.getElementById(`option-${index}-${selectedValue}`).classList.add('incorrect-selected');
            }
            
            if (isCorrect) score++;
        });

        if (!answeredAll) {
            alert('Пожалуйста, ответьте на все вопросы!');
            return;
        }

        // Показываем результат
        scoreSpan.textContent = score;
        
        // Формируем сообщение
        const percentage = Math.round((score / questions.length) * 100);
        if (percentage >= 80) {
            messageP.textContent = "Отличный результат! Вы хорошо усвоили материал.";
        } else if (percentage >= 50) {
            messageP.textContent = "Хороший результат, но есть над чем поработать.";
        } else {
            messageP.textContent = "Рекомендуем повторить материал и попробовать снова.";
        }

        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth' });
        
        // Блокируем кнопку отправки
        submitBtn.disabled = true;
    });

    // Повторное прохождение теста
    retryBtn.addEventListener('click', function() {
        renderQuestions();
        resultDiv.style.display = 'none';
        submitBtn.disabled = false;
        questionsContainer.scrollIntoView({ behavior: 'smooth' });
    });

    // Инициализация теста
    renderQuestions();
});