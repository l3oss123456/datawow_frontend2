import styled from 'styled-components'
import { colors } from '../../../configs/theme'
import responsive from '../../../configs/responsive.json'
import { Box } from '@mui/material'

export default {
    SiderContainer: styled(Box)`
        background-color: #bbc2c0;
        color: ${colors.base.white};
        padding: 30px 32px 15px;
        display: flex;
        justify-content: center;
        width: 180px;
        height: 100vh;

        @media (max-width: ${responsive.sm.max}px) {
            display: none;
        }
        @media (max-width: ${responsive.lg.max}px) {
            width: 200px;
        }
        @media (max-width: ${responsive.md.max}px) {
            width: 150px;
        }
    `,

    MenuContainer: styled(Box)`
        display: flex;
        flex-direction: column;
        gap: 20px;
    `,

    MenuWrapper: styled(Box)<any>`
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        color: ${colors.main.green500};

        p {
            font-size: ${(props) => {
                return props.isSelected === true ? '16px' : '14px'
            }} !important;
            line-height: 24px;
            font-weight: ${(props) =>
                props.isSelected === true ? 800 : 100} !important;
            transition: all 0.1s ease-in-out;
        }
    `
}
