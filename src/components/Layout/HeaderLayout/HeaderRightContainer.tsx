import React, { useEffect, useState } from 'react'
import * as R from 'ramda'
import { Box, Typography, MenuItem } from '@mui/material'
import Menu from '@mui/material/Menu'
import { useAtom } from 'jotai'
import { Link, useLocation } from 'react-router-dom'
import { Dehaze, East, Logout } from '@mui/icons-material'
import tempAvatar from '../../../assets/image/layout/Avatar.png'
import { useWindowSize } from '../../../utils/funcs/shareFunction'
import responsive from '../../../configs/responsive.json'
import { JSiderMenu } from '../../../utils/globalStates/layout.globalState'
import { ISiderMenu } from '../../../interfaces/layout.interface'
import Styled from './styled'

const HeaderRightContainer: React.FC = () => {
    const [listSiderMenu] = useAtom(JSiderMenu)
    // const [selectedMobileMenu, setSelectedMobileMenu] = useState<string>("");
    const settings = [
        { icon: '', name: 'Logout', onClick: () => handleLogout() }
    ]
    const { windowWidth } = useWindowSize()

    const location = useLocation()
    const pathname = location?.pathname ?? ''

    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    )

    // useEffect(() => {
    //   if (!R.isEmpty(pathname)) {
    //     setSelectedMobileMenu(pathname);
    //   }
    // }, [pathname]);

    const handleLogout = () => {
        const removeAllCookies = async () => {
            let cookies = document.cookie.split(';')

            for await (const item of cookies) {
                let cookie = item
                let eqPos = cookie.indexOf('=')
                let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
                document.cookie =
                    name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            }
        }

        removeAllCookies()
        window.location.reload()
    }

    useEffect(() => {
        const handleCheckCloseDrawer = () => {
            if (windowWidth > responsive.sm.min) {
                onCloseDrawer()
            }
        }

        handleCheckCloseDrawer()
    }, [windowWidth])

    const onCloseDrawer = () => {
        setOpenDrawer(false)
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const renderDeskTopLeftContainer = () => {
        return (
            <Styled.DesktopRightContainer>
                <Typography>{'Jassica'}</Typography>

                <img
                    src={tempAvatar}
                    draggable={false}
                    onClick={handleOpenUserMenu}
                    style={{ cursor: 'pointer' }}
                />
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting.name} onClick={setting.onClick}>
                            <Typography textAlign="center">
                                {setting.name}
                            </Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Styled.DesktopRightContainer>
        )
    }

    const renderMobileRightContainer = () => {
        return (
            <Styled.MobileRightContainer>
                <Dehaze
                    onClick={() => {
                        setOpenDrawer(true)
                    }}
                />

                <Styled.MobileDrawerContainer
                    placement={'right'}
                    width={'80vw'}
                    onClose={onCloseDrawer}
                    open={openDrawer}
                    closeIcon={<East />}
                    footer={
                        <Box
                            onClick={handleLogout}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                            }}
                        >
                            <Logout />
                            <Typography sx={{ color: 'white' }}>
                                {'Log out'}
                            </Typography>
                        </Box>
                    }
                >
                    {listSiderMenu.map((menu: ISiderMenu, index: number) => {
                        return (
                            <Link to={menu.path} key={index}>
                                <Styled.MobileRightHeaderMenu
                                    isSelectedMenu={menu.path === pathname}
                                    sx={{
                                        marginTop: index > 0 ? '10px' : '0px'
                                    }}
                                >
                                    <Box>{menu.icon}</Box>
                                    <Typography>{menu.name}</Typography>
                                </Styled.MobileRightHeaderMenu>
                            </Link>
                        )
                    })}
                </Styled.MobileDrawerContainer>
            </Styled.MobileRightContainer>
        )
    }

    return (
        <Box>
            {renderDeskTopLeftContainer()}
            {renderMobileRightContainer()}
        </Box>
    )
}

export default HeaderRightContainer
