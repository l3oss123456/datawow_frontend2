import React, { useEffect, useState } from 'react'
import {
    Autocomplete,
    FormControl,
    FormHelperText,
    TextField
} from '@mui/material'
import * as R from 'ramda'
import { IOptions } from '../../interfaces/input.interface'
import inputStyles from './Input.module.scss'

interface InputAutoCompleteProps {
    label?: string
    variant?: 'standard' | 'filled' | 'outlined'
    value?: string
    options?: IOptions[]
    className?: any
    onChange?: (value: string | number, event: any) => void
    onBlur?: (value: any) => void
    error?: boolean
    helperText?: string
    disabled?: boolean
    placeholder?: string
    disabledOptions?: (string | number)[]
    min?: number
    max?: number
}

const InputAutoComplete: React.FunctionComponent<InputAutoCompleteProps> = ({
    label = '',
    variant = 'outlined',
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
    min = 0,
    max = null
}) => {
    console.log(min, max)
    const [selectedValue, setSelectedValue] = useState<string>('')

    useEffect(() => {
        if (
            !R.isNil(value) &&
            !R.isEmpty(value) &&
            !R.isNil(options) &&
            !R.isEmpty(options)
        ) {
            const _selectedValue = options.find((e) => e.value === value)

            if (!R.isNil(_selectedValue)) {
                setSelectedValue(_selectedValue.value.toString())
            } else {
                setSelectedValue(value)
            }
        } else {
            setSelectedValue('')
        }
    }, [value, options])

    return (
        <div className={inputStyles.container}>
            <div className={inputStyles.label_container}>
                <p>{label}</p>
            </div>
            <FormControl className={className} error={error}>
                <Autocomplete
                    size={'small'}
                    options={options}
                    value={selectedValue}
                    freeSolo={true}
                    autoHighlight={true}
                    disabled={disabled}
                    onChange={(event, newValue) => {
                        let _newValue = ''

                        if (typeof newValue === 'string') {
                            _newValue = newValue
                        } else {
                            _newValue =
                                newValue?.value !== undefined
                                    ? typeof newValue?.value !== 'number'
                                        ? newValue?.value
                                        : newValue?.value.toString()
                                    : ''
                        }
                        onChange(_newValue, event)
                        setSelectedValue(_newValue)
                    }}
                    getOptionDisabled={(option: IOptions) => {
                        return disabledOptions.includes(option?.value)
                    }}
                    renderInput={(params) => {
                        return (
                            <TextField
                                {...params}
                                // type={'number'}
                                // inputProps={{
                                //     min: min,
                                //     max: max
                                // }}
                                onChange={(e) => {
                                    onChange(e.target.value, e)
                                }}
                                variant={
                                    disabled === false ? variant : 'filled'
                                }
                                placeholder={placeholder}
                                error={error}
                                onBlur={(
                                    e: React.FocusEvent<
                                        HTMLInputElement | HTMLTextAreaElement,
                                        Element
                                    >
                                ) => {
                                    onBlur(e.target.value)
                                }}
                            />
                        )
                    }}
                />

                <FormHelperText>{helperText ? helperText : ''}</FormHelperText>
            </FormControl>
        </div>
    )
}

export default InputAutoComplete
