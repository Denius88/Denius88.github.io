import React, { useState } from 'react'
import { TEST_QUESTIONS } from '../data/historicalData'

const API_URL = 'http://localhost:3000'

export default function Test({ user }) {
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const saveResultsToServer = async (score) => {
    try {
      const response = await fetch(`${API_URL}/api/test-results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.uid,
          email: user.email,
          testName: 'Historical Events Quiz',
          score: score,
          maxScore: TEST_QUESTIONS.length
        })
      })

      if (!response.ok) {
        console.error('Failed to save results')
        return
      }

      const data = await response.json()
      console.log('✅ Results saved:', data)
    } catch (error) {
      console.error('❌ Error saving results:', error.message)
    }
  }

  const checkAnswers = async () => {
    let score = 0
    let allAnswered = true

    for (let question of TEST_QUESTIONS) {
      if (!answers[question.id]) {
        allAnswered = false
        break
      }
      const correct = question.options.find(o => o.value === answers[question.id]).correct
      if (correct) score++
    }

    if (!allAnswered) {
      setResults({ error: true, message: '⚠ Будь ласка, дайте відповіді на всі питання!' })
      return
    }

    const percentage = Math.round((score / TEST_QUESTIONS.length) * 100)
    let message = ''
    if (percentage >= 75) {
      message = '✓ Відмінно! Ви добре знаєте історію.'
    } else if (percentage >= 50) {
      message = '⚠ Хорошо, але є простір для вдосконалення.'
    } else {
      message = '✗ Рекомендуємо перечитати матеріал.'
    }

    setResults({ score, total: TEST_QUESTIONS.length, percentage, message })

    // Save to server
    setLoading(true)
    await saveResultsToServer(score)
    setLoading(false)
  }

  return (
    <main>
      <section className="section">
        <h1>Перевір свої знання</h1>
        <p className="section-description">Тест з історії для перевірки вашого рівня знань</p>

        <form className="test-form">
          {TEST_QUESTIONS.map(q => (
            <div key={q.id} className="test-question">
              <h3>Питання {q.id}: {q.question}</h3>
              <div className="test-options">
                {q.options.map(option => (
                  <label key={option.value}>
                    <input
                      type="radio"
                      name={`q${q.id}`}
                      value={option.value}
                      checked={answers[q.id] === option.value}
                      onChange={() => handleAnswer(q.id, option.value)}
                    />
                    <span>{option.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button type="button" className="submit-btn" onClick={checkAnswers} disabled={loading}>
            {loading ? 'Збереження...' : 'Перевірити відповіді'}
          </button>

          {results && (
            <div className="result">
              {results.error ? (
                <p style={{ color: '#ff9900' }}>{results.message}</p>
              ) : (
                <>
                  <h3>Ваш результат: {results.score} з {results.total} ({results.percentage}%)</h3>
                  <p style={{
                    color: results.percentage >= 75 ? 'green' : results.percentage >= 50 ? '#ff9900' : 'red'
                  }}>
                    {results.message}
                  </p>
                  {loading && <p style={{ color: '#667eea' }}>✓ Результат збережено на сервері</p>}
                </>
              )}
            </div>
          )}
        </form>
      </section>
    </main>
  )
}
