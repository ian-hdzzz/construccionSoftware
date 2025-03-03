const express = require('express');
const morgan  = require('morgan');
const path = require('path');
const  { create, engine } = require('express-handlebars');

// initialitations
const app = express();

// settings
app.set('port', process.env.PORT || 4002);
app.set('views', path.join(__dirname, 'views'));

const exphbs = create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  extname: '.hbs'
});

app.engine('.hbs', exphbs.engine); 
app.set('view engine', '.hbs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('public'));



// routes 
app.use('/products', require('./routes/products'));
app.use('/users', require('./routes/users'));

// Ruta principal
app.get('/', (req, res) => {
  res.render('home');
});
// Manejador para rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).render('404');
});
// public
app.use(express.static(path.join(__dirname, 'public')));


// starting the server 
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})