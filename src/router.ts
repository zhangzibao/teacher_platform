import Router from "vue-router";
import Vue from 'vue';

Vue.use(Router);

export default new Router({
    mode: "hash",
    base: process.env.NODE_ENV === 'production'
        ? "/teacher_platform/"
        : "/",
    routes: [
        {
            path: "/",
            name: "index",
            redirect: "/home"
        },
        {
            path: "/home",
            name: "home",
            component: () =>
                import(/* webpackChunkName: "about" */ "./views/Home.vue"),
            redirect: "/teacher_calendar",
            children: [
                {
                    path: "/school_calendar",
                    name: "school_calendar",
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import(/* webpackChunkName: "about" */ "./views/school_calendar/school_calendar.vue")
                },
                {
                    path: "/setting",
                    name: "setting",
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import(/* webpackChunkName: "about" */ "./views/setting/setting.vue")
                },
                {
                    path: "/teacher_calendar",
                    name: "teacher_calendar",
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import(/* webpackChunkName: "about" */ "./views/teacher_calendar/teacher_calendar.vue")
                }
            ]
        }
    ]
});
