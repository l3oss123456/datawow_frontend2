import { createTheme } from '@mui/material'
import { green } from '@mui/material/colors'

export const colors = {
    main: {
        green500: '#243831',
        green300: '#2B5F44',
        green100: '#D8E9E4'
    },
    base: {
        black: '#000000',
        white: '#FFFFFF',
        text: '#191919',
        grey100: '#BBC2C0',
        grey300: '#939494',
        grey900: '#111927',
        success: '#49A569'
    }
}
export const fontFamily = {
    // primary: "ProximaNova-Regular",
    // primaryBold: "Proxima Nova Bold",

    primary: 'Kanit',
    primaryBold: 'Kanit-Bold'
}
export const textThemeColor = {
    light: '#000000',
    dark: '#ffffff'
}
export const fontSize = {
    mainTitle: `clamp(38px, 5vw, 42px)`,
    title: `clamp(24px, 2.5vw, 28px)`,
    subTitle: `clamp(18px, 2vw, 20px)`,
    text: `16px`,
    details: `12px`
}

export const muiTheme = createTheme({
    typography: {
        fontFamily: ['IBM Plex Sans'].join(','),
        h1: {
            fontWeight: 'bold',
            fontSize: '1em', // 100% of font size
            lineHeight: 1,
            letterSpacing: '0.00735em' // Assuming 'em' unit based on font size
        },
        h2: {
            fontWeight: 700,
            fontSize: '1em',
            lineHeight: 1,
            letterSpacing: '0.00735em' // Assuming 'em' unit based on font size
        },
        h3: {
            fontWeight: 700,
            fontSize: '1em',
            lineHeight: 1,
            letterSpacing: '0.00735em' // Assuming 'em' unit based on font size
        },
        h4: {
            fontWeight: 700,
            fontSize: '34px',
            lineHeight: 1.7,
            letterSpacing: '0.00735em' // Assuming 'em' unit based on font size
        },
        h5: {
            fontWeight: 700,
            fontSize: '24px',
            lineHeight: 1.7,
            letterSpacing: '0.00735em' // Assuming 'em' unit based on font size
        },
        h6: {
            fontWeight: 200,
            fontSize: '20px',
            lineHeight: 1.7,
            letterSpacing: '0.00735em' // Assuming 'em' unit based on font size
        },
        subtitle1: {
            // Assuming equivalent to 'subtitleL' in the table
            fontWeight: 500,
            fontSize: '1em',
            lineHeight: 1.5,
            letterSpacing: '0.00735em' // Assuming 'em' unit based on font size
        },
        subtitle2: {
            // Assuming equivalent to 'subtitleM' in the table
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: 1.5,
            letterSpacing: '0.00735em' // Assuming 'em' unit based on font size
        },
        body1: {
            fontWeight: 400,
            fontSize: '1em',
            lineHeight: 1.4,
            letterSpacing: '0.00735em' // Assuming 'em' unit based on font size
        },
        body2: {
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: 1.4,
            letterSpacing: '0.00735em' // Assuming 'em' unit based on font size
        },
        caption: {
            fontWeight: 700,
            fontSize: '12px',
            lineHeight: 1.476,
            letterSpacing: '0.00735em' // Assuming 'em' unit based on font size
        }
        // button: {

        //   fontWeight: 500,
        //   fontSize: "1em", // Assuming consistent font size for buttons
        //   lineHeight: 1,
        //   letterSpacing: "0.005em", // Assuming 'em' unit based on font size
        // },
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontSize: 12,
                    lineClamp: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    minWidth: '130px',
                    // borderRadius: "4px",
                    // padding: "8px 16px",
                    // fontWeight:500,
                    // wordWrap: 'break-word',
                    // // Example of using theme variables
                    // fontSize: 14,
                    backgroundColor: colors.base.white,
                    color: colors.base.text,
                    '&.Mui-disabled': {
                        background: '#E1E1E1', // or any other style for disabled state
                        color: '#BDBDBD'
                    }
                },
                sizeSmall: {
                    height: 28
                },
                sizeMedium: {
                    height: 36
                },
                sizeLarge: {
                    height: 44
                }
            },
            variants: [
                {
                    props: { variant: 'contained', color: 'primary' },
                    style: {
                        background:
                            'linear-gradient(90deg, #5DC0EA 12%, #7AD2F8 60%, #A3E1FC 100%)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#2AA7DC'
                        }
                    }
                },
                {
                    props: { variant: 'contained', color: 'warning' },
                    style: {
                        background:
                            'linear-gradient(90deg, #EFBE0F 0%, #F6DA77 100%)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#EACA12'
                        }
                    }
                },
                {
                    props: { variant: 'contained', color: 'success' },
                    style: {
                        background:
                            'linear-gradient(90deg, #00A56B 0%, #18D794 100%)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#1A8962'
                        }
                    }
                },
                {
                    props: { variant: 'contained', color: 'secondary' },
                    style: {
                        background:
                            'linear-gradient(90deg, #246784 0%, #4F8197 100%)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#113E51'
                        }
                    }
                },
                {
                    props: { variant: 'outlined', color: 'primary' },

                    style: {
                        border: '1px #5DC0EA solid',
                        color: '#5DC0EA',
                        '&:hover': {
                            backgroundColor: '#EFFAFF',
                            border: '1px #0172A2 solid',
                            color: '#246784'
                        }
                    }
                },
                {
                    props: { variant: 'outlined', color: 'error' },
                    style: {
                        border: '1px #FE3C22 solid',
                        color: '#FE3C22',
                        '&:hover': {
                            backgroundColor: '#FFF7F7',
                            border: '1px #EB3D3D solid',
                            color: '#FE3C22'
                        }
                    }
                },
                {
                    props: { variant: 'outlined', color: 'info' },
                    style: {
                        border: '1px #B0B0B0 solid',
                        color: '#525252',
                        '&:hover': {
                            backgroundColor: '#F8F8F8',
                            border: '1px #113E51 solid',
                            color: '#212121'
                        }
                    }
                }
            ]
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    fontSize: 14
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        border: '1px #BDBDBD solid',
                        backgroundColor: '#F5F5F5', // Custom background color
                        color: '#525252' // Custom text color
                    }
                }
            }
        }
    },
    palette: {
        primary: {
            main: '#5DC0EA'
            // 100: "#EFFAFF",
            // 200: "#2AA7DC",
            // 300: "#3D93B7",
            // 400: "#246784",
            // 500: "#113E51",
        },
        error: {
            main: '#FE6622'
        },
        info: {
            main: '#4580B2'
        },
        success: {
            main: '#00A56B'
        },
        warning: {
            main: '#EFBE0F'
        }
    }
})

// export default {
//   colors,
//   fontFamily,
//   textThemeColor,
//   fontSize,
// };
