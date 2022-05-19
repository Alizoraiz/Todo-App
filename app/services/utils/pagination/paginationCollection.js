"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaginatedCollection {
    constructor(paginationOptions, totalItems, items) {
        this.perPage = paginationOptions.perpage;
        this.currentPage = paginationOptions.page;
        this.totalItems = totalItems;
        this.data = items;
    }
    getTotalPages() {
        return Math.ceil(this.totalItems / this.perPage);
    }
    hasNext() {
        return this.currentPage < this.getTotalPages();
    }
    getPaginatedData() {
        const paginatedData = {
            totalItems: this.totalItems,
            totalPages: this.getTotalPages(),
            currentPage: this.currentPage,
            perPage: this.perPage,
            hasNext: this.hasNext(),
            data: this.data,
        };
        return paginatedData;
    }
}
exports.default = PaginatedCollection;
