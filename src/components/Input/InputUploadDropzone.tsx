import React, { useEffect, useState } from 'react'
import { Dropzone, ExtFile } from '@files-ui/react'
import * as R from 'ramda'
import { muiTheme as theme } from '../../configs/theme'
import { Box, Stack, Typography } from '@mui/material'
import { CancelRounded, CloudDownloadOutlined } from '@mui/icons-material'
import { downloadFile } from '../../utils/funcs/shareFunction'

interface InputUploadDropzoneProps {
    onChange?: (fileUpload: ExtFile[]) => void
    acceptFileType?: ('excel' | 'pdf' | 'jpg' | 'png')[]
    initialListShowFile?: {
        fileName: string
        url?: string
        file?: ExtFile[]
    }[]
    disabled?: boolean
    maxFileSize?: number
    buttonLabel?: string
}

const InputUploadDropzone: React.FunctionComponent<
    InputUploadDropzoneProps
> = ({
    onChange = () => {},
    acceptFileType = ['jpg', 'png'],
    initialListShowFile = [],
    disabled = false,
    maxFileSize = 28 * 1024,
    buttonLabel = 'ลากและวางไฟล์ไว้ที่นี่หรือกดเพื่อเพิ่มไฟล์'
}) => {
    const [fileUpload, setFileUpload] = useState<ExtFile[]>([])
    const [acceptMimeType, setAcceptMimeType] = useState<string>('')
    const [listShowFile, setListShowFile] = useState<any[]>([])
    const [isFinishInitialListShowFile, setIsFinishInitialListShowFile] =
        useState(false)

    useEffect(() => {
        if (isFinishInitialListShowFile === false) {
            if (!R.isEmpty(initialListShowFile)) {
                setListShowFile(initialListShowFile)
                setIsFinishInitialListShowFile(true)
            }
        }
    }, [initialListShowFile])

    useEffect(() => {
        setFileUpload([])
        setListShowFile([])
        if (onChange) {
            onChange([])
        }
    }, [])

    useEffect(() => {
        handleConvertFileTypeToMimeType()
    }, [acceptFileType])

    const handleConvertFileTypeToMimeType = () => {
        let _acceptMimeType = ''
        if (acceptFileType.includes('jpg')) {
            _acceptMimeType += 'image/jpeg,image/jpg'
        }
        if (acceptFileType.includes('png')) {
            _acceptMimeType += 'image/png'
        }
        if (acceptFileType.includes('excel')) {
            _acceptMimeType +=
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
        }
        if (acceptFileType.includes('pdf')) {
            _acceptMimeType += 'application/pdf'
        }

        setAcceptMimeType(_acceptMimeType)
    }

    const updateFiles = (files: ExtFile[]) => {
        const tempFileList: ExtFile[] = []
        tempFileList.push(files[0])
        setFileUpload(tempFileList)
        onChange(tempFileList)
        setListShowFile([
            {
                fileName: tempFileList?.[0]?.name ?? 'a',
                file: tempFileList
            }
        ])
        setIsFinishInitialListShowFile(true)
    }

    const handleRemoveUpload = () => {
        // setFileUpload([])
        onChange([])
        setListShowFile([])
    }

    const renderShowListFile = () => {
        return listShowFile.length > 0 ? (
            <>
                {listShowFile.map((item, index) => {
                    return (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                px: 1
                            }}
                        >
                            {item?.url ? (
                                <Typography
                                    onClick={() => {
                                        window.open(
                                            item.url,
                                            '_blank',
                                            'noopener,noreferrer'
                                        )
                                    }}
                                    style={{
                                        cursor: 'pointer',
                                        textDecoration: 'none'
                                    }}
                                >
                                    {index + 1}. {item.fileName}
                                </Typography>
                            ) : null}

                            {item?.file ? (
                                <Typography
                                    onClick={() => {
                                        downloadFile({
                                            file: fileUpload[0].file ?? null,
                                            download_file_name:
                                                fileUpload[0]?.file?.name ??
                                                null
                                        })
                                    }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {index + 1}.{item.fileName}
                                </Typography>
                            ) : null}

                            {disabled === false ? (
                                <CancelRounded
                                    onClick={() => {
                                        handleRemoveUpload()
                                    }}
                                    sx={{
                                        cursor: 'pointer',
                                        color: '#BDBDBD',
                                        fontSize: 25
                                    }}
                                />
                            ) : null}
                        </Box>
                    )
                })}
            </>
        ) : null
    }

    return (
        <div>
            {listShowFile.length === 0 ? (
                <Dropzone
                    value={fileUpload}
                    disabled={disabled}
                    onChange={(files: ExtFile[]) => {
                        updateFiles(files)
                    }}
                    accept={acceptMimeType}
                    maxFileSize={maxFileSize}
                    maxFiles={1}
                    header={false}
                    footer={false}
                    minHeight={fileUpload.length === 0 ? '90px' : '40px'}
                    style={{
                        border: '1px #BDBDBD dotted',
                        borderRadius: '5px'
                    }}
                    behaviour={'replace'}
                >
                    <Stack alignItems={'center'} spacing={2}>
                        <Typography sx={{ paddingTop: 2 }}>
                            {buttonLabel}
                        </Typography>
                        <CloudDownloadOutlined
                            sx={{
                                color: theme.palette.primary.main,
                                fontSize: 30
                            }}
                        />
                    </Stack>
                </Dropzone>
            ) : (
                renderShowListFile()
            )}
        </div>
    )
}

