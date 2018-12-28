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
                    pageName:'上网记录',
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
                    },
                    {
                        path:'search',
                        name:'search',
                        components: {
                            'sub-components-view': resolve => require(['@/components/volunteer/volunteer-search.vue'],resolve)
                        },
                        props: {
                            'sub-components-view': true
                        },
                        meta:{
                            pageName:'志愿服务',
                            index:2
                        },
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
                        path:'salary-detail',
                        name:'',
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
        ]
    },
];

module.exports = router_config;
