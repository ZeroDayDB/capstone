export function setupDashboard() {
  let meetings = [];
<<<<<<< HEAD

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const userId = localStorage.getItem('userId');
      
      if (!token || !userId) {
=======
  let uploadProgress = 0;

  const fetchMeetings = async () => {
    try {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
>>>>>>> main
        window.location.pathname = '/login';
        return;
      }

<<<<<<< HEAD
      const response = await fetch(`YOUR_BACKEND_URL/meetings?user_id=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
=======
      const response = await fetch(`https://capstone-backend.azurewebsites.net/api/get-summaries?userId=${userId}`, {
        method: 'GET'
>>>>>>> main
      });

      if (response.ok) {
        meetings = await response.json();
        renderMeetings();
      } else if (response.status === 401) {
        window.location.pathname = '/login';
      }
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

<<<<<<< HEAD
=======
  const handleDelete = async (transcriptId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        window.location.pathname = '/login';
        return;
      }

      const response = await fetch(`https://capstone-backend.azurewebsites.net/api/delete-summary?transcriptId=${transcriptId}&userId=${userId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchMeetings();
      } else {
        throw new Error('Failed to delete transcript');
      }
    } catch (error) {
      console.error('Error deleting transcript:', error);
      alert('Failed to delete transcript. Please try again.');
    }
  };

  const updateProgressBar = (progress) => {
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    if (progressBar && progressText) {
      progressBar.style.width = `${progress}%`;
      progressText.textContent = `${Math.round(progress)}%`;
    }
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      window.location.pathname = '/login';
      return;
    }

    const formData = new FormData(event.target);
    const file = formData.get('transcriptFile');
    const title = formData.get('title');
    
    if (!file || !title) {
      alert('Please provide both a file and a title');
      return;
    }

    try {
      // Show progress bar
      const progressContainer = document.querySelector('.progress-container');
      if (progressContainer) {
        progressContainer.style.display = 'block';
      }

      // Simulate upload progress
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 5;
        if (progress > 90) clearInterval(progressInterval);
        updateProgressBar(progress);
      }, 100);

      const fileContent = await file.text();
      
      const payload = {
        user_id: userId,
        meetingTranscript: fileContent,
        title: title
      };

      const response = await fetch('https://capstone-backend.azurewebsites.net/api/create-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // Complete progress bar
      clearInterval(progressInterval);
      updateProgressBar(100);
      
      if (response.ok) {
        setTimeout(() => {
          const progressContainer = document.querySelector('.progress-container');
          if (progressContainer) {
            progressContainer.style.display = 'none';
          }
          updateProgressBar(0);
          alert('Transcript uploaded successfully');
          event.target.reset();
          fetchMeetings();
        }, 500);
      } else {
        throw new Error('Failed to upload transcript');
      }
    } catch (error) {
      console.error('Error uploading transcript:', error);
      alert('Failed to upload transcript. Please try again.');
      const progressContainer = document.querySelector('.progress-container');
      if (progressContainer) {
        progressContainer.style.display = 'none';
      }
      updateProgressBar(0);
    }
  };

>>>>>>> main
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    window.location.pathname = '/login';
  };

  const renderMeetings = () => {
    const meetingsList = document.querySelector('.meetings-grid');
    if (!meetingsList) return;

<<<<<<< HEAD
    if (meetings.length === 0) {
      meetingsList.innerHTML = `
        <div class="col-span-full text-center py-12">
          <h3 class="text-lg font-medium text-primary-900">No transcripts yet</h3>
          <p class="mt-2 text-primary-600">Upload your first transcript to get started</p>
=======
    if (!meetings || meetings.length === 0) {
      meetingsList.innerHTML = `
        <div class="col-span-full text-center py-12">
          <h3 class="text-lg font-medium text-primary-900">Oh no you have no transcripts</h3>
          <p class="mt-2 text-primary-600">lets get started on your first summarization</p>
>>>>>>> main
        </div>
      `;
      return;
    }

    meetingsList.innerHTML = meetings.map(meeting => `
<<<<<<< HEAD
      <div class="card">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold text-primary-900">${meeting.title || 'Untitled Meeting'}</h3>
          <span class="text-sm text-primary-500">${new Date(meeting.created_at).toLocaleDateString()}</span>
        </div>
        
        <div class="flex flex-wrap gap-2 mb-4">
          ${meeting.tags ? meeting.tags.split(',').map(tag => 
            `<span class="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">${tag.trim()}</span>`
          ).join('') : ''}
        </div>
        
        <div class="space-y-4">
          <div class="text-sm text-primary-600 line-clamp-3">
            ${meeting.meetingTranscript ? meeting.meetingTranscript.substring(0, 150) + '...' : 'No transcript available'}
          </div>
          
          <div>
            <h4 class="text-sm font-medium text-primary-900 mb-2">Key Points:</h4>
            <p class="text-sm text-primary-600">${meeting.importantDetails || 'No key points extracted'}</p>
          </div>
        </div>
        
        <div class="flex gap-3 mt-6">
          <button class="btn btn-primary flex-1">View Full Transcript</button>
          <button onclick="deleteMeeting('${meeting.id}')" class="btn btn-danger">Delete</button>
=======
      <div class="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <div class="flex justify-between items-start">
          <h3 class="text-lg font-semibold text-primary-900">${meeting.title}</h3>
          <span class="text-sm text-primary-500">${new Date(meeting.created_at).toLocaleDateString()}</span>
        </div>
        
        <div class="prose prose-sm max-w-none text-primary-600">
          <div class="line-clamp-3">
            ${meeting.meetingTranscript || 'No transcript available'}
          </div>
        </div>
        
        ${meeting.importantDetails ? `
          <div class="bg-primary-50 rounded-lg p-4">
            <h4 class="text-sm font-medium text-primary-900 mb-2">Key Points:</h4>
            <div class="text-sm text-primary-600 whitespace-pre-line">
              ${meeting.importantDetails}
            </div>
          </div>
        ` : ''}
        
        <div class="flex gap-3 pt-4">
          <button class="btn btn-primary flex-1" onclick="alert(\`Full transcript:\n\n${meeting.meetingTranscript?.replace(/`/g, '\\`') || 'No transcript available'}\`)">
            View Full Transcript
          </button>
          <button class="btn btn-danger" onclick="if(confirm('Delete this transcript?')) window.handleDelete(${meeting.id})">
            Delete
          </button>
>>>>>>> main
        </div>
      </div>
    `).join('');
  };

