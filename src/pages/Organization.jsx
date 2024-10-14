import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { MedicineBoxOutlined } from '@ant-design/icons';
import CustomSelect from '../components/CustomSelect';
import CustomTable from '../components/CustomTable';
import { DeleteFilled, EditFilled, MoreOutlined } from '@ant-design/icons';

function Organization() {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
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
      title: 'Yaratilgan vaqt',
      dataIndex: 'createdAt',
    },
    {
      title: 'Manzil',
      dataIndex: 'address',
    },
    {
      title: 'Batafsil',
      dataIndex: 'action',
    },
  ];
  const [data, setData] =useState( [
    {
      key: '1',
      id: 1,
      companyName: 'Najot Talim',
      inn: 223344556,
      status: 'Faol',
      address: 'Toshkent, Chilonzor 9kv',
      createdAt: '05.11.2018',
      action: <div className='flex items-center gap-10'>
        <MoreOutlined className='rotate-[90deg] hover:scale-[1.7] duration-300 cursor-pointer scale-[1.5]' />
        <EditFilled className='scale-[1.5] hover:scale-[1.7] duration-300 cursor-pointer' />
        <DeleteFilled className='scale-[1.5] hover:scale-[1.7] duration-300 cursor-pointer' />
      </div>

    }
  ]);
  const [isLoading, setIsLoading] = useState(false)
  const [regionId, SetRegionId] = useState(null)
  const regionList = [
    {
      value: 1,
      label: 'Toshkent shahar'
    },
    {
      value: 2,
      label: 'Samarqan viloyati'
    },
    {
      value: 1,
      label: 'Xorazm viloyati'
    },
    {
      value: 1,
      label: 'Andijon viloyati'
    }
  ]
  return (
    <div className='p-5'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='font-bold text-[25px]'>Tashkilotlar</h2>
          <span className='text-[15px] pl-1 text-slate-400'>tashkilot (0)</span>
        </div>
        <Button icon={<MedicineBoxOutlined />} size='large' type='primary'> Qo'shish </Button>
      </div>
      <div className='flex mt-5 items-center space-x-5'>
        <Input className='w-[350px]' size='large' type='text' allowClear placeholder='Searching...' />
        <CustomSelect placeholder={"Tanlash..."} setChooseId={SetRegionId} options={regionList} />
      </div>
      <div className='pt-5'>
        <CustomTable  columns={columns} data={data} isLoading={isLoading}/>
      </div>
    </div>
  );
}

export default Organization;
