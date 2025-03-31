const express = require('express');
const morgan  = require('morgan');
const path = require('path');
const  { create, engine } = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const csrfProtection = csrf();
const { isAuthenticated } = require('./controllers/authController');
const multer = require('multer');
const bodyParser = require('body-parser');

// initialitations
const app = express();

// settings
app.set('port', process.env.PORT || 4004);
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
  
  // Add permission checks for templates
  if (req.session.privilegios) {
    res.locals.canCreateProducts = req.session.privilegios.some(
      privilegio => privilegio.nombre === "crear productos"
    );
  }
  next();
});
// Subida de archivos
//fileStorage: Es nuestra constante de configuración para manejar el almacenamiento
const fileStorage = multer.diskStorage({
  destination: (request, file, callback) => {
      //'uploads': Es el directorio del servidor donde se subirán los archivos 
      callback(null, 'uploads');
  },
  filename: (request, file, callback) => {
      //aquí configuramos el nombre que queremos que tenga el archivo en el servidor, 
      //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
      callback(null, new Date().toISOString() + '-' + file.originalname);
  },
});

//Idealmente registramos multer después de bodyParser (la siguiente línea ya debería existir)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage }).single('archivo')); 
                      
// routes 
app.use('/home', require('./routes/main.routes'));
app.use('/auth', require('./routes/auth.routes'));
app.use('/products', require('./routes/products.routes'));
app.use('/videojuegos', require('./routes/videojuegos.routes'));
app.use('/file', require('./routes/file.routes'));

const fileFilter = (request, file, callback) => {
  // Tu lógica para filtrar archivos
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, true);  // Acepta el archivo
  } else {
      callback(new Error('Solo se permiten imágenes JPEG o PNG'), false);  // Rechaza el archivo
  }
};

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('archivo')); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
                      
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