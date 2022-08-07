export const DATABASE = 'database';
export let state = {
    id: null,
    currentPage: 1,
    pageAmount: 1,
    color: null,
    name: null,
    cars: null,
    winners: null,
    currentWinner: null,
    carsAmount: null,
    winnersAmount: null
};
export const initState = () => {
    if (localStorage.database) {
        const stateFromLocalStorage = JSON.parse(localStorage.getItem(DATABASE) || '{}');
        state = Object.assign({}, stateFromLocalStorage);
    }
    saveToLocalStorage(DATABASE, state);
};
export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};
