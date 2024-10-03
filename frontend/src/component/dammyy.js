import React, { useEffect, useState } from 'react';
import { 
  Layout,
  Spin,
  Alert,
  Button,
  Typography,
  Select,
} from 'antd';

const { Header } = Layout;
const { Title } = Typography;
const { Option } = Select;

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('names');
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments');
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const renderOptions = () => {
    return data.map(item => (
      <Option key={item.id} value={view === 'names' ? item.name : item.email}>
        {view === 'names' ? item.name : item.email}
      </Option>
    ));
  };

  return (
    <Layout>
      <Header
        style={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between' 
        }}
      >
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
          <>
            <Select 
              defaultValue="names" 
              style={{ width: 120 }} 
              onChange={handleSelectChange}
              onSelect={handleSelectChange} // Handle selection change
            >
              <Option value="names">Names</Option>
              <Option value="emails">Emails</Option>
            </Select>

            <Select 
              style={{ width: 200, marginLeft: '16px' }} 
              placeholder={`Select ${view}`} 
              onChange={setSelectedValue}
            >
              {renderOptions()}
            </Select>

            {selectedValue && (
              <div style={{ marginLeft: '16px', color: 'blue', fontWeight: 'bold' }}>
                Selected: {selectedValue}
              </div>
            )}
          </>
        )}
      </Header>
    </Layout>
  );
};

export default DataFetcher;


/** 
import React, { useEffect, useState } from 'react';
import { 
  Layout,
  Spin,
  Alert,
  Button,
  Typography,
  Select
} from 'antd';

const { Header } = Layout;
const { Title } = Typography;
const { Option } = Select;

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('names');
  const [selectedValue, setSelectedValue] = useState(null);

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

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  }

  const renderOptions = () => {
    return data.map(item => (
      <Option key={item.id} value={view === 'names' ? item.name : item.email}>
        {view === 'names' ? item.name : item.email}
      </Option>
    ))
  }
  return (
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
          <>
            <Select 
            defaultValue="names" 
            style={{ width:120 }} 
            onChange={handleSelectChange}
            onSelect={handleSelectChange}
            >
            <Option value="names">Names</Option>
            <Option value="emails">Emails</Option>
            </Select>

            <Select 
            style={{ width:200, marginLeft: '16px' }}
            placeholder={`Select ${view}`}
            onChange={setSelectedValue}
            >
              {renderOptions()}
            </Select>

            {selectedValue && (
              <div style={{ marginLeft: '16px', color: 'blue', fontWeight: 'bold'}}>
                Selected: {selectedValue}
              </div>
            )}
        </>
        )}
      </Header>
    </Layout>
  )
};

export default DataFetcher; */