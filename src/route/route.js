import home from '../pages/home'
import login from '../pages/login'
import mine from '../pages/mine'
import listDetails from '../pages/list/listDetails'
import jurisdictionRole from '../pages/jurisdiction/jurisdictionRole'
import jurisdictionUser from '../pages/jurisdiction/jurisdictionUser'

//路由参数:{ path:路由地址；title：标题名称；headerBar：是否以头部导航形式存在；
//tabHide：是否隐藏页面头部和左侧导航；children：左侧二级导航;menuTab:是否以左侧导航形势出现}
const routes = [
    {
        path:'/',
        title:'首页',
        component:home,
        headerBar:true,
    },
    {
        path:'/login',
        title:'登录',
        component:login,
        tabHide:true,
        headerBar:true,
    },
    {
        path:'/mine',
        title:'我的',
        component:mine,
        menuTab:true,
        headerBar:true,
    },
    {
        title:'列表',
        menuTab:true,
        children:[
            {
                path:'/listDetails',
                title:'列表详情',
                component:listDetails
            },
        ]
    },
    {
        title:'权限',
        menuTab:true,
        children:[
            {
                path:'/jurisdictionRole',
                title:'角色',
                component:jurisdictionRole
            },
            {
                path:'/jurisdictionUser',
                title:'用户',
                component:jurisdictionUser
            },
        ]
    },

]
export default routes;