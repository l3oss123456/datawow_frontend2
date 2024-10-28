import React, { useState } from "react"
import { InputAdornment, TextField } from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"

interface InputSearchProps {
    label?: string
    placeholder?: string
    variant?: "standard" | "outlined" | "filled"
    autoFocus?: boolean
    disabled?: boolean
    size?: "small" | "medium"
    onChange?: (value: string) => void
    onPressEnter?: (value: string) => void
    className?: any
    value?: string
}

const InputSearch: React.FunctionComponent<InputSearchProps> = ({
    label = "",
    placeholder = "ค้นหา",
    variant = "outlined",
    autoFocus = false,
    disabled = false,
    size = "small",
    onChange = () => {},
    onPressEnter = () => {},
    className = null,
    value = "",
}) => {
    const [tempValue, setTempValue] = useState<string>(value)

    return (
        <TextField
            className={className}
            label={label}
            placeholder={placeholder}
            value={tempValue}
            variant={variant}
            autoFocus={autoFocus}
            disabled={disabled}
            size={size}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            onChange={(e) => {
                setTempValue(e.target.value)
                onChange(e.target.value)
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    onPressEnter(value)
                }
            }}
        />
    )
}

export default InputSearch
