import React, { useEffect, useState } from 'react'
import * as R from 'ramda'
import SearchBlog from '../../components/SearchBlog'
import Blog from '../../components/Blog'
import tempAvatar from '../../assets/image/layout/Avatar.png'
import { IBlogApi, ICreateOrUpdateBlog } from '../../interfaces/blog.interface'
import Styled from './styled'
import {
    createBlogApi,
    deleteBlogApi,
    getAllBlogByUserIdApi,
    updateBlogApi
} from '../../apis/Blog.api'
import LoadingDisplay from '../../components/Loading/LoadingDisplay'
import { io } from 'socket.io-client'
import { ApiConfig } from '../../apis/ApiConfig'
import Swal from 'sweetalert2'

const OurBlog: React.FC = () => {
    const intialData = {
        initial_filter: {
            search_value: '',
            type: '',
            sort_field: [`created_at`],
            sort_order: [-1],
            pagination: { page: 1, per_page: 10 }
        }
    }

    const [listBlog, setListBlog] = useState<IBlogApi[]>([])
    const [filter, setFilter] = useState(intialData.initial_filter)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        connectSocketio()
        handleGetAllBlog({
            page: filter.pagination.page,
            per_page: filter.pagination.per_page,
            search_text: filter.search_value,
            blog_type: filter.type,
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

        newSocket.on('isHaveNewBlog', (is_have_new_blog) => {
            if (is_have_new_blog === 'true') {
                handleGetAllBlog({
                    page: filter.pagination.page,
                    per_page: filter.pagination.per_page,
                    search_text: filter.search_value,
                    blog_type: filter.type,
                    showLoading: false
                })
            }
        })
    }

    const handleGetAllBlog = async ({
        page = filter.pagination.page,
        per_page = filter.pagination.per_page,
        search_text = filter.search_value,
        blog_type = filter.type,
        showLoading = true
    }: {
        page?: number
        per_page?: number
        search_text?: string
        blog_type?: string
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

            if (!R.isNil(search_text) && !R.isEmpty(search_text)) {
                params = { ...params, title: search_text }
            }

            if (!R.isNil(blog_type) && !R.isEmpty(blog_type)) {
                params = { ...params, type: blog_type }
            }

            getAllBlogByUserIdApi({ params: params }).then((resp) => {
                if (resp.code === 1000) {
                    setListBlog(resp.data.results)
                }
            })
        } catch (error) {
            console.log('error handleGetAllBlog: ', error)
        } finally {
            if (showLoading === true) {
                setIsLoading(false)
            }
        }
    }

    const handleCreatePost = async (body: ICreateOrUpdateBlog) => {
        try {
            setIsLoading(true)

            const resp = await createBlogApi({ body: body })
            if (resp.data.code === 1000) {
                Swal.fire({
                    allowOutsideClick: false,
                    icon: 'success',
                    title: 'เพิ่มข้อมูลสำเร็จ',
                    timer: 1000
                })
            }

            handleGetAllBlog({
                page: filter.pagination.page,
                per_page: intialData.initial_filter.pagination.per_page,
                search_text: filter.search_value,
                blog_type: filter.type,
                showLoading: true
            })
        } catch (error) {
            console.log('error handleCreatePost: ', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpdateBlog = async ({
        blog_id,
        body
    }: {
        blog_id: string
        body: ICreateOrUpdateBlog
    }) => {
        try {
            setIsLoading(true)

            const resp = await updateBlogApi({
                blog_id: blog_id ?? '',
                body: body
            })
            if (resp.data.code === 1000) {
                Swal.fire({
                    allowOutsideClick: false,
                    icon: 'success',
                    title: 'อัพเดตสำเร็จ',
                    timer: 1000
                })
            }

            handleGetAllBlog({
                page: filter.pagination.page,
                per_page: intialData.initial_filter.pagination.per_page,
                search_text: filter.search_value,
                blog_type: filter.type,
                showLoading: true
            })
        } catch (error) {
            console.log('error handleCreatePost: ', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteBlog = async (blog_id: string) => {
        try {
            setIsLoading(true)

            const resp = await deleteBlogApi({ blog_id: blog_id ?? '' })
            if (resp.data.code === 1000) {
                Swal.fire({
                    allowOutsideClick: false,
                    icon: 'success',
                    title: 'ลบสำเร็จ',
                    timer: 1000
                })
            }

            handleGetAllBlog({
                page: filter.pagination.page,
                per_page: intialData.initial_filter.pagination.per_page,
                search_text: filter.search_value,
                blog_type: filter.type,
                showLoading: true
            })
        } catch (error) {
            console.log('error handleCreatePost: ', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Styled.OurBlogContainer>
            <LoadingDisplay loading={isLoading} />
            <SearchBlog
                handleSearchChange={(search_text) => {
                    setFilter({ ...filter, search_value: search_text })
                    handleGetAllBlog({
                        page: filter.pagination.page,
                        per_page: intialData.initial_filter.pagination.per_page,
                        search_text: search_text,
                        blog_type: filter.type,
                        showLoading: true
                    })
                }}
                handleTypeChange={(type) => {
                    setFilter({ ...filter, type: type })
                    handleGetAllBlog({
                        page: filter.pagination.page,
                        per_page: intialData.initial_filter.pagination.per_page,
                        search_text: filter.search_value,
                        blog_type: type,
                        showLoading: true
                    })
                }}
                handleCreatePost={(data: ICreateOrUpdateBlog) => {
                    handleCreatePost(data)
                }}
            />
            <Blog
                listBlog={listBlog}
                onScrollToBottom={() => {
                    const _per_page = filter.pagination.per_page + 10

                    setFilter({
                        ...filter,
                        pagination: {
                            ...filter.pagination,
                            per_page: _per_page
                        }
                    })

                    handleGetAllBlog({
                        page: filter.pagination.page,
                        per_page: _per_page,
                        search_text: filter.search_value,
                        blog_type: filter.type,
                        showLoading: true
                    })
                }}
                searchValue={filter.search_value}
                onEdit={(blog_id: string, data: ICreateOrUpdateBlog) => {
                    handleUpdateBlog({ blog_id: blog_id, body: data })
                }}
                onDelete={(blog_id: string) => {
                    handleDeleteBlog(blog_id)
                }}
            />
        </Styled.OurBlogContainer>
    )
}

export default OurBlog
