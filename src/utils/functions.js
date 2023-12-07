const getLocalPagination = (array, limit, page) => {
    return array?.slice(((limit * page) - limit), (limit * page))
}

export {getLocalPagination}