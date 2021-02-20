const express = require('express');
const pug = require('pug');
const data = require('./data/data.json');

const app = express();
app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.get('/', (req,res) => {
  res.render('index', data);
})
app.get('/about', (req,res) => {
  res.render('about', data);
})

app.listen(3000, () => {
  console.log('Express is running on port 3000');
})
