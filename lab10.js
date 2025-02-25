const http = require("http");
const fs = require("fs");
const querystring = require("querystring");

const html_header = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"  />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Log in</title>

    <style>
      body {
          font-family: "Helvetica", "Arial", sans-serif; /*va agarrando los tipos de letras de izq a derecha*/
          line-height: 1.5;
          color: #555;
          background-color: #494d92;
          /*Hace que sea flexible su conetnido (que su comportamiento se adapte al tamaño de contenido*/
          display: flex;
          /*Centra orizontamente el contenido*/
          justify-content: center;
          /*Centra verticalmente el contenido*/
          align-items: center;
          /*Hace qeu el body ocupe el 100% del alto de la pantalla*/
          height: 100vh;
          /*Elimina margenes predeterminados del body*/
          margin: 0;
      }
      .container {
        max-width: 256px; /*Limita ancho maximo del contenedor para que no sea tan grande */
        width: 90%; /*Hace que container sea flexible en pantallas pequeñas*/
        background-color: #6c72de;
        color: #ffffff;
        padding: 20px; /*espacio interno para que no se pegue con el texto*/
        border-radius: 2em; /*Redondea las esquinas*/
        text-align: center; /*Alinea contenido */
        /*el primero (0) define cuanto se meuve la sombra a la derecha o izquierda(negativo) */
        /*El segunto(2px) define cuanto se mueve hacia abajo (positivo) o arriba(negativo)*/
        /*EL tercero indica que tan difuso será la sombra*/
        box-shadow: 0 2px 8px #000000; /*Sirve para darle profundidad*/
      }
      button {
        background-color: #8b90e8;
        border-radius: 6px;
      }
      .hidden {
        display: none;
      }
    </style>
  </head>`;

const html_login = `

  <body>
    <div class="container" id="container">
      <h1>Iniciar Sesión</h1>
      <!--Definir formulario para login-->
      <!--Se pone ID para mandarlos al JS-->
      <form id="formulario" action="/" method="POST">
        <div>
          <!--Se usa para relacionarlo con el campo-->
          <label>Correo Electronico</label>
          <!--Se pone el type para esperar formatos de correo electronico-->
          <!--Se pone id para poder manipularlo en el JS-->
          <!--Se pone required para que el campo sea obligatorio-->
          <input type="email" id="email" required />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" id="password" required />
        </div>
        <button
          type="submit"
          id="boton"
          onmouseover="presiona(this)"
          onmouseout="fuera(this)"
        >
          Ingresa
        </button>
        <p id="mensajedeerror" class="hidden">Correo o contraseña incorrecta</p>
      </form>
    </div>
    
  </body>
  <script>
      let correos = ["ejemplo@gmail.com", "ejemplo1@gmail.com", "ejemplo2@gmail.com"];
      let contraseñas = [1234, 5678, 9123];
      const email = document.getElementById("email");
      const contraseña = document.getElementById("password");
      const conte = document.getElementById("container");
      function comprueba(event) {
        //evita que la pagina carge al enviar formulario
        event.preventDefault();
        //value sirve para obtener campo de entrada (en este caso el correo)
        const emailValue = email.value;
        const contraseñaValue = contraseña.value;

        for (let i = 0; i < correos.length; i++) {
          if (correos[i] == emailValue && contraseñas[i] == contraseñaValue) {
            alert("Inicio de sesión exitoso");
            window.location.replace("/productos"); //redirije a la pagina de productos
            return;
          }
        }
        document.getElementById("mensajedeerror").classList.remove("hidden");
      }
      //Captura formulario y agrega el evento de envio
      const form = document.getElementById("formulario");
      form.addEventListener("submit", comprueba);

      function fuera(x) {
        x.style.boxShadow = "2px 3px 5px #000000";
        x.style.color = "#3d3f60";
      }

      function presiona(x) {
        x.style.boxShadow = "0px 0px 1px #000000";
        x.style.color = "#000000";
      }

      function mensajecontra() {
        let mensaje = document.createElement("p");
        mensaje.id = "ayudaPassword";
        mensaje.textContent = "Contraseña caso de prueva: 1234";
        mensaje.style.color = "white";
        mensaje.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        mensaje.style.padding = "5px";
        mensaje.style.borderRadius = "5px";
        mensaje.style.position = "absolute";
        mensaje.style.marginTop = "5px";
        this.parentNode.appendChild(mensaje);
      }

      function mensajeemail() {
        let mensaje = document.createElement("p");
        mensaje.id = "ayudaEmail";
        mensaje.textContent = "Email caso de prueva: ejemplo@gmail.com";
        mensaje.style.color = "white";
        mensaje.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        mensaje.style.padding = "5px";
        mensaje.style.borderRadius = "5px";
        mensaje.style.position = "absolute";
        mensaje.style.marginTop = "5px";
        this.parentNode.appendChild(mensaje);
      }

      // CAMBIO DE ESTILO Y MENSAJES DINÁMICOS

      // 🔹 Mostrar un mensaje de ayuda cuando el usuario coloca el mouse sobre el campo de contraseña
      contraseña.addEventListener("mouseover", mensajecontra);
      email.addEventListener("mouseover", mensajeemail);
      // ❌ Ocultar mensaje cuando el usuario quita el mouse
      contraseña.addEventListener("mouseout", function () {
        let mensaje = document.getElementById("ayudaPassword");
        if (mensaje) mensaje.remove();
      });

      email.addEventListener("mouseout", function () {
        let mensaje = document.getElementById("ayudaEmail");
        if (mensaje) mensaje.remove();
      });

    </script>
