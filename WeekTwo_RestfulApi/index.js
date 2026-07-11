const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/', routes);

const PORT = 8080;

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
app.use('/v1/contacts', routes);
module.exports = app;
