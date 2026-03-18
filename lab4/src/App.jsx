import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebaseConfig'
import Navigation from './components/Navigation'
import Timeline from './components/Timeline'
import EventsPage from './components/EventsPage'
import Test from './components/Test'
import ProgressChart from './components/ProgressChart'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (err) {
      setError('Помилка при виході: ' + err.message)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Заповніть усі поля!')
      return
    }
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setEmail('')
      setPassword('')
    } catch (err) {
      setError('Неправильна пошта або пароль!')
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password || !confirmPassword) {
      setError('Заповніть усі поля!')
      return
    }
    if (password !== confirmPassword) {
      setError('Паролі не збігаються!')
      return
    }
    if (password.length < 6) {
      setError('Пароль мінімум 6 символів!')
      return
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Цю пошту вже зареєстровано!')
      } else {
        setError('Помилка реєстрації: ' + err.message)
      }
    }
  }

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}><p style={{ color: 'white', fontSize: '18px' }}>Завантаження...</p></div>
  }

  if (!user) {
    return (
      <div style={styles.authContainer}>
        <div style={styles.authCard}>
          <h1 style={styles.title}>{isLogin ? 'Вхід' : 'Реєстрація'}</h1>
          <form onSubmit={isLogin ? handleLogin : handleRegister} style={styles.form}>
            <input 
              type="email" 
              placeholder="Пошта" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={styles.input} 
            />
            <input 
              type="password" 
              placeholder="Пароль" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={styles.input} 
            />
            {!isLogin && (
              <input 
                type="password" 
                placeholder="Повторіть пароль" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                style={styles.input} 
              />
            )}
            {error && <p style={styles.error}>{error}</p>}
            <button type="submit" style={styles.button}>
              {isLogin ? 'Увійти' : 'Зареєструватися'}
            </button>
          </form>
          <p style={styles.toggle}>
            {isLogin ? 'Новий користувач? ' : 'Вже маєте акаунт? '}
            <button 
              onClick={() => { 
                setIsLogin(!isLogin)
                setError('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
              }} 
              style={styles.toggleBtn}
            >
              {isLogin ? 'Реєстрація' : 'Вхід'}
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navigation user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/progress" element={<ProgressChart />} />
      </Routes>
      <footer style={styles.footer}>
        <p>© 2026 - Лабораторна робота №4 (Firebase Authentication)</p>
      </footer>
    </>
  )
}

const styles = {
  authContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  authCard: {
    background: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px'
  },
  button: {
    padding: '12px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  error: {
    color: '#e74c3c',
    fontSize: '14px',
    textAlign: 'center'
  },
  toggle: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#666'
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    cursor: 'pointer',
    fontWeight: 'bold',
    textDecoration: 'underline'
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    background: '#f5f5f5',
    borderTop: '1px solid #eee',
    color: '#666',
    marginTop: '40px'
  }
}

export default App
