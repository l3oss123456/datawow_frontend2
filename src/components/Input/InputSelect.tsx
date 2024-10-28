import React, { useEffect, useState } from 'react'
import {
    Autocomplete,
    FormControl,
    FormHelperText,
    SxProps,
    TextField
} from '@mui/material'
import * as R from 'ramda'
import { IOptions } from '../../interfaces/input.interface'
import inputStyles from './Input.module.scss'

interface InputSelectProps {
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

const InputSelect: React.FunctionComponent<InputSelectProps> = ({
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
    const [selectedValue, setSelectedValue] = useState<IOptions | null>({
        value: '',
        label: ''
    })

    useEffect(() => {
        if (
            !R.isNil(value) &&
            !R.isEmpty(value) &&
            !R.isNil(options) &&
            !R.isEmpty(options)
        ) {
            const _selectedValue = options.find((e) => e.value === value)
            if (!R.isNil(_selectedValue)) {
                setSelectedValue(_selectedValue)
            }
        } else {
            setSelectedValue({
                value: '',
                label: ''
            })
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
            {disabledLabel === false ? (
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
            ) : null}

            <FormControl className={className} error={error}>
                <Autocomplete
                    size={'small'}
                    options={options}
                    value={selectedValue}
                    autoHighlight={true}
                    disabled={disabled}
                    onChange={(event, newValue) => {
                        if (newValue?.value) {
                            onChange(newValue.value, event)
                            setSelectedValue(newValue)
                        }
                    }}
                    getOptionDisabled={(option: IOptions) => {
                        return disabledOptions.includes(option?.value)
                    }}
                    renderInput={(params) => {
                        return (
                            <TextField
                                {...params}
                                variant={
                                    disabled === false
                                        ? variant
                                        : disabledVariant ?? 'filled'
                                }
                                placeholder={placeholder}
                                error={error}
                                onBlur={(
                                    e: React.FocusEvent<
                                        HTMLInputElement | HTMLTextAreaElement,
                                        Element
                                    >
                                ) => {
                                    console.log(e)
                                    onBlur({ value: selectedValue?.value })
                                }}
                                sx={sx}
                            />
                        )
                    }}
                />

                <FormHelperText
                    style={{
                        marginLeft: variant === 'standard' ? 0 : undefined
                    }}
                >
                    {helperText ? helperText : ''}
                </FormHelperText>
            </FormControl>
        </div>
    )
}

export default InputSelect
