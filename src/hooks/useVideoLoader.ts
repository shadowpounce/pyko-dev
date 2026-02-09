import { useState, useEffect, useRef } from 'react'

export const useVideoLoader = (videoSources: string[]) => {
    const [videoUrls, setVideoUrls] = useState<Record<string, string>>({})
    const [isLoaded, setIsLoaded] = useState(false)
    const urlsRef = useRef<string[]>([])

    useEffect(() => {
        let isMounted = true

        const loadVideos = async () => {
            const newUrls: Record<string, string> = {}

            const promises = videoSources.map(async (src) => {
                try {
                    const response = await fetch(src)
                    const blob = await response.blob()
                    const objectUrl = URL.createObjectURL(blob)

                    if (isMounted) {
                        newUrls[src] = objectUrl
                        urlsRef.current.push(objectUrl)
                    } else {
                        // Если компонент размонтирован, сразу очищаем ресурсы
                        URL.revokeObjectURL(objectUrl)
                    }
                } catch (error) {
                    console.error(`Failed to load video ${src}`, error)
                    // В случае ошибки используем исходный URL как запасной вариант
                    if (isMounted) {
                        newUrls[src] = src
                    }
                }
            })

            await Promise.all(promises)

            if (isMounted) {
                setVideoUrls(newUrls)
                setIsLoaded(true)
            }
        }

        loadVideos()

        return () => {
            isMounted = false
            urlsRef.current.forEach(url => URL.revokeObjectURL(url))
            urlsRef.current = []
        }
    }, []) // Run once on mount

    return { videoUrls, isLoaded }
}
