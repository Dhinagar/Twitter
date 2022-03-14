const jwt = require("jsonwebtoken");

const authenticateUser = (
    connection,
    collectionName,
    JWTSecret,
    allowedUserType = []
) => async (req, res, next) => {
    try {
        const usersCollection = connection.db.collection(collectionName);
        const token = req.header("Authorization").replace("Bearer ", "")
        const decoded = jwt.verify(token, JWTSecret);
        const user = await usersCollection.findOne({
            email: decoded.email
        });

        if (!user) {
            return res.status(401).send({ message: "Invalid Token...." })
        }
        if (allowedUserType.length > 0) {
            if (!allowedUserType.find(userType => String(userType).toUpperCase() === String(user.userType).toUpperCase())) {
                throw new Error("Invalid userType");
            }
        }
        req.user = user;
        next()
    } catch (error) {

        return res.status(401).send({ message: "Invalid Token...." })
    }
}

module.exports = authenticateUser;