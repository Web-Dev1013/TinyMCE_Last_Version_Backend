const express = require("express");
const router = express.Router();
const controller = require("../controllers/upload.controller");

let routes = (app) => {
    router.post("/api/upload", controller.upload);
    router.get("/api/files", controller.getListFiles);

    app.use(router);
};

module.exports = routes;