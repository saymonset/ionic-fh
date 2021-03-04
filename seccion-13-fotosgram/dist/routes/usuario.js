"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_model_1 = require("../model/usuario.model");
var bcrypt_1 = __importDefault(require("bcrypt"));
var toke_1 = __importDefault(require("../classes/toke"));
var autenticacion_1 = require("../middlewares/autenticacion");
// Borra collection mongo en console
// db.usuarios.drop();
//--------------------------
var userRoutes = express_1.Router();
// Login
userRoutes.post('/login', function (req, res) {
    var body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, function (err, userDB) {
        if (err) {
            throw err;
        }
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/Contrasena no son correctas'
            });
        }
        if (userDB.compararPassword(body.password)) {
            var tokenUser = toke_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });
            return res.json({
                ok: true,
                token: tokenUser
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/Contrasena no son correctas*****'
            });
        }
    });
});
//  Crear un usuario
userRoutes.post('/create', function (req, res) {
    var user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    usuario_model_1.Usuario.create(user).then(function (userDB) {
        var tokenUser = toke_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        return res.json({
            ok: true,
            token: tokenUser
        });
    }).catch(function (err) {
        res.json({
            ok: false,
            err: err
        });
    });
});
// Actualizar usuario
userRoutes.post('/update', [autenticacion_1.verificaToken], function (req, res) {
    var user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    };
    usuario_model_1.Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, function (err, userDB) {
        if (err) {
            throw err;
        }
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        var tokenUser = toke_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        return res.json({
            ok: true,
            token: tokenUser
        });
    });
});
userRoutes.get('/', [autenticacion_1.verificaToken], function (req, res) {
    var usuario = req.usuario;
    res.json({
        ok: true,
        usuario: usuario
    });
});
exports.default = userRoutes;
