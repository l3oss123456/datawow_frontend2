import { RegisterOptions } from 'react-hook-form'
import { IOptions } from './input.interface'
import { SxProps } from '@mui/material'

export interface IFormInfo {
    name: string
    field_type:
        | 'text'
        | 'textArea'
        | 'number'
        | 'password'
        | 'uploadImage'
        | 'datePicker'
        | 'radio'
        | 'select'
        | 'autoComplete'
        | 'email'
        | 'selectDropdown'
    field_label?: string
    disabledLabel?: boolean
    variant?: 'standard' | 'filled' | 'outlined'
    avatarVariant?: 'circular' | 'rounded' | 'square'
    avatarDefaultImage?: string
    disabledVariant?: 'standard' | 'filled' | 'outlined'
    disabled?: boolean
    disabledPreviousDate?: boolean
    placeholder?: string
    value?: string | number | boolean | null
    defaultValue?: string | number | boolean
    rules?: FieldValidationRules
    dateFormat?: string
    radioDisplayType?: 'row' | 'column'
    options?: IOptions[]
    min?: number
    max?: number
    rows?: number
    error?: boolean
    removeBorder?: boolean
    helperText?: string | null
    disabledOptions?: (string | number)[]
    onBlur?: ({ value }: { value?: any }) => void
    onChange?: ({
        value,
        e,
        blobUrl,
        file
    }: {
        value?: any
        e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        blobUrl?: any
        file?: File
    }) => void
    className?: any
    maxTextLength?: number
    formContainerDirection?: 'column' | 'row'
    labelContainerWidth?: string
    customFont?: React.CSSProperties
    disabledCharCount?: boolean
    sx?: SxProps
}

export type FieldValidationRules = Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>
