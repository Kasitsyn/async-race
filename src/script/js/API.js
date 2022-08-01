var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseUrl = 'http://127.0.0.1:3000';
const path = {
    garage: '/garage',
    engine: '/engine',
    winners: '/winners'
};
//================= CAR API =================
export const getCars = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${baseUrl}${path.garage}`);
    const data = yield response.json();
    return data;
});
export const getCar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${baseUrl}${path.garage}/${id}`);
    const data = yield response.json();
    return data;
});
export const createCar = (carData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${baseUrl}${path.garage}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carData)
    });
    const car = yield response.json();
    return car;
});
export const deleteCar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${baseUrl}${path.garage}/${id}`, {
        method: 'DELETE'
    });
    const car = yield response.json();
    return car;
});
export const updateCar = (id, carData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${baseUrl}${path.garage}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carData)
    });
    const car = yield response.json();
    return car;
});
//================= ENGINE API =================
export const updateEngine = (id, engineStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${baseUrl}${path.engine}?id=${id}&status=${engineStatus}`, {
        method: 'PATCH'
    });
    const engine = yield response.json();
    return engine;
});
