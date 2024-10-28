import React, { useRef, useState } from 'react'
import { Avatar, Typography, Fab } from '@mui/material'
import { getBlobUrl } from '../../utils/funcs/shareFunction'
import inputStyles from './Input.module.scss'
import Badge from '@mui/material/Badge'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
// import { theme } from '../../theme'
import { muiTheme as theme } from '../../configs/theme'
// import avatarDefaultImage from '../../assets/image/NoImage.png'

interface InputUploadImageProps {
    label?: string
    value?: string | File
    className?: any
    onChange?: (file: File, blobUrl: string, event: any) => void
    // onBlur?: (value: string) => void
    error?: boolean
    helperText?: string
    disabled?: boolean
    variant?: 'circular' | 'rounded' | 'square'
    avatarDefaultImage?: string
    labelContainerWidth?: string
}

const InputUploadImage: React.FunctionComponent<InputUploadImageProps> = ({
    value = '',
    label = '',
    className = null,
    onChange = () => {},
    // onBlur = () => {},
    error = false,
    helperText,
    disabled = false,
    variant = 'circular',
    avatarDefaultImage = '',
    labelContainerWidth = 'auto'
}) => {
    console.log(label, labelContainerWidth)
    const [uploadedImage, setUploadedImage] = useState<string>('')
    const inputFile = useRef<HTMLInputElement>(null)

    const handleFileChange = (event: any) => {
        const file: File = event.target.files[0]

        if (file) {
            const blobUrl = getBlobUrl(file)
            setUploadedImage(blobUrl)
            onChange(file, blobUrl, event)
            event.target.value = null
        }
    }
    const handleDeleteImage = (event: any) => {
        const file: File = event.target.files
        setUploadedImage('')
        onChange(file, '', event)
    }

    const renderAvatar = () => {
        return (
            <div
                style={{
                    pointerEvents: disabled ? 'none' : undefined,
                    display: 'flex',
                    flexFlow: 'column wrap',
                    alignItems: 'center',
                    gap: '10px 0px',
                    position: 'relative',
                    width: '100%'
                }}
                // style={{
                //     pointerEvents: disabled ? "none" : undefined,
                //     display: "flex",
                //     flexFlow: "column wrap",
                //     alignItems: "center",
                //     gap: "10px 0px",
                // }}
            >
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    badgeContent={
                        <Fab
                            size="small"
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                zIndex: 1
                            }}
                            onClick={handleDeleteImage}
                        >
                            <DeleteForeverIcon sx={{ color: 'white' }} />
                        </Fab>
                    }
                >
                    <Avatar
                        variant={variant}
                        sx={{
                            width: 162,
                            height: 162,
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            border: `2px solid ${
                                error === true ? '#d32f2f' : '#BDBDBD'
                            }`
                        }}
                        className={className}
                        onClick={(event) => {
                            inputFile.current?.click()
                            event.stopPropagation() // Prevent event propagation to input
                        }}
                    >
                        <img
                            src={
                                value && typeof value === 'string'
                                    ? value
                                    : uploadedImage
                                    ? uploadedImage
                                    : avatarDefaultImage
                                    ? avatarDefaultImage
                                    : require('../../assets/image/NoImage.png')
                            }
                            alt="Uploaded Image"
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%'
                            }}
                        />
                    </Avatar>
                </Badge>

                <div>
                    {/* <Avatar
                        sx={{
                            width: 162,
                            height: 162,
                            backgroundColor: "transparent",
                            cursor: "pointer",
                            border: `2px solid ${
                                error === true ? "#d32f2f" : "#BDBDBD"
                            }`,
                        }}
                        variant={variant}
                        className={className}
                        onClick={(event) => {
                            inputFile.current?.click()
                            // Prevent event propagation to the input field
                            event.stopPropagation()
                        }}
                    >
                        <img
                            src={
                                value && typeof value === "string"
                                    ? value
                                    : uploadedImage
                                    ? uploadedImage
                                    : avatarDefaultImage
                                    ? avatarDefaultImage
                                    : require("../../assets/image/NoImage.png")
                            }
                            alt="Uploaded Image"
                            style={{
                                width: "100%",
                                height: "auto",
                                // borderRadius: "50%",
                            }}
                        />
                    </Avatar> */}

                    {helperText ? (
                        <Typography
                            className={inputStyles.custom_helper_text}
                            style={
                                {
                                    '--color': error === false ? 'black' : null
                                } as any
                            }
                        >
                            {helperText}
                        </Typography>
                    ) : null}
                </div>
            </div>
        )
    }
    const renderInputFile = () => {
        return (
            <input
                type="file"
                ref={inputFile}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".jpg,.jpeg,.png,.gif"
            />
        )
    }

    return (
        <div
        // style={{
        //     display: "flex",
        //     // flexFlow: "column wrap",
        //     flexFlow: "row wrap",
        //     alignItems: "center",
        //     background: "pink",
        // }}
        >
            {renderAvatar()}
            {renderInputFile()}
        </div>
    )
}

export default InputUploadImage
