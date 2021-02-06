export const hasBeenCached = (data) => {
  // Simplified, [] is a valid cached response, but we never use it!
  return data !== undefined && (Array.isArray(data) && data.length !== 0)
}
