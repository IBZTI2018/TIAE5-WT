export const hasBeenCached = (data) => {
  // Simplified, [] is a valid cached response, but we never use it!
  return data !== undefined && (Array.isArray(data) && data.length !== 0)
}

// Async cache abstraction so user can still chain the response
// of a selector even if its response was loaded from cache
export const fromCache = async (data) => {
  return new Promise((resolve) => resolve(data));
}