<<<<<<< HEAD
  // Initial fetch
  fetchMeetings();

  return `
=======
  const dashboardHTML = `
>>>>>>> main
    <div class="min-h-screen bg-primary-50">
      <nav class="bg-white border-b border-primary-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center gap-8">
              <a href="/" class="text-2xl font-bold text-primary-900 hover:text-primary-800">NO TIME AI</a>
              <div class="hidden md:flex items-center gap-2">
                <a href="/dashboard" class="nav-link active">Dashboard</a>
                <a href="/help" class="nav-link">Help</a>
                <a href="/about" class="nav-link">About</a>
              </div>
            </div>
            <div class="flex items-center gap-4">
<<<<<<< HEAD
              <button onclick="handleLogout()" class="btn btn-danger">
=======
              <button data-action="logout" class="btn btn-danger">
>>>>>>> main
                Logout
              </button>
            </div>
          </div>
          <div class="md:hidden flex items-center gap-2 pb-4">
            <a href="/dashboard" class="nav-link active flex-1 text-center">Dashboard</a>
            <a href="/help" class="nav-link flex-1 text-center">Help</a>
            <a href="/about" class="nav-link flex-1 text-center">About</a>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-2xl font-bold text-primary-900">Your Transcripts</h2>
        </div>

        <div class="card mb-8">
<<<<<<< HEAD
          <form class="flex gap-4 items-end" onsubmit="handleFileUpload(event)">
            <div class="flex-1">
              <label for="transcriptFile" class="form-label">Upload New Transcript</label>
              <input 
                type="file" 
                id="transcriptFile" 
=======
          <form id="uploadForm" class="space-y-4">
            <div>
              <label for="title" class="form-label">Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                class="form-input" 
                required
                minlength="5"
                placeholder="Enter a title for your transcript (min. 5 characters)"
              >
            </div>
            <div>
              <label for="transcriptFile" class="form-label">Upload Transcript</label>
              <input 
                type="file" 
                id="transcriptFile" 
                name="transcriptFile"
>>>>>>> main
                accept=".txt"
                class="form-input"
                required
              >
            </div>
<<<<<<< HEAD
            <button type="submit" class="btn btn-primary">
=======
            <div class="progress-container hidden">
              <div class="relative pt-1">
                <div class="flex mb-2 items-center justify-between">
                  <div>
                    <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-200">
                      Progress
                    </span>
                  </div>
                  <div class="text-right">
                    <span class="text-xs font-semibold inline-block text-primary-600 progress-text">
                      0%
                    </span>
                  </div>
                </div>
                <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
                  <div class="progress-bar shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-800" style="width: 0%"></div>
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary w-full">
>>>>>>> main
              Process Transcript
            </button>
          </form>
        </div>

<<<<<<< HEAD
        <div class="meetings-grid"></div>
      </div>
    </div>
  `;
=======
        <div class="meetings-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Meetings will be rendered here -->
        </div>
      </div>
    </div>
  `;

  // Initialize dashboard
  setTimeout(() => {
    const app = document.querySelector('#app');
    if (app) {
      app.innerHTML = dashboardHTML;
      
      // Add event listeners
      const uploadForm = document.querySelector('#uploadForm');
      if (uploadForm) {
        uploadForm.addEventListener('submit', handleFileUpload);
      }

      const logoutButton = document.querySelector('[data-action="logout"]');
      if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
      }

      // Make handleDelete available globally for the onclick handler
      window.handleDelete = handleDelete;

      // Fetch meetings
      fetchMeetings();
    }
  }, 0);

  return dashboardHTML;
>>>>>>> main
}