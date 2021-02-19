import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import routes from '../route/route'
import '../assets/css/Menu.css'
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
function MenuList(props) {
  const [tabList, setTabList] = useState([]);
  const [tabHide,setTabHide] = useState(false);
  const [tabState,setTabState] = useState(0);
  const [selectedKeys,setSelectedKeys] = useState([]);
  const [openKeys,setOpenKeys] = useState([]);
  useEffect(() => {
    setTabList(routes.filter(v=>v.menuTab))
  }, []);
  useEffect(() => {
    // console.log(props.location)
    let arr = []
    getRoutes(routes)
    if (arr.filter(v=>v.path === props.location.pathname).length === 1) {
      arr.filter(v=>v.path === props.location.pathname)[0].tabHide ? setTabHide(true) : setTabHide(false)
    }else{
      setTabHide(true)
    }
    arr = []
    getRoutes(routes.filter(v=>v.menuTab))
    if (arr.filter(v=>v.path === props.location.pathname).length === 0) {
      setSelectedKeys([])
      setOpenKeys([])
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
  function handleClick({key}){
    setSelectedKeys([key])
    props.history.push(key)
  }
  function handleChange(e) {
    setOpenKeys(e)
  }
  function changeMenu() {
    // console.log('初始状态',tabState)
    if (tabState === 0) {
      // console.log('开始缩小',tabState)
      setTabState(-1)
      setTimeout(()=>{
        setTabState(-2)
        // console.log('缩小结束',tabState)
      },230)
    }else if(tabState === -2){
      // console.log('开始放大',tabState)
      setTabState(1)
      setTimeout(()=>{
        setTabState(0)
        // console.log('放大结束',tabState)
      },230)
    }
  }
  return (
    <>
      <div className={tabState === 0 ? 'menuContainer' : tabState === 1 ? 'menuContainerShow' :tabState === -1 ? 'menuContainerHide':'minmenuContainerShow'} style={{display:tabHide ? 'none' : 'block',}}>
        <div style={{ textAlign: 'right',padding:'5px 5px 0 0'}}>
          <i className="iconfont iconmenu menuicon"  title="菜单"  onClick={()=>changeMenu()}/>
        </div>
        <div className='menuList' style={{display:tabState===0 ? 'block' : 'none',}}>
          <Menu
            onClick={handleClick}
            onOpenChange={handleChange}
            style={{ width: 175 }}
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
          >
            { 
              // tabList.map(item=>(<div className='menuListItem' key={item.path}>{item.title}</div>))
              tabList.map((item)=>{
                if (item.children) {
                  let list = item.children.map(items =>(
                    <Menu.Item key={items.path}>{items.title}</Menu.Item>
                  )) 
                  return  <SubMenu key={item.title} title={<span>{item.title}</span>}>{list}</SubMenu>
                } else {
                  return <Menu.Item key={item.path}>{item.title}</Menu.Item>
                }
              })
            }
          </Menu>
        </div>
      </div>
    </>
  );
}

export default withRouter(MenuList);
