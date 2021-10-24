const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
      env: {
        baseUrl: "http://localhost:5001/api/v1",
        NEXT_PUBLIC_BACKEND_URL: "http://localhost:5001/api/v1",
      },
    };
  }
  return {
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    env: {
      // baseUrl: "http://139.59.65.216/api/v1",
      // NEXT_PUBLIC_BACKEND_URL: "http://139.59.65.216/api/v1",
      baseUrl: "https://failurestory.herokuapp.com/api/v1",
      NEXT_PUBLIC_BACKEND_URL: "https://failurestory.herokuapp.com/api/v1",
    },
  };
};

// module.exports = {
//   reactStrictMode: true,
// };
