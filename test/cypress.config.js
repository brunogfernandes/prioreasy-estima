module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // Implemente node event listeners aqui

      // Configuração global da viewport
      config.viewportWidth = 1920;
      config.viewportHeight = 1080;

      config.experimentalRunAllSpecs = true;

      return config;
    },
  },
};