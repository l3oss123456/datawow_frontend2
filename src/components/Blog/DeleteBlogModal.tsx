import { Box, Button, Typography } from '@mui/material'
import { Modal } from 'antd'
import React from 'react'
import { isMobile } from '../../utils/funcs/shareFunction'
import { colors } from '../../configs/theme'
import { IBlogApi } from '../../interfaces/blog.interface'

interface IDeleteBlogModalProps {
    isShowDeleteModal: boolean
    setIsShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
    // selectedBlog: IBlogApi
    onConfirmDelete: () => void
}

const DeleteBlogModal: React.FC<IDeleteBlogModalProps> = ({
    // selectedBlog,
    isShowDeleteModal,
    setIsShowDeleteModal,
    onConfirmDelete = () => {}
}) => {
    const isMobileSize = isMobile()

    const handleDeleteBlog = () => {
        onConfirmDelete()
        setIsShowDeleteModal(false)
    }

    return (
        <Modal
            title={
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Box
                        sx={{
                            width: isMobileSize == false ? '60%' : '80%'
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#101828',
                                fontWeight: 600,
                                fontSize: '18px',
                                lineHeight: '26px',
                                textAlign: 'center'
                            }}
                        >
                            {`Please confirm if you wish to delete the post`}
                        </Typography>
                    </Box>
                </Box>
            }
            open={isShowDeleteModal}
            // onOk={handleOk}
            centered
            onCancel={() => {
                setIsShowDeleteModal(false)
            }}
            footer={null}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Box
                    sx={{
                        width: isMobileSize == false ? '60%' : '80%'
                    }}
                >
                    <Typography
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        {
                            'Are you sure you want to delete the post? Once deleted, it cannot be recovered.'
                        }
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection:
                            isMobileSize === true ? 'column-reverse' : 'row',
                        gap: '20px',
                        marginTop: '20px',
                        width: '100%'
                    }}
                >
                    <Button
                        onClick={() => {
                            setIsShowDeleteModal(false)
                        }}
                        sx={{
                            borderRadius: '8px',
                            padding: '10px 18px',
                            border: '1px solid #DADADA',
                            width: isMobileSize === true ? '100%' : undefined
                        }}
                    >
                        <Typography>{'Cancel'}</Typography>
                    </Button>

                    <Button
                        onClick={() => {
                            handleDeleteBlog()
                        }}
                        sx={{
                            borderRadius: '8px',
                            padding: '10px 18px',
                            backgroundColor: '#F23536',
                            color: colors.base.white,
                            width: isMobileSize === true ? '100%' : undefined
                        }}
                    >
                        <Typography>{'Delete'}</Typography>
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default DeleteBlogModal
