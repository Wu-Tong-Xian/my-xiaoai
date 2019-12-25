//vue的配置文件

module.exports = {
    //webpack提供的本地服务
    //解决本地开发室 跨域的问题  跨域值存在于浏览器端
    //跨域是指浏览器的同源策略：同协议（http和https） 同域名 同端口
    //跨域常见的解决方式：1. jsonp跨域：原理是利用script标签可以跨域的特点,但是只能发送get请求
    //cors:跨域资源共享 不需要前端配合，只需要后端配置制定端口可以访问借口
    //代理（webpack提供的devServer）：把要跨域的路径代理到本地
    devServer: {
        host: "0.0.0.0",
        proxy: {
            "/api": {
                ws: false,
                //把target 改成我们本地请求借口的跟路径
                // 修改了vue.config.js文件 , 一定要重启项目
                //http://localhost:3000
                //要借口的路径就被代理成了/api
                target: "http://localhost:3000",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
};