"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Server = /** @class */ (function () {
    function Server() {
        this.port = 3000;
        this.app = express_1.default();
    }
    Server.prototype.start = function (callback) {
        //server.listen(3000,"0.0.0.0");
        this.app.listen(this.port, "0.0.0.0", callback);
    };
    return Server;
}());
exports.default = Server;
