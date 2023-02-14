import { useRef, useState } from 'react';
import { Input, Button, Table, Tag, Modal, Form, Tooltip } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Svg } from '@/components'
import EditIcon from '@/assets/ESM@iconset_Edit.svg'
import DelectIcon from '@/assets/ESM@iconset_Delete.svg'
import InfoIcon from '@/assets/ESM@iconset_info2.svg'
import './index.less'

const dataSource = [
  {
    key: '1',
    clientName: 'Worker Training',
    boardName: 'Admin Supports',
    tags: 'Story',
    requestor: 'Kleven Yu'
  },
  {
    key: '2',
    clientName: 'Order Profile Maintain',
    boardName: 'One Tools',
    tags: 'Onescr',
    requestor: 'Colin Xiao'
  },
  {
    key: '3',
    clientName: 'China Tools Enhancement',
    boardName: 'China Tools Enhancement',
    tags: '',
    requestor: 'Mark Zhu'
  },
  {
    key: '4',
    clientName: 'Hyve - Commercial lnvoice',
    boardName: 'Hyve - Commercial lnvoice',
    tags: 'KwO 4.11,AODA/WCAG',
    requestor: 'Elsa Li'
  },
  {
    key: '5',
    clientName: 'VOB Process Route',
    boardName: 'MyCIs - WebQuote',
    tags: '',
    requestor: 'Jaden Cheng'
  },
  {
    key: '6',
    clientName: 'ORM CVS Review',
    boardName: 'ORM feedback',
    tags: 'Summary',
    requestor: 'Rick Hua'
  }
];

export default function SDKManagement () {
  const [ data, setData ] = useState(dataSource)
  const [ filter, setFilter ] = useState('')
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const formRef = useRef(null)

  const renderColumns = (column, text, record, index) => {
    switch (column) {
      case 'tags': {
        return (
          <>
            {
              text !== '' && text.split(',').map(value => (
                <Tag
                  key={value}
                  color="#eaebec"
                  style={{
                    color: '#000000'
                  }}
                >
                  {value}
                </Tag>
              ))
            }
          </>
        )
      }
      case 'SDKScript': {
        return (
          <Button type="link" style={{color: '#3561f4'}}>&lt;/&gt; SDK</Button>
        )
      }
      case 'actions': {
        return (
          <div>
            <Svg src={EditIcon} />
            <Svg src={DelectIcon} />
          </div>
        )
      }
    }
  }

  const handleOpenCreateSDK = () => {
    setIsModalOpen(true);
  }

  const handleSubmit = () => {
    formRef.current.validateFields().then(formData => {
      formData.key = Math.random().toString()
      if (formData.tags === void 0) {
        formData.tags = ''
      }
      setData(data.concat(formData))
      setIsModalOpen(false);
      formRef.current.resetFields()
    })
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    formRef.current.resetFields()
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const getData = () => {
    const res = []
    const keys = ['clientName', 'boardName', 'tags', 'requestor']
    data.forEach(item => {
      for (let i = 0; i < keys.length; i++) {
        const value = item[keys[i]].toLowerCase()
        if (value.includes(filter.toLowerCase())) {
          res.push(item)
          break
        }
      }
    })

    return res
  }

  const columns = [
    {
      title: 'Client name',
      dataIndex: 'clientName',
      key: 'clientName',
    },
    {
      title: 'Board name',
      dataIndex: 'boardName',
      key: 'boardName',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: renderColumns.bind(null, 'tags')
    },
    {
      title: 'Requestor',
      dataIndex: 'requestor',
      key: 'requestor',
    },
    {
      title: 'SDK script',
      dataIndex: 'SDKScript',
      key: 'SDKScript',
      render: renderColumns.bind(null, 'SDKScript')
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: renderColumns.bind(null, 'actions')
    }
  ];

  const tableData = getData()

  return (
    <div className="sdk-management">
      <div className='sdk-management-header'>
        <div className='sdk-management-title'>SDK Management</div>
        <div className='sdk-management-search'>
          <Input
            value={filter}
            placeholder="Search client name, board name, tags, requestor"
            prefix={<SearchOutlined />}
            onChange={handleFilterChange}
          />
          <Button icon={<PlusOutlined />} onClick={handleOpenCreateSDK}>
            Create SDK
          </Button>
          <Modal
            title="Create SDK"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
              <Button type="link" key="cancel" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleSubmit}>
                Submit
              </Button>,
            ]}
          >
            <Form
              layout="vertical"
              ref={formRef}
            >
              <Form.Item label="Client name:" name='clientName' rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Board:" name='boardName' rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label={<Tooltip title='英文逗号分隔'>Tags<Svg src={InfoIcon} />:</Tooltip>} name='tags'>
                <Input />
              </Form.Item>
              <Form.Item label="Requestor:" name='requestor' rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
      <div className='sdk-management-main'>
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={false}
          footer={() => (
            `Total: ${tableData.length}`
          )}
        />
      </div>
    </div>
  )
}