export const getTotalPage = (totalUserCount) => {
    return totalUserCount ? Math.ceil(totalUserCount / 10) : 0;
};