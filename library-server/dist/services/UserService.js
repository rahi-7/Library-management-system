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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.findAllUsers = findAllUsers;
exports.findUserById = findUserById;
exports.modifyUser = modifyUser;
exports.removeUser = removeUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const UserDao_1 = __importDefault(require("../daos/UserDao"));
const libraryErrors_1 = require("../utils/libraryErrors");
function register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const ROUNDS = config_1.config.server.rounds;
        try {
            const hashedPassword = yield bcrypt_1.default.hash(user.password, ROUNDS);
            const saved = new UserDao_1.default(Object.assign(Object.assign({}, user), { password: hashedPassword }));
            return yield saved.save();
        }
        catch (error) {
            throw new libraryErrors_1.UnableToSaveUserError(error.message);
        }
    });
}
function login(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = credentials;
        try {
            const user = yield UserDao_1.default.findOne({ email: email });
            if (!user) {
                throw new libraryErrors_1.InvalidUsernameOrPasswordError("User not found, Invalid username");
            }
            else {
                const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
                if (isPasswordValid) {
                    return user;
                }
                else {
                    throw new libraryErrors_1.InvalidUsernameOrPasswordError("Invalid password");
                }
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
function findAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield UserDao_1.default.find();
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
function findUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield UserDao_1.default.findById(userId);
            if (user) {
                return user;
            }
            else {
                throw new libraryErrors_1.UserDoesNotExistError("User not found");
            }
        }
        catch (err) {
            // Only rethrow if it's not a UserDoesNotExistError
            if (err instanceof libraryErrors_1.UserDoesNotExistError) {
                throw err;
            }
            else {
                throw new Error(err.message);
            }
        }
    });
}
function modifyUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedUser = yield UserDao_1.default.findByIdAndUpdate(user._id, user, { new: true });
            if (updatedUser) {
                return updatedUser;
            }
            else {
                throw new libraryErrors_1.UserDoesNotExistError("Cannot update user");
            }
        }
        catch (err) {
            // Only rethrow if it's not a UserDoesNotExistError
            if (err instanceof libraryErrors_1.UserDoesNotExistError) {
                throw err;
            }
            else {
                throw new Error(err.message);
            }
        }
    });
}
function removeUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedUser = yield UserDao_1.default.findByIdAndDelete(userId);
            if (deletedUser) {
                return deletedUser;
            }
            else {
                throw new libraryErrors_1.UserDoesNotExistError("Cannot delete user with this Id");
            }
        }
        catch (err) {
            // Only rethrow if it's not a UserDoesNotExistError
            if (err instanceof libraryErrors_1.UserDoesNotExistError) {
                throw err;
            }
            else {
                throw new Error(err.message);
            }
        }
    });
}
