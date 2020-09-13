import React from 'react'

function Select({onChangeHandle, intialOptionValue, arrayToMap, optionValueProperty, optionPreviewProperty}) {
    return (
            <select onChange={e => onChangeHandle(e.target.value)}  disabled ={!arrayToMap.length}>
                    <option value=''>{intialOptionValue}</option>
                    {
                        arrayToMap.map(item => 
                            <option value={item[optionValueProperty]} key={item.id}>
                                {item[optionPreviewProperty]}
                            </option>
                        )
                    }   
                </select>
    )
}

export default Select
