// const { parsed } = require("dotenv").config();
// const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

// module.exports = (phase, { env: parsed }) => {
//     const isDev = phase === PHASE_DEVELOPMENT_SERVER;

//     return {
//         env: { 
//             REDIRECT_URI: isDev
//                 ? "http://localhost:4200/api/callback"
//                 : "https://meetins.com/api/callback",
//             POST_LOGOUT_REDIRECT_URI: isDev
//                 ? "http://localhost:4200/secret"
//                 : "https://meetins.com/secret",
//             AUTH0_SCOPE: "openid profile",
//             SERVER_URL: isDev
//                 ? "http://localhost:4200"
//                 : "https://meetins.com"
//         }
//     }
// };