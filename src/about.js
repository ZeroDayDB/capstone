export function setupAbout() {
  const handleLogout = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userId')
    window.location.pathname = '/login'
  }

  return `
    <div class="min-h-screen bg-primary-50">
      <nav class="bg-white border-b border-primary-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center gap-8">
              <a href="/" class="text-2xl font-bold text-primary-900 hover:text-primary-800">NO TIME AI</a>
              <div class="hidden md:flex items-center gap-2">
                <a href="/dashboard" class="nav-link">Dashboard</a>
                <a href="/help" class="nav-link">Help</a>
                <a href="/about" class="nav-link active">About</a>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <button onclick="handleLogout()" class="btn btn-danger">
                Logout
              </button>
            </div>
          </div>
          <div class="md:hidden flex items-center gap-2 pb-4">
            <a href="/dashboard" class="nav-link flex-1 text-center">Dashboard</a>
            <a href="/help" class="nav-link flex-1 text-center">Help</a>
            <a href="/about" class="nav-link active flex-1 text-center">About</a>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="card max-w-3xl mx-auto">
          <h1 class="text-3xl font-bold text-primary-900 mb-8">About NO TIME AI</h1>
          
          <div class="space-y-8">
            <div>
              <h2 class="text-xl font-semibold text-primary-900 mb-3">Capstone Project Notice</h2>
              <p class="text-primary-600">This website is a capstone project demonstration and will be disabled shortly. It showcases the potential of AI-powered note-taking and meeting transcription services.</p>
            </div>
            
            <div>
              <h2 class="text-xl font-semibold text-primary-900 mb-3">Project Overview</h2>
              <p class="text-primary-600 mb-4">NO TIME AI was developed as an educational demonstration of modern web technologies and AI integration. It features:</p>
              <ul class="list-disc list-inside space-y-2 text-primary-600 ml-4">
                <li>Secure user authentication</li>
                <li>Real-time meeting transcription processing</li>
                <li>Automated important details extraction</li>
                <li>Modern, responsive user interface</li>
              </ul>
            </div>

            <div class="bg-primary-50 p-6 rounded-lg border border-primary-200">
              <h2 class="text-xl font-semibold text-primary-900 mb-3">Important Notice</h2>
              <p class="text-primary-700">This service is temporary and will be discontinued after the project evaluation period. Thank you for your interest in our capstone project!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}