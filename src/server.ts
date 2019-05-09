import fs = require("fs");
import http = require("http");
import https = require("https");
import app from "./app";

// TODO use environment variable
const PORT = 3000;

const httpsOptions = {
  key: fs.readFileSync("./src/config/key.pem"),
  cert: fs.readFileSync("./src/config/cert.pem")
};

// TODO use environment variables to set this, then this can be used to direct webpack-dev-server to correct URI
const useHttps = false;

const server = (useHttps) ?
  https.createServer(httpsOptions, app).listen(PORT, () => console.log("HTTPS Express server listening on port " + PORT))
: http.createServer(app).listen(PORT, () => console.log("HTTP Express server listening on port " + PORT));

// This export would be used to pass the server to a testing framework such as supertest
export default server;