</html>
`;

const html_footer = `</div>
    </section>
    <footer class="footer">
        <div class="content has-text-centered">
        <p>
            <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>.
            The source code is licensed
            <a href="https://opensource.org/license/mit">MIT</a>. The
            website content is licensed
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0//"
            >CC BY NC SA 4.0</a
            >.
        </p>
        </div>
    </footer>
    
  </body>
</html>
`;

const productos = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tienda Nike</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css">
    <style>
        * { background-color: #121212; color: white; }
        .button-container { text-align: center; margin-top: 20px; }
    </style>
</head>
<body>
    <section class="section">
        <div class="container">
            <h1 class="title has-text-white">Tienda Nike</h1>
            <div class="columns">
                <div class="column product has-text-centered">
                    <img src="./public/1.png" width="200">
                    <h2 class="subtitle">Nike Club Fleece Crew</h2>
                    <p>$799 MXN</p>
                    <input type="number" id="p1" min="0" max="10" value="0" class="input">
                </div>
                <div class="column product has-text-centered">
                    <img src="./public/2.png" width="200">
                    <h2 class="subtitle">Nike Pro Sculpt Shorts</h2>
                    <p>$699 MXN</p>
                    <input type="number" id="p2" min="0" max="10" value="0" class="input">
                </div>
                <div class="column product has-text-centered">
                    <img src="./public/3.png" width="200">
                    <h2 class="subtitle">Nike Club Hoodie</h2>
                    <p>$899 MXN</p>
                    <input type="number" id="p3" min="0" max="10" value="0" class="input">
                </div>
            </div>
            <button class="button is-primary" onclick="calcularTotal()">Calcular Total</button>
            <h2 class="title">Subtotal: <span id="subtotal">$0 MXN</span></h2>
            <h3 class="subtitle">IVA (16%): <span id="iva">$0 MXN</span></h3>
            <h2 class="title">Total con IVA: <span id="total">$0 MXN</span></h2>

            <div class="button-container">
                <a href="/ruta3"><button class="button is-link">Ruta3</button></a>
            </div>
        </div>
    </section>
</body>
</html>
`;

const ruta3 = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ruta 3</title>
    <style>
        body { background-color: #222; color: white; font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        .button-container { margin-top: 20px; }
        button { background-color: #8b90e8; padding: 10px; border-radius: 6px; color: white; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <h1>Bienvenido a Ruta 3</h1>
    <p>Esta es una nueva sección añadida.</p>
    <div class="button-container">
        <a href="/productos"><button>Volver a Productos</button></a>
    </div>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html_header + html_login );
  } else if (req.method === "POST" && req.url === "/") {
    let body = "";
    req.on("data", chunk => { body += chunk.toString(); });
    req.on("end", () => {
      const { email, password } = querystring.parse(body);
      if (usuarios[email] === password) {
        res.writeHead(302, { Location: "/productos" });
      } else {
        res.writeHead(401, { "Content-Type": "text/html" });
        res.end("<h1>Acceso Denegado</h1>");
      }
      res.end();
    });
  } else if (req.method === "GET" && req.url === "/productos") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(productos);
  } else if (req.method === "GET" && req.url === "/ruta3") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(ruta3);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Página no encontrada</h1>");
  }
});

server.listen(3000, () => console.log("Servidor en http://localhost:3000"));