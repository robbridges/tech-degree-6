const express = require('express');
const pug = require('pug');
const data = require('./data/data.json');

const app = express();
app.set('view engine', 'pug');

app.use('/static', express.static('public'));



app.get('/', (req,res) => {
  res.render('index', data);
});

app.get('/about', (req,res) => {
  
  res.render('about', data);
});

app.get('/projects/:id', (req,res) => {
  const id = req.params.id;
  const projectId = parseInt(id);
  const project = data.projects.find(project => projectId === parseInt(project.id));
  res.render('project', project); 

});

app.use((req, res,) => {
  const err = new Error('The requested page was not found');
  err.status = 404;
  console.log(`There was an ${err.status} error`);
  console.log(err.stack);
  res.render('page-not-found', {error: err});
});

app.use((err, req, res) => {
  res.locals.error = err;
  res.status(err.status);
  console.log(`There was an ${err.status} error`);
  console.log(err.stack);
  res.render('error', {error: err} );
});








app.listen(3000, () => {
  console.log('Express is running on port 3000');
})
