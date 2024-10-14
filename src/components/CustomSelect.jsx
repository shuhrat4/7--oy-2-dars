import React from 'react';
import { Select } from 'antd';

const CustomSelec  = ({placeholder, options, setChooseId}) => {
  const onChange = (value) => {
    setChooseId(`selected ${value}`);
};
return(
  <Select
  className='w-[350px]'
  showSearch
  allowClear
  size='large'
  placeholder={placeholder}
  optionFilterProp="label"
  onChange={onChange}
  options={options}  
/>
)
};
export default CustomSelec;