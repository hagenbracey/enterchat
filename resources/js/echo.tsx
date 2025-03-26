// Import Pusher explicitly
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Set Pusher globally (optional)
window.Pusher = Pusher; // This makes Pusher globally available

// Initialize Echo with the correct options
const echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
  encrypted: true,  // Optional for encryption
});

export default echo;
