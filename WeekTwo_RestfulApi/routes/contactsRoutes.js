const {
	getAllContacts,
	createContact,
	getContactById,
	updateContact,
	deleteContact,
} = require('../controllers/contactsController');
const express = require('express');
const router = express.Router();

router.get('/', getAllContacts);
router.post('/', createContact);
router.get('/:id', getContactById);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;
