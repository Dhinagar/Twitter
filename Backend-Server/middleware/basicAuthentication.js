const jwt = require("jsonwebtoken");


const authenticateAgentServerToken = (JWTSecret) => async (req, res, next) => {
    try {

        const token = req.header("Authorization").replace("Bearer ", "")
        const decoded = jwt.verify(token, JWTSecret);
        req.agentServerTokenPayload = decoded
        next()
    } catch (error) {
        return res.status(401).send({ message: "Invalid Token...." })
    }
}
const authenticateAgentServerBasic = (config) => (req, res, next) => {
    const { isAuthenticationRequired, users } = config.auth;

    if (isAuthenticationRequired) {
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            return res.status(401).json({ status: false, message: 'Missing Authorization Header' });
        }

        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        const userExists = users.find(user => user.username === username && user.password === password);

        if (!userExists) {
            return res.status(401).json({ status: false, message: 'Un Authorized' });
        }
        next();
    } else {
        next();
    }
}
module.exports = { authenticateAgentServerBasic, authenticateAgentServerToken };