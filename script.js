function generateProblem() {
    const level = document.getElementById('level').value;
    const goal = document.getElementById('goal').value;
    const topic = document.getElementById('topic').value;
    const questionTypes = Array.from(document.querySelectorAll('input[name="questionType"]:checked')).map(el => el.nextElementSibling.textContent);
    const difficulty = document.getElementById('difficulty').value;
    const realTimeUpdate = document.getElementById('realTimeUpdate').checked;

    let generatedProblem = `레벨: ${level}\n학습 목표: ${goal}\n주제: ${topic}\n문제 유형: ${questionTypes.join(', ')}\n난이도: ${difficulty}/10\n실시간 업데이트: ${realTimeUpdate ? '적용' : '미적용'}`;

    document.getElementById('generatedProblem').textContent = generatedProblem;
}
