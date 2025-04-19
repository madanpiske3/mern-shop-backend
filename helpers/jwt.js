import { expressjwt } from 'express-jwt';

const authJwt = () => {
    const secret = process.env.secret;
    console.log('authJwt called', secret);
    return expressjwt({
        secret: secret,
        algorithms: ['HS256'],
        // isRevoked: isRevoked,
    }).unless({
        path: [
            { url: `/api/v1/products`, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/users(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            '/api/v1/users/login',
            '/api/v1/users/register',
            '/api/v1/users/get',
        ]
    });

}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        return done(null, false); // revoke token if user is not admin
        // return done(null, true); // revoke token if user is not admin
    }
    done(); // allow token if user is admin
}
// regex tester 

export default authJwt;
