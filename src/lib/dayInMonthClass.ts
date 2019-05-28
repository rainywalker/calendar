export default class daysMonthClass {

    private _data: any;

    [Symbol.iterator]() {return this}
    constructor(arr: any) {
        this._data = arr
    }
    next() {
        return {
            done : this._data.length === 0,
            value : this._data.shift()
        }
    }
}