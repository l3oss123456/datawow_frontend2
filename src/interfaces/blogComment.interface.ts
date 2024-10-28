export interface IBlogCommentApi {
    _id: string
    blog_id: string
    comment_text: string
    deleted_at: null
    created_at: string
    updated_at: string
    user: IBlogCommentUser
}

export interface IBlogCommentUser {
    _id: string
    image: string
    username: string
}
