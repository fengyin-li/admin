import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import routes from '../route/route'
import '../assets/css/Menu.css'
import {Apps} from '@material-ui/icons'

function Menu(props) {
  const [tabList, setTabList] = useState([]);
  const [tabHide,setTabHide] = useState(false);
  const [tabState,setTabState] = useState(0);
  useEffect(() => {
    setTabList(routes.filter(v=>v.menuTab))
  }, []);
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
  }, [props.location]);
  function changeMenu() {
    console.log('初始状态',tabState)
    if (tabState === 0) {
      console.log('开始缩小',tabState)
      setTabState(-1)
      setTimeout(()=>{
        setTabState(-2)
        console.log('缩小结束',tabState)
      },240)
    }else if(tabState === -2){
      console.log('开始放大',tabState)
      setTabState(1)
      setTimeout(()=>{
        setTabState(0)
        console.log('放大结束',tabState)
      },240)
    }
  }
  return (
    <>
      <div className={tabState === 0 ? 'menuContainer' : tabState === 1 ? 'menuContainerShow' :tabState === -1 ? 'menuContainerHide':'minmenuContainerShow'} style={{display:tabHide ? 'none' : 'block',}}>
        <div>
          <Apps titleAccess ='菜单' className="curp"  onClick={()=>changeMenu()}/>
        </div>
        <div style={{display:tabState===0 ? 'block' : 'none',}}>
          { 
            tabList.map(item=>{
              if (item.children) {
                let childrenlist = item.children.map(v=>(<p key={v.path}>{v.title}</p>))
                return <div key={item.path}>{item.title}{childrenlist}</div>
              } else {
                return <div key={item.path}>{item.title}</div>
              }
            })
          }
        </div>
        
      </div>
    </>
  );
}


export default withRouter(Menu);
