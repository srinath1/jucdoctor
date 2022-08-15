import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { setUser } from '../redux/reducers/userSlice'
import {showLoading,hideLoading} from '../redux/reducers/alertsSlice.js'
import axios from 'axios'

const ProtectedRoutes = (props) => {
    const {user,reloadUser}=useSelector(state=>state.user)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const getUser=async()=>{
        try{
            dispatch(showLoading)
            const response=await axios.post('/api/user/get-user-info-by-id',{
                token:localStorage.getItem('token')
                
            },{
                
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    
            }
        })
        dispatch(hideLoading)
        if(response.data.success){
           dispatch( setUser(response.data.data))


        }else{
            localStorage.clear()
            navigate('/login')
        }

        }catch(err){
            console.log(err)
            dispatch(hideLoading)
            localStorage.clear()

            navigate('/login')

        }
    }
    useEffect(()=>{
        if(!user ){
            getUser()
        }else{

        }
    },[user])
    if(localStorage.getItem('token')){
        console.log(props.children)
        return props.children
    }else{
        return <Navigate to='/login'/>
    }
  
}

export default ProtectedRoutes