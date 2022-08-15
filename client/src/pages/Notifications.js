import Layout from '../components/Layout'
import React from 'react'
import {Tabs} from 'antd'
import {useSelector,useDispatch} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import { showLoading ,hideLoading} from '../redux/reducers/alertsSlice'
import axios from 'axios'
import { setUser } from '../redux/reducers/userSlice'


const { TabPane } = Tabs;

const Notifications = () => {
    const {user}=useSelector(state=>state.user)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const markAsSeen=async()=>{
        try{
            dispatch(showLoading())
      
            const response=await axios.post('/api/user/mark-all-notifications-as-seen',{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(response.data.message){
              // toast.info('Redirecting to login page')
              dispatch(setUser(response.data.data))
            }
            }
            catch(err){
              console.log(err)
              dispatch(hideLoading())
      
            }
      
    }
    const deleteAll=async()=>{
        try{
            dispatch(showLoading())
      
            const response=await axios.post('/api/user/delete-all-notifications',{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(response.data.message){
              // toast.info('Redirecting to login page')
              dispatch(setUser(response.data.data))
            }
            }
            catch(err){
              console.log(err)
              dispatch(hideLoading())
      
            }
      
    }
  return (
    <Layout>
        <h1 className='page-title'>Notifications </h1>

        <Tabs defaultActiveKey="1">
    <TabPane tab="Unseen" key="1">
      <div className='d-flex justify-content-end'>
          <h1 className='anchor' onClick={()=>markAsSeen()}>Mark all as seen</h1>
      </div>
      {user?.unseenNotifications.map(notification=>{
          return <div className='card p-2 mt-2' onClick={()=>navigate(notification.onClickPath)}>
         <div  className='card-text'> {notification.message}</div>

          </div>
      })}
    </TabPane>
    <TabPane tab="Seen" key="2">
    <div className='d-flex justify-content-end'>
          <h1 className='anchor' onClick={()=>deleteAll()}>Delete all</h1>
      </div>
      {user?.seenNotifications.map(notification=>{
          return <div className='card p-2 mt-2' onClick={()=>navigate(notification.onClickPath)}>
         <div  className='card-text'> {notification.message}</div>

          </div>
      })}
    </TabPane>
    
  </Tabs>
        
    </Layout>
  )
}

export default Notifications