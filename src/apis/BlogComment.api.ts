import { AxiosRequestConfig } from 'axios'
import { ENUM } from '../utils/shares/Enum'
import { ApiConfig } from './ApiConfig'
import { FetchingToken } from './FetchingToken'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'

export const getAllBlogCommentApi = async ({
    blog_id,
    params,
    isAlertWhenError = true
}: {
    blog_id: string
    params?: {
        sort_field?: string[]
        sort_order?: number[]
        page?: number
        per_page?: number
    }
    isAlertWhenError?: boolean
}) => {
    try {
        const config: AxiosRequestConfig = {
            method: ENUM.METHOD_TYPE.GET,
            url: ApiConfig.BLOG_COMMENT_API + `/${blog_id}`,
            params: params,
            headers: { Authorization: `Bearer ${Cookies.get('access_token')}` }
        }

        const resp = await FetchingToken(config)
        return resp
    } catch (error: any) {
        if (isAlertWhenError === true) {
            Swal.fire({
                icon: 'error',
                title: 'ERROR !!',
                text: `${error?.message}`
            })
        }

        throw error
    }
}

export const createBlogCommentApi = async ({
    blog_id,
    comment_text,
    isAlertWhenError = true
}: {
    blog_id: string
    comment_text: string
    isAlertWhenError?: boolean
}) => {
    try {
        const config: AxiosRequestConfig = {
            method: ENUM.METHOD_TYPE.POST,
            url: ApiConfig.BLOG_COMMENT_API,
            data: { comment_text: comment_text, blog_id: blog_id },
            headers: { Authorization: `Bearer ${Cookies.get('access_token')}` }
        }
        console.log('configconfig', config)

        const resp = await FetchingToken(config)
        return resp
    } catch (error: any) {
        if (isAlertWhenError === true) {
            Swal.fire({
                icon: 'error',
                title: 'ERROR !!',
                text: `${error?.message}`
            })
        }

        throw error
    }
}
