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
            throw new Error('List is empty!');
        } catch (error) {
            console.error('Erro while trying to get the first element:', error);
            throw error;
        }
    }

    async getLastElement() {
        try {
            const response = await axios.get(this.baseUrl);
            if (response.data && response.data.length > 0) {
                return response.data[response.data.length - 1];
            }
            throw new Error('List is empty!');
        } catch (error) {
            console.error('Erro while trying to get the last element:', error);
            throw error;
        }
    }

    async updateElement(elementId, payload) {
        try {
            const response = await axios.put(`${this.baseUrl}/${elementId}`, payload);
            return response.data;
        } catch (error) {
            console.error('Erro while trying to update element:', error);
            throw error;
        }
    }

    async deleteElement(elementId) {
        try {
            const response = await axios.delete(`${this.baseUrl}/${elementId}`);
            return response.data;
        } catch (error) {
            console.error('Erro while trying to delete element:', error);
            throw error;
        }
    }


    async getElementById(elementId) {
        try {
            const response = await axios.get(`${this.baseUrl}/${elementId}`);
            return response.data;
        } catch (error) {
            console.error('Erro while trying to get element By ID:', error);
            throw error;
        }
    }


}
