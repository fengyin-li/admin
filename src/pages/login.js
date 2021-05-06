import React,{useState,useEffect} from 'react';
import { Link} from 'react-router-dom'
import { Input,message,Button  } from 'antd';
import '../assets/css/login.css'

  function Login(props) {
    const [account,setAccount] = useState('');
    const [password,setPassword] = useState('');
    useEffect(() => {
    }, []);
    return (
      <div className="login">
        <div className="loginFrom">
          <div className="From">
            <div className="FromItem FromItemErr">
              <Input
                size="large"
                placeholder="请输入账号"
                prefix={<i className="iconfont icontouxiang"/>}
                value={account}
                onChange={e=>setAccount(e.target.value)}
              />
              <div className="FromItemErrExplain">请输入账号</div>
            </div>
            <div className="FromItem">
              <Input
                size="large"
                placeholder="请输入密码"
                type="password"
                prefix={<i className="iconfont iconmima"/>}
                value={password}
                onChange={e=>setPassword(e.target.value)}
              />
              <div className="FromItemErrExplain">请输入密码</div>
            </div>
            <div className="flex flexBetween">
              <Link to='/'><i className="iconfont iconshouye" style={{fontSize:'18px',}} /></Link>
              <p className="curp" style={{color:'#1890ff',paddingTop:'6px'}} onClick={e =>message.success('暂未开放')}>忘记密码</p>
            </div>
            <Button type="primary" style={{width:'100%',marginTop:'10px'}} onClick={e =>props.history.push('/')}>登录</Button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Login;