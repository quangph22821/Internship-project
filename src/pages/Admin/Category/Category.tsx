import { useEffect, useState } from 'react';
import type { TableProps } from 'antd';
import { Button, Popconfirm, Space, Table, message } from 'antd';
import type { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Redux/hook';
import { fetchAllCategory, fetchDeleteCategory } from '../../../Redux/Slices/categorySlice';
import { AppstoreAddOutlined } from '@ant-design/icons';

interface DataType {
    key: string;
    name: string;
}



const Category = () => {
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
    const dispatch = useAppDispatch();

    const categorys = useAppSelector((state) => state.category.categorys);
    console.log({ categorys });


    useEffect(() => {
        dispatch(fetchAllCategory());
    }, [dispatch]);

    const data: DataType[] = categorys.map((data: any) => (
        {
            key: data._id,
            name: data.name,
        }
    ))

    const confirmDelete = async (categoryId: string) => {
        try {
            await dispatch(fetchDeleteCategory(categoryId))
            await dispatch(fetchAllCategory())
            message.success('Xoá Danh Mục Thành Công');
        } catch (error) {
            if (!error) {
                setTimeout(message.loading('đang sử lí ...'), 2000)
            } else {
                message.error(`Failed to delete product: ${error}`);
            }
        }
    }
    const cancelDelete = () => {
        message.error('Huỷ Bỏ !');
    };
    const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<DataType>);
    };



    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filters: [
                { text: 'Áo', value: 'Áo' },
                { text: 'Quần', value: 'Quần' },
            ],
            filteredValue: filteredInfo.name || null,
            onFilter: (value: string, record) => record.name.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/admin/category/update/${record.key}`}>
                        <Button className='btn-edit text-[#30D200] border-[#31d200cb] hover:text-[#31d200ba] hover:border-[#30D200] active:border-[#30D200]' >Edit</Button>
                    </Link>
                    <Popconfirm
                        title="Are you sure to delete this product?"
                        onConfirm={() => confirmDelete(record.key)}
                        onCancel={cancelDelete}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <div className='flex justify-between my-[20px]'>
                <div>
                    <h1 className='text-[20px] font-sans font-[700]'>Quản Trị Danh Mục</h1>
                </div>
                <div>
                    <Link to={`/admin/category/add`}>
                        <button
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            className="flex items-center rounded bg-blue-500 text-white ml-[10px]  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            <AppstoreAddOutlined className='mr-[5px] text-[20px]' />
                            Tạo Danh Mục
                        </button>
                    </Link>
                </div>
            </div>
            <div>
                <Table columns={columns} dataSource={data} onChange={handleChange} />
            </div>
        </div>
    )
}

export default Category