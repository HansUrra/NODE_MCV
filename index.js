import express from 'express'

const app = express()

import peliculas from './peliculas.js';

app.use("/peliculas", peliculas)

app.get('/', (req, res) => {
	res.contentType('text/plain');
	return res.status(200).send("hello world");
})



export default app