export default InputUploadDropzone

// import React, { useEffect, useState } from "react"
// import { Dropzone, ExtFile } from "@files-ui/react"
// import * as R from "ramda"
// import { theme } from "../../theme"
// import { Box, Stack, Typography } from "@mui/material"
// import { CancelRounded, CloudDownloadOutlined } from "@mui/icons-material"
// import { downloadFile } from "../../share/FunctionShare"

// interface InputUploadDropzoneProps {
//     onChange?: (fileUpload: ExtFile[]) => void
//     acceptFileType?: ("excel" | "pdf" | "jpg" | "png")[]
//     initialListShowFile?: {
//         fileName: string
//         url?: string
//         file?: ExtFile[]
//     }[]
//     disabled?: boolean
//     maxFileSize?: number
//     buttonLabel?: string
// }

// const InputUploadDropzone: React.FunctionComponent<
//     InputUploadDropzoneProps
// > = ({
//     onChange = () => {},
//     acceptFileType = ["jpg", "png"],
//     initialListShowFile = [],
//     disabled = false,
//     maxFileSize = 28 * 1024,
//     buttonLabel = "ลากและวางไฟล์ไว้ที่นี่หรือกดเพื่อเพิ่มไฟล์",
// }) => {
//     const [fileUpload, setFileUpload] = useState<ExtFile[]>([])
//     const [acceptMimeType, setAcceptMimeType] = useState<string>("")
//     const [listShowFile, setListShowFile] = useState<any[]>([])
//     const [isFinishInitialListShowFile, setIsFinishInitialListShowFile] =
//         useState(false)

//     useEffect(() => {
//         if (isFinishInitialListShowFile === false) {
//             if (!R.isEmpty(initialListShowFile)) {
//                 setListShowFile(initialListShowFile)
//                 setIsFinishInitialListShowFile(true)
//             }
//         }
//     }, [initialListShowFile])

//     useEffect(() => {
//         setFileUpload([])
//         setListShowFile([])
//         if (onChange) {
//             onChange([])
//         }
//     }, [])

//     useEffect(() => {
//         handleConvertFileTypeToMimeType()
//     }, [acceptFileType])

