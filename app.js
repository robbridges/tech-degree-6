
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

app.get('/projects', (req,res) => {
  res.redirect('/projects/0');
})
/*
Unique route that shows the project based on the id that is given. It renders the 404 page if the project is less than 0 (Out of array index) or greater than the length of the array minus one
as the project id is zero based index. It also renders the 404 page not found if someone tries to pass in a value that is not a number
*/


app.get('/projects/:id', (req,res,next) => {
  const id = req.params.id;
  if (id > data.projects.length -1 || id < 0 || isNaN(id)) {
    next();
    
  } else { 
  res.render('project', data.projects[id]);
  }
});

/*
Final route when there are no other matches, will result in a 404 error that is passed into error handling middlewear
*/
app.use((req, res, next) => {
  const err = new Error('The requested page was not found');
  err.status = 404;
  next(err);
});
/*
Middleware to handle errors 
*/
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  console.log(`There was an ${err.status} error`);
  console.log(err.stack);
  if (err.status = 404) {
    res.render('page-not-found', {error: err});
  } else {
    res.render('error', {error: err} );
  }
});






// we set up and run the app below.

app.listen(3000, () => {
  console.log('Express is running on port 3000');
})
