import React, { useEffect } from 'react'
import * as R from 'ramda'
import { Controller } from 'react-hook-form'
import { IUseForm } from '../../interfaces/useForm.interface'
import Radio from '../Input/InputRadio'
import InputText from '../Input/InputText'
import InputSelect from '../Input/InputSelect'
import InputDatePicker from '../Input/InputDatePicker'
import InputUploadImage from '../Input/InputUploadImage'
import InputPassword from '../Input/InputPassword'
import { IFormInfo } from '../../interfaces/templateForms.interface'
import InputNumber from '../Input/InputNumber'
import InputTextArea from '../Input/InputTextArea'
import InputAutoComplete from '../Input/InputAutoComplete'
import InputEmail from '../Input/InputEmail'
import styles from './TemplateForm.module.scss'
import InputSelectDropdown from '../Input/InputSelectDropdown'

interface ITemplateFormProps {
    useForm: IUseForm
    form_info: IFormInfo
    index?: number
}

const TemplateForm: React.FunctionComponent<ITemplateFormProps> = ({
    useForm,
    form_info,
    index = null
}) => {
    const {
        control,
        formState: { errors },
        setValue,
        getValues,
        trigger
    } = useForm

    useEffect(() => {
        if (!R.isNil(useForm) && !R.isEmpty(useForm)) {
            if (form_info.value && !getValues(`${form_info.name}`)) {
                setValue(form_info.name, form_info.value)
            }
        }
    }, [])

    const renderFieldLabel = (form_info: any) => {
        const labelLength = form_info.field_label.length - 1
        const lastTextLabel = form_info.field_label[labelLength]

        const hasRequiredRule = form_info.rules && form_info.rules.required

        if (hasRequiredRule && lastTextLabel === '*') {
            const label = form_info.field_label.trim().split(/\s*\*\s*/)[0]

            return (
                <div style={{ display: 'flex' }}>
                    <div>{`${label}`}</div>
                    <div style={{ color: 'red', marginLeft: 5 }}>{'*'}</div>
                </div>
            )
        } else {
            return form_info.field_label
        }
    }

    if (!R.isNil(useForm) && !R.isEmpty(useForm)) {
        if (form_info.field_type === 'select') {
            return (
                <Controller
                    key={index}
                    name={form_info.name}
                    control={control}
                    rules={form_info.rules}
                    render={({ field }) => {
                        return (
                            <InputSelect
                                className={form_info.className ?? styles.field}
                                label={
                                    form_info.field_label
                                        ? renderFieldLabel(form_info)
                                        : null
                                }
                                disabledLabel={form_info.disabledLabel ?? false}
                                disabledVariant={form_info.disabledVariant}
                                variant={form_info.variant}
                                formContainerDirection={
                                    form_info.formContainerDirection ?? 'column'
                                }
                                labelContainerWidth={
                                    form_info.labelContainerWidth ?? 'auto'
                                }
                                placeholder={form_info.placeholder}
                                disabled={form_info.disabled ?? false}
                                disabledOptions={form_info.disabledOptions}
                                onChange={(
                                    value: string | number,
                                    e: React.ChangeEvent<
                                        HTMLInputElement | HTMLTextAreaElement
                                    >
                                ) => {
                                    console.log(e)
                                    // field.onChange(e)
                                    setValue(form_info.name, value)

                                    if (!R.isNil(form_info.onChange)) {
                                        form_info.onChange({ value })
                                    }
                                }}
                                onBlur={async (value: string | number) => {
                                    field.onBlur()

                                    if (!R.isNil(form_info.onBlur)) {
                                        form_info.onBlur({ value })
                                    }
                                    if (!R.isNil(trigger)) {
                                        trigger(form_info.name)
                                    }
                                }}
                                value={
                                    field.value ??
                                    form_info.value ??
                                    form_info.defaultValue
                                }
                                options={form_info.options ?? []}
                                error={
                                    !R.isNil(form_info.error) &&
                                    !R.isEmpty(form_info.error)
                                        ? form_info.error
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? true
                                            : false
                                        : false
                                }
                                helperText={
                                    !R.isNil(form_info.helperText) &&
                                    !R.isEmpty(form_info.helperText)
                                        ? form_info.helperText
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? errors[form_info.name].message
                                            : null
                                        : null
                                }
                            />
                        )
                    }}
                />
            )
        } else if (form_info.field_type === 'selectDropdown') {
            return (
                <Controller
                    key={index}
                    name={form_info.name}
                    control={control}
                    rules={form_info.rules}
                    render={({ field }) => {
                        return (
                            <InputSelectDropdown
                                className={form_info.className ?? styles.field}
                                sx={form_info.sx ?? undefined}
                                label={
                                    form_info.field_label
                                        ? renderFieldLabel(form_info)
                                        : null
                                }
                                disabledLabel={form_info.disabledLabel ?? false}
                                disabledVariant={form_info.disabledVariant}
                                variant={form_info.variant}
                                formContainerDirection={
                                    form_info.formContainerDirection ?? 'column'
                                }
                                labelContainerWidth={
                                    form_info.labelContainerWidth ?? 'auto'
                                }
                                placeholder={form_info.placeholder}
                                disabled={form_info.disabled ?? false}
                                disabledOptions={form_info.disabledOptions}
                                onChange={(
                                    value: string | number,
                                    e: React.ChangeEvent<
                                        HTMLInputElement | HTMLTextAreaElement
                                    >
                                ) => {
                                    // field.onChange(e)
                                    setValue(form_info.name, value)

                                    if (!R.isNil(form_info.onChange)) {
                                        form_info.onChange({ value })
                                    }
                                }}
                                onBlur={async (value: string | number) => {
                                    field.onBlur()

                                    if (!R.isNil(form_info.onBlur)) {
                                        form_info.onBlur({ value })
                                    }
                                    if (!R.isNil(trigger)) {
                                        trigger(form_info.name)
                                    }
                                }}
                                value={
                                    field.value ??
                                    form_info.value ??
                                    form_info.defaultValue
                                }
                                options={form_info.options ?? []}
                                error={
                                    !R.isNil(form_info.error) &&
                                    !R.isEmpty(form_info.error)
                                        ? form_info.error
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? true
                                            : false
                                        : false
                                }
                                helperText={
                                    !R.isNil(form_info.helperText) &&
                                    !R.isEmpty(form_info.helperText)
                                        ? form_info.helperText
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? errors[form_info.name].message
                                            : null
                                        : null
                                }
                            />
                        )
                    }}
                />
            )
        } else if (form_info.field_type === 'autoComplete') {
            return (
                <Controller
                    key={index}
                    name={form_info.name}
                    control={control}
                    rules={form_info.rules}
                    render={({ field }) => {
                        return (
                            <InputAutoComplete
                                className={form_info.className ?? styles.field}
                                label={
                                    form_info.field_label
                                        ? renderFieldLabel(form_info)
                                        : null
                                }
                                variant={form_info.variant}
                                placeholder={form_info.placeholder}
                                disabled={form_info.disabled}
                                disabledOptions={form_info.disabledOptions}
                                onChange={(
                                    value: string | number,
                                    e: React.ChangeEvent<
                                        HTMLInputElement | HTMLTextAreaElement
                                    >
                                ) => {
                                    console.log(e)
                                    // field.onChange(e)
                                    setValue(form_info.name, value)

                                    if (!R.isNil(form_info.onChange)) {
                                        form_info.onChange({ value })
                                    }
                                }}
                                onBlur={async (value: string) => {
                                    field.onBlur()
                                    setValue(form_info.name, value)

                                    if (!R.isNil(form_info.onBlur)) {
                                        form_info.onBlur({ value })
                                    }
                                    if (!R.isNil(trigger)) {
                                        trigger(form_info.name)
                                    }
                                }}
                                value={
                                    field.value ??
                                    form_info.value ??
                                    form_info.defaultValue
                                }
                                options={form_info.options ?? []}
                                error={
                                    !R.isNil(form_info.error) &&
                                    !R.isEmpty(form_info.error)
                                        ? form_info.error
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? true
                                            : false
                                        : false
                                }
                                helperText={
                                    !R.isNil(form_info.helperText) &&
                                    !R.isEmpty(form_info.helperText)
                                        ? form_info.helperText
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? errors[form_info.name].message
                                            : null
                                        : null
                                }
                            />
                        )
                    }}
                />
            )
        } else if (form_info.field_type === 'radio') {
            return (
                <Controller
                    key={index}
                    name={form_info.name}
                    control={control}
                    rules={form_info.rules}
                    render={({ field }) => {
                        return (
                            <Radio
                                className={form_info.className ?? styles.field}
                                label={
                                    form_info.field_label
                                        ? renderFieldLabel(form_info)
                                        : null
                                }
                                disabled={form_info.disabled}
                                displayType={form_info.radioDisplayType}
                                onChange={(value: string | number, e: any) => {
                                    field.onChange(e)
                                    // setValue(form_info.name, value)

                                    if (!R.isNil(form_info.onChange)) {
                                        form_info.onChange({ value })
                                    }
                                }}
                                value={
                                    field.value ??
                                    form_info.value ??
                                    form_info.defaultValue
                                }
                                options={form_info.options ?? []}
                                error={
                                    !R.isNil(form_info.error) &&
                                    !R.isEmpty(form_info.error)
                                        ? form_info.error
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? true
                                            : false
                                        : false
                                }
                                helperText={
                                    !R.isNil(form_info.helperText) &&
                                    !R.isEmpty(form_info.helperText)
                                        ? form_info.helperText
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? errors[form_info.name].message
                                            : null
                                        : null
                                }
                            />
                        )
                    }}
                />
            )
        } else if (form_info.field_type === 'datePicker') {
            return (
                <Controller
                    key={index}
                    name={form_info.name}
                    control={control}
                    rules={form_info.rules}
                    render={({ field }) => {
                        return (
                            <InputDatePicker
                                className={form_info.className ?? styles.field}
                                label={
                                    form_info.field_label
                                        ? renderFieldLabel(form_info)
                                        : null
                                }
                                placeholder={form_info.placeholder}
                                disabled={form_info.disabled}
                                disabledPreviousDate={
                                    form_info.disabledPreviousDate
                                }
                                dateFormat={
                                    form_info.dateFormat ?? 'DD/MM/YYYY'
                                }
                                onChange={(value: any) => {
                                    // field.onChange(e)
                                    setValue(form_info.name, value)

                                    if (!R.isNil(form_info.onChange)) {
                                        form_info.onChange({ value })
                                    }
                                }}
                                value={
                                    field.value ??
                                    form_info.value ??
                                    form_info.defaultValue
                                }
                                onBlur={(value: string) => {
                                    field.onBlur()

                                    if (!R.isNil(form_info.onBlur)) {
                                        form_info.onBlur({ value })
                                    }
                                    if (!R.isNil(trigger)) {
                                        trigger(form_info.name)
                                    }
                                }}
                                error={
                                    !R.isNil(form_info.error) &&
                                    !R.isEmpty(form_info.error)
                                        ? form_info.error
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? true
                                            : false
                                        : false
                                }
                                helperText={
                                    !R.isNil(form_info.helperText) &&
                                    !R.isEmpty(form_info.helperText)
                                        ? form_info.helperText
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? errors[form_info.name].message
                                            : null
                                        : null
                                }
                            />
                        )
                    }}
                />
            )
        } else if (form_info.field_type === 'uploadImage') {
            return (
                <Controller
                    key={index}
                    name={form_info.name}
                    control={control}
                    rules={form_info.rules}
                    render={({ field }) => {
                        return (
                            <InputUploadImage
                                className={form_info.className ?? styles.field}
                                disabled={form_info.disabled}
                                label={
                                    form_info.field_label
                                        ? renderFieldLabel(form_info)
                                        : null
                                }
                                labelContainerWidth={
                                    form_info.labelContainerWidth ?? 'auto'
                                }
                                variant={form_info.avatarVariant ?? 'circular'}
                                avatarDefaultImage={
                                    form_info.avatarDefaultImage ?? ''
                                }
                                onChange={(
                                    file: File,
                                    blobUrl: string,
                                    e: any
                                ) => {
                                    // field.onChange(e)
                                    field.onChange(file)

                                    if (!R.isNil(form_info.onChange)) {
                                        form_info.onChange({ file, e, blobUrl })
                                    }
                                }}
                                value={
                                    field.value ??
                                    form_info.value ??
                                    form_info.defaultValue
                                }
                                // onBlur={async (value: string) => {
                                //     field.onBlur()

                                //     if (!R.isNil(form_info.onBlur)) {
                                //         form_info.onBlur(value)
                                //     }
                                //     if (!R.isNil(trigger)) {
                                //         trigger(form_info.name)
                                //     }
                                // }}
                                error={
                                    !R.isNil(form_info.error) &&
                                    !R.isEmpty(form_info.error)
                                        ? form_info.error
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? true
                                            : false
                                        : false
                                }
                                helperText={
                                    !R.isNil(form_info.helperText) &&
                                    !R.isEmpty(form_info.helperText)
                                        ? form_info.helperText
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? errors[form_info.name].message
                                            : null
                                        : null
                                }
                            />
                        )
                    }}
                />
            )
        } else if (form_info.field_type === 'password') {
            return (
                <Controller
                    key={index}
                    name={form_info.name}
                    control={control}
                    rules={form_info.rules}
                    render={({ field }) => {
                        return (
                            <InputPassword
                                className={form_info.className ?? styles.field}
                                label={
                                    form_info.field_label
                                        ? renderFieldLabel(form_info)
                                        : null
                                }
                                variant={form_info.variant}
                                placeholder={form_info.placeholder}
                                disabled={form_info.disabled}
                                onChange={(value: string, e: any) => {
                                    field.onChange(e)

                                    if (!R.isNil(form_info.onChange)) {
                                        form_info.onChange({ value })
                                    }
                                }}
                                value={
                                    field.value ??
                                    form_info.value ??
                                    form_info.defaultValue
                                }
                                onBlur={async (value: string) => {
                                    field.onBlur()

                                    if (!R.isNil(form_info.onBlur)) {
                                        form_info.onBlur({ value })
                                    }
                                    if (!R.isNil(trigger)) {
                                        trigger(form_info.name)
                                    }
                                }}
                                error={
                                    !R.isNil(form_info.error) &&
                                    !R.isEmpty(form_info.error)
                                        ? form_info.error
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? true
                                            : false
                                        : false
                                }
                                helperText={
                                    !R.isNil(form_info.helperText) &&
                                    !R.isEmpty(form_info.helperText)
                                        ? form_info.helperText
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? errors[form_info.name].message
                                            : null
                                        : null
                                }
                            />
                        )
                    }}
                />
            )
        } else if (form_info.field_type === 'number') {
            return (
                <Controller
                    key={index}
                    name={form_info.name}
                    control={control}
                    rules={form_info.rules}
                    render={({ field }) => {
                        return (
                            <InputNumber
                                className={form_info.className ?? styles.field}
                                label={
                                    form_info.field_label
                                        ? renderFieldLabel(form_info)
                                        : null
                                }
                                min={form_info.min}
                                max={form_info.max}
                                variant={form_info.variant}
                                placeholder={form_info.placeholder}
                                disabled={form_info.disabled}
                                onChange={(value: string, e: any) => {
                                    field.onChange(e)

                                    if (!R.isNil(form_info.onChange)) {
                                        form_info.onChange({ value })
                                    }
                                }}
                                value={
                                    field.value ??
                                    form_info.value ??
                                    form_info.defaultValue
                                }
                                onBlur={async (value: string) => {
                                    field.onBlur()

                                    if (!R.isNil(form_info.onBlur)) {
                                        form_info.onBlur({ value })
                                    }
                                    if (!R.isNil(trigger)) {
                                        trigger(form_info.name)
                                    }
                                }}
                                error={
                                    !R.isNil(form_info.error) &&
                                    !R.isEmpty(form_info.error)
                                        ? form_info.error
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? true
                                            : false
                                        : false
                                }
                                helperText={
                                    !R.isNil(form_info.helperText) &&
                                    !R.isEmpty(form_info.helperText)
                                        ? form_info.helperText
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? errors[form_info.name].message
                                            : null
                                        : null
                                }
                            />
                        )
                    }}
                />
            )
        } else if (form_info.field_type === 'textArea') {
            return (
                <Controller
                    key={index}
                    name={form_info.name}
                    control={control}
                    rules={form_info.rules}
                    render={({ field }) => {
                        return (
                            <InputTextArea
                                className={form_info.className ?? styles.field}
                                label={
                                    form_info.field_label
                                        ? renderFieldLabel(form_info)
                                        : null
                                }
                                rows={form_info.rows ?? 6}
                                disabledCharCount={
                                    form_info.disabledCharCount ?? false
                                }
                                maxTextLength={form_info.maxTextLength ?? 100}
                                removeBorder={form_info.removeBorder}
                                formContainerDirection={
                                    form_info.formContainerDirection ?? 'column'
                                }
                                labelContainerWidth={
                                    form_info.labelContainerWidth ?? 'auto'
                                }
                                variant={form_info.variant}
                                placeholder={form_info.placeholder}
                                disabled={form_info.disabled}
                                onChange={(value: string, e: any) => {
                                    field.onChange(e)

                                    if (!R.isNil(form_info.onChange)) {
                                        form_info.onChange({ value })
                                    }
                                }}
                                value={
                                    field.value ??
                                    form_info.value ??
                                    form_info.defaultValue
                                }
                                onBlur={async (value: string) => {
                                    field.onBlur()

                                    if (!R.isNil(form_info.onBlur)) {
                                        form_info.onBlur({ value })
                                    }
                                    if (!R.isNil(trigger)) {
                                        trigger(form_info.name)
                                    }
                                }}
                                error={
                                    !R.isNil(form_info.error) &&
                                    !R.isEmpty(form_info.error)
                                        ? form_info.error
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? true
                                            : false
                                        : false
                                }
                                helperText={
                                    !R.isNil(form_info.helperText) &&
                                    !R.isEmpty(form_info.helperText)
                                        ? form_info.helperText
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? errors[form_info.name].message
                                            : null
                                        : null
                                }
                            />
                        )
                    }}
                />
            )
        } else if (form_info.field_type === 'email') {
            return (
                <Controller
                    key={index}
                    name={form_info.name}
                    control={control}
                    rules={form_info.rules}
                    render={({ field }) => {
                        return (
                            <InputEmail
                                className={form_info.className ?? styles.field}
                                label={
                                    form_info.field_label
                                        ? renderFieldLabel(form_info)
                                        : null
                                }
                                disabledLabel={form_info.disabledLabel}
                                variant={form_info.variant}
                                formContainerDirection={
                                    form_info.formContainerDirection ?? 'column'
                                }
                                labelContainerWidth={
                                    form_info.labelContainerWidth ?? 'auto'
                                }
                                customFont={form_info.customFont ?? {}}
                                removeBorder={form_info.removeBorder ?? false}
                                disabledVariant={form_info.disabledVariant}
                                placeholder={form_info.placeholder}
                                disabled={form_info.disabled}
                                onRemoveAllText={(value: string) => {
                                    setValue(form_info.name, value)
                                }}
                                onChange={(value: string, e: any) => {
                                    field.onChange(e)

                                    if (!R.isNil(form_info.onChange)) {
                                        form_info.onChange({ value })
                                    }
                                }}
                                value={
                                    field.value ??
                                    form_info.value ??
                                    form_info.defaultValue
                                }
                                onBlur={async (value: string) => {
                                    field.onBlur()

                                    if (!R.isNil(form_info.onBlur)) {
                                        form_info.onBlur({ value })
                                    }
                                    if (!R.isNil(trigger)) {
                                        trigger(form_info.name)
                                    }
                                }}
                                error={
                                    !R.isNil(form_info.error) &&
                                    !R.isEmpty(form_info.error)
                                        ? form_info.error
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? true
                                            : false
                                        : false
                                }
                                helperText={
                                    !R.isNil(form_info.helperText) &&
                                    !R.isEmpty(form_info.helperText)
                                        ? form_info.helperText
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? errors[form_info.name].message
                                            : null
                                        : null
                                }
                            />
                        )
                    }}
                />
            )
        } else if (form_info.field_type === 'text') {
            return (
                <Controller
                    key={index}
                    name={form_info.name}
                    control={control}
                    rules={form_info.rules}
                    render={({ field }) => {
                        return (
                            <InputText
                                className={form_info.className ?? styles.field}
                                label={
                                    form_info.field_label
                                        ? renderFieldLabel(form_info)
                                        : null
                                }
                                disabledLabel={form_info.disabledLabel}
                                variant={form_info.variant}
                                formContainerDirection={
                                    form_info.formContainerDirection ?? 'column'
                                }
                                labelContainerWidth={
                                    form_info.labelContainerWidth ?? 'auto'
                                }
                                customFont={form_info.customFont ?? {}}
                                removeBorder={form_info.removeBorder ?? false}
                                disabledVariant={form_info.disabledVariant}
                                placeholder={form_info.placeholder}
                                disabled={form_info.disabled}
                                onChange={(value: string, e: any) => {
                                    field.onChange(e)

                                    if (!R.isNil(form_info.onChange)) {
                                        form_info.onChange({ value })
                                    }
                                }}
                                value={
                                    field.value ??
                                    form_info.value ??
                                    form_info.defaultValue
                                }
                                onBlur={async (value: string) => {
                                    field.onBlur()

                                    if (!R.isNil(form_info.onBlur)) {
                                        form_info.onBlur({ value })
                                    }
                                    if (!R.isNil(trigger)) {
                                        trigger(form_info.name)
                                    }
                                }}
                                error={
                                    !R.isNil(form_info.error) &&
                                    !R.isEmpty(form_info.error)
                                        ? form_info.error
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? true
                                            : false
                                        : false
                                }
                                helperText={
                                    !R.isNil(form_info.helperText) &&
                                    !R.isEmpty(form_info.helperText)
                                        ? form_info.helperText
                                        : !R.isNil(form_info.rules) &&
                                          !R.isEmpty(form_info.rules)
                                        ? errors[form_info.name]
                                            ? errors[form_info.name].message
                                            : null
                                        : null
                                }
                            />
                        )
                    }}
                />
            )
        }
    }

    return null
}

export default TemplateForm
