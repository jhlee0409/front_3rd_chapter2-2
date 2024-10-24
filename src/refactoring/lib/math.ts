export const clamp = (min: number, value: number, max: number) => Math.max(min, Math.min(value, max));

export const preciseMultiply = (num: number) => Math.round(num * 100);

export const percentageToDecimal = (percent: number, decimal?: number) => (percent / 100).toFixed(decimal ?? 0);
