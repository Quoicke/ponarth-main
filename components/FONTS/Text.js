const h2Element = document.getElementById('litle_text_two');
const text = h2Element.textContent;
const words = text.split(' ');

let spannedText = '';
words.forEach(word => {
  spannedText += `<span class='hoverable'>${word}</span> `;
});
h2Element.innerHTML = spannedText.trim();