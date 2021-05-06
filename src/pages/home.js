import React, { useState,useEffect} from 'react'
import { Calendar } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';
import '../assets/css/home.css'
  function Home() {
    const [ordersRefresh, setOrdersRefresh] = useState(false);
    const [nowRefresh, setNowRefresh] = useState(false);
    const [userRefresh, setUserRefresh] = useState(false);
    useEffect(() => {
      moment.locale('zh-cn');
    }, []);
    function refreshOrders(status,type) { //params1:旋转状态;params2:旋转对象
      if (!status) {
        if (type === 'ordersRefresh') {
          setOrdersRefresh(true) 
        } else if(type === 'nowRefresh'){
          setNowRefresh(true)
        } else if(type === 'userRefresh'){
          setUserRefresh(true)
        }
        setTimeout(() => {
          if (type === 'ordersRefresh') {
            setOrdersRefresh(false) 
          } else if(type === 'nowRefresh'){
            setNowRefresh(false)
          } else if(type === 'userRefresh'){
            setUserRefresh(false)
          }
        }, 800);
      }
    }
    return (
      <div className="containerp">
        <div className="header">
          <div className="card headerTag">
            <div className="headerTag-left" style={{background:'#000'}}>
              <i className="iconfont icondingdan1"></i>
            </div>
            <div className="headerTag-right">
              <div className="headerTitle">
                <p style={{color:'#f96c09',fontSize:'18px'}}>订单总数</p>
                <p className="headerTitleNum">1200</p>
              </div>
              <i className={ordersRefresh?"iconfont iconshuaxin curp refreshIcon":'iconfont iconshuaxin curp'} onClick={()=>refreshOrders(ordersRefresh,'ordersRefresh')}></i>
            </div>
          </div>  
          <div className="card headerTag">
            <div className="headerTag-left" style={{background:'#1976d2'}}>
              <i className="iconfont icondingdan1"></i>
            </div>
            <div className="headerTag-right">
              <div className="headerTitle">
                <p style={{color:'#f96c09',fontSize:'18px'}}>今日订单</p>
                <p className="headerTitleNum">51</p>
              </div>
              <i className={nowRefresh?"iconfont iconshuaxin curp refreshIcon":'iconfont iconshuaxin curp'} onClick={()=>refreshOrders(nowRefresh,'nowRefresh')}></i>
            </div>
          </div> 
          <div className="card headerTag">
            <div className="headerTag-left" style={{background:'#e36aea'}}>
              <i className="iconfont icondingdan1"></i>
            </div>
            <div className="headerTag-right">
              <div className="headerTitle">
                <p style={{color:'#f96c09',fontSize:'18px'}}>平台用户</p>
                <p className="headerTitleNum">9</p>
              </div>
              <i className={userRefresh?"iconfont iconshuaxin curp refreshIcon":'iconfont iconshuaxin curp'} onClick={()=>refreshOrders(userRefresh,'userRefresh')}></i>
            </div>
          </div>                     
        </div>
        <div className="container">
          <div className="card baiduMap">
            <iframe title="百度地图" src="https://map.baidu.com/@13360185,3503367,13z" style={{width:'100%',height:'100%'}}></iframe>
          </div>
          <div style={{ width: '30%', border: '1px solid #d9d9d9', borderRadius: 4 }}>
            <Calendar fullscreen={false} locale={locale}/>
          </div>
        </div>
      </div>
    );
    
  }
  
 export default Home;
  