import express from 'express';
import formRoute from './routes/form.js';
import startRoute from './routes/start.js';

const app = express();
const PORT = 3000;

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/', formRoute);
app.use('/start', startRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
