import  DevicesPage  from './page-objects/devicesPage';

const devicesPage = new DevicesPage();



fixture `Device API Tests`
    .page `http://localhost:8080`; // Application URL

test('Get and update the first element', async t => {
    // Get the first element
    const firstElement = await devicesPage.getFirstElement();
    console.log('Fisrt Device:', firstElement);

    // Prepare payload to update
    const payload = {
        id: firstElement.id,
        system_name: 'renameed1616',
        type: firstElement.type, // Mantain the device-type
        hdd_capacity: firstElement.hdd_capacity // Mantain the device-capacity
    };

    // Update the element
    const updatedElement = await devicesPage.updateElement(firstElement.id, payload);
    console.log('Element Updated:', updatedElement);


    // Check if the element was updated correctly
    const fetchedElement = await devicesPage.getElementById(firstElement.id);
    console.log('Updated element caught on DOM:', fetchedElement);

    await t.expect(fetchedElement.system_name).eql(payload.system_name, 'System name must be updated');
    await t.expect(fetchedElement.type).eql(payload.type, 'The type must be the same');
    await t.expect(fetchedElement.hdd_capacity).eql(payload.hdd_capacity, 'HDD capacity must be the same!');
});