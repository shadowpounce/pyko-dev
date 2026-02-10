export type PageType = string;

export interface VideoConfig {
    id: number;
    src: string;
    poster?: string;
    loop?: boolean;
}

export interface VideosOverlayProps {
    page: PageType;
}

export interface VideoLogicProps {
    videoRefs: React.RefObject<HTMLVideoElement | null>[];
    currentSectionIndex: number;
    overlayToggleRef: React.RefObject<HTMLDivElement>;
}
