import { ClientFunction } from 'testcafe';
import { Selector } from 'testcafe';
import axios from 'axios';


let deviceListApi;
let deviceMainBox;
let devicesQuantityDom;
let deviceListDom = [];


fixture `Back-End and Front-End Tests`

test('Get Device List - API', async t => {
    // Make an API request using fetch
    const response = await fetch('http://localhost:3000/devices'); //URL API
    deviceListApi = await response.json();

    // Validate response status
    await t.expect(response.status).eql(200, 'Status code should be 200');

    //Check the number of devices in Json
    console.log('Number of devices - API:',deviceListApi.length);
    

    //Validate the response content type
    await t.expect(response.headers.get('content-type')).contains('application/json', 'Content-Type should be application/json');

    //Validate that the response is a list
    await t.expect(Array.isArray(deviceListApi)).ok('Response should be an array');

    //console.log(deviceListApi);

    //Validate that all items have the correct structure
    deviceListApi.forEach(async item => {
        await t.expect(item).contains({ id: item.id });
        await t.expect(item).contains({ system_name: item.system_name });
        await t.expect(item).contains({ type: item.type });
        await t.expect(item).contains({ hdd_capacity: item.hdd_capacity });
    });

});

fixture `UI Test`
    .page `http://localhost:3001/`;

test('Get devices list by Class Name - UI', async t => {

    
    deviceMainBox = Selector('.device-main-box');
    
    devicesQuantityDom = await deviceMainBox.count;

    // Check the number of devices in the UI
    console.log(`Number of devices - UI: ${devicesQuantityDom}`);



    for (let i = 0; i < devicesQuantityDom; i++) {
 
        const deviceBox = deviceMainBox.nth(i);


        const system_name = await deviceBox.find('.device-name').innerText;
        const type = await deviceBox.find('.device-type').innerText;
        const hdd_capacity_text = await deviceBox.find('.device-capacity').innerText;
        const hdd_capacity = hdd_capacity_text.replace(' GB', '');


        // Add device in the list
        deviceListDom.push({
            system_name: system_name,
            type: type,
            hdd_capacity: hdd_capacity,
        });
    }

});

test('Compare Device List from API and UI', async t => {
    

        // Ordena as listas para facilitar a comparação (opcional)
        deviceListApi.sort((a, b) => a.system_name.localeCompare(b.system_name));
        deviceListDom.sort((a, b) => a.system_name.localeCompare(b.system_name));

        // Remove o campo `id` dos dispositivos da API para comparação
        const deviceListApiProcessed = deviceListApi.map(({ id, ...rest }) => rest);

        // Verifica se os dispositivos do DOM correspondem aos da API
        await t.expect(deviceListApiProcessed).eql(deviceListDom, 'DOM devices do not match API devices');


});


test('Verify that all devices contain the edit and delete buttons.', async t => {
    

    for (let i = 0; i < devicesQuantityDom; i++) {

        const deviceBox = deviceMainBox.nth(i);

        // Check if the edit button is present
        const editButton = deviceBox.find('.device-edit');
        await t.expect(editButton.exists).ok(`Edit button not found for device ${i}`);
        await t.expect(editButton.innerText).eql('EDIT', `Edit button text for device ${i} is incorrect`);

        //Check if delete button is present
        const removeButton = deviceBox.find('.device-remove');
        await t.expect(removeButton.exists).ok(`Delete button not found for device ${i}`);
        await t.expect(removeButton.innerText).eql('REMOVE', `Remove button text for device ${i} is incorrect`);


    }

});
