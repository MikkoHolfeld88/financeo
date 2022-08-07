import React, {useCallback, useEffect, useState} from "react";

export const useResize = (myRef: any) => {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    const handleResize = useCallback(() => {
        setWidth(myRef.current.offsetWidth)
        setHeight(myRef.current.offsetHeight)
    }, [myRef])

    useEffect(() => {
        window.addEventListener('load', handleResize)
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('load', handleResize)
            window.removeEventListener('resize', handleResize)
        }
    }, [myRef, handleResize])

    return { width, height }
}