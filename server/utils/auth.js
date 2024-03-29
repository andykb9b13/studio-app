const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, process.env.SECRET, {
        maxAge: process.env.EXPIRATION,
      });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },

  // function for authenticated routes
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, process.env.SECRET, {
      expiresIn: process.env.EXPIRATION,
    });
  },
};
