import Vue from "vue";
import VueRouter from "vue-router";
import Common from "../views/Common/Common";

Vue.use(VueRouter);

const routes = [{
        // 主页公共页
        path: "/",
        component: Common,
        children: [{
            path: "",
            name: "Home",
            component: () =>
                import ('../views/Home')
        }]
    },
    // 已发布页面
    {
        path: "/Publish",
        component: Common,
        children: [{
            path: "",
            name: "Publish",
            component: () =>
                import ("../views/Publish/Publish")
        }]
    },
    // 统计页面
    {
        path: "/Stato",
        component: Common,
        children: [{
            path: "",
            name: "Stato",
            component: () =>
                import ("../views/Stato/Stato")
        }]
    },
    // 已发布里面的查看页面
    {
        path: "/Examine",
        component: Common,
        children: [{
            path: "",
            name: "Examine",
            component: () =>
                import ("../views/Examine/Examine")
        }]
    },

    {
        path: "/Redact",
        component: Common,
        children: [{
            path: "",
            name: "Redact",
            component: () =>
                import ("../views/Redact/Redact")
        }]
    },


    // 发布文章
    {
        path: "/Warkdown",
        component: Common,
        children: [{
            path: "",
            name: "Warkdown",
            component: () =>
                import ("../views/Warkdown/Warkdown")
        }]
    },
    // 标签页
    {
        path: "/Tag",
        component: Common,
        children: [{
            path: "",
            name: "Tag",
            component: () =>
                import ("../views/tag/Tag")
        }]
    },
    // 导出excel
    {
        path: "/Query",
        component: Common,
        children: [{
            path: "",
            name: "Query",
            component: () =>
                import ("../views/Query/Query")
        }]
    },
    // 图片上传
    {
        path: "/Upload",
        component: Common,
        children: [{
            path: "",
            name: "Upload",
            component: () =>
                import ("../views/Upload/Upload")
        }]
    },
    // 退出系统
    {
        path: "/Logout",
        component: Common,
        children: [{
            path: "",
            name: "Logout",
            component: () =>
                import ("../views/Logout/Logout")
        }]
    },
    // 分页表格
    {
        path: "/Table",
        component: Common,
        children: [{
            path: "",
            name: "Table",
            component: () =>
                import ("../views/Table/Table")
        }]
    },

    {
        path: '/Login',
        name: 'Login',
        component: () =>
            import ("../views/Login/Login.vue")
    },
    {
        path: '/Reyister',
        name: 'Reyister',
        component: () =>
            import ("../views/Reyister/Reyister.vue")
    },
    {
        path: "*",
        component: () =>
            import ("../views/erry.vue")
    },
];


const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

// 进入路由之前
// 参数是一个回调函数 回调里面又传3个参数
// to:要进入的路由 from:从哪进入的路由 next是一个函数 所以必须调用 代表进入到下一个路由
// 如果不写next 程序就被阻塞了


// 第一是浏览器标题会随页面变化
// 如果用户登录成功 我们会把用户信息存在localStorage和vuex里面
// 如果用户没有登录 只能访问登录或者注册页面
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    let user = localStorage.getItem('name')
    if (to.path === '/login' || to.path === '/register') {
        next()
    } else {
        user ? next() : next('/login')
    }
    // console.log(to)
    // console.log(from)
})




export default router;