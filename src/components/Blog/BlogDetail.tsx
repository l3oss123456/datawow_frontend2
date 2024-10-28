import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as R from 'ramda'
import { ArrowBack } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { Modal } from 'antd'
import commentIcon from '../../assets/image/blog/commentIcon.png'
import {
    IBlogApi
    // IBlogComment
} from '../../interfaces/blog.interface'
import tempAvatar from '../../assets/image/layout/Avatar.png'
import { colors } from '../../configs/theme'
import { isMobile } from '../../utils/funcs/shareFunction'
import InputTextArea from '../Input/InputTextArea'
import { JPrevPath } from '../../utils/globalStates/blog.globalState'
import { useAtom } from 'jotai'
import Styled from './styled'
import { getOneBlogApi } from '../../apis/Blog.api'
import { blogFormatDate } from '../../utils/funcs/blog.func'
import LoadingDisplay from '../Loading/LoadingDisplay'
import {
    createBlogCommentApi,
    getAllBlogCommentApi
} from '../../apis/BlogComment.api'
import { IBlogCommentApi } from '../../interfaces/blogComment.interface'
import { io } from 'socket.io-client'
import { ApiConfig } from '../../apis/ApiConfig'
import Swal from 'sweetalert2'

const BlogDetail: React.FC = () => {
    const isMobileSize = isMobile()
    const { blog_id } = useParams()
    const intialData = {
        initial_filter: {
            sort_field: [`created_at`],
            sort_order: [-1],
            pagination: { page: 1, per_page: 10 }
        }
    }

    const [prevPath] = useAtom(JPrevPath)

    const [blogDetail, setBlogDetail] = useState<IBlogApi | null>(null)
    const [isShowWindowAddCommentForm, setIsShowWindowAddCommentForm] =
        useState<boolean>(false)
    const [addCommentFormValue, setAddCommentFormValue] = useState<string>('')
    const [showAddCommentModal, setShowAddCommentModal] =
        useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [filter, setFilter] = useState(intialData.initial_filter)
    const [listBlogComment, setListBlogComment] = useState<
        IBlogCommentApi[] | []
    >([])

    useEffect(() => {
        connectSocketio()
        handleGetOneBlog()
        handleGetAllBlogComment({
            showLoading: true
        })
    }, [])

    const connectSocketio = () => {
        // 1. Initialize the Socket.IO connection
        const newSocket = io(ApiConfig.HOST_SERVER) // replace with your server URL

        // 2. Set up event listeners
        newSocket.on('connect', () => {
            console.log('Connected to server')
        })

        newSocket.on('disconnect', () => {
            console.log('Disconnected from server')
        })

        newSocket.on('isHaveNewBlogComment', (is_have_new_blog_comment) => {
            if (is_have_new_blog_comment === 'true') {
                handleGetAllBlogComment({
                    page: filter.pagination.page,
                    per_page: filter.pagination.per_page,
                    showLoading: false
                })
            }
        })
    }

    const handleGetOneBlog = () => {
        try {
            setIsLoading(true)

            getOneBlogApi({ blog_id: blog_id ?? '' }).then((resp) => {
                if (resp.code === 1000) {
                    setBlogDetail(resp.data.results)
                }
            })
        } catch (error) {
            console.log('error handleGetOneBlog: ', error)
        } finally {
            setIsLoading(false)
        }
    }
    const handleGetAllBlogComment = async ({
        page = filter.pagination.page,
        per_page = filter.pagination.per_page,
        showLoading = true
    }: {
        page?: number
        per_page?: number
        showLoading?: boolean
    }) => {
        try {
            if (showLoading === true) {
                setIsLoading(true)
            }

            let params: any = {
                sort_field: filter.sort_field,
                sort_order: filter.sort_order,
                page: page,
                per_page: per_page
            }

            getAllBlogCommentApi({
                blog_id: blog_id ?? '',
                params: params
            }).then((resp) => {
                if (resp.code === 1000) {
                    setListBlogComment(resp.data.results)
                }
            })
        } catch (error) {
            console.log('error handleGetAllBlogComment: ', error)
        } finally {
            if (showLoading === true) {
                setIsLoading(false)
            }
        }
    }

    const handleShowAddCommentForm = () => {
        if (isMobileSize === false) {
            setIsShowWindowAddCommentForm(!isShowWindowAddCommentForm)
            // setShowAddCommentModal(false)
        } else {
            // const _isShowMobileAddCommentForm = !isShowMobileAddCommentForm
            // setIsShowMobileAddCommentForm(_isShowMobileAddCommentForm)
            setShowAddCommentModal(!showAddCommentModal)
            // setIsShowWindowAddCommentForm(false)
        }
    }
    const handleAddComment = async () => {
        try {
            console.log('handleAddComment')
            setIsLoading(true)

            const resp = await createBlogCommentApi({
                blog_id: blog_id ?? '',
                comment_text: addCommentFormValue
            })
            if (resp.data.code === 1000) {
                setAddCommentFormValue('')

                Swal.fire({
                    allowOutsideClick: false,
                    icon: 'success',
                    title: 'เพิ่ม comment สำเร็จ',
                    timer: 1000,
                    preConfirm: () => {
                        // navigate('/home')
                    }
                })
            }
        } catch (error) {
            console.log('error handleAddComment: ', error)
        } finally {
            setIsLoading(false)
            setShowAddCommentModal(false)
        }
    }

    const renderBackBtn = () => {
        return (
            <Link to={prevPath}>
                <Styled.BlogDetailBackBtn>
                    <ArrowBack />
                </Styled.BlogDetailBackBtn>
            </Link>
        )
    }
    const renderImageAndName = () => {
        return (
            <Styled.BlogDetailNameWrapper>
                <img
                    src={
                        !R.isNil(blogDetail?.image) &&
                        !R.isEmpty(blogDetail?.image)
                            ? 'null'
                            : tempAvatar
                    }
                    draggable={false}
                />

                <Typography sx={{ color: colors.base.text, fontSize: '16px' }}>
                    {blogDetail?.username ?? ''}
                </Typography>

                <Styled.BlogDetailTimeText
                    sx={{
                        color: colors.base.grey300,
                        fontSize: '12px'
                    }}
                >
                    {blogFormatDate(blogDetail?.created_at ?? '')}
                </Styled.BlogDetailTimeText>
            </Styled.BlogDetailNameWrapper>
        )
    }
    const renderBlogType = () => {
        return (
            <Styled.BlogDetailTypeWrapper>
                <Typography>{blogDetail?.type ?? ''}</Typography>
            </Styled.BlogDetailTypeWrapper>
        )
    }
    const renderBlogContent = () => {
        return (
            <Styled.BlogDetailContentWrapper>
                <Styled.BlogDetailContentTitle>
                    {blogDetail?.title ?? ''}
                </Styled.BlogDetailContentTitle>

                <Styled.BlogDetailContentDescription>
                    {blogDetail?.description ?? ''}
                </Styled.BlogDetailContentDescription>
            </Styled.BlogDetailContentWrapper>
        )
    }
    const renderBlogComment = () => {
        return (
            <Styled.BlogDetailCommentWrapper>
                <img src={commentIcon} draggable={false} />

                <Typography>{listBlogComment.length ?? 0}</Typography>

                <Typography>{'Comments'}</Typography>
            </Styled.BlogDetailCommentWrapper>
        )
    }
    const renderAddCommentBtn = () => {
        if (isMobileSize === false) {
            if (isShowWindowAddCommentForm === false) {
                return (
                    <Box
                        sx={{
                            marginTop: '30px'
                        }}
                    >
                        {isShowWindowAddCommentForm === false ? (
                            <Styled.AddCommentBtn
                                onClick={() => {
                                    handleShowAddCommentForm()
                                }}
                            >
                                <Typography>{'Add Comments'}</Typography>
                            </Styled.AddCommentBtn>
                        ) : null}
                    </Box>
                )
            } else {
                return (
                    <Styled.BlogDetailAddCommentWindowFormContainer>
                        <InputTextArea
                            value={addCommentFormValue}
                            onChange={(val) => {
                                setAddCommentFormValue(val)
                            }}
                            disabledCharCount={true}
                            rows={3}
                        />

                        <div>
                            <Styled.ButtonCancelAddComment
                                onClick={() => {
                                    setIsShowWindowAddCommentForm(false)
                                    setAddCommentFormValue('')
                                }}
                            >
                                <Typography>{'Cancel'}</Typography>
                            </Styled.ButtonCancelAddComment>

                            <Styled.ButtonPostAddComment
                                onClick={() => {
                                    handleAddComment()
                                }}
                            >
                                <Typography>{'Post'}</Typography>
                            </Styled.ButtonPostAddComment>
                        </div>
                    </Styled.BlogDetailAddCommentWindowFormContainer>
                )
            }
        } else {
            return (
                <Box
                    sx={{
                        marginTop: '30px'
                    }}
                >
                    <Styled.AddCommentBtn
                        onClick={() => {
                            handleShowAddCommentForm()
                        }}
                    >
                        <Typography>{'Add Comments'}</Typography>
                    </Styled.AddCommentBtn>

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
                                {'Add Comments'}
                            </Typography>
                        }
                        open={showAddCommentModal}
                        // onOk={handleOk}
                        centered
                        onCancel={() => {
                            setShowAddCommentModal(false)
                            setAddCommentFormValue('')
                        }}
                        footer={null}
                    >
                        <Box>
                            <InputTextArea
                                value={addCommentFormValue}
                                onChange={(val) => {
                                    setAddCommentFormValue(val)
                                }}
                                disabledCharCount={true}
                                rows={10}
                            />

                            <Styled.ButtonCancelAddComment
                                onClick={() => {
                                    setShowAddCommentModal(false)
                                    setAddCommentFormValue('')
                                }}
                                sx={{ width: '100%', marginTop: '20px' }}
                            >
                                <Typography>{'Cancel'}</Typography>
                            </Styled.ButtonCancelAddComment>

                            <Styled.ButtonPostAddComment
                                onClick={() => {
                                    handleAddComment()
                                }}
                                sx={{ width: '100%', marginTop: '10px' }}
                            >
                                <Typography>{'Post'}</Typography>
                            </Styled.ButtonPostAddComment>
                        </Box>
                    </Modal>
                </Box>
            )
        }
    }
    const renderListComment = () => {
        return (
            <Box sx={{ marginTop: '20px' }}>
                {listBlogComment.map((comment: IBlogCommentApi) => {
                    return (
                        <Styled.BlogDetailContainer>
                            <img
                                src={
                                    !R.isNil(comment?.user?.image) &&
                                    !R.isEmpty(comment?.user?.image)
                                        ? comment?.user?.image
                                        : tempAvatar
                                }
                                draggable={false}
                            />

                            <Styled.BlogDetailCard>
                                <Styled.BlogDetailCommentNameWrapper>
                                    <Typography
                                        sx={{
                                            color: colors.base.text,
                                            fontSize: '16px'
                                        }}
                                    >
                                        {comment?.user?.username ?? ''}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: colors.base.grey300,
                                            fontSize: '12px'
                                        }}
                                    >
                                        {blogFormatDate(
                                            comment?.created_at ?? ''
                                        )}
                                    </Typography>
                                </Styled.BlogDetailCommentNameWrapper>

                                <Styled.BlogDetailCommentTextWrapper>
                                    <Typography>
                                        {comment.comment_text}
                                    </Typography>
                                </Styled.BlogDetailCommentTextWrapper>
                            </Styled.BlogDetailCard>
                        </Styled.BlogDetailContainer>
                    )
                })}
            </Box>
        )
    }

    return (
        <Styled.BlogContainer sx={{ padding: '20px' }}>
            <LoadingDisplay loading={isLoading} />
            {renderBackBtn()}
            {renderImageAndName()}
            {renderBlogType()}
            {renderBlogContent()}
            {renderBlogComment()}
            {renderAddCommentBtn()}
            {renderListComment()}
        </Styled.BlogContainer>
    )
}

export default BlogDetail
