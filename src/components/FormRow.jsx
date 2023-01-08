import React from 'react'

function FormRow({name, labelText, type, value, handleChange}) {
  return (
    <div className='form-row'>
    <label htmlFor={name} className='form-label'>{labelText || name}</label>
    <input type={type} name={name} className='form-input' value={value} onChange={handleChange} />
  </div>
  )
}

export default FormRow;