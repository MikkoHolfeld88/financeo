export const noPadding = (value: boolean | undefined) => {
    return value && "no-padding";
};

export const textAlign = (value: string | undefined) => {
    return value && `text-align-${value}`;
};
