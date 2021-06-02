import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import EditMarker from '../views/EditMarker'
import Status from '../views/Status'
import Marker from '../views/Marker'
import Control from '../views/Control'
const constantRoutes = [
    {
        path: '/edit',
        component: EditMarker,
        meta: { title: '编辑标记', icon: 'icon', noCache: true }
    },
    {
        path: '/status',
        component: Status,
        meta: { title: '交互控制', icon: 'icon', noCache: true }
    },
    {
        path: '/marker',
        component: Marker,
        meta: { title: '交互控制', icon: 'icon', noCache: true }
    },
    {
        path: '/control',
        component: Control,
        meta: { title: '控件', icon: 'icon', noCache: true }
    },
    {
        path: '/',
        redirect: '/edit'
    }
]
const createRouter = () => new Router({
    routes: constantRoutes
})
const router = createRouter()
export default router