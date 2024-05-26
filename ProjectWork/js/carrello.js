
let divProdotti = document.querySelector('#div-prodotti');

let nessunProdotto = `<div class="card rounded-3 mb-4" style="background-color: rgb(194, 193, 193);">
    <div class="card-body p-4">
        <div class="row d-flex justify-content-between align-items-center">
            <h2>Non ci sono Prodotti</h2>
        </div>
    </div>
    </div>`;

let divTotaleOrdine = document.querySelector('#totale-ordini');

function popolaCarrello() {
    let price = 0;
    let arrayCarrello = JSON.parse(localStorage.getItem('arrayId'));

    if (arrayCarrello != null) {

        if (arrayCarrello.length > 0) {
            let carrelloHtml = '';

            console.log(arrayCarrello);
            arrayCarrello.forEach(element => {
                console.log(element)
                const URLPIATTI = `http://localhost:8080/api/piatti/piatto/${element}`;
                fetch(URLPIATTI)

                    .then(res => res.json())
                    .then((data) => {
                        console.log(data, "sono il data");
                        let piatto = `<div class="card rounded-3 mb-4">
                <div class="card-body p-4">
                <div class="row d-flex justify-content-between align-items-center">
                <div class="col-md-2 col-lg-2 col-xl-2">
                <img src="${data.immagine}" class="img-fluid rounded-3" alt="Image">
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                <p class="lead fw-normal mb-2">${data.nome}</p>
                </div>
                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 class="mb-0">${data.prezzoListino} €</h5>
                </div>
                <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#!" class="text-danger"><i class="cestino fas fa-trash fa-lg" data-id="${data.id}"></i></a>
                </div>
                </div>
                </div>
                </div>`;

                        carrelloHtml += piatto;
                        price += data.prezzoListino;
                        divTotaleOrdine.innerHTML = `<h4> Totale ordine: ${price} € </h4>`;
                        divProdotti.innerHTML = carrelloHtml;
                        cancellaProdotto();
                    })

            });
        } else {
            divProdotti.innerHTML = nessunProdotto;
            divTotaleOrdine.innerHTML = `<h4> Totale ordine: ${price} € </h4>`;
        }
    } else {
        divProdotti.innerHTML = nessunProdotto;
        divTotaleOrdine.innerHTML = `<h4> Totale ordine: ${price} € </h4>`;

    }

}
popolaCarrello();

function cancellaProdotto() {

    let arrayCarrello = JSON.parse(localStorage.getItem('arrayId'));
    let cestino = document.querySelectorAll('.cestino');
    cestino.forEach(btn => {
        btn.addEventListener('click', function () {
            const id = btn.getAttribute('data-id');
            let elementoEliminare = arrayCarrello.indexOf(id);
            arrayCarrello.splice(elementoEliminare, 1);
            console.log(id);
            localStorage.setItem('arrayId', JSON.stringify(arrayCarrello));
            popolaCarrello();
            contoCarrello();
        });

    });

}


let arrayCarrello = [];
let numeroArticoli = document.querySelector('#numeroArticoli');
let numProdotti = 0;

function contoCarrello() {
    console.log(numProdotti);

    arrayCarrello = JSON.parse(localStorage.getItem('arrayId'));

    numProdotti = arrayCarrello.length;
    numeroArticoli.innerHTML = numProdotti;

    if (numProdotti == 0) {
        numeroArticoli.innerHTML = null;
    }

}
contoCarrello();

let checkout = document.querySelector('.checkout');

checkout.addEventListener('click', function () {
    vaiAlPagamento();

});

function vaiAlPagamento() {
    let carrelloPienoVuoto = JSON.parse(localStorage.getItem('arrayId'));
    if (carrelloPienoVuoto != '') {
        checkout.classList.remove('disabled');
        window.location.href = 'pagamento.html';
    } else {
        checkout.classList.add('disabled');
    }
}