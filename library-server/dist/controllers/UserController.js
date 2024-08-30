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
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const libraryErrors_1 = require("../utils/libraryErrors");
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, UserService_1.findAllUsers)();
            res.status(200).json({ message: "users retrieved successsfully", users });
        }
        catch (err) {
            res.status(500).json({ message: "unable to retrieve users", error: err.message });
        }
    });
}
function getUserByiD(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            const user = yield (0, UserService_1.findUserById)(userId);
            res.status(200).json({ message: "user retrieved successsfully", user });
        }
        catch (err) {
            if (err instanceof libraryErrors_1.UserDoesNotExistError) {
                res.status(404).json({ message: "users not found", error: err.message });
            }
            res.status(500).json({ message: "internal server error", error: err.message });
        }
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        try {
            const updatedUser = yield (0, UserService_1.modifyUser)(user);
            res.status(200).json({ message: "user updated successsfully", user: updatedUser });
        }
        catch (err) {
            if (err instanceof libraryErrors_1.UserDoesNotExistError) {
                res.status(404).json({ message: "unable to update a user", error: err.message });
            }
            res.status(500).json({ message: "internal server error", error: err.message });
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            const deletedUser = yield (0, UserService_1.removeUser)(userId);
            res.status(200).json({ message: "user deleted successsfully", user: deletedUser });
        }
        catch (err) {
            if (err instanceof libraryErrors_1.UserDoesNotExistError) {
                res.status(404).json({ message: "unable to delete user", error: err.message });
            }
            res.status(500).json({ message: "internal server error", error: err.message });
        }
    });
}
exports.default = { getAllUsers, getUserByiD, updateUser, deleteUser };
