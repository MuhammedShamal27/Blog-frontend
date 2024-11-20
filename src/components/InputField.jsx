import React from 'react'

const InputField = ({ label, id, type = "text", placeholder, value, onChange }) => {
  return (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        />
    </div>

  )
}

export default InputField