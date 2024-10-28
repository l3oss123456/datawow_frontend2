import React from 'react'
import { TextField } from '@mui/material'
import inputStyles from './Input.module.scss'

interface InputNumberProps {
    label?: string
    variant?: 'standard' | 'filled' | 'outlined'
    value?: string
    className?: any
    onChange?: (value: string, event: any) => void
    onBlur?: (value: string) => void
    error?: boolean
    helperText?: string
    disabled?: boolean
    placeholder?: string
    min?: number
    max?: number
}

const InputNumber: React.FunctionComponent<InputNumberProps> = ({
    label = '',
    variant = 'outlined',
    value = '',
    className = null,
    onChange = () => {},
    onBlur = () => {},
    error = false,
    helperText,
    disabled = false,
    placeholder = '',
    min = 0,
    max = null
}) => {
    return (
        <div className={inputStyles.container}>
            <div
                className={inputStyles.label_container}
                style={{ '--bg-color': 'red' } as any}
            >
                <p>{label}</p>
            </div>

            <TextField
                size={'small'}
                // type={'number'}
                type={'text'}
                inputProps={{
                    min: min,
                    max: max,
                    inputMode: 'decimal',
                    pattern: '[0-9]*[.,]?[0-9]+'
                }}
                className={className}
                placeholder={placeholder}
                value={value}
                variant={disabled === false ? variant : 'filled'}
                disabled={disabled}
                onChange={(e) => {
                    let newValue = e.target.value
                    if (
                        newValue.startsWith('0') &&
                        newValue.length > 1 &&
                        newValue[1] !== '.'
                    ) {
                        newValue = newValue.slice(1)
                    }

                    if (/^\d*\.?\d*$/.test(newValue)) {
                        onChange(newValue, e)
                    }
                }}
                onBlur={(e) => {
                    onBlur(e.target.value)
                }}
                error={error}
                helperText={helperText}
                style={{ borderBottom: 0 }}
            />
        </div>
    )
}

export default InputNumber
