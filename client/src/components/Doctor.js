import React from 'react'
import {Link,useNavigate} from 'react-router-dom'


const Doctor = ({doctor}) => {
    const navigate=useNavigate()
  return (
    <div className='card p-2 cursor-pointer' onClick={()=>navigate(`/book-appointment/${doctor._id}`)}>
        <h1 classname='card-title'>{doctor.firstName} {doctor.lastname}</h1>
        <hr/>
        <p className='card-text'><b>Phone Number:</b> {doctor.phoneNumber}</p>
        <p className='card-text'><b>Address:</b> {doctor.address}</p>
        <p className='card-text'><b>Specilization:</b> {doctor.specialization} </p>

        <p className='card-text'><b>Fee Per Consultation:</b> {doctor.feePerCunsultation} /-</p>
        <p className='card-text'><b>Timings:</b> {doctor.timings[0]} - {doctor.timings[1]}</p>


    </div>
  )
}

export default Doctor