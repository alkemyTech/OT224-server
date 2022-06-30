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
     * @param {object where of sequelize} where 
     * @param {array order of sequelize} order 
     * @returns rows
     */
    findAndPaginate = async (pageIndex = 1, pageLimit = 10, where = {}, order = []) => {
        try {

            pageLimit = parseInt(pageLimit, 10);
            pageIndex = parseInt(pageIndex, 10);

            // create an options object
            let options = {
                offset: this._getOffset(pageIndex, pageLimit),
                limit: pageLimit,
            };

            // check if the search object is empty
            if (Object.keys(where).length) {
                options['where'] = where;
            }

            // check if the order array is empty
            if (order && order.length) {
                options['order'] = order;
            }

            // take in the model, take in the options
            let { count, rows } = await this.model.findAndCountAll(options);

            return {
                previousPage: this._getPreviousPage(pageIndex),
                currentPage: pageIndex,
                nextPage: this._getNextPage(pageIndex, pageIndex, count),
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

    _getNextPage = (page, limit, total) => {
        if ((total / limit) > page) {
            return page + 1;
        }

        return null
    }

    _getPreviousPage = (page) => {
        if (page <= 1) {
            return null
        }
        return page - 1;
    }
}



module.exports = ModelHelper