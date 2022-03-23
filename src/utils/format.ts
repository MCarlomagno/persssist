

export const truncateAddress = (addr: string) => {
    return addr.slice(0, 4) + '...' + addr.slice(addr.length - 4, addr.length);
}

export const truncateName = (name: string) => {
    if (name.length > 16) {
        return name.slice(0, 14) + '...';
    }
    return name;
} 

export const bytesToSize = (bytes: number) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
 }