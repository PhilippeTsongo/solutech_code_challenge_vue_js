// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8000', //asuming our laravel app in running on the port 8000
                secure: false,
                changeOrigin: '',
            },
        },
    },
};