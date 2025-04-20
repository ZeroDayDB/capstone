import './style.css'
import { setupLogin } from './login.js'
import { setupSignup } from './signup.js'
import { setupDashboard } from './dashboard.js'
import { setupHelp } from './help.js'
import { setupStatus } from './status.js'
import { setupAbout } from './about.js'

// Simple router
const router = () => {
  const path = window.location.pathname
  const app = document.querySelector('#app')
  
  // Check authentication for protected routes
  const protectedRoutes = ['/dashboard', '/help', '/about']
  if (protectedRoutes.includes(path)) {
    const token = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')
    if (!token || !userId) {
      window.location.pathname = '/login'
      return
    }
  }
  
  switch (path) {
    case '/login':
      app.innerHTML = setupLogin()
      const loginForm = document.querySelector('form')
      if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
          e.preventDefault()
          const formData = new FormData(e.target)
          const username = formData.get('username')
          const password = formData.get('password')
          
          if (username === 'test' && password === 'test') {
            localStorage.setItem('userToken', 'test-token-123')
            localStorage.setItem('userId', 'test-user-123')
            window.location.pathname = '/dashboard'
          } else {
            alert('Invalid credentials. Use username: test, password: test')
          }
        })
      }
      break
    case '/signup':
      app.innerHTML = setupSignup()
      break
    case '/dashboard':
      app.innerHTML = setupDashboard()
      break
    case '/help':
      app.innerHTML = setupHelp()
      break
    case '/status':
      app.innerHTML = setupStatus()
      break
    case '/about':
      app.innerHTML = setupAbout()
      break
    default:
      app.innerHTML = `
        <div class="min-h-screen flex flex-col">
          <nav class="bg-white border-b border-primary-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex justify-between h-16">
                <div class="flex items-center">
                  <h1 class="text-2xl font-bold text-primary-900">NO TIME AI</h1>
                </div>
                <div class="flex items-center gap-6">
                  <a href="/help" class="nav-link">Help</a>
                  <a href="/login" class="nav-link">Login</a>
                  <a href="/signup" class="btn btn-primary">Sign Up</a>
                </div>
              </div>
            </div>
          </nav>

          <div class="flex-1">
            <div class="hero">
              <div class="text-content">
                <h1>ELIMINATE NOTE TAKING.</h1>
                <p>Transform your meetings and lectures with our AI-powered note-taking assistant. Get comprehensive, organized notes without lifting a finger.</p>
                <a href="/login" class="btn btn-primary inline-block">Start Here</a>
              </div>
              <div class="mockup">
                <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2940&auto=format&fit=crop" alt="AI Note Taking Interface" />
              </div>
            </div>
          </div>

          <footer class="bg-white border-t border-primary-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="flex items-center gap-4 text-primary-500">
                  <span>NO TIME AI ©2025</span>
                  <a href="#" class="hover:text-primary-700">Privacy</a>
                  <a href="#" class="hover:text-primary-700">Terms</a>
                </div>
                <div class="flex items-center gap-6 text-primary-600">
                  <a href="/status" class="hover:text-primary-800">API STATUS</a>
                  <a href="/about" class="hover:text-primary-800">About Us</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      `
  }
}

// Handle navigation
window.addEventListener('popstate', router)
window.addEventListener('load', router)

// Handle navigation links
document.addEventListener('click', (e) => {
  if (e.target.matches('a')) {
    e.preventDefault()
    const href = e.target.getAttribute('href')
    if (href && href !== '#') {
      window.history.pushState({}, '', href)
      router()
    }
  }
})