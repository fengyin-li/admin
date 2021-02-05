import React,{useEffect,useState} from 'react'
import { withRouter } from 'react-router-dom'
import routes from '../route/route'
import '../assets/css/Header.css'
import logourl from '../assets/image/logo.jpg'

function Header(props) {
    const [tabHide,setTabHide] = useState(false);
    useEffect(() => {
        let arr = []
        getRoutes(routes)
        if (arr.filter(v=>v.path === props.location.pathname).length === 1) {
            arr.filter(v=>v.path === props.location.pathname)[0].tabHide ? setTabHide(true) : setTabHide(false)
        }else{
            setTabHide(true)
        }
        function getRoutes(list) {
            for (const v of list) {
                arr.push(v)
                if (v.children) {
                    getRoutes(v.children)
                }
            }
        }
    },[props.location]);
    function goHref(val) {
        props.history.push(val)
    }
    return (
      <>
        <div className="headerContainer" style={{display:tabHide ? 'none' : 'flex'}}>
            <div className="headerLeft">
                <img src={logourl} alt="logo" onClick={()=>goHref('/')}/>
                {/* {
                    routes.map((item,index)=>(item.headerBar ? <Link key={index} to={item.path}>{item.title}</Link> : ''))
                } */}
            </div>
            <div className="headerRight">
                {/* <Home titleAccess ='首页' /> */}
                <i className="iconfont iconshouye" title="首页" onClick={()=>goHref('/')}/>
                <i className="iconfont icontouxiang" title="个人中心" onClick={()=>goHref('/mine')}/>
                <span>猜猜我是谁</span>
                <i className="iconfont icondengchu" style={{color:'red',fontSize:'20px'}} title="登出" onClick={()=>goHref('/login')} />
            </div>
        </div>
      </>
    );
}

  
export default withRouter(Header);
  