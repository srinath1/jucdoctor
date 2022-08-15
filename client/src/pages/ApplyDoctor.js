import React from 'react'
import Layout from '../components/Layout'
import {Form,Col,Row,Input, TimePicker, Button} from 'antd'
import {useSelector,useDispatch} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import { showLoading ,hideLoading} from '../redux/reducers/alertsSlice'
import DoctorForm from '../components/DoctorForm'
import moment from "moment";




import axios from 'axios'

const ApplyDoctor = () => {
    
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {user}=useSelector(state=>state.user)
  const onFinish=async(values)=>{
    console.log(values)

    try{
      dispatch(showLoading())

      const response=await axios.post('/api/user/apply-doctor-account',{
        ...values,
        userId: user._id,
        timings: [
          moment(values.timings[0]).format("HH:mm"),
          moment(values.timings[1]).format("HH:mm"),
        ],
      },{
          headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`
          }
      })
      dispatch(hideLoading())
      if(response.data.message){
        alert(response.data.message)
        // toast.info('Redirecting to login page')
      alert('Redirect to login page')
        navigate('/')
      }
      }
      catch(err){
        console.log(err)
        dispatch(hideLoading())

      }
    }
  

    
  return (
    <Layout className='page-title'>
<h1>Apply As a Doctor</h1>
<hr/>
<DoctorForm onFinish={onFinish}/>


    </Layout>
  )
}

export default ApplyDoctor