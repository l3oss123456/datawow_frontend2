import React, { useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Modal } from 'antd'
import { colors } from '../../configs/theme'
import { IUseForm } from '../../interfaces/useForm.interface'
import TemplateForm from '../TemplateForm/TemplateForm'
import { IOptions } from '../../interfaces/input.interface'
import styles from './Blog.module.scss'
import { isMobile } from '../../utils/funcs/shareFunction'
import { IBlogApi } from '../../interfaces/blog.interface'
import { ENUM } from '../../utils/shares/Enum'

interface IEditBlogModalProps {
    useForm: IUseForm
    showEditModal: boolean
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
    selectedBlog: IBlogApi
    onConfirmEdit?: () => void
}

const EditBlogModal: React.FC<IEditBlogModalProps> = ({
    useForm,
    showEditModal,
    setShowEditModal,
    selectedBlog,
    onConfirmEdit = () => {}
}) => {
    const { watch, setValue } = useForm

    const isMobileSize = isMobile()
    const listOptions: IOptions[] = ENUM.BLOG_TYPE_OPTIONS

    useEffect(() => {
        initialData()
    }, [selectedBlog])

    const initialData = () => {
        Object.keys(selectedBlog).forEach((key: string) => {
            // setValue(key, selectedBlog[key] as any)
            setValue(key as keyof IBlogApi, selectedBlog[key as keyof IBlogApi])
        })
    }

    return (
        <Modal
            title={
                <Typography
                    sx={{
                        color: colors.base.grey900,
                        fontWeight: 500,
                        fontSize: '20px',
                        lineHeight: '26px'
                    }}
                >
                    {'Edit Post'}
                </Typography>
            }
            open={showEditModal}
            // onOk={handleOk}
            centered
            onCancel={() => {
                setShowEditModal(false)
                // reset()
            }}
            footer={null}
        >
            <Box>
                <Box
                    sx={{
                        width: isMobileSize === false ? '50%' : '100%'
                    }}
                >
                    <TemplateForm
                        useForm={useForm}
                        form_info={{
                            name: 'type',
                            placeholder: 'Choose a community',
                            field_type: 'selectDropdown',
                            options: listOptions,
                            className: styles.inputSelectAddModal,
                            sx: {
                                '& .MuiSelect-select': {
                                    color: colors.base.success
                                },
                                '& .MuiMenuItem-root': {
                                    color: colors.base.success
                                }
                            }
                        }}
                    />
                </Box>

                <TemplateForm
                    useForm={useForm}
                    form_info={{
                        name: 'title',
                        field_type: 'text',
                        variant: 'outlined',
                        value: watch('title') ?? '',
                        placeholder: 'Title'
                    }}
                />

                <TemplateForm
                    useForm={useForm}
                    form_info={{
                        name: 'description',
                        field_type: 'textArea',
                        value: watch('description') ?? '',
                        placeholder: 'What’s on your mind...',
                        disabledCharCount: true
                    }}
                />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection:
                            isMobileSize === false ? 'row' : 'column',
                        justifyContent: 'flex-end',
                        gap: isMobileSize === false ? '20px' : '10px',
                        marginTop: '20px'
                    }}
                >
                    <Button
                        className={styles.cancelBtnInAddModal}
                        onClick={() => {
                            setShowEditModal(false)
                            // reset()
                        }}
                        sx={
                            isMobileSize === true
                                ? {
                                      width: '100%'
                                  }
                                : undefined
                        }
                    >
                        {'cancel'}
                    </Button>

                    <Button
                        onClick={() => {
                            onConfirmEdit()
                            setShowEditModal(false)
                        }}
                        className={styles.postBtnInAddModal}
                        sx={
                            isMobileSize === true
                                ? {
                                      width: '100%'
                                  }
                                : undefined
                        }
                    >
                        {'Post'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default EditBlogModal
