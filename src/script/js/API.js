export const QUERYPARAMS = {
    id: 'id',
    page: '_page',
    pageValue: 1,
    limit: '_limit',
    limitValue: 7,
    status: 'status',
    statusValueStart: 'started',
    statusValueBreak: 'stopped',
    statusValueDrive: 'drive'
};
const baseUrl = 'http://127.0.0.1:3000';
const path = {
    garage: '/garage',
    engine: '/engine',
    winners: '/winners'
};
export const generateQueryString = (params = []) => params.length
    && `?${params.map((x) => `${x.key}=${x.value}`).join('&')}`;
//================= CAR =================
export const getCars = async (queryParams) => {
    const response = await fetch(`${baseUrl}${path.garage}${generateQueryString(queryParams)}`);
    const data = await response.json();
    const count = Number(response.headers.get('X-Total-Count'));
    return { data, count };
};
export const getCar = async (id) => {
    const response = await fetch(`${baseUrl}${path.garage}/${id}`);
    const data = await response.json();
    return data;
};
export const createCar = async (dataParams) => {
    const response = await fetch(`${baseUrl}${path.garage}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataParams)
    });
    const data = await response.json();
    return data;
};
export const deleteCar = async (id) => {
    const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    return data;
};
export const updateCar = async (id, dataParams) => {
    const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataParams)
    });
    const data = await response.json();
    return data;
};
//================= ENGINE =================
export const toggleEngine = async (queryParams) => {
    const response = await fetch(`${baseUrl}${path.engine}${generateQueryString(queryParams)}`, {
        method: "PATCH"
    });
    const data = await response.json();
    return data;
};
export const engineDrive = async (queryParams) => {
    try {
        const response = await fetch(`${baseUrl}${path.engine}${generateQueryString(queryParams)}`, {
            method: "PATCH"
        });
        return response.status !== 200 ? await response.text() : Object.assign({}, (await response.json()));
    }
    catch (error) {
        if (error instanceof Error)
            throw new Error(error.message);
    }
};
//================= WINNERS =================
export const getWinners = async (queryParams) => {
    const response = await fetch(`${baseUrl}${path.winners}${generateQueryString(queryParams)}`);
    const data = await response.json();
    const count = Number(response.headers.get('X-Total-Count'));
    return { data, count };
};
export const getWinner = async (id) => {
    const response = await fetch(`${baseUrl}${path.winners}/${id}`);
    const data = await response.json();
    return data;
};
export const createWinner = async (dataParams) => {
    const response = await fetch(`${baseUrl}${path.garage}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataParams)
    });
    const data = await response.json();
    return data;
};
export const deleteWinner = async (id) => {
    const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    return data;
};
export const updateWinner = async (id, dataParams) => {
    const response = await fetch(`${baseUrl}${path.winners}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataParams)
    });
    const data = await response.json();
    return data;
};
