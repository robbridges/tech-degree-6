const e = require('express');
const express = require('express');
const pug = require('pug');
const data = require('./data/data.json');

// setting up the app and view engine
const app = express();
app.set('view engine', 'pug');

app.use('/static', express.static('public'));


/*
Below we have our route files 
*/

/*
Below are the routes that the app is programmed to go to
*/
app.get('/', (req,res) => {
  res.render('index', data);
});

app.get('/about', (req,res) => {
  
  res.render('about', data);
});
/*
Unique route that shows the project based on the id that is given. 
*/
app.get('/projects/:id', (req,res) => {
  const id = req.params.id;
  if (id > data.projects.length) {
    const error = new Error('The project you are looking for does not exist');
    err.status = 404;
    next(err);
  }
  res.render('project', data.projects[id]); 
  

});

/*
middle ware to handle 404 errors
*/
app.use((req, res) => {
  const err = new Error('The requested page was not found');
  err.status = 404;
  console.log(`There was an ${err.status} error`);
  console.log(err.stack);
  res.render('page-not-found', {error: err});
});
/*
Middleware to handle any error that is not a 404 error. 
*/
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error', {error: err} );
});






// we set up and run the app below.

app.listen(3000, () => {
  console.log('Express is running on port 3000');
})
