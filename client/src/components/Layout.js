import React,{useState} from 'react'
import '../layout.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ClockCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';


const Layout = ({children}) => {
    const[collapsed,setCollpased]=useState(false)
    const {user}=useSelector(state=>state.user)
    const navigate=useNavigate()
    const location=useLocation()

    const userMenu=[
        {
            name:'Home',
            path:'/',
            icon:"ri-home-line"
        },
        {
            name:'Appointments',
            path:'/appointments',
            icon:'ri-file-list-line'
        },
        {
            name:'Apply as Doctor',
            path:'/apply-doctor',
            icon:"ri-hospital-line"
        },
        
    ];
    const doctorMenu=[
        {
            name:'Name',
            path:'/',
            icon:"ri-home-line"
        },
        {
            name:'Appointments',
            path:'/doctor/appointments',
            icon:'ri-file-list-line'
        },
        
        {
            name:"Profile",
            path:`/doctor/profile/${user?._id}`,
            icon:"ri-user-line"
        }
    ]
    const adminMenu=[
        {
            name:'Home',
            path:'/',
            icon:"ri-home-line"
        },
        
        {
            name:'Users',
            path:'/users',
            icon:"ri-user-line"
        },
        {
            name:'Doctors',
            path:'/admin/doctorslist',
            icon:"ri-hospital-line"
        }
        
        
    ]
    const menuToBeRendered=user?.isAdmin ? adminMenu :user?.isDoctor ?doctorMenu:userMenu
  const role=user ?. isAdmin  ?'Admin' :user?.isDoctor ?'Doctor':'User'
    return (
    <div className="main">
    
    <div className='d-flex'>
        <div className='sidebar'>
        <div className='sidebar-header'>
            <h2 className='maintext'>JU</h2>
            <h6 className='role'>{role}</h6>
        </div>
        {menuToBeRendered.map(menu=>{
            const isActive=location.pathname===menu.path
            return <div className={`d-flex menu-item ${isActive && 'active-menu-item'} `}>
            <i className={menu.icon}></i>
{!collapsed && <Link to={menu.path}>{menu.name}</Link>
}
            </div>
            

        })}
        <div className={`d-flex menu-item `}>
            <i className='ri-logout-circle-line'></i>
{!collapsed && <Link to='/login'>Logout</Link>
}
       
       
            </div>

        </div>
        
        
        <div className='content'>
            <div className='header'>
{collapsed ?( <i className='ri-menu-2-fill header-action-icon' onClick={()=>setCollpased(false)}></i>
):(        <i className='ri-close-fill header-action-icon' onClick={()=>setCollpased(true)}></i>
)}
       
<div className='d-flex align-items-center px-5'>
            <Badge count={user ?.unseenNotifications.length} onClick={()=> navigate('/notifications')}>
            <i className='ri-notification-line header-action-icon'></i>
    </Badge>
            <Link className='anchor px-2' to="/profile">{user?.name}</Link>
        </div>
        </div>
        
        <div className='body'>
        {children}

        </div>
    </div>
    </div>
    
    </div>
  )
}

export default Layout