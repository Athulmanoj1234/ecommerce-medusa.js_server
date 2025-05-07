"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var express_1 = require("express");
var UploadsPlugin = {
    load: function (container) {
        var app = container.resolve("express");
        var uploadsDir = path_1.default.resolve(__dirname, "../../uploads");
        app.use("/uploads", express_1.default.static(uploadsDir));
    },
};
exports.default = UploadsPlugin;
