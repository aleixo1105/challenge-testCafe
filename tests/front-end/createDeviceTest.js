import { Selector } from 'testcafe'; // Importar Selector
import HomePage from './page-objects/homePage';
import DeviceFormPage from './page-objects/deviceFormPage';

const homePage = new HomePage();
const deviceFormPage = new DeviceFormPage();

const deviceName = 'GalaxyBook';
const deviceType = 'WINDOWS_WORKSTATION';
const deviceTypeNoUnderline = deviceType.replace('_',' ');
const deviceCapacity = '500'; // Certifique-se de que o formato está correto
const deviceCapacityWithGB = deviceCapacity + " GB"; // Use to compare with Capacity in the WebSite

fixture`Device Creation`
    .page`http://localhost:3001/`; // Substitua pela URL da sua aplicação

test('Should fill out and submit the device form', async t => {
    // Navega para a página de adicionar dispositivo
    await homePage.goToAddDevicePage(t);

    // Preencha o formulário
    await deviceFormPage.fillForm(t, deviceName, deviceType, deviceCapacity);
    
    // Envie o formulário
    await deviceFormPage.submitForm(t);


});

test('Check if the device appears in the list', async t => {
    // Buscar o dispositivo "GalaxyBook2360" com tipo "WINDOWS_WORKSTATION" e capacidade "500 GB"
    const searchResult = await homePage.findDevice(t, deviceName, deviceTypeNoUnderline, deviceCapacityWithGB);

    if (searchResult.found) {
        // Se o dispositivo foi encontrado com as informações corretas
        await t.expect(searchResult.device.exists).ok(`O dispositivo ${deviceName} foi encontrado na lista`);
        await t.expect(searchResult.device.find('.device-type').innerText).eql(deviceTypeNoUnderline, `O tipo do dispositivo está incorreto: ${deviceType}`);
        await t.expect(searchResult.device.find('.device-capacity').innerText).eql(deviceCapacityWithGB, `A capacidade do dispositivo está incorreta: ${deviceCapacity}`);
        console.log('O dispositivo foi encontrado e está correto.');
    }
    else {
        // Se o dispositivo não foi encontrado, falhe o teste e forneça uma mensagem clara
        await t.expect(searchResult.found).ok(`Device ${deviceName}  ${deviceType}  ${deviceCapacityWithGB} was not found in the list with the correct information`);

    }
});
