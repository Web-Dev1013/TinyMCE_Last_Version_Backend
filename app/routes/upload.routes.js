const express = require("express");
const router = express.Router();
const controller = require("../controllers/upload.controller");

let routes = (app) => {
    router.post("/api/upload", controller.upload);
    router.get("/api/files", controller.getListFiles);
    router.post("/api/saveImageInfo", controller.saveImageInfo);
    router.post("/api/removeImage", controller.removeImage);

    app.use(router);
};

module.exports = routes;