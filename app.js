let questions = [
    {
        id: 1,
        question: 'Onde posso descartar pilhas e baterias velhas no meu bairro?',
        answer: 'Muitos supermercados e lojas de eletrônicos possuem coletores próprios, além do Ecoponto municipal!'
    },
    {
        id: 2,
        question: 'O que devo fazer com óleo de cozinha usado?',
        answer: 'Nunca jogue no ralo! Espere esfriar, guarde em uma garrafa PET e leve até um ponto de coleta de recicláveis.'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    renderQA();
});

// Navegação entre abas
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.menu-item').forEach(btn => btn.classList.remove('active'));

    document.getElementById(`tab-${tabId}`).classList.add('active');
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }
}

// Fórum de Perguntas
function renderQA() {
    const feed = document.getElementById('qa-feed');
    if (!feed) return;
    feed.innerHTML = '';

    questions.forEach(q => {
        const item = document.createElement('div');
        item.className = 'qa-card';
        item.innerHTML = `
            <div class="qa-question"><i class="fa-solid fa-circle-question" style="color:var(--primary)"></i> ${q.question}</div>
            <div class="qa-answer"><i class="fa-solid fa-leaf" style="color:var(--eco-green)"></i> ${q.answer}</div>
        `;
        feed.appendChild(item);
    });
}

function postQuestion() {
    const input = document.getElementById('qa-input');
    if (!input || !input.value.trim()) return;

    questions.unshift({
        id: Date.now(),
        question: input.value,
        answer: 'Obrigado por perguntar! A comunidade e os monitores ambientais responderão em breve.'
    });

    input.value = '';
    renderQA();
}

// Assistente IA Simulado com Dicas de Poluição
function sendAiMessage() {
    const input = document.getElementById('ai-chat-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    const messages = document.getElementById('chat-messages');

    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.innerHTML = `<div class="message-body">${text}</div>`;
    messages.appendChild(userMsg);

    input.value = '';

    setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'message ai';
        aiMsg.innerHTML = `
            <i class="fa-solid fa-carrot chat-avatar"></i>
            <div class="message-body">💡 <strong>Dica Sustentável:</strong> Sobre "${text}", lembre-se de que pequenas atitudes locais reduzem imensamente a pegada ecológica. Separe os resíduos corretamente e ajude a conscientizar sua comunidade!</div>
        `;
        messages.appendChild(aiMsg);
        messages.scrollTop = messages.scrollHeight;
    }, 600);
}

function handleKeyPress(e) {
    if (e.key === 'Enter') sendAiMessage();
}

// Toggle dos desafios
function toggleChallenge(checkbox) {
    const parent = checkbox.parentElement;
    if (checkbox.checked) {
        parent.style.opacity = '0.6';
        parent.style.textDecoration = 'line-through';
    } else {
        parent.style.opacity = '1';
        parent.style.textDecoration = 'none';
    }
}