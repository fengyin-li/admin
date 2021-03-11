import React, { useEffect, useState } from 'react'
import { Input,Button,Table,Pagination,Modal,Select  } from 'antd';
import '../../assets/css/list.css'
  function List() {
    const [searchName, setSearchName] = useState('');
    const [tableData, setTableData] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [addVisible, setAddVisible] = useState(false);
    const [addVisibleStatus, setAddVisibleStatus] = useState(true);
    const [modalGoodName, setModalGoodName] = useState('');
    const [modalGoodStock, setModalGoodStock] = useState(0);
    const [modalGoodStatus, setModalGoodStatus] = useState(0);
    const [ModalLoading, setModalLoading] = useState(false);
    useEffect(() => {
      // console.log('商品列表页面')
      setTotal(31)
      setTableData([{proid:'001',name:'999感冒灵',stock:10,createTime:'2021-02-19 15:53:00',status:0},{proid:'002',name:'霍胆丸',stock:20,createTime:'2021-02-19 15:53:00',status:1}])
    }, []);
    
    const columns = [ {
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
      render: (text,record) => (
        <span>{text === 0 ? '正常' : text === 1 ? '上架':'异常'}</span>
      ),
    }, {
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => (
        <span className='curp' style={{color:'#1890ff'}} onClick={()=>openEditModal(record)}>编辑</span>
      ),
    }];
    const Option = Select.Option;
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
    function addModalOk() {
      setModalLoading(true)
      setTimeout(()=>{
        setAddVisible(false)
        setModalLoading(false)
      },2000)
    }
    //打开编辑弹窗
    function openEditModal(data) {
      // console.log(data)
      setAddVisibleStatus(false)
      setModalGoodName(data.name)
      setModalGoodStock(data.stock)
      setModalGoodStatus(data.status)
      setAddVisible(true)
    }
    //打开添加弹窗
    function openVisible() {
      setAddVisibleStatus(true)
      setModalGoodName('')
      setModalGoodStock(1)
      setModalGoodStatus(0)
      setAddVisible(true)
    }
    function addModalCancel(){
      setAddVisible(false)
    }
    function changeModalGoodStatus(val) {
      setModalGoodStatus(val)
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
          <div style={{display:'flex'}}>
            <Button type="primary" onClick={()=>openVisible()} style={{marginRight:'10px'}}>添加</Button>
            <Button type="primary">搜索</Button>
          </div>
        </div>
        <Table  pagination={false} rowKey={record => record.proid} 
        selectedKeys={selectedKeys}  rowSelection={rowSelection} 
        columns={columns} dataSource={tableData} />
        <div className="listPage">
          <Pagination current={page} pageSize={pageSize} 
          showTotal={total => `总商品：${total}`}
          pageSizeOptions={[10,15,20]} 
          showSizeChanger={true}
          onChange={(page,size) =>changePage(page,size)}
          total={total}/>
        </div>
        <Modal
          title={addVisibleStatus ? "添加" : '编辑'} 
          cancelText="取消"
          okText="确认"
          visible={addVisible}
          onOk={addModalOk}
          onCancel={addModalCancel}
          confirmLoading={ModalLoading}
        >
          <div className="modalContainer">
            <div className="modalItem">
              <p className="modalLabel">商品名称：</p>
              <div className="modalVal">
                <Input placeholder="请输入商品名称"
                  value={modalGoodName}
                  onChange={e=>setModalGoodName(e.target.value)}/>
              </div>
              <p className="modalRequired">*</p>
            </div>
            <div className="modalItem">
              <p className="modalLabel">商品库存：</p>
              <div className="modalVal">
                <Input placeholder="请输入商品库存"
                  type="number"
                  value={modalGoodStock}
                  onChange={e=>setModalGoodStock(e.target.value)}/>
              </div>
              <p className="modalRequired">*</p>
            </div>
            <div className="modalItem">
              <p className="modalLabel">商品状态：</p>
              <div className="modalVal">
                <Select value={String(modalGoodStatus)} style={{ width: 200 }} onChange={changeModalGoodStatus}>
                  <Option value="0">正常</Option>
                  <Option value="1">上架</Option>
                </Select>
              </div>
              <p className="modalRequired">*</p>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
  
  export default List;