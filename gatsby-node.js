'use strict';

exports.createPages = require('./gatsby/create-pages');
exports.onCreateNode = require('./gatsby/on-create-node');

// Ajouté par Nico pour fix le package applause-button
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /applause-button/,
            use: loaders.null()
          }
        ]
      }
    });
  }
};
