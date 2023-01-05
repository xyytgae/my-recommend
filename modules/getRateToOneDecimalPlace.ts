/**
 * 小数点第一位までの割合を求める
 * @param dividend
 * @param divisor
 * @returns
 */
export const getRateToOneDecimalPlace = (dividend: number, divisor: number) => {
  return Math.round((dividend / divisor) * 1000) / 10
}
