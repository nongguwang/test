// js/create.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('problem-form');
  const previewContainer = document.getElementById('preview-container');
  const previewContent = document.getElementById('preview-content');
  const editBtn = document.getElementById('edit-btn');
  const reissueBtn = document.getElementById('reissue-btn');
  const difficultySlider = document.getElementById('difficulty');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Retrieve form data
    const level = document.getElementById('level').value;
    const goal = document.getElementById('goal').value;
    const topic = document.getElementById('topic').value;
    const types = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value).join(', ');
    const difficulty = difficultySlider.value;
    const updates = document.getElementById('updates').checked;

    // Display preview
    previewContent.innerHTML = `
      <h3>문제 설정 미리보기</h3>
      <p><strong>레벨:</strong> ${level}</p>
      <p><strong>학습 목표:</strong> ${goal}</p>
      <p><strong>주제:</strong> ${topic}</p>
      <p><strong>문제 유형:</strong> ${types}</p>
      <p><strong>난이도:</strong> ${difficulty}</p>
      <p><strong>실시간 업데이트:</strong> ${updates ? '예' : '아니오'}</p>
    `;

    previewContainer.classList.remove('hidden');

    // Send data to the server
    try {
      const response = await fetch('http://localhost:3000/api/create-problem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          level,
          goal,
          topic,
          types,
          difficulty,
          updates,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('서버 요청 실패:', error);
    }
  });

  editBtn.addEventListener('click', () => {
    previewContainer.classList.add('hidden');
  });

  reissueBtn.addEventListener('click', () => {
    form.reset();
    previewContainer.classList.add('hidden');
  });
});
