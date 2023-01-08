import React from 'react'

function FormRowSelect({name, labelText, handleChange, value, options}) {
return (
    <div className='form-row'>
        <label htmlFor={name} className='form-label'>
        {labelText || name}
        </label>
        <select className='form-select' name={name} onChange={handleChange} id={name} value={value}>
        {options.map((itemValue, index) => {
        return (
            <option key={index} value={itemValue}>
                {itemValue}
            </option>
        );
        })}
        </select>
    </div>
    )
}


export default FormRowSelect