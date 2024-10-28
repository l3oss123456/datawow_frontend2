import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useAtom } from 'jotai'
import { BorderColorOutlined, DeleteOutlineOutlined } from '@mui/icons-material'
import * as R from 'ramda'
import { Modal } from 'antd'
import { IBlogApi, ICreateOrUpdateBlog } from '../../interfaces/blog.interface'
import commentIcon from '../../assets/image/blog/commentIcon.png'
import { JPrevPath } from '../../utils/globalStates/blog.globalState'
import { isMobile } from '../../utils/funcs/shareFunction'
import TemplateForm from '../TemplateForm/TemplateForm'
import { IUseForm } from '../../interfaces/useForm.interface'
import { IOptions } from '../../interfaces/input.interface'
import { colors } from '../../configs/theme'
import EditBlogModal from './EditBlogModal'
import DeleteBlogModal from './DeleteBlogModal'
import tempAvatar from '../../assets/image/layout/Avatar.png'
import Styled from './styled'
import styles from './Blog.module.scss'
import { blogFormatDate } from '../../utils/funcs/blog.func'

interface IBlogProps {
    listBlog: IBlogApi[]
    onScrollToBottom?: () => void
    searchValue?: string
    onEdit?: (blog_id: string, data: ICreateOrUpdateBlog) => void
    onDelete?: (blog_id: string) => void
}

const Blog: React.FC<IBlogProps> = ({
    listBlog = [],
    onScrollToBottom = () => {},
    searchValue = '',
    onEdit = () => {},
    onDelete = () => {}
}) => {
    const navigate = useNavigate()
    const location = useLocation()
    // const isMobileSize = isMobile()

    const _useForm = useForm<any>({
        defaultValues: {}
        // resolver: generalInfoResolver
    }) as IUseForm
    const blogRef = useRef<HTMLDivElement | null>(null)
    const { watch } = _useForm

    const [_, setPrevPath] = useAtom(JPrevPath)

    const initialData = {
        isShowDeleteModal: false,
        showAddModal: false
    }
    const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(
        initialData.isShowDeleteModal
    )
    const [selectedBlog, setSelectedBlog] = useState<IBlogApi | null>()
    const [showEditModal, setShowEditModal] = useState<boolean>(
        initialData.showAddModal
    )
    const [isBottom, setIsBottom] = useState(false)

    useEffect(() => {
        const element = blogRef.current

        if (element) {
            element.addEventListener('scroll', handleScrollToBottom)
        }

        return () => {
            if (element) {
                element.removeEventListener('scroll', handleScrollToBottom)
            }
        }
    }, [])

    useEffect(() => {
        if (location) {
            setPrevPath(location.pathname ?? '')
        }
    }, [location])

    useEffect(() => {
        if (isBottom === true) {
            onScrollToBottom()
        }
    }, [isBottom])

    const handleScrollToBottom = () => {
        const element = blogRef.current
        if (
            element &&
            element.scrollTop + element.clientHeight >= element.scrollHeight
        ) {
            // setLoading({ ...loading, listChat: true })
            setTimeout(() => {
                setIsBottom(true) // Set isBottom to true when at the bottom
                // setLoading({ ...loading, listChat: false })
            }, 500)
        } else {
            setIsBottom(false) // Reset isBottom if not at the bottom
        }
    }

    const handleClickCard = (blog: IBlogApi) => {
        navigate(`/blog/${blog._id}`)
    }

    return (
        <Styled.BlogContainer ref={blogRef}>
            {selectedBlog && isShowDeleteModal === true ? (
                <DeleteBlogModal
                    // selectedBlog={selectedBlog}
                    isShowDeleteModal={isShowDeleteModal}
                    setIsShowDeleteModal={setIsShowDeleteModal}
                    onConfirmDelete={() => {
                        onDelete(selectedBlog?._id ?? '')
                    }}
                />
            ) : null}

            {selectedBlog && showEditModal === true ? (
                <EditBlogModal
                    useForm={_useForm}
                    showEditModal={showEditModal}
                    setShowEditModal={setShowEditModal}
                    selectedBlog={selectedBlog}
                    onConfirmEdit={() => {
                        const data: ICreateOrUpdateBlog = {
                            type: watch('type') ?? '',
                            title: watch('title') ?? '',
                            description: watch('description') ?? ''
                        }

                        onEdit(selectedBlog?._id ?? '', data)
                    }}
                />
            ) : null}

            {listBlog.map((blog: IBlogApi, index: number) => {
                return (
                    <Styled.BlogCard
                        key={index}
                        sx={
                            index === listBlog.length - 1
                                ? {
                                      borderBottom: 'none'
                                  }
                                : undefined
                        }
                    >
                        <Styled.BlogNameContainer>
                            <Styled.BlogNameWrapper>
                                <img
                                    // src={blog.image ?? tempAvatar}
                                    src={
                                        !R.isNil(blog.image) &&
                                        !R.isEmpty(blog.image)
                                            ? blog.image
                                            : tempAvatar
                                    }
                                    draggable={false}
                                />
                                <Typography>{blog?.username ?? ''}</Typography>
                                <Typography>
                                    {blogFormatDate(blog?.created_at)}
                                </Typography>
                            </Styled.BlogNameWrapper>

                            {location?.pathname === '/our-blog' ? (
                                <Styled.BlogEditAndDeleteWrapper>
                                    <BorderColorOutlined
                                        onClick={() => {
                                            setSelectedBlog(blog)
                                            setShowEditModal(true)
                                        }}
                                    />
                                    <DeleteOutlineOutlined
                                        onClick={() => {
                                            setSelectedBlog(blog)
                                            setIsShowDeleteModal(true)
                                        }}
                                    />
                                </Styled.BlogEditAndDeleteWrapper>
                            ) : null}
                        </Styled.BlogNameContainer>

                        <Styled.BlogTypeWrapper>
                            <Typography>{blog.type ?? ''}</Typography>
                        </Styled.BlogTypeWrapper>

                        <Styled.BlogContentWrapper
                            onClick={() => {
                                handleClickCard(blog)
                            }}
                        >
                            <Styled.BlogContentTitleWrapper>
                                {blog.title ? (
                                    <>
                                        {blog.title.split('').map((char) => {
                                            if (char === ' ') {
                                                return (
                                                    <div
                                                        style={{
                                                            marginRight: 4
                                                        }}
                                                    ></div>
                                                )
                                            }

                                            if (searchValue.includes(char)) {
                                                return (
                                                    <Typography
                                                        sx={{
                                                            background:
                                                                '#C5A365',
                                                            width: 'max-content'
                                                        }}
                                                    >
                                                        {char}
                                                    </Typography>
                                                )
                                            }

                                            return (
                                                <Typography>{char}</Typography>
                                            )
                                        })}
                                    </>
                                ) : (
                                    ''
                                )}
                            </Styled.BlogContentTitleWrapper>

                            <Styled.BlogContentDescription>
                                {blog.description ?? ''}
                            </Styled.BlogContentDescription>
                        </Styled.BlogContentWrapper>

                        <Styled.BlogCommentWrapper>
                            <img src={commentIcon} draggable={false} />

                            <Typography>
                                {/* {blog.list_comment.length ?? 0} */}
                                {blog.list_comment_count ?? 0}
                            </Typography>

                            <Typography>{'Comments'}</Typography>
                        </Styled.BlogCommentWrapper>
                    </Styled.BlogCard>
                )
            })}
        </Styled.BlogContainer>
    )
}

export default Blog
