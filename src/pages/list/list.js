import React, { useEffect, useState } from 'react'
import { Input,Button,Table,Pagination,Modal,Select,message  } from 'antd';
import {listApi} from '../../api/list'
import {conversionTime} from '../../utils/time'
import '../../assets/css/list.css'
  function List() {
    const [searchName, setSearchName] = useState('');
    const [tableData, setTableData] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);
    const [addVisible, setAddVisible] = useState(false);
    const [delVisible, setDelVisible] = useState(false);
    const [addVisibleStatus, setAddVisibleStatus] = useState(true);
    const [modalGoodName, setModalGoodName] = useState('');
    const [modalGoodProid, setModalGoodProid] = useState('');
    const [modalGoodStock, setModalGoodStock] = useState(0);
    const [modalGoodStatus, setModalGoodStatus] = useState(0);
    const [modalGoodid, setModalGoodid] = useState('');
    const [ModalLoading, setModalLoading] = useState(false);
    const [delModalLoading, setDelModalLoading] = useState(false);
    useEffect(() => {
      // console.log('商品列表页面')
      getGoodList()
    }, [page,pageSize]);
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
      render: (text,record) => (
        <span>{conversionTime(text)}</span>
      ),
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
        <div>
          <span className='curp' style={{color:'#1890ff'}} onClick={()=>openEditModal(record)}>编辑</span>
          <span className='curp' style={{color:'red',marginLeft:'10px'}} onClick={()=>openDelModal(record)}>删除</span>
        </div>
      ),
    }];
    const Option = Select.Option;
    const rowSelection = {
      onChange(selectedRowKeys, selectedRows) {
        // console.log("选中的key值:",selectedRowKeys, "选中的数据: ", selectedRows);
        setSelectedKeys(selectedRowKeys)
      },
    };
    function changePage(page,size) {
      setPage(page)
      setPageSize(size)
    }
    function getGoodList() {
      let data = {page,pageSize,searchName}
      listApi.getGoodList(data)
      .then(res=>{
        let {code,msg,data} = res;
        if (code === 1) {
          setTableData(data.list)
          setTotal(data.total)
        } else {
          message.error(msg);
        }
      })
    }
    //刷新
    function refresh() {
      setSearchName('')
      if (page === 1) {
        getGoodList()
      } else {
        setPage(1)
      }
    }
    function goSearch() {
      if (page === 1) {
        getGoodList()
      } else {
        setPage(1)
      }
    }
    function addModalOk() {
      setModalLoading(true)
      if (checkData()) {
        let data = {
          name:modalGoodName,
          stock:modalGoodStock,
          proid:modalGoodProid
        }
        if (addVisibleStatus) {
          listApi.addNewGood(data)
          .then(res=>{
            let {code,msg} = res;
            if (code === 1) {
              setPage(1)
              message.success(msg);
              setAddVisible(false)
             
            } else {
              message.error(msg);
            }
          })
          .finally(res=>{
            setModalLoading(false)
            // getGoodList()
          })
        } else {
          data.status = modalGoodStatus;
          data.id = modalGoodid;
          listApi.editGood(data)
          .then(res=>{
            let {code,msg} = res;
            if (code === 1) {
              setPage(1)
              message.success(msg);
              setAddVisible(false)
            } else {
              message.error(msg);
            }
          })
          .finally(res=>{
            setModalLoading(false)
          })
        }
      }
    }
    function delModalOk() {
      setDelModalLoading(true)
      const data = {
        id:modalGoodid,
      }
      listApi.delGood(data)
      .then(res=>{
        console.log(res)
        let {code,msg} = res;
        if (code === 1) {
          setPage(1)
          message.success(msg);
          setDelVisible(false)
        } else {
          message.error(msg);
        }
      })
      .finally(res=>{
        setDelModalLoading(false)
      })
    }
    //校验参数
    function checkData() {
      if (modalGoodName === '') {
        message.error('请输入商品名称');
        return false
      } else if(modalGoodProid === '') {
        message.error('请输入商品编号');
        return false
      } else if(modalGoodStock === '') {
        message.error('请输入商品库存');
        return false
      } else if(!addVisibleStatus) {
        if (modalGoodStatus === '') {
          message.error('请选择商品状态');
          return false
        }
      }
      return true
    }
    //打开删除弹窗
    function openDelModal(data) {
      setModalGoodid(data.id)
      setDelVisible(true)
    }
    //打开编辑弹窗
    function openEditModal(data) {
      // console.log(data)
      setAddVisibleStatus(false)
      setModalGoodid(data.id)
      setModalGoodName(data.name)
      setModalGoodStock(data.stock)
      setModalGoodProid(data.proid)
      setModalGoodStatus(data.status)
      setAddVisible(true)
    }
    //打开添加弹窗
    function openVisible() {
      setAddVisibleStatus(true)
      setModalGoodName('')
      setModalGoodProid('')
      setModalGoodStock(1)
      setModalGoodStatus(0)
      setAddVisible(true)
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
            <Button type="primary" onClick={goSearch} style={{marginRight:'10px'}}>搜索</Button>
            <Button type="primary" onClick={refresh} style={{marginRight:'10px'}}>刷新</Button>
            <Button type="primary" onClick={()=>openVisible()} >添加</Button>
          </div>
        </div>
        <Table  pagination={false} rowKey={record => record.proid} 
        selectedKeys={selectedKeys}  rowSelection={rowSelection} 
        columns={columns} dataSource={tableData} />
        <div className="listPage">
          <Pagination current={page} pageSize={pageSize} 
          showTotal={total => `商品总数：${total}`}
          pageSizeOptions={[1,2,3]} 
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
          onCancel={()=>setAddVisible(false)}
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
              <p className="modalLabel">商品编号：</p>
              <div className="modalVal">
                <Input placeholder="请输入商品编号"
                  value={modalGoodProid}
                  onChange={e=>setModalGoodProid(e.target.value)}/>
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
            <div className="modalItem" style={{display:addVisibleStatus ? 'none' : 'flex'}}>
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
        <Modal
          title="警告" 
          cancelText="取消"
          okText="确认"
          visible={delVisible}
          onOk={delModalOk}
          onCancel={()=>setDelVisible(false)}
          confirmLoading={delModalLoading}
        >
          <p style={{fontSize:'17px'}}>确定删除该商品吗？</p>
        </Modal>
      </div>
    );
  }
  
  export default List;