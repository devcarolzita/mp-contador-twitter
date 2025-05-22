document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.querySelector('textarea');
  const circle = document.querySelector('.progress-ring__circle');
  const text = document.getElementById('text');

  //raio do círculo.
  const RADIUS = 16;
  //perimetro do circulo
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const MAX_CHARS = 280;
  const WARNING_THRESHOLD = 260;

  // Define o tamanho do círculo

  circle.style.strokeDasharray = CIRCUMFERENCE;
  circle.style.strokeDashoffset = CIRCUMFERENCE;

  textarea.addEventListener('input', handleInput);

  function handleInput() {
    resizeTextarea();
    const charCount = textarea.value.length;
    const percent = Math.min((charCount / MAX_CHARS) * 100, 100);
    updateProgress(percent, charCount);
  }

  //evita scroll 
  function resizeTextarea() {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  function updateProgress(percent, charCount) {
    const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
    circle.style.strokeDashoffset = offset;
    circle.style.stroke = getStrokeColor(charCount);
    updateCounterText(charCount);
  }

  function getStrokeColor(count) {
    if (count >= MAX_CHARS) return 'red';
    if (count >= WARNING_THRESHOLD) return 'orange';
    return '#1f9bf0';
  }

  function updateCounterText(count) {
    if (count >= WARNING_THRESHOLD || count < 0) {
      const remaining = MAX_CHARS - count;
      text.textContent = remaining;
    } else {
      text.textContent = '';
    }
  }
});
