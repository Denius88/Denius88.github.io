import React, { useState, useEffect } from 'react'
import { PROGRESS_DATA } from '../data/historicalData'

const API_URL = 'http://localhost:3000'

export default function ProgressChart({ user }) {
  const [testResults, setTestResults] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (!user || !user.uid) return

        const response = await fetch(`${API_URL}/api/test-results/${user.uid}`)
        if (!response.ok) {
          console.error('Failed to fetch results')
          setLoading(false)
          return
        }

        const data = await response.json()
        setTestResults(data)
        console.log('✅ Test results:', data)
      } catch (error) {
        console.error('❌ Error fetching results:', error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [user])

  return (
    <main>
      <section className="section">
        <h1>Прогрес навчання</h1>
        <p className="section-description">Ваш прогрес у вивченні різних історичних періодів</p>

        {/* Середня оцінка з тестів */}
        {!loading && testResults && testResults.count > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            <h2 style={{ margin: '0 0 10px 0' }}>📊 Середня оцінка з тестів</h2>
            <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '0' }}>
              {testResults.score}%
            </p>
            <p style={{ margin: '10px 0 0 0', fontSize: '14px' }}>
              Пройдено тестів: {testResults.count}
            </p>
          </div>
        )}

        {loading && (
          <p style={{ textAlign: 'center', color: '#667eea' }}>Завантаження результатів...</p>
        )}

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
            const totalCompleted = PROGRESS_DATA.reduce((sum, p) => sum + p.completed, 0)
            const totalAll = PROGRESS_DATA.reduce((sum, p) => sum + p.total, 0)
            const percentage = Math.round((totalCompleted / totalAll) * 100)

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
            )
          })()}
        </div>
      </section>
    </main>
  )
}
