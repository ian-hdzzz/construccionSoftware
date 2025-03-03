const express = require('express');
const morgan  = require('morgan');
const path = require('path');

// initialitations
const app = express();

// settings
app.set('port', process.env.PORT || 4002);
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'html');
app.engine('html', function (filePath, options, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(err);
    return callback(null, content.toString());
  });
});

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
// app.use(express.json());
app.use(express.static('public'));



// routes 
app.use('/products', require('./routes/products'));
app.use('/users', require('./routes/users'));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/home.html'));
});
// Manejador para rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});
// public
app.use(express.static(path.join(__dirname, 'public')));


// starting the server 
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})