import  DevicesPage  from './page-objects/devicesPage';
 

const devicesPage = new DevicesPage();


fixture `Device API Tests`
    .page `http://localhost:8080`; // Application URL

    test('Get and update the last element', async t => {
        // Get the las device on the list
        const lastElement = await devicesPage.getLastElement();
        console.log('Last element:', lastElement);
    

        // Delete device
        const deleteElement = await devicesPage.deleteElement(lastElement.id);
        console.log('Elementodeleted:', deleteElement);


});