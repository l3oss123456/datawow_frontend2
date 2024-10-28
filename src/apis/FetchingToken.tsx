import axios, { AxiosRequestConfig } from 'axios'

// import Cookies from 'js-cookie'
// import { ApiConfig } from './ApiConfig'
// import { useNavigate, useParams } from 'react-router-dom'
// import Swal from 'sweetalert2'

// const token = Cookies.get('token');

export const FetchingToken = async (config: AxiosRequestConfig) => {
    try {
        // const headers = {
        //     Authorization: `Bearer ${Cookies.get('access_token')}`
        // }

        const updatedConfig: AxiosRequestConfig = {
            ...config
            // headers: { ...headers }
        }

        const response = await axios(updatedConfig)
        // console.log(response);

        if (config.method === 'get') {
            return response.data
        } else {
            return response
        }
    } catch (error: any) {
        if (error.response) {
            // if (error.response.status === 403) {
            // try {

            //     const removeAllCookies = async  () => {
            //         let cookies = document.cookie.split(";");

            //         for await (const item of cookies) {
            //         let cookie = item
            //           let eqPos = cookie.indexOf("=");
            //           let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            //           document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            //         }
            //       }

            //    removeAllCookies()

            //    Swal.fire({
            //     icon: 'error',
            //     title: `หมดเวลาการเข้าใช้ระบบ !`
            //     // text: `${res.data.message}`,
            // });
            //   await new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //         resolve(true);

            //     }, 5000);
            // });
            // window.location.reload();
            // } catch (refreshError) {
            //     throw {
            //         message: error?.response?.data?.message,
            //         code: error.response.status
            //     };

            // }
            // } else if(error.response.status >= 500) {
            //     throw {
            //         message: error?.response?.data?.message,
            //         code: error.response.status
            //     };
            // }else {
            throw {
                message:
                    error?.response?.data?.message || error?.response?.data,
                code: error.response.status
            }
            // }
        } else if (error.request) {
            throw {
                message: error.message,
                code: 400
            }
        } else {
            throw {
                message:
                    'Something happened in setting up the request that triggered an Error',
                code: 0
            }
        }
    }
}
