import passport from 'passport';

export const Authenticate = passport.authenticate('jwt', { session: false });

