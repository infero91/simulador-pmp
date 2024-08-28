
const express = require('express');
const router = express.Router();
const path = require('path');

// Ruta para obtener las preguntas
router.get('/questions', (req, res) => {
    res.sendFile(path.join(__dirname, '../questions.json'));
});

module.exports = router;
