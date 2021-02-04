import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router,Route,withRouter} from 'react-router-dom'
import routes from '../route/route'
import Header from "../components/Header";
import Menu from "../components/Menu";
import '../assets/css/common.css'
function App() {
  const [routeList,setRouteList] = useState([]);
  // const [conwidth,setConwidth] = useState(0);
  const [conheight,setConheight] = useState(0);
  useEffect(() => {
    // setConwidth(document.documentElement.clientWidth)
    setConheight(document.documentElement.clientHeight)
    let arr = []
    getRoutes(routes)
    function getRoutes(list) {
      for (const v of list) {
        arr.push(v)
        if (v.children) {
          getRoutes(v.children)
        }
      }
    }
    setRouteList(arr)
  }, []); 
  return (
    <>
      <Router>
        <div>
          <Header />
          <div style={{width:'100%',display:'flex'}}>
            <Menu style={{height:conheight-50}}/>
            <div style={{height:conheight-50,width:'100%'}}>
              {
                routeList.map((item,index)=>( 
                  <Route key={index} exact path={item.path} component={item.component}></Route>
                ))
              }
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default withRouter(App);