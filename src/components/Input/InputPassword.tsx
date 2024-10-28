import React, { useState } from "react"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import inputStyles from "./Input.module.scss"
import { Visibility, VisibilityOff } from "@mui/icons-material"

interface InputPasswordProps {
    label?: string
    variant?: "standard" | "filled" | "outlined"
    value?: string
    className?: any
    onChange?: (value: string, event: any) => void
    onBlur?: (value: string) => void
    error?: boolean
    helperText?: string
    disabled?: boolean
    placeholder?: string
}

const InputPassword: React.FunctionComponent<InputPasswordProps> = ({
    label = "",
    variant = "standard",
    value = "",
    className = null,
    onChange = () => {},
    onBlur = () => {},
    error = false,
    helperText,
    disabled = false,
    placeholder = "",
}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
    }

    return (
        <div className={inputStyles.container}>
            <div
                className={inputStyles.label_container}
                style={{ "--bg-color": "red" } as any}
            >
                <p>{label}</p>
            </div>

            <TextField
                size={"small"}
                className={className}
                type={showPassword === true ? "text" : "password"}
                placeholder={placeholder}
                value={value}
                variant={variant}
                disabled={disabled}
                onChange={(e) => {
                    onChange(e.target.value, e)
                }}
                onBlur={(e) => {
                    onBlur(e.target.value)
                }}
                error={error}
                helperText={helperText}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                    inputProps: { variant: "standard" },
                }}
            />
        </div>
    )
}

export default InputPassword
