import React from 'react'
import {Form,Input,Button} from 'antd'
import {Link,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

import axios from 'axios'
import { showLoading ,hideLoading} from '../redux/reducers/alertsSlice'
// import{toast} from 'react-hot-toast'

const Register = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const onFinish=async(values)=>{
    console.log(values)

    try{
      dispatch(showLoading())

      const response=await axios.post('/api/user/register',values)
      dispatch(hideLoading())
      if(response.data.message){
        alert(response.data.message)
        // toast.info('Redirecting to login page')
      alert('Redirect to login page')
        navigate('/login')
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
          <Form.Item label='Name' name='name' className={{color:'black'}}>
              <Input placeholder='Name'/>
          </Form.Item>
          <Form.Item label='Email' name='email'>
              <Input placeholder='Email'/>
          </Form.Item>
          <Form.Item label='Password' name='password'>
              <Input placeholder='Password' type="password"/>
          </Form.Item>
          <Button className='primary-button mt-3 mr-3' htmlType='submit'>Register</Button>
          <Link to="/login" className='anchor'>Click here to Login</Link>

          </Form>
        </div>
    </div>
  )
}

export default Register