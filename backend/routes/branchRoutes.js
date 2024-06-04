const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');

router.post('/documents/:id/branches', branchController.createBranch);
router.put('/documents/:id/branches/:branchName', branchController.editBranch);
router.put('/documents/:id/branches/:branchName/merge', branchController.mergeBranch);
router.delete('/documents/:id/branches/:branchName', branchController.deleteBranch);

module.exports = router;
