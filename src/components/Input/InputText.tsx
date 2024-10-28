import React from "react"
import { TextField } from "@mui/material"
import inputStyles from "./Input.module.scss"

interface InputTextProps {
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
}

const InputText: React.FunctionComponent<InputTextProps> = ({
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
}) => {
    return (
        <div
            className={
                formContainerDirection === "column"
                    ? inputStyles.container
                    : inputStyles.row_direction_container
            }
        >
            {disabledLabel === false ? (
                <div
                    className={inputStyles.label_container}
                    style={
                        {
                            "--bg-color": "red",
                            width: labelContainerWidth,
                        } as React.CSSProperties
                    }
                >
                    <p>{label}</p>
                </div>
            ) : null}

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
                        border: removeBorder === true ? "none" : null,
                    },
                    width: "100%",
                    "& .MuiInputBase-input": {
                        ...customFont,
                    },
                }}
            />
        </div>
    )
}

export default InputText
