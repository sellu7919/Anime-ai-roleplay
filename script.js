async function sendMessage() {
  const character = document.getElementById('characterName').value;
  const userInput = document.getElementById('userMessage').value;
  const chatBox = document.getElementById('chatBox');
  const apiKey = prompt('Enter your OpenAI API Key');

  if (!character || !userInput || !apiKey) {
    alert('Please fill in everything!');
    return;
  }

  chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

  const response = await fetch('https://your-backend-url/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: apiKey,
      messages: [
        { role: 'system', content: `You are roleplaying as ${character}. Stay in character and respond emotionally and vividly.` },
        { role: 'user', content: userInput }
      ]
    })
  });

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content || "Error";

  chatBox.innerHTML += `<p><strong>${character}:</strong> ${reply}</p>`;
  document.getElementById('userMessage').value = '';
}