//     const handleConvertFileTypeToMimeType = () => {
//         let _acceptMimeType = ""
//         if (acceptFileType.includes("jpg")) {
//             _acceptMimeType += "image/jpeg,image/jpg"
//         }
//         if (acceptFileType.includes("png")) {
//             _acceptMimeType += "image/png"
//         }
//         if (acceptFileType.includes("excel")) {
//             _acceptMimeType +=
//                 "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
//         }
//         if (acceptFileType.includes("pdf")) {
//             _acceptMimeType += "application/pdf"
//         }

//         setAcceptMimeType(_acceptMimeType)
//     }

//     const updateFiles = (files: ExtFile[]) => {
//         const tempFileList: ExtFile[] = []
//         tempFileList.push(files[0])
//         setFileUpload(tempFileList)
//         onChange(tempFileList)
//         setListShowFile([
//             {
//                 fileName: tempFileList?.[0]?.name ?? "a",
//                 file: tempFileList,
//             },
//         ])
//         setIsFinishInitialListShowFile(true)
//     }

//     const handleRemoveUpload = () => {
//         // setFileUpload([])
//         onChange([])
//         setListShowFile([])
//     }

//     const renderShowListFile = () => {
//         return listShowFile.length > 0 ? (
//             <>
//                 {listShowFile.map((item, index) => {
//                     return (
//                         <Box
//                             sx={{
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                                 width: "100%",
//                                 px: 1,
//                             }}
//                         >
//                             {item?.url ? (
//                                 <Typography
//                                     onClick={() => {
//                                         window.open(
//                                             item.url,
//                                             "_blank",
//                                             "noopener,noreferrer"
//                                         )
//                                     }}
//                                     style={{
//                                         cursor: "pointer",
//                                         textDecoration: "none",
//                                     }}
//                                 >
//                                     {index + 1}. {item.fileName}
//                                 </Typography>
//                             ) : null}

//                             {item?.file ? (
//                                 <Typography
//                                     onClick={() => {
//                                         downloadFile({
//                                             file: fileUpload[0].file ?? null,
//                                             download_file_name:
//                                                 fileUpload[0]?.file?.name ??
//                                                 null,
//                                         })
//                                     }}
//                                     style={{ cursor: "pointer" }}
//                                 >
//                                     {index + 1}.{item.fileName}
//                                 </Typography>
//                             ) : null}

//                             {disabled === false ? (
//                                 <CancelRounded
//                                     onClick={() => {
//                                         handleRemoveUpload()
//                                     }}
//                                     sx={{
//                                         cursor: "pointer",
//                                         color: "#BDBDBD",
//                                         fontSize: 25,
//                                     }}
//                                 />
//                             ) : null}
//                         </Box>
//                     )
//                 })}
//             </>
//         ) : null
//     }

//     return (
//         <div>
//             {listShowFile.length === 0 ? (
//                 <Dropzone
//                     value={fileUpload}
//                     disabled={disabled}
//                     onChange={(files: ExtFile[]) => {
//                         updateFiles(files)
//                     }}
//                     accept={acceptMimeType}
//                     maxFileSize={maxFileSize}
//                     maxFiles={1}
//                     header={false}
//                     footer={false}
//                     minHeight={fileUpload.length === 0 ? "90px" : "40px"}
//                     style={{
//                         border: "1px #BDBDBD dotted",
//                         borderRadius: "5px",
//                     }}
//                     behaviour={"replace"}
//                 >
//                     <Stack alignItems={"center"} spacing={2}>
//                         <Typography sx={{ paddingTop: 2 }}>
//                             {buttonLabel}
//                         </Typography>
//                         <CloudDownloadOutlined
//                             sx={{
//                                 color: theme.palette.primary.main,
//                                 fontSize: 30,
//                             }}
//                         />
//                     </Stack>
//                 </Dropzone>
//             ) : (
//                 renderShowListFile()
//             )}
//         </div>
//     )
// }

// export default InputUploadDropzone
