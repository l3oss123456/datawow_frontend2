import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { Box, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { ISiderMenu } from '../../../interfaces/layout.interface'
import { JSiderMenu } from '../../../utils/globalStates/layout.globalState'
import Styled from './styled'

const SiderLayout: React.FC = () => {
    const [listSiderMenu] = useAtom(JSiderMenu)
    const navigate = useNavigate()
    const location = useLocation()

    const [menuSelected, setMenuSelected] = useState(listSiderMenu[0].name)

    const handleClickMenu = (menu: ISiderMenu) => {
        setMenuSelected(menu.name)
        navigate(menu.path)
    }

    useEffect(() => {
        if (location?.pathname) {
            const f = listSiderMenu.find((me) => me.path === location.pathname)
            if (f) {
                handleClickMenu(f)
            }
        }
    }, [])

    return (
        <Styled.SiderContainer>
            <Styled.MenuContainer>
                {listSiderMenu.map((menu: ISiderMenu, index: number) => {
                    return (
                        <Styled.MenuWrapper
                            key={index}
                            isSelected={menu.name === menuSelected}
                            onClick={() => {
                                handleClickMenu(menu)
                            }}
                        >
                            <Box>{menu.icon}</Box>
                            <Typography>{menu.name}</Typography>
                        </Styled.MenuWrapper>
                    )
                })}
            </Styled.MenuContainer>
        </Styled.SiderContainer>
    )
}

export default SiderLayout
