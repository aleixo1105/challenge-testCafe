import  DevicesPage  from './page-objects/devicesPage';
 

const devicesPage = new DevicesPage();


fixture `Device API Tests`
    .page `http://localhost:8080`; // URL da sua aplicação de teste, se necessário

    test('Get and update the last element', async t => {
        // Obter o último elemento
        const lastElement = await devicesPage.getLastElement();
        console.log('Último elemento:', lastElement);
    

        // Deletar o ultimo elemento
        const deleteElement = await devicesPage.deleteElement(lastElement.id);
        console.log('Elemento deletado:', deleteElement);


});