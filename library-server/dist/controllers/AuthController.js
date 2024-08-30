"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const libraryErrors_1 = require("../utils/libraryErrors");
function handleRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        try {
            const registeredUser = yield (0, UserService_1.register)(user);
            // Create a new object excluding the password field
            const _a = registeredUser.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
            res.status(201).json({ message: "user successfullly created", user: userWithoutPassword });
        }
        catch (error) {
            if (error.message.includes("E11000 duplicate key error collection")) {
                res.status(409).json({ message: "User with this email already exists", error: error.message });
            }
            else {
                res.status(500).json({ message: "unable to regester a user at this time", error: error.message });
            }
        }
    });
}
function handleLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentials = req.body;
        try {
            const user = yield (0, UserService_1.login)(credentials);
            if (user) {
                // Create a new object excluding the password field
                const _a = user.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
                res.status(200).json({ message: "user logged in successfully", user: userWithoutPassword });
            }
            else {
                res.status(404).json({ message: "user not found" });
            }
        }
        catch (error) {
            if (error instanceof libraryErrors_1.InvalidUsernameOrPasswordError) {
                res.status(404).json({ message: "unable to login at this time", error: error.message });
            }
            res.status(500).json({ message: "unable to login at this time", error: error.message });
        }
    });
}
exports.default = { handleRegister, handleLogin };
