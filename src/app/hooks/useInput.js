'use client'
import { useState } from "react"

/**여러개의 Input제어*/
const useInput = (defaultValue) => {
    const [value, setValue] = useState(defaultValue)
    const onChange = e => {
        const {value} = {...e.target}
        setValue(value)
    }

    return{value, onChange}
}

export default useInput