
document.addEventListener('DOMContentLoaded', function () {
    let currentQuestionIndex = 0;
    let questions = [];

    function loadQuestions() {
        fetch('/api/questions')
            .then(response => response.json())
            .then(data => {
                questions = data;
                renderQuestion();
            });
    }

    function renderQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById('question').textContent = currentQuestion.question;
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = ''; // Limpiar opciones anteriores

        currentQuestion.options.forEach((option, index) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer';
            input.value = index;

            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            optionsContainer.appendChild(label);
        });

        document.querySelectorAll('input[name="answer"]').forEach(function (input) {
            input.addEventListener('change', function () {
                document.getElementById('confirm-button').disabled = false;
            });
        });

        document.getElementById('confirm-button').addEventListener('click', function () {
            const selectedAnswer = document.querySelector('input[name="answer"]:checked');
            if (selectedAnswer) {
                const selectedValue = parseInt(selectedAnswer.value);
                const correctAnswer = questions[currentQuestionIndex].correctAnswer;

                if (selectedValue === correctAnswer) {
                    document.getElementById('result').textContent = "¡Correcto!";
                } else {
                    document.getElementById('result').textContent = "Incorrecto.";
                }

                document.querySelectorAll('input[name="answer"]').forEach(function (input) {
                    input.disabled = true;
                });
                document.getElementById('confirm-button').disabled = true;
            }
        });
    }

    document.getElementById('start-button').addEventListener('click', function () {
        document.querySelector('.cover-container').style.display = 'none';
        document.querySelector('.quiz-container').style.display = 'block';
        loadQuestions();
    });
});
