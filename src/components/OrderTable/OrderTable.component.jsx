import React, {useState, useEffect} from 'react'
import { Table, Empty } from 'antd'
import moment from 'moment'

const OrderTableComponent = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      fetch(`http://localhost:3000/order`, {
      method: 'GET',
      headers: {'Content-type': 'application/json; charset=UTF-8'}
      }).then(response => {
        return response.json()
      }).then(result => {
        console.log(result)
        setData(result)
        setTimeout(getData, 3000) //recall API after 3s
      })
    }
    getData()
  }, [])

  const columns = [
		{
			title: 'STT',
			dataIndex: 'index',
			key: 'index',
			width: '5%',
			align: 'center',
			render: (text, record) => data.indexOf(record) + 1,
		},
		{
			title: 'Chi tiết',
			dataIndex: 'orderLineArray',
			key: 'orderLineArray:',
			align: 'left',
      width: '40%',
      render: (orderLineArray) => (
        orderLineArray.map((orderLine) => (
          <>
            <span>{orderLine.product.title}</span>
            {' ('}
            {orderLine.optionArray.map((option, index, optionArray) => <span>
              {' ' + option.title + (index !== (optionArray.length - 1) ? ', ' : ' ')}
            </span>)}
            {')'}
            <br/>
          </>
        ))
      )
		},
		{
			title: 'Người đặt',
			dataIndex: 'user',
			key: 'user',
			align: 'left',
      width: '20%',
      render: (user) => <span>{user.name}<br/>{user.address}<br/>{user.phone}</span>
		},
		{
			title: 'Người nhận',
			dataIndex: 'receiver',
			key: 'receiver',
			align: 'left',
      width: '20%',
      render: (receiver, record) => <span>{record.name}<br/>{record.address}<br/>{record.phone}</span>
		},
		{
			title: 'Ghi chú',
			dataIndex: 'note',
			key: 'note',
			width: '10%',
			align: 'left',
		},
		{
			title: 'Thời gian',
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: '5%',
			align: 'center',
			render: (createdAt) => <span>{moment(createdAt).format('DD/MM/YYYY HH:mm:ss')}</span>,
		},
	];

  return (
    <div className="order-table">
      <Table
				columns={columns}
				dataSource={data}
				bordered
				pagination={false}
				locale={{
					emptyText: (
						<Empty
							image={Empty.PRESENTED_IMAGE_SIMPLE}
							description="Không có dữ liệu"
						/>
					),
				}}
			/>
    </div>
  );
}

export default OrderTableComponent;
