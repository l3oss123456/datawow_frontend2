import React, { useMemo, useState } from 'react'
import * as R from 'ramda'
import {
    Radio as RadioMui,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormHelperText
} from '@mui/material'
import inputStyles from './Input.module.scss'
import { IOptions } from '../../interfaces/input.interface'

interface InputRadioProps {
    label?: string
    value?: string | number
    options?: IOptions[]
    displayType?: 'row' | 'column'
    className?: any
    onChange?: (value: string, event: any) => void
    // onBlur?: (value: string) => void
    error?: boolean
    helperText?: string
    disabled?: boolean
}

const InputRadio: React.FunctionComponent<InputRadioProps> = ({
    label = '',
    displayType = 'row',
    className = null,
    onChange = () => {},
    // onBlur = () => {},
    value = null,
    options = [],
    error = false,
    helperText,
    disabled = false
}) => {
    const [radioOptions, setRadioOptions] = useState<any[]>([])

    useMemo(() => {
        createRadioOption()
    }, [options])

    function createRadioOption() {
        if (!R.isNil(options) && !R.isEmpty(options)) {
            setRadioOptions(
                options.map((option) => {
                    return (
                        <FormControlLabel
                            value={option.value}
                            control={<RadioMui disabled={disabled} />}
                            label={option.label}
                        />
                    )
                })
            )
        }
    }

    return (
        <div
            className={inputStyles.container}
            style={
                {
                    '--align-items':
                        displayType === 'column' ? 'flex-start' : 'center'
                } as any
            }
        >
            <div className={inputStyles.label_container}>
                <p>{label}</p>
            </div>

            <FormControl
                className={className}
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
                error={error}
            >
                <RadioGroup
                    className={className}
                    row={displayType === 'row' ? true : false}
                    value={value}
                    onChange={(event: any) => {
                        onChange(event.target.value, event)
                    }}
                >
                    {!R.isEmpty(radioOptions) ? radioOptions : null}
                </RadioGroup>

                <FormHelperText>{helperText ? helperText : ''}</FormHelperText>
            </FormControl>
        </div>
    )
}

export default InputRadio
