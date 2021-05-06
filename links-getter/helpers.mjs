export const isRelative = (link) => link.startsWith('/');
export const isSlashLast = (link) => link[link.length - 1] === '/';
export const deleteLastSlash = (link) => {
    if (isSlashLast(link)) {
        return link.substring(0, link.length - 1)
    }

    return link;
}