# Micro:bit Bluetooth Controller

Projeto experimental desenvolvido para controlar uma placa BBC micro:bit por meio de uma interface web, utilizando comunicação Bluetooth Low Energy (BLE).

A aplicação permite estabelecer uma conexão Bluetooth com a placa e enviar comandos por meio de um joystick virtual, possibilitando o controle de funcionalidades programadas no micro:bit.

## Funcionalidades

- Conexão Bluetooth BLE com a micro:bit.
- Identificação de dispositivos pelo nome.
- Joystick virtual para controle direcional.
- Envio de comandos via UART.
- Envio de informações textuais para a placa.
- Identificação de desconexões.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Web Bluetooth API
- Bluetooth Low Energy (BLE)
- UART Service

## Comunicação

A aplicação utiliza o serviço UART da micro:bit para transmitir comandos por Bluetooth.

O joystick envia informações de posição nos eixos X e Y, enquanto a interface também permite transmitir caracteres individualmente.

## Execução

A aplicação utiliza a Web Bluetooth API, portanto, requer:

- Navegador compatível com Web Bluetooth.
- Bluetooth habilitado no dispositivo.
- Placa BBC micro:bit com firmware programado para disponibilizar o serviço UART.
- Execução em contexto seguro (HTTPS ou localhost).

## Contexto

Projeto desenvolvido como experimento de integração entre tecnologias web e hardware educacional, explorando comunicação Bluetooth, APIs do navegador e controle de dispositivos físicos por meio de uma interface própria.
