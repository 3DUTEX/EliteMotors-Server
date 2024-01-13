// Intialize server

// Import modules
import app from './server';

const { PORT } = process.env;
app.listen(
  PORT,
  () => console.log(`server is running on http://localhost:${PORT}`),
);
