export function setupStatus() {
  const checkStatus = async () => {
    try {
<<<<<<< HEAD
      const response = await fetch('YOUR_BACKEND_URL/status')
      const statusContainer = document.querySelector('.status-container')
      
      if (response.status === 200) {
        statusContainer.innerHTML = `
          <div class="status-indicator success">
            <h1>SUCCESS</h1>
            <p>All systems operational</p>
=======
      const response = await fetch('https://capstone-backend.azurewebsites.net/api/status')
      const statusContainer = document.querySelector('.status-content')
      
      if (response.status === 200) {
        statusContainer.innerHTML = `
          <div class="flex items-center justify-center">
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-primary-900 mb-2">All Systems Operational</h2>
              <p class="text-primary-600">Our services are running smoothly</p>
            </div>
>>>>>>> main
          </div>
        `
      } else {
        statusContainer.innerHTML = `
<<<<<<< HEAD
          <div class="status-indicator error">
            <h1>OFFLINE</h1>
            <p>System is currently experiencing issues</p>
=======
          <div class="flex items-center justify-center">
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-primary-900 mb-2">System Disruption</h2>
              <p class="text-primary-600">We're experiencing some technical difficulties</p>
            </div>
>>>>>>> main
          </div>
        `
      }
    } catch (error) {
<<<<<<< HEAD
      const statusContainer = document.querySelector('.status-container')
      statusContainer.innerHTML = `
        <div class="status-indicator error">
          <h1>OFFLINE</h1>
          <p>Unable to connect to the API</p>
=======
      const statusContainer = document.querySelector('.status-content')
      statusContainer.innerHTML = `
        <div class="flex items-center justify-center">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-primary-900 mb-2">Connection Error</h2>
            <p class="text-primary-600">Unable to reach our servers</p>
          </div>
>>>>>>> main
        </div>
      `
    }
  }

  // Check status immediately and every 30 seconds
<<<<<<< HEAD
  checkStatus()
  setInterval(checkStatus, 30000)

  return `
    <div class="status-container">
      <div class="status-indicator loading">
        <h1>Checking Status...</h1>
        <p>Please wait</p>
      </div>
=======
  setTimeout(() => {
    checkStatus()
    setInterval(checkStatus, 30000)
  }, 0)

  return `
    <div class="min-h-screen bg-primary-50">
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

      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-primary-900">System Status</h1>
          <p class="mt-2 text-primary-600">Check the current status of our services</p>
        </div>

        <div class="card">
          <div class="status-content flex items-center justify-center p-8">
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
                <svg class="w-8 h-8 text-primary-600 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-primary-900 mb-2">Checking Status</h2>
              <p class="text-primary-600">Please wait while we check our systems</p>
            </div>
          </div>
        </div>

        <div class="mt-8 text-center">
          <p class="text-sm text-primary-500">Status updates every 30 seconds</p>
        </div>
      </div>

      <footer class="bg-white border-t border-primary-200 fixed bottom-0 w-full">
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
>>>>>>> main
    </div>
  `
}