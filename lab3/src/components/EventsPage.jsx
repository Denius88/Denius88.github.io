import React, { useState } from 'react';
import { HISTORICAL_DATA } from '../data/historicalData';

export default function EventsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('Усі періоди');

  const filteredCards = selectedPeriod === 'Усі періоди'
    ? HISTORICAL_DATA.eventCards
    : HISTORICAL_DATA.eventCards.filter(c => c.period === selectedPeriod);

  return (
    <main>
      <section className="section">
        <h1>Деталі історичних подій</h1>
        <p className="section-description">Глибокий аналіз ключових моментів в історії</p>

        <div className="filters">
          {HISTORICAL_DATA.periods.map(period => (
            <button
              key={period}
              className={`filter-btn ${selectedPeriod === period ? 'active' : ''}`}
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </button>
          ))}
        </div>

        <div className="events-container">
          {filteredCards.map((card, index) => (
            <article key={index} className="event-card">
              <div className="event-image">{card.emoji}</div>
              <h2>{card.title}</h2>
              <p><strong>Дата:</strong> {card.date}</p>
              <p><strong>Період:</strong> {card.period}</p>
              <p><strong>Опис:</strong> {card.description}</p>
              <p><strong>Значення:</strong> {card.significance}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}