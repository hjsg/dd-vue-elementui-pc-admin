const _import = require('../config/_import_' + process.env.NODE_ENV)
import Layout from '../../components/layout/index'
import Sidebar from '../../components/layout/Sidebar/sidebar.js'

export default [
    {
        path: '/',
        component: Layout,
        redirect: '/index',
        meta: {title: Sidebar.index, icon: 'home_seller', noCache: true, needLogin: true},
        children: [
            {
                path: 'index',
                name: 'index',
                component: () => import('../../views/home/index'),
                meta: {title: Sidebar.index, icon: 'home_seller'}
            }
        ]
    },
    {path: '*', redirect: '/index', hidden: true}

]
