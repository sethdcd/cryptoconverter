import React, {useState} from 'react';
import InputForm from './InputForm';
import Dropdown from './Dropdown';
import axios from 'axios';

const options = [
    {
        id: 'BTC',
        value: 'Bitcoin'
    },
    {
        id: 'ETH',
        value: 'Ethereum'
    },
    {
        id: 'ADA',
        value: 'Cardano'
    },
    {
        id: 'XRP',
        value: 'Ripple'
    },
];

const ConvertCrypto = () => {
    const [selection, setSelection] = useState(options[0]);
    const [inputData, setInputData] = useState(0);
    const [total, setTotal] = useState(0);
       

    const onFormSubmit = (e) => {
        e.preventDefault();

        const convertAPI = async () => {
            const {data} = await axios.get('http://api.coinlayer.com/live', {
                params: {
                    access_key: 'db5f64c6b27b92dea6c84e017f538c66',
                    symbols: selection.id
                }
            });

            setTotal(inputData / data.rates[selection.id]);
            
        }
        convertAPI();        
    }

    return (
        <div className="ui segment">
            <form className="ui form" onSubmit={onFormSubmit}>
                <InputForm
                    label="Enter a value"
                    inputType="number"
                    inputData={inputData}
                    updateData={setInputData}
                />
                <Dropdown 
                    label="Select Crypto Coin"
                    options={options}
                    selection={selection}    
                    updateSelection={setSelection}
                />
                <br />
                <button className="ui button" type="submit">Convert</button>   
                <h4>{`$${inputData} ${inputData == 1  ? 'dollar' : 'dollars'} is worth ${total.toFixed(8)} ${selection.value}`}</h4>
            </form>
        </div>
    );
};

export default ConvertCrypto;