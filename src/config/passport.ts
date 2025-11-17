import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { PassportStatic } from 'passport';
import User from '../features/user/user.model';

export default (passport: PassportStatic) => {
    passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET as string,
            },
            async (jwtPayload, done) => {
                try {
                    const user = await User.findById(jwtPayload.id);

                    if (user) return done(null, user);
                    else return done(null, false);

                } catch (err) {
                    return done(err, false);
                }
            }
        )
    );
};
