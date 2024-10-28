import React from 'react'
import HeaderLayout from './HeaderLayout'
import { Box } from '@mui/material'
import SiderLayout from './SiderLayout'
import Styled from './styled'

interface ILayoutProps {
    children: React.ReactNode | null
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
    return (
        <Box>
            <HeaderLayout />

            <Styled.SiderAndContentContent>
                <SiderLayout />
                <Styled.ChildrenContainer>{children}</Styled.ChildrenContainer>
            </Styled.SiderAndContentContent>
        </Box>
    )
}

export default Layout
