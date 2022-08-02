import { observable } from 'mobx'
import { moduleContext } from '../ModuleContext'

export class PagedDataStateVM {

    public itemsPerPage: number;
    public countOfItems: number;
    @observable public currentPage: number;

    constructor(countOfItems: number, currentPage = 1, itemsPerPage = 5) {
        this.currentPage = currentPage;
        this.itemsPerPage = itemsPerPage;
        this.countOfItems = countOfItems;
    }
}