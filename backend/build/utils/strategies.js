"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStrategy = void 0;
const session_1 = require("@helpers/session");
const passport_local_1 = require("passport-local");
exports.LocalStrategy = new passport_local_1.Strategy({
    usernameField: 'cedula',
    passwordField: 'clave',
}, async (cedula, clave, done) => {
    try {
        const user = await (0, session_1.getUserById)(cedula);
        if (!user) {
            return done(null, false);
        }
        const isMatch = clave == user.clave; //await comparePassword(clave, user.clave);
        delete user.clave;
        return isMatch ? done(null, user) : done(null, false);
    }
    catch (e) {
        return done(null, false);
    }
});
//# sourceMappingURL=strategies.js.map