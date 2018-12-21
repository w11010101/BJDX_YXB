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
                children:[
                    {
                        path:'list',
                        components: {
                            'internet-view': resolve => require(['@/components/internet/internet-list.vue'],resolve)
                        },
                    }
                ]
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
                            'volunteer-view': resolve => require(['@/components/volunteer/volunteer-detail.vue'],resolve)
                        },
                        props: {
                            'volunteer-view': true
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
                            'volunteer-view': resolve => require(['@/components/volunteer/volunteer-search.vue'],resolve)
                        },
                        props: {
                            'volunteer-view': true
                        },
                        meta:{
                            pageName:'志愿服务',
                            index:2
                        },
                    }
                ]
            },{
                path: '/status/:id',
                name: 'status',
                components:{
                    'project-view': resolve => require(['@/components/status/status.vue'],resolve),
                },
                props:{
                    'project-view':true
                },
            }
        ]
    },
];

module.exports = router_config;
