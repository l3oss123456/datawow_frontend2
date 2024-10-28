import React, { useEffect, useRef, useState } from 'react'
import {
    Box,
    Button,
    IconButton,
    MenuItem,
    Select,
    Typography
} from '@mui/material'
import { Modal } from 'antd'
import { Add, Search } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import InputSearch from '../Input/InputSearch'
import { IOptions } from '../../interfaces/input.interface'
import { isMobile, useWindowSize } from '../../utils/funcs/shareFunction'
import InputTextArea from '../Input/InputTextArea'
import InputText from '../Input/InputText'
import { IUseForm } from '../../interfaces/useForm.interface'
import { colors } from '../../configs/theme'
import styles from './SearchBlog.module.scss'
import TemplateForm from '../TemplateForm/TemplateForm'
import { ICreateOrUpdateBlog } from '../../interfaces/blog.interface'
import { ENUM } from '../../utils/shares/Enum'

interface ISearchBlogProps {
    handleSearchChange?: (search_text: string) => void
    handleTypeChange?: (type: string) => void
    handleCreatePost?: (data: ICreateOrUpdateBlog) => void
}

const SearchBlog: React.FC<ISearchBlogProps> = ({
    handleSearchChange = () => {},
    handleTypeChange = () => {},
    handleCreatePost = () => {}
}) => {
    const { windowWidth } = useWindowSize()
    const isMobileSize = isMobile()
    const searchInputRef = useRef<HTMLDivElement>(null)
    const debounceSearch = useDebouncedCallback((value) => {
        setSearchValue(value)
        handleSearchChange(value)
    }, 500)

    const _useForm = useForm<any>({
        defaultValues: {}
        // resolver: generalInfoResolver
    }) as IUseForm
    const {
        watch,
        reset,
        // formState: { errors },
        handleSubmit
    } = _useForm

    const initialData = {
        searchValue: '',
        selectedOption: '',
        isClickSearchIcon: false,
        isSelectOpen: false,
        showAddModal: false
    }
    const listOptions: IOptions[] = ENUM.BLOG_TYPE_OPTIONS

    const [searchValue, setSearchValue] = useState<string>(
        initialData.searchValue
    )
    // const [selectedOption, setSelectedOption] = useState(listOptions[0].value)
    const [selectedOption, setSelectedOption] = useState<string>(
        initialData.selectedOption
    )
    const [isClickSearchIcon, setIsClickSearchIcon] = useState<boolean>(
        initialData.isClickSearchIcon
    )
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(
        initialData.isSelectOpen
    )
    const [showAddModal, setShowAddModal] = useState<boolean>(
        initialData.showAddModal
    )

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchInputRef.current &&
                !searchInputRef.current.contains(event.target as Node)
            ) {
                setIsClickSearchIcon(false)
                setSearchValue('')
            }
        }

        // Attach the event listener
        document.addEventListener('mousedown', handleClickOutside)

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if (isMobileSize === false) {
            setIsClickSearchIcon(false)
        }
    }, [windowWidth])

    const renderAddModal = () => {
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
                        {'Create Post'}
                    </Typography>
                }
                open={showAddModal}
                // onOk={handleOk}
                centered
                onCancel={() => {
                    setShowAddModal(initialData.showAddModal)
                    reset()
                }}
                footer={null}
            >
                <form
                    onSubmit={handleSubmit(async (value) => {
                        handleCreatePost({
                            type: value?.type ?? '',
                            title: value?.title ?? '',
                            description: value?.description ?? ''
                        })

                        setShowAddModal(initialData.showAddModal)
                        reset()
                    })}
                >
                    <Box
                        sx={{
                            width: isMobileSize === false ? '50%' : '100%'
                        }}
                    >
                        <TemplateForm
                            useForm={_useForm}
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
                                },
                                rules: {
                                    required: 'กรุณาเลือกประเภท'
                                }
                            }}
                        />
                    </Box>

                    <TemplateForm
                        useForm={_useForm}
                        form_info={{
                            name: 'title',
                            field_type: 'text',
                            variant: 'outlined',
                            value: watch('title') ?? '',
                            placeholder: 'Title',
                            rules: {
                                required: 'กรุณาใส่หัวข้อ'
                            }
                        }}
                    />

                    <TemplateForm
                        useForm={_useForm}
                        form_info={{
                            name: 'description',
                            field_type: 'textArea',
                            value: watch('description') ?? '',
                            placeholder: 'What’s on your mind...',
                            disabledCharCount: true,
                            rules: {
                                required: 'กรุณาใส่รายละเอียด'
                            }
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
                                setShowAddModal(initialData.showAddModal)
                                reset()
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
                            type={'submit'}
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
                </form>
            </Modal>
        )
    }

    return (
        <Box className={styles.SearchBlogContainer}>
            {isClickSearchIcon === false ? (
                <>
                    {renderAddModal()}

                    <Box className={styles.inputSearchContainer}>
                        <Search
                            onClick={() => {
                                setIsClickSearchIcon(!isClickSearchIcon)
                            }}
                        />

                        <InputSearch
                            value={searchValue}
                            placeholder={'Search'}
                            size={'medium'}
                            onChange={(val: string) => {
                                debounceSearch(val)
                            }}
                            className={styles.inputSearch}
                        />
                    </Box>

                    <Select
                        // labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        className={styles.inputSelect}
                        size={'small'}
                        value={selectedOption ?? ''}
                        // label="Age"
                        onChange={(e) => {
                            setSelectedOption(e.target.value)
                            handleTypeChange(e.target.value)
                        }}
                        displayEmpty
                        onOpen={() => setIsSelectOpen(true)}
                        onClose={() => setIsSelectOpen(false)}
                    >
                        {isSelectOpen === false && selectedOption === '' && (
                            <MenuItem value="" disabled hidden>
                                {'Community'}
                            </MenuItem>
                        )}
                        {listOptions.map((opt: IOptions) => {
                            return (
                                <MenuItem value={opt.value}>
                                    {opt.label}
                                </MenuItem>
                            )
                        })}
                    </Select>

                    <IconButton
                        className={styles.createBtn}
                        onClick={() => {
                            setShowAddModal(!showAddModal)
                        }}
                        sx={{
                            backgroundColor: colors.base.success,
                            color: colors.base.white,
                            '&:hover': {
                                backgroundColor: colors.base.success,
                                opacity: 0.7
                            }
                        }}
                    >
                        <Typography>{'Create'}</Typography>
                        <Add />
                    </IconButton>
                </>
            ) : (
                <Box ref={searchInputRef} sx={{ width: '100%' }}>
                    <InputSearch
                        value={searchValue}
                        placeholder={'ค้นหา'}
                        size={'medium'}
                        onChange={(val: string) => {
                            debounceSearch(val)
                        }}
                        className={styles.mobileInputSearch}
                    />
                </Box>
            )}
        </Box>
    )
}

export default SearchBlog
