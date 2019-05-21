module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://www.kma.go.kr/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}