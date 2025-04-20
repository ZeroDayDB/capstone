import DOMPurify from 'dompurify';

export function setupLogin() {
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
    </div>
  `;
}