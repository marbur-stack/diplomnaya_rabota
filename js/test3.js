document.addEventListener('DOMContentLoaded', function() {
    const questionsContainer = document.getElementById('questionsContainer');
    const submitBtn = document.getElementById('submitTest');
    const retryBtn = document.getElementById('retryTest');
    const resultDiv = document.getElementById('result');
    const scoreSpan = document.getElementById('score');
    const totalQuestionsSpan = document.getElementById('totalQuestions');
    const messageP = document.getElementById('resultMessage');


    // вопросы
const questions = [
    {
        question: "Вид информации, отражающей опыт специалиста в определенной предметной области, называется",
        options: ["пониманием", "знанием", "текстом", "объяснением"],
        answer: 1
    },
    {
        question: "Модуль СППР в составе ЕАИС ТО называется",
        options: ["Аналитика - 2000", "Консультант", "Уотсон", "нет правильного ответа"],
        answer: 0
    },
    {
        question: "Какими факторами определяется область применения методов разработки решений?",
        options: ["Характером решаемых проблем", "Условиями, в которых принимается решение", "Сочетанием обоих факторов", "нет правильного ответа"],
        answer: 3
    },
    {
        question: "В чем заключается риск при принятии управленческих решений?",
        options: ["Опасность принятия неудачного решения", "Отсутствие необходимой информации для анализа ситуации", "Вероятность потери ресурсов или неполучения дохода", "Невозможность прогнозировать результаты решения"],
        answer: 1
    },
    {
        question: "Лицо, принимающее решение несет ответственность за:",
        options: ["«Непродуманные» решения", "«Моральные» решения", "Решения, принятые в условиях неопределенности и риска", "За все принимаемые им решения"],
        answer: 3
    },
    {
        question: "Какой подход рассматривает организацию как совокупность взаимосвязанных элементов?",
        options: ["функциональный подход", "воспроизводственный подход", "системный подход", "ситуационный подход"],
        answer: 2
    },
    {
        question: "Собственные информационные ресурсы предприятия - это",
        options: ["информация, поступающая от поставщиков", "информация, генерируемая внутри предприятия", "информация, поступающая от клиентов", "информация, поступающая из глобальной сети"],
        answer: 1
    },
    {
        question: "Какая технология усиливает СППР?",
        options: ["ИИ и машинное обучение", "Только Excel", "Слайды PowerPoint", "Флеш-анимации"],
        answer: 0
    },
    {
        question: "Как СППР влияет на принятие решений?",
        options: ["Основано на интуиции", "Объективность и прозрачность", "Заменяет людей", "Усложняет процессы"],
        answer: 1
    },
    {
        question: "Сложный программный комплекс, который аккумулирует знания специалистов в конкретных предметных областях с целью выработки рекомендаций или решения проблемы называется",
        options: ["аккумулирующей системой", "решающей системой", "экспертной системой"],
        answer: 2
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