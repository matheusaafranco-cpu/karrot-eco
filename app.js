// Dados Iniciais de Exemplo
let items = [
    { id: 1, title: 'Caixa de Papelão e Plástico Bolha', price: 0, category: 'free', icon: 'fa-box', time: 'Há 10 min' },
    { id: 2, title: 'Monitor antigo 19" (Ideal p/ peças)', price: 30, category: 'electronics', icon: 'fa-desktop', time: 'Há 1 hora' },
    { id: 3, title: 'Cadeira de Escritório Giratória', price: 50, category: 'home', icon: 'fa-chair', time: 'Há 3 horas' },
    { id: 4, title: 'Coleção de Livros de Física', price: 0, category: 'books', icon: 'fa-book', time: 'Há 5 horas' }
];

let questions = [
    {
        id: 1,
        question: 'Onde tem ponto de coleta de pilhas e eletrônicos no Centro?',
        answer: 'Você pode descartar em pontos de coleta em supermercados locais ou no ecoponto municipal!'
    }
];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderItems('all');
    renderQA();
});

// Navegação por Abas
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.menu-item').forEach(btn => btn.classList.remove('active'));

    document.getElementById(`tab-${tabId}`).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Renderizar Marketplace
function renderItems(category) {
    const grid = document.getElementById('items-grid');
    grid.innerHTML = '';

    const filtered = category === 'all' ? items : items.filter(item => item.category === category);

    filtered.forEach(item => {
        const isFree = item.price === 0;
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-img">
                <i class="fa-solid ${item.icon}"></i>
            </div>
            <div class="item-info">
                <div class="item-title">${item.title}</div>
                <div class="item-price ${isFree ? 'free' : ''}">
                    ${isFree ? '🌱 GRÁTIS' : `R$ ${item.price}`}
                </div>
                <div class="item-meta">
                    <span>Centro</span>
                    <span>${item.time}</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filtrar Categorias
function filterCategory(cat) {
    document.querySelectorAll('.pill').forEach(pill => pill.classList.remove('active'));
    event.currentTarget.classList.add('active');
    renderItems(cat);
}

// Modal de Publicação
function openPublishModal() {
    document.getElementById('publish-modal').style.display = 'flex';
}

function closePublishModal() {
    document.getElementById('publish-modal').style.display = 'none';
}

function publishItem() {
    const title = document.getElementById('item-title').value;
    const category = document.getElementById('item-category').value;
    const price = Number(document.getElementById('item-price').value);

    if (!title) return alert('Por favor, preencha o título.');

    items.unshift({
        id: Date.now(),
        title,
        price,
        category,
        icon: 'fa-recycle',
        time: 'Agora mesmo'
    });

    renderItems('all');
    closePublishModal();
    alert('Item anunciado com sucesso! Obrigado por ajudar o planeta 🌱');
}

// Fórum Q&A
function renderQA() {
    const feed = document.getElementById('qa-feed');
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
    if (!input.value) return;

    questions.unshift({
        id: Date.now(),
        question: input.value,
        answer: 'Obrigado por perguntar! A comunidade e nossos monitores eco vão responder em breve.'
    });

    input.value = '';
    renderQA();
}

// Assistente IA Simulado
function sendAiMessage() {
    const input = document.getElementById('ai-chat-input');
    const text = input.value.trim();
    if (!text) return;

    const messages = document.getElementById('chat-messages');

    // Mensagem do usuário
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.innerHTML = `<div class="message-body">${text}</div>`;
    messages.appendChild(userMsg);

    input.value = '';

    // Resposta simulada da IA
    setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'message ai';
        aiMsg.innerHTML = `
            <i class="fa-solid fa-carrot chat-avatar"></i>
            <div class="message-body">Dica Sustentável: Para lidar com "${text}", priorize a reutilização local antes da reciclagem! Isso economiza energia e emissões de carbono no transporte.</div>
        `;
        messages.appendChild(aiMsg);
        messages.scrollTop = messages.scrollHeight;
    }, 600);
}

function handleKeyPress(e) {
    if (e.key === 'Enter') sendAiMessage();
}