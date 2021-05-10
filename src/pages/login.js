import React,{useState} from 'react';
import { Link} from 'react-router-dom'
import { Input,message,Button  } from 'antd';
import '../assets/css/login.css'

  function Login(props) {
    const [account,setAccount] = useState('');
    const [accountErr,setAccountErr] = useState(false);
    const [password,setPassword] = useState('');
    const [passwordErr,setPasswordErr] = useState(false);
    const accountRule = /\S/;
    const passwordRule = /\S/;
    const changeAccount = (e) =>{
      setAccount(e);
      checkAccount(e)
    };
    const checkAccount = (e) =>{
      if (accountRule.test(e)) {
        setAccountErr(false)
      } else {
        setAccountErr(true)
      }
    };
    const  changePassword = (e) =>{
      setPassword(e);
      checkPassword(e)
    };
    const checkPassword = (e) =>{
      if (passwordRule.test(e)) {
        setPasswordErr(false)
      } else {
        setPasswordErr(true)
      }
    };
    const Login = () =>{
      if (accountRule.test(account) && passwordRule.test(password)) {
        props.history.push('/')
      }else{
        checkAccount(account)
        checkPassword(password)
      }
    }
    return (
      <div className="login">
        <div className="loginFrom">
          <div className="From">
            <div className={`FromItem ${accountErr ? 'FromItemErr' : ''}`}>
              <Input
                size="large"
                placeholder="请输入账号"
                prefix={<i className="iconfont icontouxiang"/>}
                value={account}
                onChange={e=>changeAccount(e.target.value)}
              />
              <div className="FromItemErrExplain">请输入账号</div>
            </div>
            <div className={`FromItem ${passwordErr ? 'FromItemErr' : ''}`}>
              <Input
                size="large"
                placeholder="请输入密码"
                type="password"
                prefix={<i className="iconfont iconmima"/>}
                value={password}
                onChange={e=>changePassword(e.target.value)}
              />
              <div className="FromItemErrExplain">请输入密码</div>
            </div>
            <div className="flex flexBetween">
              <Link to='/'><i className="iconfont iconshouye" style={{fontSize:'18px',}} /></Link>
              <p className="curp" style={{color:'#1890ff',paddingTop:'6px'}} onClick={e =>message.success('暂未开放')}>忘记密码</p>
            </div>
            <Button type="primary" style={{width:'100%',marginTop:'10px'}} onClick={e =>Login()}>登录</Button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Login;