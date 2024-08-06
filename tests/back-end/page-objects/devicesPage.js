import axios from 'axios';

export default class DevicePage {
    constructor() {
        this.baseUrl = 'http://localhost:3000/devices';
    }

    async getFirstElement() {
        try {
            const response = await axios.get(this.baseUrl);
            if (response.data && response.data.length > 0) {
                return response.data[0];
            }
            throw new Error('A lista está vazia');
        } catch (error) {
            console.error('Erro ao obter o primeiro elemento:', error);
            throw error;
        }
    }

    async getLastElement() {
        try {
            const response = await axios.get(this.baseUrl);
            if (response.data && response.data.length > 0) {
                return response.data[response.data.length - 1];
            }
            throw new Error('A lista está vazia');
        } catch (error) {
            console.error('Erro ao obter o último elemento:', error);
            throw error;
        }
    }

    async updateElement(elementId, payload) {
        try {
            const response = await axios.put(`${this.baseUrl}/${elementId}`, payload);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar o elemento:', error);
            throw error;
        }
    }

    async deleteElement(elementId) {
        try {
            const response = await axios.delete(`${this.baseUrl}/${elementId}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar o elemento:', error);
            throw error;
        }
    }


    async getElementById(elementId) {
        try {
            const response = await axios.get(`${this.baseUrl}/${elementId}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter o elemento pelo ID:', error);
            throw error;
        }
    }


}
