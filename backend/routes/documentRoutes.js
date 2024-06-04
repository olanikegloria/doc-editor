const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

router.post('/documents', documentController.createDocument);
router.get('/documents/:id', documentController.getDocumentById);
router.delete('/documents/:id', documentController.deleteDocument);

module.exports = router;
