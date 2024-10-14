import React from 'react';
import { Select } from 'antd';

const CustomSelec  = ({placeholder}) => {
  const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
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
  onSearch={onSearch}
  options={[
    {
      value: 'jack',
      label: 'Jack',
    },
    {
      value: 'lucy',
      label: 'Lucy',
    },
    {
      value: 'tom',
      label: 'Tom',
    },
  ]}
/>
)
};
export default CustomSelec;