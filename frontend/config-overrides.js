const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
    alias({
        '@context': 'src/useContexts',
        '@components': 'src/components',
        '@styles': 'src/styles',
    })(config);

    return config;
};
