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
export const getCars = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${baseUrl}${path.garage}`);
    return yield response.json();
});
export const getCar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${baseUrl}${path.garage}/${id}`);
    const data = yield response.json();
    console.log(data);
    return data;
});
