import React from 'react';

const InputForm = ({label, inputType, inputData, updateData}) => {

    return(
        <div className="ui form" >
            <div className="field">
                <label>{label}</label>
                <input 
                    type={inputType}
                    onChange={(e) => {updateData(e.target.value)}}
                    value={inputData}
                />
            </div> 
        </div>
    );
};

export default InputForm;