import React, { useEffect, useState } from 'react'
import { Input,Button,Table,Pagination } from 'antd';
import '../../assets/css/list.css'
  function List() {
    const [searchName, setSearchName] = useState('');
    const [tableData, setTableData] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    useEffect(() => {
      console.log('商品列表页面')
      setTotal(31)
      setTableData([{proid:'001',name:'999感冒灵',stock:20,createTime:'2021-02-19 15:53:00',status:'上架'},{proid:'002',name:'999感冒灵',stock:20,createTime:'2021-02-19 15:53:00',status:'上架'}])
    }, []);
    
    let columns = [ {
      title: '商品编号',
      dataIndex: 'proid',
    },{
      title: '商品名称',
      dataIndex: 'name',
    }, {
      title: '商品库存',
      dataIndex: 'stock',
    }, {
      title: '建立时间',
      dataIndex: 'createTime',
    }, {
      title: '商品状态',
      dataIndex: 'status',
    }, {
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => (
        <span>
          <span >{record.name}</span>
          <span className="ant-divider" />
          <span >详情</span>
        </span>
      ),
    }];
    const rowSelection = {
      onChange(selectedRowKeys, selectedRows) {
        console.log("选中的key值:",selectedRowKeys, "选中的数据: ", selectedRows);
        setSelectedKeys(selectedRowKeys)
      },
    };
    function changePage(page,size) {
      setPage(page)
      setPageSize(size)
    }
    return (
      <div className="listContainer">
        <h1>商品列表</h1>
        <div className='search'>
          <div className="searchLeft">
            <div className="searchName"> 
              <Input placeholder="商品名称搜索"
                value={searchName}
                onChange={e=>setSearchName(e.target.value)}/>
            </div>
          </div>
          <Button type="primary">搜索</Button>
        </div>
        <Table pagination={false} rowKey={record => record.proid} 
        selectedKeys={selectedKeys}  rowSelection={rowSelection} 
        columns={columns} dataSource={tableData} />
        <div className="listPage">
          <Pagination current={page} pageSize={pageSize} 
          pageSizeOptions={[10,15,20]} 
          showSizeChanger={true}
          onChange={(page,size) =>changePage(page,size)}
          total={total}/>
        </div>
      </div>
    );
  }
  
  export default List;