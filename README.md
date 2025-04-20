NoTime AI is a web application that helps users eliminate the burden of manual note-taking by transforming raw meeting transcripts into concise, AI-powered summaries. Whether you're a project manager capturing action items, a student reviewing lectures, or a consultant needing structured client notes, NoTime AI streamlines the process of extracting meaningful insights from lengthy conversations. Users can securely log in, upload transcripts, apply custom filters (highlighting next meeting times or key decisions), and instantly receive a summary they can view, download, or manage through their personal dashboard.

The application is built using a modern full-stack architecture: the frontend is developed in React/Next.js and deployed via Azure Static Web Apps, while Azure Functions power the backend service layer. Summaries are generated using the Azure OpenAI APIand all data—including users, transcripts, and summaries are securely stored in Firebase Firestore. The project follows RESTful API design principles, includes user authentication, and is structured for scalability and extensibility. Stretch features like onboarding emails and audio-to-text transcription are planned for future development to enhance the user experience.


To run this program locally:

> npm run dev
> visit the your localhost url displayed
> make sure to use test/test for password/username
