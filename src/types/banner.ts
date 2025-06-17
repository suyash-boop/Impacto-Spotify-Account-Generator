export type BannerState = 'loading' | 'idle';

export type Banner = {
    position: {
        x: 'left' | 'center' | 'right';
        y: 'top' | 'middle' | 'bottom';
    };
    meta?: {
        version?: string;
        description?: string;
    };
}