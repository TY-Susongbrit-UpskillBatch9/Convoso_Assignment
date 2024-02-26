const { defineConfig } = require("cypress");


module.exports = defineConfig({

  "env":{
    "url" : "https://admin.convoso.com/login",
    "username" : "{ROOT_url}",
    "password" : "{ROOT_url}"
  },
  viewportHeight :768,
  viewportWidth : 1366,
  
    retries: {
      // Configure retry attempts for `cypress run`
      runMode: 3,
      // Configure retry attempts for `cypress open`
      openMode: 2
    },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});


