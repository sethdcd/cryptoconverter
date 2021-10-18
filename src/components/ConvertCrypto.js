import React, {useState, useEffect} from 'react';
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
    const [debouncedAmount, setDebouncedAmount] = useState(inputData);
       
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedAmount(inputData);
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        }

    }, [inputData]);

    useEffect(() => {
        const convertAPI = async () => {
            const {data} = await axios.get('http://api.coinlayer.com/live', {
                params: {
                    access_key: 'db5f64c6b27b92dea6c84e017f538c66',
                    symbols: selection.id
                }
            });
    
            setTotal(debouncedAmount / data.rates[selection.id]);
        }
        return convertAPI();    
    }, [debouncedAmount, selection]);

 
 
    return (
        <div className="ui centered grid">
            <div className="six wide column">
                <div className="ui segment">
                    <form className="ui form">
                        <InputForm
                            label="Enter an Amount"
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
                         
                        <h4>{`$${debouncedAmount} ${debouncedAmount === '1'  ? 'dollar' : 'dollars'} is worth ${total.toFixed(8)} ${selection.value}`}</h4>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ConvertCrypto;