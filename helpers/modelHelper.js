class ModelHelper {
    constructor(model) {
        this.model = model;
    }

    /**
     * Helper to paginate results. 
     * All parameters are optionals.
     * 
     * @param {number} pageIndex 
     * @param {number} pageLimit 
     * @param {[string]} attributes 
     * @returns rows
     */
    findAndPaginate = async (pageIndex = 1, pageLimit = 10, attributes=null) => {
        try {

            pageLimit = parseInt(pageLimit, 10);
            pageIndex = parseInt(pageIndex, 10);
            pageIndex = pageIndex === 0 ? 1 : pageIndex
            
            let options = {
                offset: this._getOffset(pageIndex, pageLimit),
                limit: pageLimit,
            };
            
            if( attributes!==null){
                options.attributes=attributes
            }    

            let { count, rows } = await this.model.findAndCountAll(options);

            const totalPages = this._getTotalPages(count, pageLimit)

            return {
                previousPage: this._getPreviousPage(pageIndex, totalPages),
                currentPage: pageIndex,
                nextPage: this._getNextPage(pageIndex, totalPages),
                totalPages: totalPages,
                total: count,
                limit: pageLimit,
                data: rows
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    _getOffset = (page, limit) => {
        return (page * limit) - limit;
    }

    _getNextPage = (page, totalPages) => {
        if (page < totalPages) {
            return page + 1;
        }

        return null
    }

    _getPreviousPage = (page, totalPages) => {
        if (page <= 1) {
            return null
        }
        if (page > totalPages) {
            return totalPages
        }
        return page - 1;
    }

    _getTotalPages = (count, limit) => {
        return Math.ceil(count / limit);
    }
}



module.exports = ModelHelper