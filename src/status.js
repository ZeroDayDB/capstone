export function setupStatus() {
  const checkStatus = async () => {
    try {
      const response = await fetch('YOUR_BACKEND_URL/status')
      const statusContainer = document.querySelector('.status-container')
      
      if (response.status === 200) {
        statusContainer.innerHTML = `
          <div class="status-indicator success">
            <h1>SUCCESS</h1>
            <p>All systems operational</p>
          </div>
        `
      } else {
        statusContainer.innerHTML = `
          <div class="status-indicator error">
            <h1>OFFLINE</h1>
            <p>System is currently experiencing issues</p>
          </div>
        `
      }
    } catch (error) {
      const statusContainer = document.querySelector('.status-container')
      statusContainer.innerHTML = `
        <div class="status-indicator error">
          <h1>OFFLINE</h1>
          <p>Unable to connect to the API</p>
        </div>
      `
    }
  }

  // Check status immediately and every 30 seconds
  checkStatus()
  setInterval(checkStatus, 30000)

  return `
    <div class="status-container">
      <div class="status-indicator loading">
        <h1>Checking Status...</h1>
        <p>Please wait</p>
      </div>
    </div>
  `
}