const baseUrl = 'http://127.0.0.1:3000';
const path = {
    garage: '/garage',
    engine: '/engine',
    winners: '/winners'
};
export const generateQueryString = (params = []) => params.length
    && `?${params.map((x) => `${x.key}=${x.value}`).join('&')}`;
//================= CAR API =================
export const getCars = async () => {
    const response = await fetch(`${baseUrl}${path.garage}`);
    const data = await response.json();
    return data;
};
export const getCar = async (id) => {
    const response = await fetch(`${baseUrl}${path.garage}/${id}`);
    const data = await response.json();
    return data;
};
export const createCar = async (carData) => {
    const response = await fetch(`${baseUrl}${path.garage}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carData)
    });
    const car = await response.json();
    return car;
};
export const deleteCar = async (id) => {
    const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
        method: 'DELETE'
    });
    const car = await response.json();
    return car;
};
export const updateCar = async (id, carData) => {
    const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carData)
    });
    const car = await response.json();
    return car;
};
//================= ENGINE API =================
export const toggleEngine = async (queryParams) => {
    const response = await fetch(`${baseUrl}${path.engine}${generateQueryString(queryParams)}`, {
        method: "PATCH"
    });
    const engine = await response.json();
    return engine;
};
export const engineDrive = async (queryParams) => {
    const response = await fetch(`${baseUrl}${path.engine}${generateQueryString(queryParams)}`, {
        method: "PATCH"
    });
    const engine = await response.json();
    return engine;
};
