import React, {useState, useEffect} from 'react'
import { Table, Empty } from 'antd'
import moment from 'moment'
import './OrderTable.scss'
import 'antd/es/table/style/css'

const OrderTableComponent = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      fetch('https://pizzaapp-pyco-intern-group5.herokuapp.com/order', {
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
			title: 'Order Number',
			dataIndex: 'index',
			key: 'index',
			width: '5%',
			align: 'center',
			render: (text, record) => data.indexOf(record) + 1,
		},
		{
			title: 'Details',
			dataIndex: 'orderLineArray',
			key: 'orderLineArray:',
			align: 'left',
      width: '35%',
      render: (orderLineArray) => (
        orderLineArray.map((orderLine) => (
          <>
            <big>{orderLine.product.title}</big>
						{orderLine.optionArray.length !== 0 ?
							<>
								{' ('}
            		{orderLine.optionArray.map((option, index, optionArray) =>
								<big>
              		{' ' + option.title + (index !== (optionArray.length - 1) ? ', ' : ' ')}
            		</big>)}
            		{')'}
							</> : null}
							&nbsp;- <big>{orderLine.quantity} Unit</big>
            <br/>
          </>
        ))
      )
		},
		{
			title: 'Total Price',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
			align: 'center',
			width: '5%',
			render: (totalPrice) => <big>{totalPrice}$</big>
		},
		{
			title: 'User',
			dataIndex: 'user',
			key: 'user',
			align: 'left',
      width: '20%',
      render: (user) => <span>
				<strong>Name: </strong>{user.name}
				<br/>
				<strong>Address: </strong>{user.address}
				<br/>
				<strong>Phone: </strong>{user.phone}
			</span>
		},
		{
			title: 'Receiver',
			dataIndex: 'receiver',
			key: 'receiver',
			align: 'left',
      width: '20%',
      render: (receiver, record) => <span>
				<strong>Name: </strong>{record.name}
				<br/>
				<strong>Address: </strong>{record.address}
				<br/>
				<strong>Phone: </strong>{record.phone}
			</span>
		},
		{
			title: 'Note',
			dataIndex: 'note',
			key: 'note',
			width: '10%',
			align: 'left',
		},
		{
			title: 'Time',
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: '5%',
			align: 'left',
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
							description="Empty data"
						/>
					),
				}}
			/>
    </div>
  );
}

export default OrderTableComponent;
