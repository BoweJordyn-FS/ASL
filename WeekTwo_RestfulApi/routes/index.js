const express = require('express');
const router = express.Router();
const contactsRoutes = require('./contactsRoutes');

// Define your routes here
router.get('/', (req, res) => {
	res.send('Welcome to the API!');
});
router.use('/v1/contacts', contactsRoutes);
module.exports = router;
