const express = require('express');
const app = express();
const userRoutes = require("./src/routes/userRoutes.js");
const dietRoutes = require("./src/routes/dietRoutes.js");

app.use(express.json()); // Parse JSON bodies
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

// Load environment variables


const PORT = process.env.PORT || 8080;
// const dev_mode = process.env.DEV_MODE;

// Middleware
app.use(express.json());
app.use(cors());

// MySQL Database Connection


// // Use routes
app.use('/api', userRoutes);
app.use('/api', dietRoutes);

// -------------------- Server Setup --------------------------
app.listen(PORT, () => {
  console.log(`Server running in  mode on http://localhost:${PORT}`);
});
