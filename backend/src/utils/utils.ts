export const validateFreeText = (text: string, limit?: number): boolean => {
    let maxLength = 500
    if (limit !== undefined) maxLength = limit
    if (text.length > maxLength) return false
    return true
}

export const decimalCount = (number: string, limit?: number): boolean => {
    var text = number.toString();
    var index = text.indexOf(".");
    if(text.length - index - 1 > limit) return false
    return true
}

export const _generateTimestamp = (): number => {
    return Date.now()
  }