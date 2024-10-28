import React from "react"
import { TextField, InputAdornment, IconButton } from "@mui/material"
import { CancelRounded } from "@mui/icons-material"
import inputStyles from "./Input.module.scss"

interface InputEmailProps {
    label?: string
    disabledLabel?: boolean
    variant?: "standard" | "filled" | "outlined"
    disabledVariant?: "standard" | "filled" | "outlined"
    value?: string
    className?: any
    onChange?: (value: string, event: any) => void
    onBlur?: (value: string) => void
    error?: boolean
    helperText?: string
    disabled?: boolean
    placeholder?: string
    formContainerDirection?: "column" | "row"
    labelContainerWidth?: string
    removeBorder?: boolean
    customFont?: React.CSSProperties
    onRemoveAllText?: (value: string) => void
}

const InputEmail: React.FunctionComponent<InputEmailProps> = ({
    label = "",
    disabledLabel = false,
    variant = "standard",
    disabledVariant,
    value = "",
    className = null,
    onChange = () => {},
    onBlur = () => {},
    error = false,
    helperText,
    disabled = false,
    placeholder = "",
    formContainerDirection = "column",
    labelContainerWidth = "auto",
    removeBorder = false,
    customFont = {},
    onRemoveAllText = () => {},
}) => {
    const handleClear = () => {
        value = ""
        onChange("", null)
        onRemoveAllText(value)
    }

    return (
        <div
            className={
                formContainerDirection === "column"
                    ? inputStyles.container
                    : inputStyles.row_direction_container
            }
        >
            {!disabledLabel && (
                <div
                    className={inputStyles.label_container}
                    style={{ width: labelContainerWidth } as any}
                >
                    <p>{label}</p>
                </div>
            )}

            <TextField
                size={"small"}
                className={className}
                placeholder={placeholder}
                value={value}
                variant={
                    disabled === false ? variant : disabledVariant ?? "filled"
                }
                disabled={disabled}
                onChange={(e) => {
                    onChange(e.target.value, e)
                }}
                onBlur={(e) => {
                    onBlur(e.target.value)
                }}
                error={error}
                helperText={helperText}
                style={{ borderBottom: 0 }}
                sx={{
                    "& .MuiInputBase-root": {
                        color: "#525252",
                        fontSize: 14,
                    },
                    "& fieldset": {
                        border: removeBorder === true ? "none" : undefined,
                    },
                    width: "100%",
                    "& .MuiInputBase-input": {
                        ...customFont,
                    },
                }}
                InputProps={{
                    endAdornment:
                        value && !disabled ? (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClear}
                                    edge="end"
                                    aria-label="clear text"
                                >
                                    <CancelRounded sx={{ fontSize: 18 }} />
                                </IconButton>
                            </InputAdornment>
                        ) : null,
                }}
            />
        </div>
    )
}

export default InputEmail
