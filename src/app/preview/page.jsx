import PreviewHome from '@/components/preview/PreviewHome'
import React, { Suspense } from 'react'

const PreviewPage = () => {
    return (
        <>
            <Suspense fallback={<div>Loading preview...</div>}>
                <PreviewHome />
            </Suspense>
        </>
    )
}

export default PreviewPage