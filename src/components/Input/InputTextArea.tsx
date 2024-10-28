import React, { useEffect, useState } from 'react'
import * as R from 'ramda'
import { FormHelperText, TextField } from '@mui/material'
import inputStyles from './Input.module.scss'

interface InputTextAreaProps {
    label?: string
    variant?: 'standard' | 'filled' | 'outlined'
    value?: string
    className?: any
    onChange?: (
        value: string,
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void
    onBlur?: (value: string) => void
    error?: boolean
    helperText?: string
    disabled?: boolean
    placeholder?: string
    multiline?: boolean // Add multiline prop
    rows?: number // Add rows prop
    removeBorder?: boolean
    maxTextLength?: number
    formContainerDirection?: 'column' | 'row'
    labelContainerWidth?: string
    disabledCharCount?: boolean
}

const InputTextArea: React.FunctionComponent<InputTextAreaProps> = ({
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
    // multiline = false,
    rows = 6,
    removeBorder = false,
    maxTextLength = 100,
    formContainerDirection = 'column',
    labelContainerWidth = 'auto',
    disabledCharCount = false
}) => {
    const [charCount, setCharCount] = useState<number>(0)

    useEffect(() => {
        if (!R.isNil(value) && !R.isEmpty(value)) {
            setCharCount(value.length)
        }
    }, [value])

    return (
        <div
            // className={inputStyles.container}
            className={
                formContainerDirection === 'column'
                    ? inputStyles.container
                    : inputStyles.row_direction_container
            }
            style={{
                position: 'relative'
                // width: "100%"
            }}
        >
            <div
                className={inputStyles.label_container}
                style={
                    { '--bg-color': 'red', width: labelContainerWidth } as any
                }
            >
                <p>{label}</p>
            </div>

            <TextField
                className={className}
                multiline
                rows={rows}
                placeholder={placeholder}
                value={value}
                // variant={disabled === false ? variant : 'filled'}
                variant={variant}
                disabled={disabled}
                onChange={(e) => {
                    if (disabledCharCount === false) {
                        if (e.target.value.length <= maxTextLength) {
                            onChange(e.target.value, e)
                            setCharCount(e.target.value.length)
                        }
                    } else {
                        onChange(e.target.value, e)
                    }
                }}
                onBlur={(e) => {
                    onBlur(e.target.value)
                }}
                error={error}
                helperText={helperText}
                style={{
                    borderBottom: 0
                    // width: "100%",
                }}
                sx={{
                    '& .MuiInputBase-root': {
                        color: '#525252',
                        fontSize: 14
                    },
                    '& fieldset': {
                        border: removeBorder === true ? 'none' : null
                    },
                    width: '100%'
                }}
            />

            {disabledCharCount === false ? (
                <FormHelperText
                    style={{
                        position: 'absolute',
                        right: '8px',
                        bottom: error === false ? '8px' : '28px',
                        margin: 0,
                        padding: 0
                    }}
                >
                    {`${charCount} / ${maxTextLength}`}
                </FormHelperText>
            ) : null}
        </div>
    )
}

export default InputTextArea
