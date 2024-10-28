import { useEffect, useState } from 'react'
import * as R from 'ramda'
import responsive from '../../configs/responsive.json'

export const useWindowSize = (): {
    windowWidth: number
    windowHeight: number
} => {
    const [windowSize, setWindowSize] = useState<{
        windowWidth: number
        windowHeight: number
    }>({
        windowWidth: 0,
        windowHeight: 0
    })

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight
            })
        }
        // Add event listener
        window.addEventListener('resize', handleResize)
        // Call handler right away so state gets updated with initial window size
        handleResize()
        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize)
    }, []) // Empty array ensures that effect is only run on mount

    return windowSize
}

export const getBlobUrl = (file: File) => {
    if (file) {
        const blobUrl = URL.createObjectURL(file)
        return blobUrl
    }

    return ''
}

export const downloadFile = ({
    file = null,
    download_file_name = null
}: {
    file: File | null
    download_file_name?: string | null
}) => {
    try {
        if (file instanceof File) {
            const url = window.URL.createObjectURL(file)
            const a = document.createElement('a')
            a.href = url
            if (!R.isEmpty(download_file_name)) {
                a.download = download_file_name ?? ''
            }
            a.download = file.name
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
        } else {
            console.error('Invalid file provided')
        }
    } catch (error) {
        console.error('Error downloading file:', error)
    }
}

export const isMobile = (): boolean => {
    const { windowWidth } = useWindowSize()
    return windowWidth < responsive.sm.max
}

export const ConvertJsonToFormData = (json_data: any = {}) => {
    const form_data = new FormData()

    Object.keys(json_data).forEach((key: any) => {
        if (
            !Array.isArray(json_data[key])
            // && typeof json_data[key] !== "object"
        ) {
            form_data.append(key, json_data[key])
        } else {
            form_data.append(key, JSON.stringify(json_data[key]))
        }
    })

    return form_data
}
