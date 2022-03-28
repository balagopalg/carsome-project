/**
 * Returns false if the string exceeds the limit specified
 *
 * @param {string} text
 * @param {number} [limit]
 * @return {*}  {boolean}
 */
export const validateFreeText = (text: string, limit?: number): boolean => {
  let maxLength = 100
  if (limit !== undefined) maxLength = limit
  if (text.length > maxLength) return false
  return true
}

/**
 * Returns false if the decimal position is greater than two
 *
 * @param {string} number
 * @param {number} [limit]
 * @return {*}  {boolean}
 */
export const decimalCount = (number: string, limit?: number): boolean => {
  const text = number.toString()
  const index = text.indexOf('.')
  if (text.length - index - 1 > limit) return false
  return true
}

/**
 * Generate the current time in unix
 *
 * @return {*}  {number}
 */
export const _generateTimestamp = (): number => {
  return Date.now()
}
