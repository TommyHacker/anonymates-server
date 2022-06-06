const express = require('express');
const app = express();
const cors = require('cors');
const articleRoutes = require('./routes/articleRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
// 	console.log(req.url);
// 	console.log(req.method);
// 	next();
// });

app.get('/', (req, res) => {
	res.send('home route');
});

app.use('/articles', articleRoutes);

module.exports = app;
