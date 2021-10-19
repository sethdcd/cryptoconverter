import React, {useState, useEffect} from 'react';
import InputForm from './InputForm';
import Dropdown from './Dropdown';
import '../css/ConvertCrypto.css'
import axios from 'axios';

const currency = [
    {
        id: 'USD',
        value: 'US Dollar'
    },
    {
        id: 'EUR',
        value: 'Euro'
    },
    {
        id: 'JPY',
        value: 'Yen'
    },
    {
        id: 'GBP',
        value: 'British Pound'
    },
];

const crypto = [
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
    const [currencySymbol, setCurrencySymbol] = useState(currency[0]);
    const [cryptoSymbol, setCryptoSymbol] = useState(crypto[0]);
    const [inputData, setInputData] = useState(0);
    const [total, setTotal] = useState(0);
    const [debouncedAmount, setDebouncedAmount] = useState(inputData);
       
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedAmount(inputData);
        }, 750);

        return () => {
            clearTimeout(timeoutId);
        }

    }, [inputData]);

    useEffect(() => {
        const convertAPI = async () => {
            const {data} = await axios.get('http://api.coinlayer.com/live', {
                params: {
                    access_key: 'db5f64c6b27b92dea6c84e017f538c66',
                    target: currencySymbol.id,
                    symbols: cryptoSymbol.id
                }
            });

            console.log(data);

            setTotal(debouncedAmount / data.rates[cryptoSymbol.id]);
        }
        return convertAPI();    
    }, [debouncedAmount, currencySymbol, cryptoSymbol]);
 
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
                            label="Convert From"
                            options={currency}
                            selection={currencySymbol}    
                            updateSelection={setCurrencySymbol}
                        />

                        <Dropdown 
                            label="Convert To"
                            options={crypto}
                            selection={cryptoSymbol}    
                            updateSelection={setCryptoSymbol}
                        />
                        <h4 className="converter-output">{`${debouncedAmount} ${currencySymbol.value}${debouncedAmount !== '1' && currencySymbol.id !== 'JPY' ? 's' : ''} is worth ${total.toFixed(8)} ${cryptoSymbol.value}`}</h4>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ConvertCrypto;