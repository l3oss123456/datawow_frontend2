import React from 'react'
import Styled from './styled'
import { Typography } from '@mui/material'

const HeaderLeftContainer: React.FC = () => {
    return (
        <Styled.LeftContainer>
            <Typography>{'a Board'}</Typography>
        </Styled.LeftContainer>
    )
}

export default HeaderLeftContainer
