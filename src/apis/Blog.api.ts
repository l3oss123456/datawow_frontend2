import { AxiosRequestConfig } from 'axios'
import { ENUM } from '../utils/shares/Enum'
import { ApiConfig } from './ApiConfig'
import { FetchingToken } from './FetchingToken'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { ICreateOrUpdateBlog } from '../interfaces/blog.interface'
import { ConvertJsonToFormData } from '../utils/funcs/shareFunction'

export const getAllBlogApi = async ({
    params,
    isAlertWhenError = true
}: {
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
            url: ApiConfig.BLOG_API,
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

export const getOneBlogApi = async ({
    blog_id,
    isAlertWhenError = true
}: {
    blog_id: string
    isAlertWhenError?: boolean
}) => {
    try {
        const config: AxiosRequestConfig = {
            method: ENUM.METHOD_TYPE.GET,
            url: ApiConfig.BLOG_API + `/${blog_id}`,
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

export const getAllBlogByUserIdApi = async ({
    params,
    isAlertWhenError = true
}: {
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
            url: ApiConfig.BLOG_API + `/get-by-user`,
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

export const createBlogApi = async ({
    body,
    isAlertWhenError = true
}: {
    body: ICreateOrUpdateBlog
    isAlertWhenError?: boolean
}) => {
    try {
        const data = ConvertJsonToFormData(body)

        const config: AxiosRequestConfig = {
            method: ENUM.METHOD_TYPE.POST,
            url: ApiConfig.BLOG_API,
            data: data,
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

export const updateBlogApi = async ({
    blog_id,
    body,
    isAlertWhenError = true
}: {
    blog_id: string
    body: ICreateOrUpdateBlog
    isAlertWhenError?: boolean
}) => {
    try {
        const data = ConvertJsonToFormData(body)

        const config: AxiosRequestConfig = {
            method: ENUM.METHOD_TYPE.PATCH,
            url: ApiConfig.BLOG_API + `/${blog_id}`,
            data: data,
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

export const deleteBlogApi = async ({
    blog_id,
    isAlertWhenError = true
}: {
    blog_id: string
    isAlertWhenError?: boolean
}) => {
    try {
        const config: AxiosRequestConfig = {
            method: ENUM.METHOD_TYPE.DELETE,
            url: ApiConfig.BLOG_API + `/${blog_id}`,
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
