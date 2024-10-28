export interface IBlogApi {
    _id: string
    image: string
    username: string
    type: string
    title: string
    description: string
    // list_comment: IBlogComment[]
    list_comment_count: number
    created_at: string
    updated_at: string
    deleted_at: string | null
}

// export interface IBlogComment {
//     name: string
//     image: string
//     comment_text: string
//     created_at: string
//     updated_at: string
// }

export interface ICreateOrUpdateBlog {
    type: string
    title: string
    description: string
}
