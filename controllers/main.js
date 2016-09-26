"use strict";
let mainController = {
    getIndex: (req, res) => {
        res.render("index");
    },
    getTemplate: (req, res) => {
        res.render("templates/" + req.params.template);
    },
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mainController;
