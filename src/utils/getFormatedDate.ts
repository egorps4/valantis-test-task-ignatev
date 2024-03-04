const getFormatedDate = (date: Date) => {
    const yearUTC = date.getUTCFullYear().toString();
    const monthUTC = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const dayUTC = date.getUTCDate().toString().padStart(2, '0');

    return `${yearUTC}${monthUTC}${dayUTC}`
}

export default getFormatedDate;