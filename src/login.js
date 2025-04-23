import DOMPurify from 'dompurify';

export function setupLogin() {
<<<<<<< HEAD
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    if (username === 'test' && password === 'test') {
      localStorage.setItem('userToken', 'test-token-123');
      localStorage.setItem('userId', 'test-user-123');
      window.location.pathname = '/dashboard';
    } else {
      alert('Invalid credentials. Use username: test, password: test');
    }
  };

  return `
    <div class="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full mx-auto space-y-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-primary-900">NO TIME AI</h1>
          <p class="mt-2 text-primary-600">Welcome back! Please login to continue.</p>
=======
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = DOMPurify.sanitize(formData.get('username'));
    const password = DOMPurify.sanitize(formData.get('password'));
    
    try {
      const response = await fetch(`https://capstone-backend.azurewebsites.net/api/user?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userId', data.id);
        window.location.pathname = '/dashboard';
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  // Initialize login form after content is set
  setTimeout(() => {
    const loginForm = document.querySelector('form');
    if (loginForm) {
      loginForm.addEventListener('submit', handleLogin);
    }
  }, 0);

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
              <a href="/login" class="nav-link active">Login</a>
              <a href="/signup" class="btn btn-primary">Sign Up</a>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-primary-900">Welcome Back</h2>
          <p class="mt-2 text-primary-600">Please login to continue</p>
>>>>>>> main
        </div>
        
        <div class="card">
          <form class="space-y-6">
            <div>
              <label for="username" class="form-label">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                class="form-input" 
                required
              >
            </div>
            
            <div>
              <label for="password" class="form-label">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                class="form-input" 
                required
              >
            </div>
            
            <button type="submit" class="w-full btn btn-primary">
              Login
            </button>
          </form>
          
          <div class="mt-6 text-center text-sm">
            <p class="text-primary-600">
              Don't have an account? 
              <a href="/signup" class="font-medium text-primary-800 hover:text-primary-700">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
<<<<<<< HEAD
=======

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
  `;
}