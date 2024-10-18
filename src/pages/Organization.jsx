import { LineOutlined, MedicineBoxOutlined } from '@ant-design/icons'
import { Button, Input, Modal, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import CustomSelect from '../components/CustomSelect'
import CustomTable from "../components/CustomTable"
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { useAxios } from '../hooks/useAxios'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

function Organization() {
  const [refresh, setRefresh] = useState(false)
  const navigate = useNavigate()

  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteId, setDeleteID] = useState(null)

  const [regionId, setRegionId] = useState("")

  const columns = [
    {
      title: 'ID',
      dataIndex: 'index',
    },
    {
      title: 'Tashkilot nomi',
      dataIndex: 'companyName',
    },
    {
      title: 'INN',
      dataIndex: 'inn',
    },
    {
      title: 'Holati',
      dataIndex: 'status',
    },
    {
      title: 'Filial',
      dataIndex: 'regionPlace',
    },
    {
      title: 'Manzil',
      dataIndex: 'address',
    },
    {
      title: 'Yaratilgan vaqti',
      dataIndex: 'createdAt',
    },
    {
      title: 'Batafsil',
      dataIndex: 'action',
    },
  ];

  const RegionsList = [
    {
      value:1,
      label:"Toshkent shahar",

    },
    {
      value:2,
      label:"Samarqand vilayati",

    },
    {
      value:3,
      label:"Xorazm vilayati",

    },
    {
      value:4,
      label:"Adijon vilayati",

    },
  ]
  
  // search part start
  function handleSearchBtn(e){
    setIsLoading(true)
    if(e.target.value) {
      const filteredInput = data.filter(item => item.companyName.length > 0 ? item.companyName.toLowerCase().includes(e.target.value.toLowerCase()) : "")

      setTimeout(() => {
        setData(filteredInput)
        setIsLoading(false)
      }, 800);
    }
    else{
      setTimeout(() => {
        setRefresh(!refresh)
      }, 800);
    }
  }
  // search part end


  // delete part start
  function handleDeleteBTn(id){
    setDeleteModal(true)
    setDeleteID(id)

  }

  function handleOkDeleteModal(){
    useAxios().delete(`/organization/${deleteId}`).then(res => {
      setDeleteModal(false)
      setIsLoading(true)
      setTimeout(() => {
        toast.success("Tashkilot ochirildi !!!")
        setRefresh(!refresh)
      }, 800);
    })
  }

  useEffect(() => {
    useAxios().get(`/organization?regionId=${regionId}`).then(res => {
      setIsLoading(false)
      setData(res.data.map((item, index) => {
        item.index = index + 1
        item.address = <Popover placement="top"  content={item.address}> 
          <p className='text-ellipsis whitespace-nowrap cursor-pointer overflow-hidden w-[150px] inline-block'>{item.address}</p>
        </Popover>
        item.companyName = item.companyName ? item.companyName : <LineOutlined/>
        item.inn = item.inn ? item.inn : <LineOutlined/>
        switch(item.status){
          case "1" :
            item.status = "Faol"
          break;
          case "2" :
            item.status = "Jarayonda"
          break;
          case "3" :
            item.status = "Faol emas"
          break;
        }
        item.action = <div className='flex items-center gap-10'>
          <DeleteOutlined onClick={() => handleDeleteBTn(item.id)} className='scale-[1.3] cursor-pointer hover:scale-[1.5] duration-300'/>
          <EditOutlined  onClick={() => navigate(`${item.id}/edit`)} className='scale-[1.3] cursor-pointer hover:scale-[1.5] duration-300'/>
          <MoreOutlined onClick={() => navigate(item.id)} className='scale-[1.3] cursor-pointer hover:scale-[1.5] duration-300 rotate-[90deg]'/>
        </div>
        return item
      }))
    })
    
  },[refresh, regionId ])


  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  function handleTableChange(page){
    setTableParams(page)
    
  }
  return (
    <div className='p-5'>
      <Toaster position="top-center" reverseOrder={false}/>
      <div className="flex items-center justify-between">
        <div className="">
          <h2 className='font-bold text-[25px]'>Tashkilotlar</h2>
          <span className='text-[15px] pl-1 text-slate-500'>tashkilotlar (0)</span>
        </div>
        <Button onClick={() => navigate("add")} icon={<MedicineBoxOutlined/>} size='large' htmlType='submit' type='primary' >Qo'shish</Button>
      </div>
      <div className="flex mt-5 items-center space-x-5">
        <Input onInput={handleSearchBtn} className='w-[350px]' placeholder='Qidirish...' size='large'  type='text' allowClear />
        <CustomSelect  width={"350px"} setIsLoading={setIsLoading} placeholder={"Tanlash..."} setChooseId={setRegionId} option={RegionsList} />
      </div>

      <div className="mt-5">
        <CustomTable tableParams={tableParams} onChange={handleTableChange} columns={columns} data={data} isLoading={isLoading}/>
      </div>

      <Modal title={"Tashkilotni o'chirmoqchimisiz ?"} open={deleteModal} onOk={handleOkDeleteModal} onCancel={() => setDeleteModal(false)}></Modal>
    </div>
  )
}

export default Organization
