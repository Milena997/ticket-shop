const jwt = require("jsonwebtoken");

function checkScopes(requiredScopes) {
  return (req, res, next) => {
    let decoded = [];
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      // Extract the token after 'Bearer '
      const token = authHeader.split(" ")[1];
      decoded = jwt.decode(token);
    }
    // Check if user has at least one of the required scopes
    const hasScope = requiredScopes.some((scope) =>
      decoded.scopes.includes(scope)
    );

    if (!hasScope) {
      return res.status(403).json({ message: "Forbidden: Insufficient scope" });
    }
    next();
  };
}
module.exports.checkScopes = checkScopes;
