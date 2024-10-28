export const blogFormatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime() // Ensure we're getting a number here

    const diffSeconds = Math.floor(diffMs / 1000)
    const diffMinutes = Math.floor(diffSeconds / 60)
    const diffHours = Math.floor(diffMinutes / 60)
    const diffDays = Math.floor(diffHours / 24)
    const diffMonths = Math.floor(diffDays / 30)

    if (diffSeconds < 60) {
        return 'now' // less than 1 minute, show "now"
    } else if (diffMinutes < 60) {
        return `${diffMinutes} mins ago` // less than 1 hour, show minutes
    } else if (diffDays < 1) {
        return `${diffHours}h ago` // same day, show hours
    } else if (diffDays < 30) {
        return `${date.getDate().toString().padStart(2, '0')}/${(
            date.getMonth() + 1
        )
            .toString()
            .padStart(2, '0')}/${date.getFullYear()}`
    } else {
        return `${diffMonths} mo. ago`
    }
}
