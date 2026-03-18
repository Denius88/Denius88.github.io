
const historicalEvents = [
    {
        date: '3000 р. до н.е.',
        title: 'Стародавній Єгипет',
        emoji: '🏺',
        shortDesc: 'Виникнення однієї з найдавніших цивілізацій вздовж Нілу.',
        fullDesc: 'Стародавній Єгипет був однією з перших великих цивілізацій у світі. Єгипетяни розвинули складну систему сільського господарства, будівництва, мистецтва та письма.',
        details: 'Періоди: Стародавнє царство, Середньоєгипетське царство, Нове царство. Фараони керували державою і вважалися богами. На цей час припадає будівництво великих піраміді.'
    },
    {
        date: '500 р. до н.е.',
        title: 'Давня Греція',
        emoji: '🏛️',
        shortDesc: 'Розвиток демократії в Афінах та філософія.',
        fullDesc: 'Давня Греція дала світові демократію, філософію та велику мистецьку спадщину.',
        details: 'В цей період розвивалася афінська демократія, з\'явилися велики філософи як Сократ, Платон та Аристотель. Час перикліського золотого століття Афін.'
    },
    {
        date: '1492 р.',
        title: 'Відкриття Америки',
        emoji: '⛵',
        shortDesc: 'Христофор Колумб досягає Нового світу.',
        fullDesc: 'Експедиція Христофора Колумба починає епоху європейської колонізації Америки.',
        details: 'Колумб відправився в експедицію, спонсоровану іспанською королевою. Його подорож відкрила для європейців новий континент, хоч він вважав, що досяг Азії.'
    },
    {
        date: '1789 р.',
        title: 'Французька революція',
        emoji: '🇫🇷',
        shortDesc: 'Початок радикальних змін у французькому суспільстві.',
        fullDesc: 'Французька революція трансформувала європейське суспільство та політику на століття.',
        details: 'Революція ознаменувалась скасуванням феодалізму, прийняттям Декларації прав людини та людини та встановленням республіки. Багато людей загинули на гільйотині під час терору.'
    },
    {
        date: '1945 р.',
        title: 'Кінець Другої світової війни',
        emoji: '✌️',
        shortDesc: 'Завершення однієї з найбільш руйнівних воєн в історії.',
        fullDesc: 'WWII закінчилась перемогою союзників над значною частиною Європи та Південно-Східної Азії.',
        details: 'Над 70 мільйонів людей загинули під час цієї війни. Це призвело до виникнення двох наддержав: США та СРСР, які почали Холодну війну.'
    },
    {
        date: '1969 р.',
        title: 'Політ на Місяць',
        emoji: '🚀',
        shortDesc: 'Людство вперше ступає на поверхню Місяця.',
        fullDesc: 'Місія Аполлон-11 наносить людину на Місяць у першому разі в історії.',
        details: 'Астронавти Нейл Армстронг та Базз Олдрін висадилися на Місяці. Армстронг перший вступив на його поверхню, сказавши знамениту фразу: "Це один маленький крок для людини, але гігантський стрибок для людства".'
    }
];

const eventCards = [
    {
        emoji: '🏛️',
        title: 'Побудова Колізею в Римі',
        date: '72 - 80 р. н.е.',
        description: 'Побудова одного з найбільших амфітеатрів у Римській імперії. Колізей символізує величь та інженерне досягнення Античного Риму.',
        significance: 'Показує рівень розвитку римської цивілізації та архітектури.'
    },
    {
        emoji: '📖',
        title: 'Винахід друкарської машини',
        date: '1440 р.',
        description: 'Йоганнес Гутенберг винаходить друкарську машину з рухомим шрифтом. Це революціонізує розповсюдження знань.',
        significance: 'Початок епохи друкованого слова та швидшого поширення інформації.'
    },
    {
        emoji: '💡',
        title: 'Вікторіанська епоха',
        date: '1837 - 1901 р.',
        description: 'Період правління королеви Вікторії, період промислової революції та розширення Британської імперії.',
        significance: 'Період великих технологічних досягнень та змін в суспільстві.'
    },
    {
        emoji: '🌍',
        title: 'Холодна війна',
        date: '1947 - 1991 р.',
        description: 'Період геополітичної напруженості між США та СРСР без прямого військового конфлікту.',
        significance: 'Сформував політичний ландшафт 20-го століття.'
    }
];

