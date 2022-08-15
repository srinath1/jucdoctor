import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'
import Layout from '../components/Layout'
import {Row,Col} from 'antd'
import Doctor from '../components/Doctor'
import {showLoading,hideLoading} from '../redux/reducers/alertsSlice'

const Home = () => {
  const[doctors,setDoctors]=useState(null)
  const {loading}=useSelector(state=>state.alerts)
  console.log(loading)
  const dispatch=useDispatch()

  useEffect(()=>{
getData()
  },[])
  const getData=async()=>{
    dispatch(showLoading())
    try{
      const response=await axios.get('/api/user/get-all-approved-doctors',{
        headers:{
          Authorization:'Bearer ' + localStorage.getItem('token')
        }
      })
      if(response.data.success){
        setDoctors(response.data.data)

      }
      dispatch(hideLoading())
      console.log(response.data)

    }catch(err){
      console.log(err)
      dispatch(hideLoading())
    }
  }
  return (
   <Layout>
     <Row gutter={20}>
     {doctors && doctors.map(doctor=>{
     return  <Col span={8} xs={24} sm={24} lg={8}>
         <Doctor  doctor={doctor}/>
       </Col>
     })}

     </Row>

   </Layout>
  )
}

export default Home