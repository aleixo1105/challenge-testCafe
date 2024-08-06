import { Selector } from 'testcafe';

export default class HomePage {
    constructor() {
        this.deviceTypeSelect = Selector('#device_type');
        this.sortBySelect = Selector('#sort_by');
        this.addDeviceButton = Selector('.submitButton');
        this.filtersContainer = Selector('.list-filters');
        this.deviceList = Selector('.list-devices'); // Seletor para o container da lista de dispositivos        
        this.deviceMainBox = Selector('.device-main-box'); // Seletor para um item da lista de dispositivos
    }
 
    async selectDeviceType(t, deviceType) {
        await t
            .click(this.deviceTypeSelect) // Abre o menu suspenso
            .click(this.deviceTypeSelect.find(`option[value="${deviceType}"]`)); // Seleciona a opção desejada
    }

    async selectSortBy(t, sortBy) {
        await t
            .click(this.sortBySelect) // Abre o menu suspenso
            .click(this.sortBySelect.find(`option[value="${sortBy}"]`)); // Seleciona a opção desejada
    }

    async goToAddDevicePage(t) {
        await t.click(this.addDeviceButton);
    }

    async isFiltersVisible(t) {
        await t.expect(this.filtersContainer.exists).ok();
    }

    // Método para encontrar o dispositivo pelo nome, tipo e capacidade
    async findDevice(t, name, type, capacity) {

        const count = await this.deviceMainBox.count;
        console.log('Número total de dispositivos:', count);

        // Itera sobre cada dispositivo e imprime informações
        for (let i = 0; i < count; i++) {
            

            const device = this.deviceMainBox.nth(i);
            const deviceName = await device.find('.device-name').innerText;
            const deviceType = await device.find('.device-type').innerText;
            const deviceCapacity = await device.find('.device-capacity').innerText;

            // Exibir informações do dispositivo para depuração
            console.log(`Dispositivo ${i}: Nome=${deviceName}, Tipo=${deviceType}, Capacidade=${deviceCapacity}`);

            // Verificar se o dispositivo corresponde ao nome, tipo e capacidade fornecidos
            if (deviceName === name && deviceType === type && deviceCapacity === capacity) {
                return {
                    found: true,
                    device
                };
            }
        }

        return { found: false };
    }

}





