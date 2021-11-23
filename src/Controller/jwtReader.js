import jwt_decode from "jwt-decode";

function verifyToken(token) {
    var decoded = jwt_decode(token);
    return decoded;
};

export default verifyToken;