function setStatus(text) {
    document.getElementById("status").textContent = text;
}

async function loadPayload() {
    setStatus("Chargement du payload...");

    try {
        const response = await fetch("payloads/goldhen.bin");

        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }

        const payload = await response.arrayBuffer();

        setStatus(
            "Payload chargé : " +
            payload.byteLength +
            " octets"
        );

        console.log(
            new Uint8Array(payload)
        );

    } catch (e) {
        setStatus("Erreur : " + e.message);
    }
}
