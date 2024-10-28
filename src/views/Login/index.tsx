import React from 'react'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import LoginComponent from '../../components/Login'
import { IUseForm } from '../../interfaces/useForm.interface'
import Styled from './styled'
// import { useNavigate } from 'react-router-dom'
import { loginApi } from '../../apis/Auth.api'

const LoginPage: React.FC = () => {
    // const navigate = useNavigate()
    const _useForm = useForm<any>({
        defaultValues: {}
    }) as IUseForm

    const {
        handleSubmit
        // formState: { errors },
    } = _useForm

    return (
        <form
            onSubmit={handleSubmit(async (value) => {
                if (value?.username) {
                    await loginApi({
                        username: value?.username ?? ''
                    }).then((resp) => {
                        if (resp?.data?.code === 1000) {
                            Cookies.set(
                                'access_token',
                                resp?.data?.data?.results?.access_token
                            )

                            Swal.fire({
                                allowOutsideClick: false,
                                icon: 'success',
                                title: 'login สำเร็จ',
                                // timer: 3000,
                                preConfirm: () => {
                                    window.location.reload()
                                    // navigate('/home')
                                }
                            })
                        }
                    })
                }
            })}
        >
            <Styled.Container>
                <LoginComponent useForm={_useForm} />
            </Styled.Container>
        </form>
    )
}

export default LoginPage
