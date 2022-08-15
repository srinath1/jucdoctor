import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/reducers/alertsSlice";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

function Userslist() {
  console.log('loading')
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const getDoctorsData = async () => {
    try {
      const resposne = await axios.get("/api/admin/get-all-doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (resposne.data.success) {
        console.log('loading1')

        setUsers(resposne.data.data);
      }
    } catch (error) {
    }
  };
  const changeDoctorStatus = async (record,status) => {
    try {
      const resposne = await axios.post("/api/admin/change-doctor-account-status",{
doctorId:record._id,userId:record.userId,status
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (resposne.data.success) {
        setUsers(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorsData();
  },[]);

  const columns = [
    {
        title: "Name",
        dataIndex: "name",
        render: (text, record) => (
          <span>
            {record.firstName} {record.lastName}
          </span>
        ),
      },
      {
        title: "Phone",
        dataIndex: "phoneNumber",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        render: (record , text) => moment(record.createdAt).format("DD-MM-YYYY"),
      },
      {
        title: "status",
        dataIndex: "status",
      },
      {
        title: "Actions",
        dataIndex: "actions",
        render: (text, record) =>{ 
          console.log(record)

        return   <div className="d-flex">
           {record.status==='pending' && <h1 className='anchor' onClick={()=>changeDoctorStatus(record,'approved')}>Approve</h1>}
           {record.status==='approved' && <h1 className='anchor' onClick={()=>changeDoctorStatus(record,'blocked')}>Block</h1>}

          </div>
        },
      },
    
  ];

  return (
    <Layout>
      <h1 className="page-header">Doctors List</h1>
      <hr />
      <Table columns={columns} dataSource={users}/>
    </Layout>
  );
}

export default Userslist;