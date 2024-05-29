const { createServer } = require("vite");

createServer({
  root: "./", // Root directory (where index.html is located)
  base: "/", // Base public path when served in development or production
  server: {
    open: true, // Automatically open in browser
    watch: {
      // During development, Vite provides a server with module hot-replacement
      usePolling: true,
      interval: 500, // Polling interval (every 500ms)
    },
  },
}).then((server) => server.listen());
