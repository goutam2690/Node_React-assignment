import { useState } from 'react';
import axios from 'axios';
import './updateConfigData.css'

function UpdateConfigData() {
  const [configId, setConfigId] = useState('');
  const [remark, setRemark] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8080/api/configurations/${configId}`, { remark });
      setMessage(response.data.message);
      setConfigId("");
      setRemark("");
      setError('');
    } catch (error) {
      console.error('Error updating configuration:', error.response?.data);
      setMessage('');
      setError('Error updating configuration. Please check the console for more details.');
    }
  };

  return (
    <div>
      <h1>Update Configuration Remark</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Config ID:
          <input type="text" value={configId} onChange={(e) => setConfigId(e.target.value)} required />
        </label>
        <br /><br />
        <label>
          Remark:
          <textarea name='remark' value={remark} onChange={(e) => setRemark(e.target.value)} required />
        </label>
        <br /><br />
        <button type="submit">Submit</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default UpdateConfigData;
