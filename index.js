import express from "express";
import http from "http";
import handlebars from "express-handlebars";
import { Server } from "socket.io"
import bodyParser from "body-parser";
import __dirname from "./util.js";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";

const app = express();
const httpServer = http.createServer(app);

// Middleware para analizar el cuerpo de la solicitud JSON
app.use(express.json());

// Rutas para productos y carritos
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// Middleware para utilizar plantillas html
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Middleware adicional para analizar el cuerpo de la solicitud JSON en cartRouter
cartRouter.use(bodyParser.json());

const PORT = 8080;

// Servidor HTTP
httpServer.listen(PORT, () => {
    console.log("Servidor conectado!!");
});

// Servidor WebSocket
const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado!!")
})