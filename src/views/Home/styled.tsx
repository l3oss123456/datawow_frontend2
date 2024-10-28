import styled from 'styled-components'
import { Box } from '@mui/material'
import responsive from '../../configs/responsive.json'

export default {
    HomeContainer: styled(Box)`
        width: 60vw;

        @media (max-width: ${responsive.md.max}px) {
            width: 70vw;
        }
        @media (max-width: ${responsive.sm.max}px) {
            width: 100%;
        }
    `
}
