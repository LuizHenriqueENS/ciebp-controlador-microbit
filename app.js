
const bluetoothConnectBtn = document.getElementById("bluetooth")
const loaderIcon = document.getElementById("loader")
const container = document.getElementById("container")
const bluetooothLabel = document.getElementById("bluetooth-label")
const controllerContainer = document.getElementById("controller")

const UART_SERVICE = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const TX_SERVICE = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
const RX_SERVICE = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
const campo = document.getElementById("campo")

let conn
let rxCon
let isConnected = false
let xPosition = 0


async function conectarBluetooth() {
    if (!isConnected) {
        try {
            activeLoad()
            // return a BluetoothDevice obj
            const device = await navigator.bluetooth.requestDevice({
                // acceptAllDevices: true,
                filters: [{ namePrefix: "BBC" }],
                optionalServices: [UART_SERVICE, TX_SERVICE, RX_SERVICE]
            });

            device.addEventListener("gattserverdisconnected", () => {
                console.log("Desconectado")
                activeLoad()

                setTimeout(() => {
                    deactiveLoad()
                    bluetoothDisconnected()
                }, 2000);
            })

            const server = await device.gatt.connect()
            conn = server

            const services = await server.getPrimaryService(UART_SERVICE)
            const cha = await services.getCharacteristics()
            const rxMicro = await cha[1].uuid
            const rxCharacteristic = await services.getCharacteristic(rxMicro);
            rxCon = rxCharacteristic
            bluetoothConnected()
            deactiveLoad()

            var joy = new JoyStick("joyDiv", {
                internalFillColor: "#402650",
                internalStrokeColor: "#000",
                externalStrokeColor: "#000",
            }, (stickData) => {
                if (isConnected) {
                    window.sendUARTData(`led,${stickData.x},${stickData.y}`)
                    console.log("X: ", stickData.x)
                    console.log("Y: ", stickData.y)

                }
            });
        } catch (error) {
            console.error('Erro na conexão Bluetooth:', error);
            deactiveLoad()
        }
    } else {
        conn.disconnect()
        activeLoad()

        setTimeout(() => {
            bluetoothDisconnected()
            deactiveLoad()
        }, 2000);
    }

}

window.sendUARTData = async (text) => {
    const encoder = new TextEncoder();
    await rxCon.writeValue(encoder.encode(text + '\n'));
};

campo.addEventListener("input", ({ data }) => {
    window.sendUARTData(data)
    campo.value = ""
})

bluetoothConnectBtn.addEventListener("click", () => {
    conectarBluetooth()
})

function bluetoothConnected() {
    isConnected = true

    bluetoothConnectBtn.style.display = "none"
    container.style.display = "flex"
    controllerContainer.style.display = "flex"
}

function bluetoothDisconnected() {
    isConnected = false
    window.location.reload()
}
function activeLoad() {
    container.style.display = "none"
    loaderIcon.style.display = "flex"
}

function deactiveLoad() {
    container.style.display = "flex"
    loaderIcon.style.display = "none"
}