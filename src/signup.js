import DOMPurify from 'dompurify';

export function setupSignup() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    const username = DOMPurify.sanitize(formData.get('username'));
    const email = DOMPurify.sanitize(formData.get('email'));
    const password = DOMPurify.sanitize(formData.get('password'));
    
    try {
      const response = await fetch('YOUR_BACKEND_URL/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userId', data.user_id);
        window.location.href = '/dashboard';
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during registration');
    }
  };

  return `
    <div class="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full mx-auto space-y-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-primary-900">NO TIME AI</h1>
          <p class="mt-2 text-primary-600">Create your account to get started.</p>
        </div>
        
        <div class="card">
          <form class="space-y-6" onsubmit="handleSubmit(event)">
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
              <label for="email" class="form-label">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
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
                minlength="8"
              >
            </div>
            
            <button type="submit" class="w-full btn btn-primary">
              Sign Up
            </button>
          </form>
          
          <div class="mt-6 text-center text-sm">
            <p class="text-primary-600">
              Already have an account? 
              <a href="/login" class="font-medium text-primary-800 hover:text-primary-700">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}