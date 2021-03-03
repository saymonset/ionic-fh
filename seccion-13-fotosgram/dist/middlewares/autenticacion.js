"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaToken = void 0;
var toke_1 = __importDefault(require("../classes/toke"));
var verificaToken = function (req, res, next) {
    var userToken = req.get('x-token') || '';
    toke_1.default.comprobarToken(userToken)
        .then(function (decode) {
        console.log('Decode', decode);
        req.usuario = decode.usuario;
        next();
    }).catch(function (err) {
        res.json({
            ok: false,
            mensaje: 'Token no es correcto'
        });
    });
};
exports.verificaToken = verificaToken;
