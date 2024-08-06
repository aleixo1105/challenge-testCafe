import { Selector } from 'testcafe';

export default class DeviceFormPage {
    constructor() {
        this.systemNameInput = Selector('#system_name');
        this.typeSelect = Selector('#type');
        this.hddCapacityInput = Selector('#hdd_capacity');
        this.saveButton = Selector('.submitButton');
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