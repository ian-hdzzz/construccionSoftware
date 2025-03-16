const express = require('express');
const morgan  = require('morgan');
const path = require('path');
const  { create, engine } = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const csrfProtection = csrf();

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
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
app.use(session({
  secret: 'ian', 
  resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
  saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));
app.use(cookieParser());
app.use(csrfProtection); 
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// routes 

app.use('/home', require('./routes/main.routes'));
app.use('/auth', require('./routes/auth.routes'));
app.use('/products', require('./routes/products.routes'));
app.use('/videojuegos', require('./routes/videojuegos.routes'));
                      
// Manejador para rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).render('404', {
    usuario: req.session.email,
    isLoggedIn: req.session.isLoggedIn || false,
     
})
});

// public
app.use(express.static(path.join(__dirname, 'public')));


// starting the server 
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})