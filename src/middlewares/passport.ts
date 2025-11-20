import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import User from "../features/user/user.model.js";

export const initPassport = () => {
    passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([
                    (req) => req?.cookies?.accessToken,
                ]),
                secretOrKey: process.env.ACCESS_SECRET!,
            },
            async (payload, done) => {
                try {
                    const user = await User.findById(payload.userId);
                    if (!user) return done(null, false);
                    return done(null, user);
                } catch (e) {
                    done(e, false);
                }
            }
        )
    );
};

export default passport;
