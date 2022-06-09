const express = require('express');
const app = express();
const articles_route = require('./articles_routes/articles');
const cors = require('cors');

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((req, res, next) => {
	console.log(`request came from ${req.ip}`);
	next();
});

app.get('/', (req, res) => {
	res.send('/ page loaded');
	// res.send(get_gif('dragon'))
});

//localhost:PORT/articles
app.use('/articles', articles_route);

//localhost:PORT/articles/:id

module.exports = app;
