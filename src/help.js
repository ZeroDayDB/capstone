import DOMPurify from 'dompurify'

export function setupHelp() {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    
    // Sanitize inputs
    const name = DOMPurify.sanitize(formData.get('name'))
    const email = DOMPurify.sanitize(formData.get('email'))
    const subject = DOMPurify.sanitize(formData.get('subject'))
    const description = DOMPurify.sanitize(formData.get('description'))
    
    try {
      const response = await fetch('YOUR_BACKEND_URL/support-tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, description }),
      })
      
      if (response.ok) {
        showMessage('Ticket opened')
        form.reset()
      } else {
        showMessage('Failed to create ticket', true)
      }
    } catch (error) {
      console.error('Error creating ticket:', error)
      showMessage('Failed to create ticket', true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userId')
    window.location.pathname = '/login'
  }

  const showMessage = (message, isError = false) => {
    const messageElement = document.createElement('div')
    messageElement.className = `message ${isError ? 'error' : 'success'}`
    messageElement.textContent = message
    document.querySelector('.dashboard-container').appendChild(messageElement)
    setTimeout(() => messageElement.remove(), 3000)
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
                <a href="/help" class="nav-link active">Help</a>
                <a href="/about" class="nav-link">About</a>
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
            <a href="/help" class="nav-link active flex-1 text-center">Help</a>
            <a href="/about" class="nav-link flex-1 text-center">About</a>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="card max-w-3xl mx-auto">
          <h1 class="text-2xl font-bold text-primary-900 mb-4">Need Help?</h1>
          <p class="text-primary-600 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>
          
          <form class="space-y-6" onsubmit="handleSubmit(event)">
            <div>
              <label for="name" class="form-label">Name</label>
              <input type="text" id="name" name="name" class="form-input" required>
            </div>
            
            <div>
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" name="email" class="form-input" required>
            </div>
            
            <div>
              <label for="subject" class="form-label">Subject</label>
              <input type="text" id="subject" name="subject" class="form-input" required>
            </div>
            
            <div>
              <label for="description" class="form-label">Description</label>
              <textarea 
                id="description" 
                name="description" 
                class="form-input" 
                required 
                minlength="25"
                rows="5"
                placeholder="Please describe your issue in detail (minimum 25 characters)"
              ></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary w-full">Submit Ticket</button>
          </form>
        </div>
      </div>
    </div>
  `
}