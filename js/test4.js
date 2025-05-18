document.addEventListener('DOMContentLoaded', function() {
    const questionsContainer = document.getElementById('questionsContainer');
    const submitBtn = document.getElementById('submitTest');
    const retryBtn = document.getElementById('retryTest');
    const resultDiv = document.getElementById('result');
    const scoreSpan = document.getElementById('score');
    const totalQuestionsSpan = document.getElementById('totalQuestions');
    const messageP = document.getElementById('resultMessage');

    // Вопросы
const questions = [
    {
        question: "Решение принимается в условиях риска, если:",
        options: [
            "невозможно прогнозировать его результат",
            "оно может иметь несколько исходов с определенной степенью вероятности",
            "невозможно определить вероятность его осуществления",
            "нет правильного ответа"
        ],
        answer: [1]
    },
    {
        question: "Какой критерий называется критерием крайнего пессимизма?",
        options: ["критерий максимина", "критерий Сэвиджа", "критерий Гурвица", "нет правильного ответа"],
        answer: [0]
    },
    {
        question: "Процесс принятия управленческого решения состоит из следующих этапов:",
        options: [
            "планирование, организация, контроль",
            "планирование, координирование, организация, контроль",
            "уяснение проблемы, формулировка цели, оценка обстановки, выработка решения, контроль, оказания помощи",
            "нет правильного ответа"
        ],
        answer: [3]
    },
    {
        question: "Какие из перечисленных условий соответствуют вероятностным решениям?",
        options: ["условия определенности", "условия риска", "условия неопределенности", "условия риска и неопределенности"],
        answer: [1]
    },
    {
        question: "Справедливо ли утверждение, что ЛПР (лицо, принимающее решение) – это всегда один из менеджеров организации?",
        options: ["да, справедливо", "да, если менеджер имеет необходимые полномочия", "нет, группа тоже может быть ЛПР", "нет правильного ответа"],
        answer: [2]
    },
    {
        question: "Задачи принятия решения, где критерий оптимальности и ограничения не зависят от времени, называют:",
        options: ["динамические", "статические", "функциональные"],
        answer: [1]
    },
    {
        question: "Какой формальный критерий использует коэффициент оптимизма?",
        options: ["Гурвица", "Лапласа", "Вальда"],
        answer: [0]
    },
    {
        question: "Чем вызывается необходимость принимать решения?",
        options: [
            "Необходимость принимать решения возникает в ситуации выбора",
            "Принятие решений вызывается необходимостью устранить отклонения от нормального состояния объекта",
            "Принятие решений связано с изменением целей управления",
            "Необходимость принимать решения вызвана постоянными изменениями ситуации"
        ],
        answer: [3]
    },
    {
        question: "В чем состоят ограничения количественных методов принятия решений?",
        options: [
            "ограниченность ресурсов",
            "трудность перевода параметров в измеряемые показатели",
            "недостаточность необходимых показателей",
            "недостаточность методов измерения"
        ],
        answer: [1, 3]
    },
    {
        question: "Как называется решение, принятое по заранее определенному алгоритму?",
        options: ["Детерминированное", "Формализованное", "Хорошо структурированное", "Стандартное"],
        answer: [0]
    },
    {
        question: "Что понимается под технологией принятия решений?",
        options: [
            "Состав и последовательность операций по разработке и выполнению решений.",
            "Методы разработки и выбора альтернатив",
            "Методы исследования операций",
            "Верно А и Б"
        ],
        answer: [3]
    },
    {
        question: "В чем заключается риск при принятии управленческих решений?",
        options: [
            "Опасность принятия неудачного решения",
            "Отсутствие необходимой информации для анализа ситуации",
            "Вероятность потери ресурсов или неполучения дохода",
            "Невозможность прогнозировать результаты решения"
        ],
        answer: [1]
    },
    {
        question: "Какими факторами определяется область применения методов разработки решений?",
        options: [
            "Характером решаемых проблем",
            "Условиями, в которых принимается решение",
            "Сочетанием обоих факторов",
            "нет правильного ответа"
        ],
        answer: [3]
    },
    {
        question: "К проблемам, обеспечивающих процесс принятия решения относятся:",
        options: [
            "Все ответы верны",
            "Проблема целей: выяснение процесса формирования цели функционирования предприятия и их оценка в определенном направлении или ситуации",
            "Проблема результата: изучение процесса формирования результатов функционирования предприятия и их оценка"
        ],
        answer: [0]
    },
    {
        question: "Критерий Ходжа-Лемана это:",
        options: [
            "комбинация критериев Байеса-Лапласа и Гурвица",
            "комбинация критериев недостаточного основания Лапласа и Гурвица",
            "комбинация критериев Гурвица и ММ-критерия",
            "комбинация критериев Байеса-Лапласа и ММ-критерия"
        ],
        answer: [3]
    },
    {
        question: "Первый этап построения математической модели в задаче оптимизации – …",
        options: [
            "Исследование объекта",
            "Формализация",
            "Исследование рынка",
            "Правильного ответа нет"
        ],
        answer: [0]
    },
    {
        question: "Любой критерий оптимальности имеет…",
        options: [
            "Экономическую природу",
            "Природу управления параметров",
            "Торговую природу",
            "Правильного ответа нет"
        ],
        answer: [0]
    }
];

    // Генерация вопросов с указанием количества правильных ответов
    function renderQuestions() {
        questionsContainer.innerHTML = '';
        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.id = `question-${index}`;
            
            // Добавляем подсказку о количестве правильных ответов
            const answersCountHint = q.answer.length > 1 ? 
                `<span class="answers-hint">(${q.answer.length} правильных ответа)</span>` : 
                `<span class="answers-hint">(1 правильный ответ)</span>`;
            
            const optionsHTML = q.options.map((option, i) => {
                return `
                    <label id="option-${index}-${i}">
                        <input type="checkbox" name="q${index}" value="${i}">
                        ${option}
                    </label>
                `;
            }).join('');
            
            questionDiv.innerHTML = `
                <h3>${index + 1}. ${q.question} ${answersCountHint}</h3>
                <div class="options">${optionsHTML}</div>
            `;
            
            questionsContainer.appendChild(questionDiv);
        });
        totalQuestionsSpan.textContent = questions.length;
    }

    // Проверка ответов
    submitBtn.addEventListener('click', function() {
        let totalScore = 0;
        let answeredAll = true;

        questions.forEach((q, index) => {
            const questionDiv = document.getElementById(`question-${index}`);
            const checkboxes = document.querySelectorAll(`input[name="q${index}"]:checked`);
            
            if (checkboxes.length === 0) {
                answeredAll = false;
                return;
            }

            const selected = Array.from(checkboxes).map(cb => parseInt(cb.value));
            const correct = q.answer;
            let score = 0;

            correct.forEach(ans => {
                if (selected.includes(ans)) score += 1 / correct.length;
            });
            selected.forEach(sel => {
                if (!correct.includes(sel)) score -= 1 / correct.length;
            });

            score = Math.max(0, score);
            totalScore += score;

            questionDiv.classList.add(score > 0.8 ? 'correct' : 'incorrect');
            
            correct.forEach(ans => {
                document.getElementById(`option-${index}-${ans}`).classList.add('correct-answer');
            });
            
            selected.forEach(sel => {
                if (!correct.includes(sel)) {
                    document.getElementById(`option-${index}-${sel}`).classList.add('incorrect-selected');
                }
            });
        });

        if (!answeredAll) {
            alert('Пожалуйста, ответьте на все вопросы!');
            return;
        }

        scoreSpan.textContent = totalScore.toFixed(2);
        
        const percentage = Math.round((totalScore / questions.length) * 100);
        if (percentage >= 80) {
            messageP.textContent = "Отличный результат! Вы хорошо усвоили материал.";
        } else if (percentage >= 50) {
            messageP.textContent = "Хороший результат, но есть над чем поработать.";
        } else {
            messageP.textContent = "Рекомендуем повторить материал и попробовать снова.";
        }

        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth' });
        
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