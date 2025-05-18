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
            question: "Что такое СППР?",
            options: ["Система Принятия Потребительских Решений", "Система Принятия Правительственных Решений", "Система Поддержки Принятия Решений", "Система Программного Планирования Решений"],
            answer: 2
        },
        {
            question: "Какие методы используются в СППР?",
            options: ["Метод экспертов", "Метод наименьших квадратов", "Метод Монте-Карло", "Все вышеперечисленное"],
            answer: 3
        },
        {
            question: "Какие данные используются для СППР?",
            options: ["Данные для анализа рисков", "Данные о клиентах", "Данные для прогнозирования", "Все вышеперечисленное"],
            answer: 3
        },
        {
            question: "Что такое алгоритм решения задачи в СППР?",
            options: ["Последовательность действий для получения результата", "Программа для автоматического принятия решений", "Математическая модель", "Все перечисленное"],
            answer: 0
        },
        {
            question: "Что из перечисленного является задачей СППР?",
            options: ["Прогнозирование экономической ситуации", "Поддержка принятия решений в условиях неопределенности", "Обработка данных о клиентах", "Все вышеперечисленное"],
            answer: 1
        },
        {
            question: "К проблемам, обеспечивающих процесс принятия решения относятся:",
            options: ["Все ответы верны", "Проблема целей: выяснение процесса формирования цели функционирования предприятия и их оценка в определенном направлении или ситуации", "Проблема результата: изучение процесса формирования результатов функционирования предприятия и их оценка"],
            answer: 0
        },
        {
            question: "Что понимается под технологией принятия решений?",
            options: ["Состав и последовательность операций по разработке и выполнению решений", "Методы разработки и выбора альтернатив", "Методы исследования операций", "Верно А и Б"],
            answer: 3
        },
        {
            question: "Какие методы прогнозирования используются в СППР?",
            options: ["Анализ временных рядов", "Методы машинного обучения", "Математическое моделирование", "Все вышеперечисленное"],
            answer: 3
        },
        {
            question: "Что такое чувствительность решений в СППР?",
            options: ["Оценка того, как изменения данных влияют на результат", "Процесс принятия решения", "Метод оптимизации", "Все вышеперечисленное"],
            answer: 0
        },
        {
            question: "Какой фактор важен при проектировании СППР?",
            options: ["Возможности масштабирования", "Производительность системы", "Юзабилити интерфейса", "Все вышеперечисленное"],
            answer: 3
        },
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