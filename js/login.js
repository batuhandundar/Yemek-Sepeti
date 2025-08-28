import { signIn } from './auth.js'

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    try {
        const { user } = await signIn(email, password)
        if (user) {
            window.location.href = '/home.html'
        }
    } catch (error) {
        alert('Giriş başarısız: ' + error.message)
    }
})
