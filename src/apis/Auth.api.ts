import { AxiosRequestConfig } from 'axios'
import Swal from 'sweetalert2'
import { ENUM } from '../utils/shares/Enum'
import { ApiConfig } from './ApiConfig'
import { FetchingToken } from './FetchingToken'

export const loginApi = async ({
    username = '',
    isAlertWhenError = true
}: {
    username: string
    isAlertWhenError?: boolean
}) => {
    try {
        const config: AxiosRequestConfig = {
            method: ENUM.METHOD_TYPE.POST,
            url: ApiConfig.AUTH_API,
            data: { username: username }
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
