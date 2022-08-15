import React from 'react'
import {Form,Input,Button} from 'antd'
import {Link,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import { hideLoading, showLoading } from '../redux/reducers/alertsSlice'
// import{toast} from 'react-hot-toast'

const Login = () => {
const {loading}=useSelector(state=>{
    return state.alerts
    
  })
  
  const dispatch=useDispatch()
  // console.log(loading)
  const navigate=useNavigate()
  const onFinish=async(values)=>{
    console.log(values)

    try{
      dispatch(showLoading())

      const response=await axios.post('/api/user/login',values)
      console.log(response)
      dispatch(hideLoading())
      if(response.data.message){
        alert(response.data.message)
        // toast.info('Redirecting to login page')
      alert('Redirect to home page')
      localStorage.setItem('token',response.data.data)
        navigate('/')
      }
      }
      catch(err){
        console.log(err)
        dispatch(hideLoading())

      }
    }
  
  return (
    <div className='authentication'>
        <div className='authentication-form card p-3'>
          <h1 className='card-title'>  Nice to meet you</h1>
          <Form layout='vertical' onFinish={onFinish} >
          
          <Form.Item label='Email' name='email'>
              <Input placeholder='Email'/>
          </Form.Item>
          <Form.Item label='Password' name='password'>
              <Input placeholder='Password' type="password"/>
          </Form.Item>
          <Button className='primary-button mt-3 mr-3' htmlType='submit'>Login</Button>
          <Link to="/register" className='anchor gap'>Click here to Register</Link>

          </Form>
        </div>
    </div>
  )
}

export default Login