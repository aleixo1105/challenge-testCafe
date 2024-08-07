import { Selector } from 'testcafe';

export default class HomePage {
    constructor() {
        this.filtersContainer = Selector('.list-filters');      // Selector -> List Filter device
        this.deviceTypeSelect = Selector('#device_type');       // Selector -> Device-type
        this.sortBySelect = Selector('#sort_by');               // Selector -> sort_by button(HDD Capacity)
        this.addDeviceButton = Selector('.submitButton');       // Selector -> Add Device button
        this.deviceList = Selector('.list-devices');            // Selector -> List Devices     
        this.deviceMainBox = Selector('.device-main-box');      // Selector -> Each device
        this.deviceEditButton = Selector('.device-edit');       // Selector -> Edit device
        this.deviceRemoveButton = Selector('.device-remove');   // Selector -> Remove device
        
        
    }
     
    //Open menu Device-Type
    async selectDeviceType(t, deviceType) {
        await t
            .click(this.deviceTypeSelect)
            .click(this.deviceTypeSelect.find(`option[value="${deviceType}"]`));
    }

    //Select Device-Type
    async selectSortBy(t, sortBy) {
        await t
            .click(this.sortBySelect)
            .click(this.sortBySelect.find(`option[value="${sortBy}"]`));
    }

    //Click -> Add Device Button
    async goToAddDevicePage(t) {
        await t.click(this.addDeviceButton);
    }


    async isFiltersVisible(t) {
        await t.expect(this.filtersContainer.exists).ok();
    }

    // Try Find Device on List 
    async findDevice(t, name, type, capacity) {

        const count = await this.deviceMainBox.count;
        console.log('Number of Devices on list:', count);

        // Check device by device on list
        for (let i = 0; i < count; i++) {
            

            const device = this.deviceMainBox.nth(i);
            const deviceName = await device.find('.device-name').innerText;
            const deviceType = await device.find('.device-type').innerText;
            const deviceCapacity = await device.find('.device-capacity').innerText;

            // Show information about device 
            console.log(`Device ${i}: Nome=${deviceName}, Type=${deviceType}, Capacity=${deviceCapacity}`);

            // Check if all elements in device is equals
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





