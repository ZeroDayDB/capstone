import DOMPurify from 'dompurify';

export function setupSignup() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    const username = DOMPurify.sanitize(formData.get('username'));
<<<<<<< HEAD
    const email = DOMPurify.sanitize(formData.get('email'));
    const password = DOMPurify.sanitize(formData.get('password'));
    
    try {
      const response = await fetch('YOUR_BACKEND_URL/signup', {
=======
    const password = DOMPurify.sanitize(formData.get('password'));
    
    try {
      const response = await fetch('https://capstone-backend.azurewebsites.net/api/create-user', {
>>>>>>> main
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
<<<<<<< HEAD
        body: JSON.stringify({ username, email, password }),
=======
        body: JSON.stringify({ username, password }),
>>>>>>> main
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userToken', data.token);
<<<<<<< HEAD
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
=======
        localStorage.setItem('userId', data.id);
        window.location.pathname = '/dashboard';
      } else {
        const contentType = response.headers.get('content-type');
        let errorMessage;
        
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.message || 'Registration failed. Please try again.';
        } else {
          errorMessage = await response.text();
        }
        
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during registration. Please try again.');
    }
  };

  // Initialize signup form after content is set
  setTimeout(() => {
    const signupForm = document.querySelector('form');
    if (signupForm) {
      signupForm.addEventListener('submit', handleSubmit);
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
              <a href="/login" class="nav-link">Login</a>
              <a href="/signup" class="btn btn-primary">Sign Up</a>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-primary-900">Create Account</h2>
          <p class="mt-2 text-primary-600">Get started with NO TIME AI</p>
        </div>
        
        <div class="card">
          <form class="space-y-6">
>>>>>>> main
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
<<<<<<< HEAD
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
=======
>>>>>>> main
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
<<<<<<< HEAD
              Sign Up
=======
              Create Account
>>>>>>> main
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