export const truncateAddress = (addr: string) => addr.slice(0, 4) + '...' + addr.slice(addr.length - 5, addr.length - 1);
export const truncateName = (name: string) => {
    if (name.length > 16) {
        return name.slice(0, 14) + '...';
    }
    return name;
} 