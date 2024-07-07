//server.js
const app = require('./app.js');

const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 3000; // Use PORT from environment or default to 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});