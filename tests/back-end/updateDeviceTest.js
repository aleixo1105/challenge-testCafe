import  DevicesPage  from './page-objects/devicesPage';
//import  DeviceUpdatePage  from './page-objects/updatedevicesPage';

const devicesPage = new DevicesPage();



fixture `Device API Tests`
    .page `http://localhost:8080`; // URL da sua aplicação de teste, se necessário

test('Get and update the first element', async t => {
    // Obter o primeiro elemento
    const firstElement = await devicesPage.getFirstElement();
    console.log('Primeiro elemento:', firstElement);

    // Preparar o payload para o update
    const payload = {
        id: firstElement.id,
        system_name: 'renameed1616',
        type: firstElement.type, // Mantendo o tipo existente
        hdd_capacity: firstElement.hdd_capacity // Mantendo a capacidade existente
    };

    // Atualizar o primeiro elemento
    const updatedElement = await devicesPage.updateElement(firstElement.id, payload);
    console.log('Elemento atualizado:', updatedElement);


    // Verificar se o elemento foi atualizado corretamente
    const fetchedElement = await devicesPage.getElementById(firstElement.id);
    console.log('Elemento obtido após atualização:', fetchedElement);

    await t.expect(fetchedElement.system_name).eql(payload.system_name, 'O nome do sistema deve ser atualizado');
    await t.expect(fetchedElement.type).eql(payload.type, 'O tipo deve ser o mesmo');
    await t.expect(fetchedElement.hdd_capacity).eql(payload.hdd_capacity, 'A capacidade de HDD deve ser a mesma');
});