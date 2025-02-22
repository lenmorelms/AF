const generateUniqueId = (length = length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let uniqueId = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        uniqueId += chars[randomIndex];
    }
    return uniqueId;
}

export default generateUniqueId;
