<script>
    const questions = [
        {
            type: "fill_blank",
            question: "유산소 운동은 ____ 건강에 좋습니다.",
            answer: "심장",
            explanation: "유산소 운동은 심장 건강을 증진시킵니다."
        },
        {
            type: "true_false",
            question: "웨이트 트레이닝은 근육량 증가에 도움이 됩니다.",
            answer: true,
            explanation: "웨이트 트레이닝은 근육 성장을 자극합니다."
        },
        {
            type: "multiple_choice",
            question: "다음 중 유산소 운동이 아닌 것은?",
            options: ["조깅", "수영", "벤치프레스", "사이클링"],
            answer: 2,
            explanation: "벤치프레스는 무산소 운동입니다."
        },
        {
            type: "essay",
            question: "운동이 정신 건강에 미치는 영향에 대해 설명하세요.",
            modelAnswer: "운동은 스트레스 감소, 기분 개선, 자신감 향상 등 정신 건강에 긍정적인 영향을 줍니다.",
            explanation: "개인의 답변에 따라 평가합니다."
        }
    ];

    let currentQuestion = null;

    function displayQuestion() {
        currentQuestion = questions[Math.floor(Math.random() * questions.length)];
        const container = document.getElementById('questionContainer');
        
        let html = `<h3>${currentQuestion.question}</h3>`;
        
        switch(currentQuestion.type) {
            case 'fill_blank':
                html += `<input type="text" id="answer">`;
                break;
            case 'true_false':
                html += `
                    <input type="radio" name="answer" value="true"> 참
                    <input type="radio" name="answer" value="false"> 거짓
                `;
                break;
            case 'multiple_choice':
                html += currentQuestion.options.map((option, index) => 
                    `<input type="radio" name="answer" value="${index}"> ${option}`
                ).join('<br>');
                break;
            case 'essay':
                html += `<textarea id="answer" rows="4" cols="50"></textarea>`;
                break;
        }

        container.innerHTML = html;
    }

    function checkAnswer() {
        const userAnswer = document.querySelector('input[name="answer"]:checked')?.value || document.getElementById('answer')?.value;
        const resultDiv = document.getElementById('result');

        if (currentQuestion.type === 'essay') {
            resultDiv.innerHTML = `모범 답안: ${currentQuestion.modelAnswer}<br>설명: ${currentQuestion.explanation}`;
        } else {
            const isCorrect = userAnswer == currentQuestion.answer;
            resultDiv.innerHTML = isCorrect ? 
                `정답입니다!<br>설명: ${currentQuestion.explanation}` : 
                `틀렸습니다. 정답은 ${currentQuestion.answer}입니다.<br>설명: ${currentQuestion.explanation}`;
        }
    }

    document.getElementById('submitAnswer').addEventListener('click', checkAnswer);
    displayQuestion();
</script>