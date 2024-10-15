import { ArrowLeftOutlined, EditOutlined, LoadingOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, DatePicker, Input } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomSelect from '../components/CustomSelect'
import { useAxios } from '../hooks/useAxios'
import toast from 'react-hot-toast'

function OrganizationAdd() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const statusDate = [
        {
            value: "1",
            label: "Faol"
        },
        {
            value: "2",
            label: "Jarayonda"
        },
        {
            value: "3",
            label: "Faol emas"
        }
    ]
    const regionData = [
        {
            value:1,
            label:"Toshkent",
      
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

    const [companyName, setCompanyName] = useState(null)
    const [inn, setInn] = useState(null)
    const [statusId, setStatusId] = useState(null)
    const [regionId, setRegionId] = useState(null)
    const [regionName, setRegionName] = useState(null)
    const [address, setAddress] = useState(null)
    const [createAt, setCreateAt] = useState(null)



    function handleSubmit(e){
        e.preventDefault()
        setIsLoading(true)
        const data = {
            key: Math.round(Math.random() * 100),
            companyName,inn,
            status:statusId,
            regionId:regionId,
            regionPlace: regionName,
            address: address,
            createdAt:createAt
        }
       useAxios().post(`/organization`, data).then(res => {
            
            toast.success("Tashkilot qo'shildi")
            setTimeout(() => {
                setIsLoading(false)
                navigate(-1)
            }, 800);
        })
        
    }

    const handleChangePicker = (date, dateString) => {
        setCreateAt( dateString);
      };

    return (
        <form onSubmit={handleSubmit} className='p-5'>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-5">
                    <button onClick={() => navigate(-1)} className='scale-[1.3]'><ArrowLeftOutlined/></button>
                    <h2 className='font-bold text-[25px]'>Tashkilotlar Yaratish</h2>
                </div>
                <Button htmlType='submit' icon={ isLoading ? <LoadingOutlined/> :<UserAddOutlined/>} size='large'  type='primary' >Saqlash</Button>
            </div>
            <div className="w-[70%] mt-10 flex justify-between  ">
                <div className="w-[49%] space-y-5">
                    <label className='flex flex-col space-y-1'>
                        <span className='text-[16px] text-slate-600'>Tashkilot nomi kiriting:</span>
                        <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} type='text' placeholder='Tashkilot nomi kiriting' required allowClear size='large' />
                    </label>
                    <label className='flex flex-col space-y-1'>
                        <span className='text-[16px] text-slate-600'>INN kiriting:</span>
                        <Input maxLength={9} value={inn} onChange={(e) => setInn(e.target.value)} type='number' placeholder='INN kiriting' required allowClear size='large' />
                    </label>
                    <label className='flex flex-col space-y-1'>
                        <span className='text-[16px] text-slate-600'>Holat turini tanlang:</span>
                        <CustomSelect option={statusDate} placeholder={"Holat turini tanlang"} setChooseId={setStatusId} width={"100%"}/>
                        <label className='flex flex-col space-y-1'>
                        <span className='text-[16px] text-slate-600'>Hudud nomni tanlang:</span>
                        <CustomSelect setLebalValue={setRegionName} option={regionData} placeholder={"Hudud nomni tanlang"} setChooseId={setRegionId} width={"100%"}/>
                    </label>
                    </label>
                </div>
                <div className="w-[49%] space-y-5">
                    <label className='flex flex-col space-y-1'>
                        <span className='text-[16px] text-slate-600'>Manzil nomi kiriting:</span>
                        <Input value={address} onChange={(e) => setAddress(e.target.value)} type='text' placeholder='Manzil nomi kiriting' required allowClear size='large' />
                    </label>
                    <label className='flex flex-col space-y-1'>
                        <span className='text-[16px] text-slate-600'>INN kiriting:</span>
                        <DatePicker onChange={handleChangePicker} size='large' />
                    </label>
                   
                </div>
            </div>
        </form>
    )
}

export default OrganizationAdd
