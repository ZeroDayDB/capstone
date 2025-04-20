export function setupDashboard() {
  let meetings = [];

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const userId = localStorage.getItem('userId');
      
      if (!token || !userId) {
        window.location.pathname = '/login';
        return;
      }

      const response = await fetch(`YOUR_BACKEND_URL/meetings?user_id=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
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

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    window.location.pathname = '/login';
  };

  const renderMeetings = () => {
    const meetingsList = document.querySelector('.meetings-grid');
    if (!meetingsList) return;

    if (meetings.length === 0) {
      meetingsList.innerHTML = `
        <div class="col-span-full text-center py-12">
          <h3 class="text-lg font-medium text-primary-900">No transcripts yet</h3>
          <p class="mt-2 text-primary-600">Upload your first transcript to get started</p>
        </div>
      `;
      return;
    }

    meetingsList.innerHTML = meetings.map(meeting => `
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
        </div>
      </div>
    `).join('');
  };

  // Initial fetch
  fetchMeetings();

  return `
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
              <button onclick="handleLogout()" class="btn btn-danger">
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
          <form class="flex gap-4 items-end" onsubmit="handleFileUpload(event)">
            <div class="flex-1">
              <label for="transcriptFile" class="form-label">Upload New Transcript</label>
              <input 
                type="file" 
                id="transcriptFile" 
                accept=".txt"
                class="form-input"
                required
              >
            </div>
            <button type="submit" class="btn btn-primary">
              Process Transcript
            </button>
          </form>
        </div>

        <div class="meetings-grid"></div>
      </div>
    </div>
  `;
}