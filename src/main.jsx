import DOMPurify from 'dompurify'
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
  
  if (!app) return // Guard against null app element
  
  // Check authentication for protected routes
  const protectedRoutes = ['/dashboard'] // Removed /help and /about
  if (protectedRoutes.includes(path)) {
    const token = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')
    if (!token || !userId) {
      window.location.pathname = '/login'
      return
    }
  }
  
  // Clear any existing event listeners by replacing the app content
  app.innerHTML = ''
  
  let content = ''
  switch (path) {
    case '/login':
      content = setupLogin()
      app.innerHTML = content
      break
    case '/signup':
      content = setupSignup()
      app.innerHTML = content
      break
    case '/dashboard':
      content = setupDashboard()
      app.innerHTML = content
      // Initialize dashboard event listeners after content is set
      const uploadForm = document.querySelector('#uploadForm')
      if (uploadForm) {
        uploadForm.addEventListener('submit', async (event) => {
          event.preventDefault()
          const formData = new FormData(uploadForm)
          console.log('File upload:', formData.get('transcriptFile'))
        })
      }
      
      // Add event listeners to filter buttons
      document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
          const filter = button.dataset.filter
          console.log('Filter clicked:', filter)
        })
      })
      
      // Add event listener to logout button
      const logoutButton = document.querySelector('[data-action="logout"]')
      if (logoutButton) {
        logoutButton.addEventListener('click', () => {
          localStorage.removeItem('userToken')
          localStorage.removeItem('userId')
          window.location.pathname = '/login'
        })
      }
      break
    case '/help':
      content = setupHelp()
      app.innerHTML = content
      break
    case '/status':
      content = setupStatus()
      app.innerHTML = content
      break
    case '/about':
      content = setupAbout()
      app.innerHTML = content
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
                <div class="flex items-center gap-6">
                  <a href="/about" class="text-primary-600 hover:text-primary-900">About</a>
                  <a href="/status" class="text-primary-600 hover:text-primary-900">Status</a>
                </div>
                <p class="text-primary-500">&copy; 2024 NO TIME AI. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      `
  }
}

// Initialize router
document.addEventListener('DOMContentLoaded', () => {
  router()
  
  // Handle navigation
  window.addEventListener('popstate', router)
  
  // Handle navigation links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a')
    if (link) {
      e.preventDefault()
      const href = link.getAttribute('href')
      if (href && href !== '#') {
        // Check if user is authenticated and trying to access home page
        if (href === '/' && localStorage.getItem('userToken')) {
          window.history.pushState({}, '', '/dashboard')
          router()
        } else {
          window.history.pushState({}, '', href)
          router()
        }
      }
    }
  })
})