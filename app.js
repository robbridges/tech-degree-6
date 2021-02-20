const express = require('express');
const pug = require('pug');

const app = express();

app.listen(3000, () => {
  console.log('Express is running on port 3000');
})
