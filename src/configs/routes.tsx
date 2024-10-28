import BlogDetail from '../components/Blog/BlogDetail'
import { ICustomRouteObj } from '../interfaces/route.interface'
import HomePage from '../views/Home/index'
import NotFoundPage from '../views/NotFoundPage'
import OurBlog from '../views/OurBlog'

export const routesConfig: {
    publicRoute: ICustomRouteObj[]
    privateRoute: ICustomRouteObj[]
} = {
    publicRoute: [
        {
            route: {
                path: '*',
                element: <NotFoundPage />
            }
        }
    ],
    privateRoute: [
        {
            route: {
                path: '/home',
                element: <HomePage />
                // isRenderLayout: false,
            }
        },
        {
            route: {
                path: '/blog/:blog_id',
                element: <BlogDetail />
                // isRenderLayout: false,
            }
        },
        {
            route: {
                path: '/our-blog',
                element: <OurBlog />
                // isRenderLayout: false,
            }
        }
    ]
}
