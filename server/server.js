const express = require('express');
const path = require('path');

const app = express();
const PORT = 4000;
const clientPath = path.join(__dirname, '../examples');

app.use(express.static(clientPath));

// Routes

app.get('/', function(req, res){
  res.sendFile(path.join(clientPath, '/pages/index.html'));
  // res.redirect('login');
});

if (!module.parent) {
  app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
  });
}
