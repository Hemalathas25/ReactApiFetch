import React, { useEffect, useState } from 'react';
import { 
  Layout,
  Menu,
  Dropdown,
  Spin,
  Alert,
  Button,
  Typography
} from 'antd';

const { Header } = Layout;
const { Title } = Typography;

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments');
      if (!response.ok) {
        throw new Error('Network response was not on.');
      }
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  /**
   *  const menu = (
    <Menu>
      {data.map(item => (
        <Menu.Item key={item.id}>{item.email}</Menu.Item>
      ))}
    </Menu>
  );
  */

  const menu = (
    <Menu>
      {data.map(item => (
        <Menu.Item key={item.id}>
          <div>
            <strong>Name:</strong> {item.name}<br />
            <strong>Email:</strong> {item.email}<br />
            <strong>User ID:</strong> {item.postId}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
   /**  <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {data.map ((item) => (
            <li key={item.id}>{item.email}</li>
          ))}
        </ul>
      ) }
    </div> */

    <Layout>
        <Header
          style={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between' 
          }}>

        <Title 
          level={3}
          style={{ 
            color: 'white',
            margin: 0 
          }}
        >User Information</Title>

        {loading ? (
          <Spin size='large' />
        ) : error ? (
          <Alert message="Error" description={error} type="error" />
        ) : (
         <Dropdown overlay={menu} trigger={['click']}>
          <Button style={{ marginLeft: '16px '}}>
            Select user info<span>▼</span>
          </Button>
         </Dropdown>
        )}
      </Header>
    </Layout>
  )
};

export default DataFetcher;