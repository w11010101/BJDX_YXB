var router_config = [
    {
        path: '/',
        name: 'menu',
        component: resolve => require(['@/components/menu'],resolve),
        meta:{
            pageName:'Menu.vue'
        },
        children:[
            {
                path: '/score',
                name: 'score',
                components: {
                    'project-view': resolve => require(['@/components/score/score.vue'],resolve)
                },
                props:{
                    'project-view':true
                },
                meta:{
                    pageName:'成绩查询',
                    index:1             
                }
            },
            {
                path: '/internet',
                name: 'internet',
                components: {
                    'project-view': resolve => require(['@/components/internet/internet.vue'],resolve)
                },
                props:{
                    'project-view':true
                },
                meta:{
                    pageName:'上网服务',
                    index:1
                },
            },{
                path: '/volunteer',
                name: 'volunteer',
                components:{
                    'project-view': resolve => require(['@/components/volunteer/volunteer.vue'],resolve),
                },
                meta:{
                    pageName:'志愿服务',
                    index:1
                },
                children:[
                    {
                        path:'detail/:items',
                        name:'detail',
                        components: {
                            'sub-components-view': resolve => require(['@/components/volunteer/volunteer-detail.vue'],resolve)
                        },
                        props: {
                            'sub-components-view': true
                        },
                        meta:{
                            pageName:'志愿服务',
                            index:2
                        },
                        children:[
                            {
                                path:'form/:item',
                                name:'form',
                                components: {
                                    'volunteer-form-view': resolve => require(['@/components/volunteer/volunteer-form.vue'],resolve)
                                },
                                props: {
                                    'volunteer-form-view': true
                                },
                                meta:{
                                    pageName:'志愿服务',
                                    index:2
                                },
                            },
                            
                        ]
                    },
                    {
                        path:'search/:type',
                        name:'search',
                        components: {
                            'sub-components-view': resolve => require(['@/components/volunteer/volunteer-search.vue'],resolve)
                        },
                        props: {
                            'sub-components-view': true
                        },
                        meta:{
                            pageName:'志愿服务',
                            showType:'slide-fade-y',
                            index:2
                        },
                        children:[
                            {
                                path:'detail/:items',
                                name:'list-detail',
                                components: {
                                    'volunteer-search-view': resolve => require(['@/components/volunteer/volunteer-detail.vue'],resolve)
                                },
                                props: {
                                    'volunteer-search-view': true
                                },
                                meta:{
                                    pageName:'志愿服务',
                                    index:4
                                },
                                children:[
                                    {
                                        path:'form',
                                        name:'form',
                                        components: {
                                            'volunteer-form-view': resolve => require(['@/components/volunteer/volunteer-form.vue'],resolve)
                                        },
                                        props: {
                                            'volunteer-form-view': true
                                        },
                                        meta:{
                                            pageName:'志愿服务',
                                            index:2
                                        },
                                    },
                                    
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                path: '/salary',
                name: 'salary',
                components: {
                    'project-view': resolve => require(['@/components/salary/salary.vue'],resolve)
                },
                props:{
                    'project-view':true
                },
                meta:{
                    pageName:'薪资查询',
                    index:1
                },
                children:[
                    {
                        path:'salary-detail/:obj',
                        name:'salaryDetail',
                        components: {
                            'sub-components-view': resolve => require(['@/components/salary/salary-detail.vue'],resolve)
                        },
                        props: {
                            'sub-components-view': true
                        },
                        meta:{
                            pageName:'薪资查询',
                            index:2
                        }
                    }
                ]
            },
            {
                path: '/school-calendar',
                name: 'school-calendar',
                components: {
                    'project-view': resolve => require(['@/components/school-calendar/school-calendar.vue'],resolve)
                },
                props:{
                    'project-view':true
                },
                meta:{
                    pageName:'校历',
                    index:1
                }
            },
            {
                path: '/help-center',
                name: 'help-center',
                components: {
                    'project-view': resolve => require(['@/components/help-center/help-center.vue'],resolve)
                },
                props:{
                    'project-view':true
                },
                meta:{
                    pageName:'帮助中心',
                    index:1
                },
                children:[
                    {
                        path: 'problem/:id',
                        name: 'problem',
                        components: {
                            'sub-components-view': resolve => require(['@/components/help-center/problem.vue'],resolve)
                        },
                        props:{
                            'project-view':true
                        },
                        meta:{
                            pageName:'',
                            index:2
                        }
                    },
                    {
                        path: 'illustrate/:id',
                        name: 'illustrate',
                        components: {
                            'sub-components-view': resolve => require(['@/components/help-center/illustrate.vue'],resolve)
                        },
                        props:{
                            'project-view':true
                        },
                        meta:{
                            pageName:'',
                            index:2
                        }
                    }
                ]
            },
            {
                path: '/student-revenue',
                name: 'student-revenue',
                components: {
                    'project-view': resolve => require(['@/components/student-revenue/student-revenue.vue'],resolve)
                },
                props:{
                    'project-view':true
                },
                meta:{
                    pageName:'学生收入',
                    index:1
                },
                children:[
                    {
                        path:'student-revenue-detail/:revenueId',
                        name:'student-revenue-detail',
                        components: {
                            'sub-components-view': resolve => require(['@/components/student-revenue/student-revenue-detail.vue'],resolve)
                        },
                        props: {
                            'sub-components-view': true
                        },
                        meta:{
                            pageName:'学生收入',
                            index:2
                        }
                    }
                ]
            },
            {
                path: '/release',
                name: 'release',
                components: {
                    'release-view': resolve => require(['@/components/release/release.vue'],resolve)
                },
                props:{
                    'release-view':true
                },
                meta:{
                    pageName:'发布页',
                    index:2
                },
            },
            {
                path: '/course',
                name: 'course',
                components: {
                    'project-view-props': resolve => require(['@/components/course/course.vue'],resolve)
                },
                props:{
                    'project-view-props':true
                },
                meta:{
                    pageName:'课程',
                    index:2,
                },
            },
            {
                path: '/student-info-query',
                name: 'student-info-query',
                components: {
                    'project-view': resolve => require(['@/components/student-info-query/student-info-query.vue'],resolve)
                },
                props:{
                    'project-view':true
                },
                meta:{
                    pageName:'学生信息查询',
                    index:2,
                },
            },

        ]
    },
];

module.exports = router_config;
