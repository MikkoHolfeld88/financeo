export enum STATUS {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCEEDED = 'succeeded',
    FAILED = 'failed',
}

export type Status = STATUS.IDLE | STATUS.LOADING | STATUS.SUCCEEDED | STATUS.FAILED;
