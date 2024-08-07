import { Selector } from 'testcafe'; // Importar Selector
import HomePage from './page-objects/homePage';
import DeviceFormPage from './page-objects/deviceFormPage';

const homePage = new HomePage();
const deviceFormPage = new DeviceFormPage();

const deviceName = 'GalaxyBook';
const deviceType = 'WINDOWS_WORKSTATION';
const deviceTypeNoUnderline = deviceType.replace('_',' '); // Use to compare with Capacity in the WebSite(UI)
const deviceCapacity = '500'; 
const deviceCapacityWithGB = deviceCapacity + " GB"; // Use to compare with Capacity in the WebSite(UI)

fixture`Create Device - Front-End`
    .page`http://localhost:3001/`; // URL Website 

test('Fill out and submit the device form', async t => {

    //Navigate to webpage to add device 
    await homePage.goToAddDevicePage(t);

    // Fill Form
    await deviceFormPage.fillForm(t, deviceName, deviceType, deviceCapacity);
    
    // Submit form
    await deviceFormPage.submitForm(t);


});

test('Check if the device appears in the list', async t => {

    // Fiding Device 
    const searchResult = await homePage.findDevice(t, deviceName, deviceTypeNoUnderline, deviceCapacityWithGB);

    if (searchResult.found) {
        //Check if the device was found with the correct information
        await t.expect(searchResult.device.exists).ok(`The Device ${deviceName} was found in the list`);
        await t.expect(searchResult.device.find('.device-type').innerText).eql(deviceTypeNoUnderline, `Device type is incorrect: ${deviceType}`);
        await t.expect(searchResult.device.find('.device-capacity').innerText).eql(deviceCapacityWithGB, `Device capacity is incorrect: ${deviceCapacity}`);
        console.log('O dispositivo foi encontrado e está correto.');
    }
    else {

        await t.expect(searchResult.found).ok(`Device ${deviceName}  ${deviceType}  ${deviceCapacityWithGB} was not found in the list with the correct information`);

    }
});
