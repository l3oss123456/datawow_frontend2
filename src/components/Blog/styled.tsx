import { Box, Button, Typography } from '@mui/material'
import styled from 'styled-components'
import { colors } from '../../configs/theme'

export default {
    BlogContainer: styled(Box)`
        background-color: ${colors.base.white};
        border-radius: 12px;
        // min-height: 100vh;
        // max-height: max-content;
        // height: 100vh;
        height: 80vh;
        // height: 500px;
        min-width: 70vw;
        overflow-y: scroll;
    `,

    BlogCard: styled(Box)`
        padding: 20px;
        gap: 15px;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid ${colors.base.grey100};
        transition: all 0.3s ease-in-out;

        // &:hover {
        //     opacity: 0.6;
        // }
    `,

    BlogNameContainer: styled(Box)`
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    `,
    BlogNameWrapper: styled(Box)`
        display: flex;
        align-items: center;
        gap: 10px;

        img {
            width: 31px;
            height: 31px;
            border-radius: 50%;
        }

        p {
            font-size: 14px;
            font-weight: 400px;
            color: ${colors.base.grey300};
        }
    `,
    BlogEditAndDeleteWrapper: styled(Box)`
        display: flex;
        align-items: center;
        gap: 20px;

        svg {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
    `,

    BlogTypeWrapper: styled(Box)`
        background-color: #f3f3f3;
        border-radius: 16px;
        padding: 4px 8px;
        width: max-content;

        p {
            color: ${colors.base.grey300};
            font-size: 10px;
        }
    `,

    BlogContentWrapper: styled(Box)`
        display: flex;
        flex-direction: column;
        gap: 5px;
        cursor: pointer;
    `,

    // BlogContentTitle: styled(Typography)`
    //     font-weight: 600px !important;
    //     font-size: 16px !important;
    //     line-height: 24px !important;
    //     color: #101828 !important;
    // `,

    BlogContentTitleWrapper: styled(Box)`
        display: flex;

        p {
            font-weight: 600px !important;
            font-size: 16px !important;
            line-height: 24px !important;
            color: #101828 !important;
        }
    `,

    BlogContentDescription: styled(Typography)`
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        white-space: normal;

        font-weight: 400px !important;
        font-size: 12px !important;
        line-height: 14.52px !important;
        color: #101828 !important;
    `,

    BlogCommentWrapper: styled(Box)`
        display: flex;
        align-items: center;
        gap: 5px;

        p,
        svg,
        img {
            color: ${colors.base.grey300};
            font-size: 12px;
            font-weight: 400px;
        }
    `,

    BlogDetailBackBtn: styled(Box)`
        width: max-content;
        background-color: ${colors.base.grey100};
        border-radius: 50%;
        padding: 10px;
        gap: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
            color: ${colors.base.black};
        }
    `,

    BlogDetailNameWrapper: styled(Box)`
        margin-top: 30px;
        display: flex;
        align-items: center;
        gap: 10px;

        img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
        }
    `,

    BlogDetailTimeText: styled(Typography)`
        font-weight: 400px;
        font-size: 12px;
        line-height: 14.52px;
    `,
    BlogDetailTypeWrapper: styled(Box)`
        margin-top: 10px;
        background-color: #f3f3f3;
        border-radius: 16px;
        padding: 4px 8px;
        width: max-content;

        p {
            color: ${colors.base.grey300};
            font-size: 12px;
        }
    `,

    BlogDetailContentWrapper: styled(Box)`
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    `,
    BlogDetailContentTitle: styled(Typography)`
        font-weight: 600px !important;
        font-size: 28px !important;
        line-height: 24px !important;
        color: #101828 !important;
        line-height: 34px !important;
    `,
    BlogDetailContentDescription: styled(Typography)`
        font-weight: 400px !important;
        font-size: 12px !important;
        line-height: 14.52px !important;
        color: #101828 !important;
    `,

    BlogDetailCommentWrapper: styled(Box)`
        margin-top: 20px;
        display: flex;
        align-items: center;
        gap: 10px;

        p,
        svg {
            color: ${colors.base.grey300};
            font-size: 14px;
            font-weight: 400px;
            line-height: 14.52px;
        }

        img {
            width: 16px;
            height: 16px;
        }
    `,

    AddCommentBtn: styled(Button)`
        border-radius: 8px;
        border: 1px solid ${colors.base.success} !important;
        width: 132px;
        height: 40px;
        padding: 10px 16px;
        p {
            color: ${colors.base.success};
        }
    `,

    BlogDetailContainer: styled(Box)`
        display: flex;
        padding: 20px;
        gap: 10px;

        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    `,

    BlogDetailCard: styled(Box)`
        gap: 15px;
        display: flex;
        flex-direction: column;
        transition: all 0.3s ease-in-out;
    `,

    BlogDetailCommentNameWrapper: styled(Box)`
        padding-top: 10px;
        display: flex;
        align-items: center;
        gap: 10px;

        // p {
        //     font-size: 14px;
        //     font-weight: 500px;
        //     color: ${colors.base.text};
        // }
    `,

    BlogDetailCommentTextWrapper: styled(Box)`
        display: flex;
        align-items: center;
        gap: 5px;

        p,
        svg,
        img {
            color: ${colors.base.text};
            font-size: 14px;
            font-weight: 400px;
        }
    `,

    BlogDetailAddCommentWindowFormContainer: styled(Box)`
        display: flex;
        flex-direction: column;

        div {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }

        button {
            width: 105px;
            height: 40px;
            border-radius: 8px;
        }
    `,

    ButtonCancelAddComment: styled(Button)`
        border: 1px solid ${colors.base.success} !important;

        p {
            color: ${colors.base.success};
        }
    `,
    ButtonPostAddComment: styled(Button)`
        border: 1px solid ${colors.base.success} !important;
        background-color: ${colors.base.success} !important;

        p {
            color: ${colors.base.white};
        }
    `
}
