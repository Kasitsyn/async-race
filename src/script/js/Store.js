export const DATABASE = 'database';
export let state = {
    id: 1,
    currentPage: 1,
    pageAmount: 1,
    color: null,
    name: null,
    velocity: null,
    distance: null,
    success: false,
    cars: null,
    winners: [],
    carsAmount: null,
    winnersAmount: null,
};
// export const animation: animationId = {
//   'id': null
// }
export const nameCars = ['Tesla', 'Toyota', 'BMW', 'Mercedes', 'Porsche', 'Lexus', 'Ferrari', 'Lada', 'Subaru', 'Mazda'];
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