function generateTimeline() {
    const timelineContainer = document.getElementById('timeline-container');
    let index = 0;

    while (index < historicalEvents.length) {
        const event = historicalEvents[index];
        
        const eventDiv = document.createElement('div');
        eventDiv.className = 'timeline-event';
        
        eventDiv.innerHTML = `
            <div class="timeline-date">${event.date}</div>
            <div class="timeline-content">
                <div class="timeline-content-text">
                    <h3>${event.title}</h3>
                    <p>${event.shortDesc}</p>
                </div>
                <button class="btn-learn-more" data-index="${index}">Дізнатися більше</button>
            </div>
        `;
        
        timelineContainer.appendChild(eventDiv);
        index++;
    }

    
    addLearnMoreListeners();
}

function generateEventCards() {
    const eventsContainer = document.getElementById('events-container');
    
    for (let i = 0; i < eventCards.length; i++) {
        const event = eventCards[i];
        
        const cardDiv = document.createElement('article');
        cardDiv.className = 'event-card';
        
        cardDiv.innerHTML = `
            <div class="event-image">${event.emoji}</div>
            <h2>${event.title}</h2>
            <p><strong>Дата:</strong> ${event.date}</p>
            <p><strong>Опис:</strong> ${event.description}</p>
            <p><strong>Значення:</strong> ${event.significance}</p>
            <button class="event-card-button" data-index="${i}">Тест на цьому матеріалі</button>
        `;
        
        eventsContainer.appendChild(cardDiv);
    }

    addEventCardListeners();
}


function addLearnMoreListeners() {
    const buttons = document.querySelectorAll('.btn-learn-more');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            const event = historicalEvents[index];
            
            openModal(event);
        });
    });
}

function addEventCardListeners() {
    const buttons = document.querySelectorAll('.event-card-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            document.getElementById('testing').scrollIntoView({ behavior: 'smooth' });
            
            alert('Перейти до розділу тестування для перевірки знань!');
        });
    });
}

function openModal(event) {
    const modal = document.getElementById('modal');
    document.getElementById('modal-title').textContent = event.title;
    document.getElementById('modal-date').innerHTML = `<strong>Дата:</strong> ${event.date}`;
    document.getElementById('modal-description').textContent = event.fullDesc;
    document.getElementById('modal-details').innerHTML = `<strong>Деталі:</strong> <br> ${event.details}`;
    
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
});

function checkAnswers() {
    const correctAnswers = { 
        q1: 'a',  // 1492
        q2: 'b',  // Джордж Вашингтон
        q3: 'b',  // 1789
        q4: 'c'   // 1991
    };
    
    let score = 0;
    let total = Object.keys(correctAnswers).length;
    let allAnswered = true;
    
    for (let question in correctAnswers) {
        const selected = document.querySelector(`input[name="${question}"]:checked`);
        
        if (!selected) {
            allAnswered = false;
        } else if (selected.value === correctAnswers[question]) {
            score++;
        }
    }
    
    const resultDiv = document.getElementById('result');
    
    if (!allAnswered) {
        resultDiv.innerHTML = `<p style="color: orange;">⚠ Будь ласка, дайте відповіді на всі питання!</p>`;
        return;
    }
    
    const percentage = Math.round((score / total) * 100);
    
    const message = percentage >= 75 
        ? '<p style="color: green;">✓ Відмінно! Ви добре знаєте історію.</p>'
        : percentage >= 50
        ? '<p style="color: orange;">⚠ Хорошо, але є простір для вдосконалення.</p>'
        : '<p style="color: red;">✗ Рекомендуємо перечитати матеріал.</p>';
    
    resultDiv.innerHTML = `
        <h3>Ваш результат: ${score} з ${total} (${percentage}%)</h3>
        ${message}
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            
            this.classList.add('active');
            
            const target = this.getAttribute('href');
            const targetElement = document.querySelector(target);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    generateTimeline();
    generateEventCards();
});

document.addEventListener('DOMContentLoaded', function() {
    const timelineEvents = document.querySelectorAll('.timeline-event');
    
    timelineEvents.forEach(event => {
        event.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
        });
        
        event.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
});
