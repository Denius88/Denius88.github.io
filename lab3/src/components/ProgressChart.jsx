import React from 'react';
import { PROGRESS_DATA } from '../data/historicalData';

export default function ProgressChart() {
  return (
    <main>
      <section className="section">
        <h1>Прогрес навчання</h1>
        <p className="section-description">Ваш прогрес у вивченні різних історичних періодів</p>

        <div className="progress-container">
          {PROGRESS_DATA.map((period, index) => (
            <div key={index} className="progress-item">
              <h3>{period.period}</h3>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(period.completed / period.total) * 100}%` }}
                >
                </div>
              </div>
              <p className="progress-text">
                {period.completed} з {period.total} ({Math.round((period.completed / period.total) * 100)}%)
              </p>
            </div>
          ))}
        </div>

        <div className="total-progress">
          <h2>Загальний прогрес</h2>
          {(() => {
            const totalCompleted = PROGRESS_DATA.reduce((sum, p) => sum + p.completed, 0);
            const totalAll = PROGRESS_DATA.reduce((sum, p) => sum + p.total, 0);
            const percentage = Math.round((totalCompleted / totalAll) * 100);

            return (
              <>
                <div className="progress-bar large">
                  <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                  >
                  </div>
                </div>
                <p className="progress-text">
                  {totalCompleted} з {totalAll} ({percentage}%)
                </p>
              </>
            );
          })()}
        </div>
      </section>
    </main>
  );
}
