import { useState } from 'react';
import axios from 'axios';

function GetConfigData() {
    const [configId, setConfigId] = useState('');
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/configurations/${configId}`);
            setData(response.data);
            setConfigId("")
            setErrorMessage('');
        } catch (error) {
            console.error('Error fetching data:', error);
            setErrorMessage('No data for this config id.');
        }
    };

    return (
        <div>
            <h1>Fetch Config</h1>
            <div>
                <label>
                    config to load Config ID: {" "}
                    <input type="text" value={configId} onChange={(e) => setConfigId(e.target.value)} />
                </label>
                <button onClick={fetchData}>Submit</button>
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div>
                <h2>result for {configId} is : </h2>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </div>
    );
}

export default GetConfigData;
