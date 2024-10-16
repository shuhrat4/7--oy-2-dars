import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined, EditOutlined, LineOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useAxios } from '../hooks/useAxios';

function OrganizationMore() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [singleData, setSingleData] = useState({});

  
    useEffect(() => {
        useAxios()
            .get(`/organization/${id}`)
            .then((res) => {
                setSingleData(res.data);
            });
    }, [id]);

    return (
        <div className="p-5">
    
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-5">
                    <button onClick={() => navigate(-1)} className="scale-[1.3]">
                        <ArrowLeftOutlined />
                    </button>
                    <h2 className="font-bold text-[25px]">
                        {singleData.companyName || <LineOutlined />}
                    </h2>
                </div>
                <Button icon={<EditOutlined />} size="large" htmlType="button" type="primary">
                    Tahrirlash
                </Button>
            </div>

            <ul className="w-[50%] rounded-lg p-5 flex justify-between border-[2px] border-slate-600">
         
                <li className="space-y-5 w-[50%]">
                    <div className="flex flex-col pl-3">
                        <span className="text-[15px] text-slate-500">ID</span>
                        <strong className="text-[22px]">{singleData.id}</strong>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[15px] text-slate-500">Tashkilot nomi</span>
                        <strong className="text-[22px]">{singleData.companyName}</strong>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[15px] text-slate-500">INN</span>
                        <strong className="text-[22px]">{singleData.inn || <LineOutlined />}</strong>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[15px] text-slate-500">Joylashgan nomi</span>
                        <strong className="text-[22px]">{singleData.regionPlace}</strong>
                    </div>
                </li>

             
                <li className="space-y-5 w-[50%]">
                    <div className="flex flex-col">
                        <span className="text-[15px] text-slate-500">Manzil</span>
                        <strong className="text-[22px]">{singleData.address}</strong>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[15px] text-slate-500">Yaratilgan vaqti</span>
                        <strong className="text-[22px]">{singleData.createdAt}</strong>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[15px] text-slate-500">Holati</span>
                        <strong className="text-[22px]">{singleData.status === "1" ? "Faol" : "Faol emas"}</strong>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default OrganizationMore;
