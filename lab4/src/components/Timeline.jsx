import React, { useState } from 'react';
import Modal from './Modal';
import { HISTORICAL_DATA } from '../data/historicalData';

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('Усі періоди');

  const filteredEvents = selectedPeriod === 'Усі періоди'
    ? HISTORICAL_DATA.events
    : HISTORICAL_DATA.events.filter(e => e.period === selectedPeriod);

  return (
    <main>
      <section className="section">
        <h1>Часова шкала історії</h1>
        <p className="section-description">Ключові історичні eventi від давнини до сучасності</p>

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

        <div className="timeline">
          {filteredEvents.map(event => (
            <div key={event.id} className="timeline-event">
              <div className="timeline-date">{event.date}</div>
              <div className="timeline-content">
                <div className="timeline-content-text">
                  <h3>{event.title}</h3>
                  <p>{event.shortDesc}</p>
                </div>
                <button className="btn-learn-more" onClick={() => setSelectedEvent(event)}>
                  Дізнатися більше
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Modal data={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </main>
  );
}
