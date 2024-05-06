require("dotenv").config();
const {
    extraerIdAngetes,
    extraerCampañas,
} = require("./middlewares/orion/extraerInfo");

const login = process.env.LOGIN;
const password = process.env.PASSWORD;
const pbx = process.env.URL;

extraerIdAngetes(login, password, pbx).then((resp) => console.log(resp));

extraerCampañas(login, password, pbx);
