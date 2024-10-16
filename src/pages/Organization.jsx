import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Popover } from 'antd';
import { LineOutlined, MedicineBoxOutlined, DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import CustomSelect from '../components/CustomSelect';
import CustomTable from '../components/CustomTable';
import { useAxios } from '../hooks/useAxios';

function Organization() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [regionId, setRegionId] = useState("");
  const [refresh, setRefresh] = useState(false);

  const columns = [
    { title: 'ID', dataIndex: 'index' },
    { title: 'Tashkilot nomi', dataIndex: 'companyName' },
    { title: 'INN', dataIndex: 'inn' },
    { title: 'Holati', dataIndex: 'status' },
    { title: 'Filial', dataIndex: 'regionPlace' },
    { title: 'Manzil', dataIndex: 'address' },
    { title: 'Yaratilgan vaqti', dataIndex: 'createdAt' },
    { title: 'Batafsil', dataIndex: 'action' },
  ];

  const RegionsList = [
    { value: 1, label: "Toshkent shahar" },
    { value: 2, label: "Samarqand vilayati" },
    { value: 3, label: "Xorazm vilayati" },
    { value: 4, label: "Adijon vilayati" },
  ];

  useEffect(() => {
    setIsLoading(true);
    useAxios()
      .get(`/organization?regionId=${regionId}`)
      .then((res) => {
        setData(
          res.data.map((item, index) => {
            item.index = index + 1;
            item.address = (
              <Popover placement="top" content={item.address}>
                <p className="text-ellipsis whitespace-nowrap cursor-pointer overflow-hidden w-[150px] inline-block">
                  {item.address}
                </p>
              </Popover>
            );
            item.companyName = item.companyName || <LineOutlined />;
            item.inn = item.inn || <LineOutlined />;
            item.status = getStatusLabel(item.status);
            item.action = getActionButtons(item.id);
            return item;
          })
        );
        setIsLoading(false);
      });
  }, [refresh, regionId]);

  const getStatusLabel = (status) => {
    switch (status) {
      case "1":
        return "Faol";
      case "2":
        return "Jarayonda";
      case "3":
        return "Faol emas";
      default:
        return "";
    }
  };

  const getActionButtons = (id) => (
    <div className="flex items-center gap-10">
      <DeleteOutlined className="scale-[1.3] cursor-pointer hover:scale-[1.5] duration-300" />
      <EditOutlined className="scale-[1.3] cursor-pointer hover:scale-[1.5] duration-300" />
      <MoreOutlined
        onClick={() => navigate(id)}
        className="scale-[1.3] cursor-pointer hover:scale-[1.5] duration-300 rotate-[90deg]"
      />
    </div>
  );

  const handleSearchBtn = (e) => {
    setIsLoading(true);
    const searchTerm = e.target.value;
    if (searchTerm) {
      const filteredData = data.filter((item) =>
        item.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setTimeout(() => {
        setData(filteredData);
        setIsLoading(false);
      }, 800);
    } else {
      setTimeout(() => {
        setRefresh(!refresh);
      }, 800);
    }
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-[25px]">Tashkilotlar</h2>
          <span className="text-[15px] pl-1 text-slate-500">tashkilotlar (0)</span>
        </div>
        <Button
          onClick={() => navigate("add")}
          icon={<MedicineBoxOutlined />}
          size="large"
          type="primary"
        >
          Qo'shish
        </Button>
      </div>

      <div className="flex mt-5 items-center space-x-5">
        <Input
          onInput={handleSearchBtn}
          className="w-[350px]"
          placeholder="Qidirish..."
          size="large"
          allowClear
        />
        <CustomSelect
          width="350px"
          setIsLoading={setIsLoading}
          placeholder="Tanlash..."
          setChooseId={setRegionId}
          option={RegionsList}
        />
      </div>

      <div className="mt-5">
        <CustomTable columns={columns} data={data} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default Organization;
