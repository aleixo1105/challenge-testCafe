import { ClientFunction } from 'testcafe';
import { Selector } from 'testcafe';
import axios from 'axios';


let deviceListApi;
let deviceMainBox;
let devicesQuantityDom;
let deviceListDom = [];


fixture `API Test`

test('Get Device List - API', async t => {
    // Fazer uma requisição de API usando fetch
    const response = await fetch('http://localhost:3000/devices'); // Substitua com a URL da sua API
    deviceListApi = await response.json();

    // Validar o status da resposta
    await t.expect(response.status).eql(200, 'Status code should be 200');

    // Verificar o número de dispositivos no Json
    console.log('Number of devices - API:',deviceListApi.length);
    

    // Validar o tipo de conteúdo da resposta
    await t.expect(response.headers.get('content-type')).contains('application/json', 'Content-Type should be application/json');

    // Validar que a resposta é uma lista
    await t.expect(Array.isArray(deviceListApi)).ok('Response should be an array');

    //console.log(deviceListApi);

    // Validar que todos os itens têm a estrutura correta
    deviceListApi.forEach(async item => {
        await t.expect(item).contains({ id: item.id });
        await t.expect(item).contains({ system_name: item.system_name });
        await t.expect(item).contains({ type: item.type });
        await t.expect(item).contains({ hdd_capacity: item.hdd_capacity });
    });

});

fixture `UI Test`
    .page `http://localhost:3001/`; // URL da página onde a lista de dispositivos é exibida

test('Get devices list by Class Name - UI', async t => {

    // Seletores para os elementos da lista de dispositivos na interface
    deviceMainBox = Selector('.device-main-box');
    
    devicesQuantityDom = await deviceMainBox.count;

    // Verificar o número de dispositivos na UI
    console.log(`Number of devices - UI: ${devicesQuantityDom}`);


    // Itera sobre cada dispositivo e imprime informações
    for (let i = 0; i < devicesQuantityDom; i++) {
        // Seleciona o dispositivo atual
        const deviceBox = deviceMainBox.nth(i);

        // Extrai informações do dispositivo
        const system_name = await deviceBox.find('.device-name').innerText;
        const type = await deviceBox.find('.device-type').innerText;
        const hdd_capacity_text = await deviceBox.find('.device-capacity').innerText;
        const hdd_capacity = hdd_capacity_text.replace(' GB', '');


        // Adiciona o dispositivo à lista
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
        await t.expect(deviceListApiProcessed).eql(deviceListDom, 'Os dispositivos do DOM não correspondem aos dispositivos da API');


});


test('Verify that all devices contain the edit and delete buttons.', async t => {
    
    // Itera sobre cada dispositivo e imprime informações
    for (let i = 0; i < devicesQuantityDom; i++) {
        // Seleciona o dispositivo atual
        const deviceBox = deviceMainBox.nth(i);

        // Verifica se o botão de edição está presente
        const editButton = deviceBox.find('.device-edit');
        await t.expect(editButton.exists).ok(`Botão de edição não encontrado para o dispositivo ${i}`);
        await t.expect(editButton.innerText).eql('EDIT', `Texto do botão de edição para o dispositivo ${i} está incorreto`);

        // Verifica se o botão de exclusão está presente
        const removeButton = deviceBox.find('.device-remove');
        await t.expect(removeButton.exists).ok(`Botão de exclusão não encontrado para o dispositivo ${i}`);
        await t.expect(removeButton.innerText).eql('REMOVE', `Texto do botão de exclusão para o dispositivo ${i} está incorreto`);


    }

});
