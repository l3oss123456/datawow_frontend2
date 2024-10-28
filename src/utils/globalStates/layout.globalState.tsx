import { atom } from 'jotai'
import { EditCalendar, Home } from '@mui/icons-material'
import { ISiderMenu } from '../../interfaces/layout.interface'

export const JSiderMenu = atom<ISiderMenu[]>([
    {
        name: 'Home',
        icon: <Home />,
        path: '/home'
    },
    {
        name: 'Our Blog',
        icon: <EditCalendar />,
        // path: "/our-blog",
        path: '/our-blog'
    }
])
