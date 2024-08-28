
const express = require('express');
const app = express();
const path = require('path');
const api = require('./routes/api');

app.use(express.json());
app.use('/api', api);
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
