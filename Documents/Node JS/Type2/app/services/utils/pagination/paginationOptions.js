"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaginationOptions {
    constructor(page = 1, perpage = 10) {
        this.page = page;
        this.perpage = perpage;
    }
    limit() {
        return Math.ceil(this.perpage);
    }
    offset() {
        return Math.ceil((this.page - 1) * this.limit());
    }
}
exports.default = PaginationOptions;
