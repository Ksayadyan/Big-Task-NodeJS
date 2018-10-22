

module.exports = (page, perPage) => {
    page = parseInt(page);
    perPage = parseInt(perPage);

    if(!Boolean(page) || !Boolean(perPage)) return;
    else return {
        page,
        perPage
    }
}