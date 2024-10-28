import styled from 'styled-components'
import { colors } from '../../configs/theme'
import responsive from '../../configs/responsive.json'
import { Box } from '@mui/material'

export default {
    SiderAndContentContent: styled(Box)`
        display: flex;
        width: 100%;
        background-color: ${colors.base.grey100};

        // @media (max-width: ${responsive.sm.min}px) {
        //   display: flex;
        // }
    `,

    ChildrenContainer: styled(Box)`
        padding: 30px 32px 15px;
        // width: 78%;
        // height: 80vh;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        // overflow-y: auto;
    `
}
