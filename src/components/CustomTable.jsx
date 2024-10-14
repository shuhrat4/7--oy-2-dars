import React from 'react';
import { Table } from 'antd';
import { DeleteFilled, EditFilled, MoreOutlined } from '@ant-design/icons';

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


const data = [
    {
        key: '1',
        id:1,
        companyName: 'Najot Talim',
        inn: 223344556,
        status:'Faol',
        address:'Toshkent, Chilonzor 9kv',
        createdAt:'05.11.2018',
        action: <div className='flex items-center gap-10'>
            <MoreOutlined className='rotate-[90deg] hover:scale-[1.7] duration-300 cursor-pointer scale-[1.5]'/>
            <EditFilled className='scale-[1.5] hover:scale-[1.7] duration-300 cursor-pointer' />
            <DeleteFilled className='scale-[1.5] hover:scale-[1.7] duration-300 cursor-pointer'/>
        </div>
    
    }

];

const handleTableChange = (pagination, filters, sorter, extra) => {
    console.log('Table parameters:', pagination, filters, sorter, extra);
};

const CustomTable = () => (
    <Table
        columns={columns}
        dataSource={data}
        onChange={handleTableChange}
    />
);

export default CustomTable;
