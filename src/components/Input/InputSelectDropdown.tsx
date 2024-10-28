import React, { useEffect, useState } from 'react'
import {
    FormControl,
    FormHelperText,
    MenuItem,
    Select,
    SxProps,
    InputLabel
} from '@mui/material'
import * as R from 'ramda'
import { IOptions } from '../../interfaces/input.interface'
import inputStyles from './Input.module.scss'

interface InputSelectDropdownProps {
    label?: string
    disabledLabel?: boolean
    variant?: 'standard' | 'filled' | 'outlined'
    disabledVariant?: 'standard' | 'filled' | 'outlined'
    value?: string | number | boolean | null
    options?: IOptions[]
    className?: any
    onChange?: (value: string | number, event: any) => void
    onBlur?: (value: any) => void
    error?: boolean
    helperText?: string
    disabled?: boolean
    placeholder?: string
    disabledOptions?: (string | number)[]
    formContainerDirection?: 'column' | 'row'
    labelContainerWidth?: string
    sx?: SxProps
}

const InputSelectDropdown: React.FunctionComponent<
    InputSelectDropdownProps
> = ({
    label = '',
    disabledLabel = false,
    variant = 'outlined',
    disabledVariant,
    className = null,
    onChange = () => {},
    onBlur = () => {},
    value = null,
    options = [],
    error = false,
    helperText,
    disabled = false,
    placeholder = '',
    disabledOptions = [],
    formContainerDirection = 'column',
    labelContainerWidth = 'auto',
    sx = {}
}) => {
    const [selectedValue, setSelectedValue] = useState<string | number | ''>('')
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false)

    useEffect(() => {
        if (!R.isNil(value) && !R.isEmpty(value)) {
            setSelectedValue(value as string | number)
        } else {
            setSelectedValue('')
        }
    }, [value, options])

    return (
        <div
            className={
                formContainerDirection === 'column'
                    ? inputStyles.container
                    : inputStyles.row_direction_container
            }
        >
            {!disabledLabel && (
                <div
                    className={inputStyles.label_container}
                    style={
                        {
                            '--bg-color': 'red',
                            width: labelContainerWidth
                        } as any
                    }
                >
                    <p>{label}</p>
                </div>
            )}

            <FormControl className={className} error={error} fullWidth>
                {label && <InputLabel>{label}</InputLabel>}
                <Select
                    value={selectedValue ?? ''}
                    onChange={(event) => {
                        const newValue = event.target.value
                        setSelectedValue(newValue)
                        onChange(newValue, event)
                    }}
                    onBlur={(event) => {
                        onBlur({ value: selectedValue })
                    }}
                    disabled={disabled}
                    variant={disabled ? disabledVariant ?? 'filled' : variant}
                    displayEmpty
                    renderValue={(selected) =>
                        selected === '' ? placeholder : selected
                    }
                    sx={sx}
                    size="small"
                    onOpen={() => setIsSelectOpen(true)}
                    onClose={() => setIsSelectOpen(false)}
                >
                    {placeholder && isSelectOpen === false && value === '' ? (
                        <MenuItem value="" disabled hidden>
                            {placeholder}
                        </MenuItem>
                    ) : null}
                    {options.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            disabled={disabledOptions.includes(option.value)}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>

                <FormHelperText>{helperText ? helperText : ''}</FormHelperText>
            </FormControl>
        </div>
    )
}

export default InputSelectDropdown
