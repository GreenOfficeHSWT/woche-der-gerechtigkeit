document.addEventListener('DOMContentLoaded', function () {
    const stempelContainer = document.getElementById('stempelContainer');
    const info = document.getElementById('info');
    const gewinnspielForm = document.getElementById('gewinnspiel-form');
    const form = document.getElementById('form');
    const stationsData = [
        { info: 'Information zur Station 1', nextCoordinates: 'Koordinaten der nächsten Station 1' },
        { info: 'Information zur Station 2', nextCoordinates: 'Koordinaten der nächsten Station 2' },
        { info: 'Information zur Station 3', nextCoordinates: 'Koordinaten der nächsten Station 3' },
        { info: 'Information zur Station 4', nextCoordinates: 'Koordinaten der nächsten Station 4' },
        { info: 'Information zur Station 5', nextCoordinates: 'Koordinaten der nächsten Station 5' },
        { info: 'Information zur Station 6', nextCoordinates: 'Koordinaten der nächsten Station 6' },
        { info: 'Information zur Station 7', nextCoordinates: 'Koordinaten der nächsten Station 7' },
        { info: 'Information zur Station 8', nextCoordinates: 'Koordinaten der nächsten Station 8' },
    ];

    function updateStempelkarte() {
        const stamps = JSON.parse(localStorage.getItem('stamps')) || Array(8).fill(false);
        stempelContainer.innerHTML = '';
        stamps.forEach((stamped, index) => {
            const stempel = document.createElement('div');
            stempel.className = 'stempel' + (stamped ? ' completed' : '');
            stempel.innerText = stamped ? '✔️' : (index + 1);
            stempelContainer.appendChild(stempel);
        });
    }

    function addStamp(stationNumber) {
        const stamps = JSON.parse(localStorage.getItem('stamps')) || Array(8).fill(false);
        if (stationNumber >= 1 && stationNumber <= 8 && !stamps[stationNumber - 1]) {
            stamps[stationNumber - 1] = true;
            localStorage.setItem('stamps', JSON.stringify(stamps));
            updateStempelkarte();
            const stationData = stationsData[stationNumber - 1];
            info.innerText = `Station ${stationNumber} Infos: ${stationData.info}\nNächste Station: ${stationData.nextCoordinates}`;
            if (stamps.every(Boolean)) {
                info.innerText += '\nAlle Stempel gesammelt! Bitte geben Sie Ihren Namen und Ihre Emailadresse ein, um am Gewinnspiel teilzunehmen.';
                gewinnspielForm.style.display = 'block';
            }
        } else {
            info.innerText = 'Ungültiger oder bereits gescannter QR-Code.';
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        // Hier könnte der Gewinnspieleintrag verarbeitet werden
        alert('Erfolgreich am Gewinnspiel teilgenommen');
        form.reset();
        gewinnspielForm.style.display = 'none';
    });

    updateStempelkarte();

    // Aufruf dieser Funktion von stationX.html, z.B. addStamp(1) für station1.html
    window.addStamp = addStamp;
});
