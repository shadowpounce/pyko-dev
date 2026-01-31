const videosPars = {
    videos: [
        // 
        {
            src: 'videos/sec1-2/sec1-2-720p.mp4',
            stages: [
                {
                    activeSectionIndex: 0,
                    properties: {
                        pingPong: { from: 0.0, to: 1.4 },
                        moveToNextSpeed: 2,
                    },
                },
                {
                    activeSectionIndex: 1,
                    properties: {
                        pingPong: { from: 7.0, to: 8.0 },
                        moveToNextSpeed: 3,
                        moveToPrevSpeed: 1,
                    },
                },
            ],
        },
        {
            src: 'videos/sec3-480p.mp4',
            activeSectionIndex: 2,
            properties: { moveToLastFrameAndStop: true },
        },
        {
            src: 'videos/sec-6/sec6-720p.mp4',
            activeSectionIndex: 5,
            properties: { loop: true },
        },
        {
            src: 'videos/sec-7/sec7-720p.mp4',
            activeSectionIndex: 6,
            properties: { pingPong: { from: 5.0, to: 7.0 } },
        },
        {
            src: 'videos/sec8-9-10/sec8-9-10-720p.mp4',
            stages: [
                { activeSectionIndex: 7, properties: { stopAt: 1.5 } },
                { activeSectionIndex: 8, properties: { stopAt: 2.5 } },
                { activeSectionIndex: 9, properties: { stopAtLastFrame: true } },
            ],
        },
    ],
    overlay: { defaultSpeed: 2 },
    reverse: {
        REVERSE_STEP_BASE_SEC: 0.05,
        REVERSE_FALLBACK_INTERVAL_MS: 30,
    }
}