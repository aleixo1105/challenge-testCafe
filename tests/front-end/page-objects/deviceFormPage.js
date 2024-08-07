import { Selector } from 'testcafe';

export default class DeviceFormPage {
    constructor() {
        this.systemNameInput = Selector('#system_name');            // Selector -> system name
        this.typeSelect = Selector('#type');                        // Selector -> type
        this.hddCapacityInput = Selector('#hdd_capacity');          // Selector -> hdd_capacity
        this.saveButton = Selector('.submitButton');                // Selector -> submit Button
    }

    async fillForm(t, systemName, type, hddCapacity) {
        await t
            .typeText(this.systemNameInput, systemName)
            .click(this.typeSelect)
            .click(this.typeSelect.find(`option[value="${type}"]`))
            .typeText(this.hddCapacityInput, hddCapacity);
    }

    async submitForm(t) {
        await t.click(this.saveButton);
    }
}