import express from 'express'
import cors from 'cors'
import admin from 'firebase-admin'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Initialize Firebase Admin
let serviceAccount;

try {
  // Try to parse from BASE64 env var first
  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    const decoded = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8')
    serviceAccount = JSON.parse(decoded)
  } else {
    // Fallback to individual env vars with cleanup
    serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '')
        .replace(/\\n/g, '\n')
        .replace(/"/g, '')
        .trim(),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      clientId: process.env.FIREBASE_CLIENT_ID,
      authUri: process.env.FIREBASE_AUTH_URI,
      tokenUri: process.env.FIREBASE_TOKEN_URI,
      authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL
    }
  }

  console.log('📋 Firebase Config Check:')
  console.log('  - projectId:', serviceAccount.projectId ? '✅' : '❌')
  console.log('  - clientEmail:', serviceAccount.clientEmail ? '✅' : '❌')
  console.log('  - privateKey:', serviceAccount.privateKey ? `✅ (${serviceAccount.privateKey.length} chars)` : '❌')

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`
  })
  console.log('✅ Firebase initialized successfully')
} catch (error) {
  console.error('❌ Firebase init error:', error.message)
  process.exit(1)
}

const db = admin.firestore()

// Routes

// GET - отримати середню оцінку користувача
app.get('/api/test-results/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    
    const snapshot = await db
      .collection('testResults')
      .where('userId', '==', userId)
      .get()
    
    if (snapshot.empty) {
      return res.json({ score: 0, count: 0, average: 0 })
    }

    const results = []
    snapshot.forEach(doc => {
      results.push(doc.data())
    })

    const averageScore = results.reduce((sum, r) => sum + r.score, 0) / results.length
    
    res.json({
      score: averageScore.toFixed(2),
      count: results.length,
      average: averageScore.toFixed(2),
      results: results
    })
  } catch (error) {
    console.error('Error fetching results:', error)
    res.status(500).json({ error: error.message })
  }
})

// POST - зберегти результат тесту
app.post('/api/test-results', async (req, res) => {
  try {
    const { userId, score, maxScore, testName, email } = req.body

    if (!userId || score === undefined || !maxScore) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const result = {
      userId,
      email,
      testName,
      score,
      maxScore,
      percentage: (score / maxScore * 100).toFixed(2),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: new Date().toISOString()
    }

    const docRef = await db.collection('testResults').add(result)

    res.json({
      success: true,
      id: docRef.id,
      data: result
    })
  } catch (error) {
    console.error('Error saving result:', error)
    res.status(500).json({ error: error.message })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
