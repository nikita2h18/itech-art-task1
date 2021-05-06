export const isRelative = (link) => link[0] === '/';
export const isSlashLast= (link) => link[link.length - 1] === '/';
export const deleteLastSlash = (link) => link.substring(0, link.length - 1)