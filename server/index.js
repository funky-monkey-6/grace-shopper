const express = require('express');
const app = express();

const { syncAndSeed } = require('./db');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('hello');
});

app.listen(PORT, () => {
	console.log(`app listening on port ${PORT}`);
});

syncAndSeed();
