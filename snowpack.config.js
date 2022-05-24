module.exports = {
    mount: {
        public: '/',
        src: '/dist'
    },
    devOptions: {
        port: 8000,
        open: 'none'
    },
    buildOptions: {
        out: 'build'
    },
    optimize: {
        bundle: true,
        minify: true,
        sourcemap: true
    }
};
