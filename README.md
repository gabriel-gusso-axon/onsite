# onsite

Script para verificar se você foi para a empresa 👍

Na pasta escolhida, um arquivo `.csv` é salvo com o padrão `mês-ano.csv` para cada novo mês.

Você pode escolher entre marcar as entradas manualmente (rodando `onsite -y` pelo prompt de comando) ou deixar que ele verifique a conexão com o Wifi da empresa todos os dias pelo scheduler do Windows.

![alt text](./readme/csv-preview.png)

## Como usar

### Manualmente

1. Baixe o zip;
2. Instale as dependências com `npm i`;
3. Rode `npm link` para tornar o script acessível pelo prompt de comando do Windows.
4. Configure a pasta onde você quer que os arquivos sejam salvos em `bin/config.js`;
5. Todos os dias em que você for para a empresa, abra o cmd (ou o painel de execução do Windows, `CTRL+R`) e digite `onsite -y`.

A pasta destino padrão do CSV é `Documentos/onsite`.

### Automaticamente
