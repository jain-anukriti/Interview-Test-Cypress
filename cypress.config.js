const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'tqo7xe',
    e2e: {
        "screenshotOnRunFailure": true,
        "video": true,
    setupNodeEvents(on, config) {
          // implement node event listeners here
    },
  },
});
