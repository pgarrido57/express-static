'use strict';

const express = require('express');
const app = express();

const requestTime = (req, res, next) => {
	req.requestedTime = new Date().toISOString();
	next();
}

app.use(express.static(__dirname + '/public'));

app.use(requestTime);

app.get('/', (req, res, next) => {
	res.sendFile(__dirname + '/public/index.html');
  console.log(`This ran at ${req.requestedTime}`)
  next();
});

app.use((req, res) => {
	res.send(`<h2>Error 404: This is not the page you are looking for!</h2><img src="https://media.giphy.com/media/l2JJKs3I69qfaQleE/giphy.gif">`)
});

const port = process.env.PORT || 8080

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
})
