import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { MedicineBoxOutlined } from '@ant-design/icons';
import CustomSelect from '../components/CustomSelect';
import CustomTable from '../components/CustomTable';

function Organization() {
  const [regionId, SetRegionId] = useState(null)
  const regionList = [
    {
      value:1,
      label:'Toshkent shahar'
    },
    {
      value:2,
      label:'Samarqan viloyati'
    },
    {
      value:1,
      label:'Xorazm viloyati'
    },
    {
      value:1,
      label:'Andijon viloyati'
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
        <Input className='w-[350px]'size='large'type='text'allowClear placeholder='Searching...'/>
        <CustomSelect placeholder={"Tanlash..."}  setChooseId={SetRegionId}  options={regionList}/>
      </div>
      <div className='pt-5'>
      <CustomTable/>
      </div>
    </div>
  );
}

export default Organization;
