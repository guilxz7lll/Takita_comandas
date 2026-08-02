// =====================================
// VARIÁVEIS DO SISTEMA
// =====================================

let contadorComandas = 1;

let comandas = [];

let comandaSelecionada = null;


// =====================================
// ELEMENTOS HTML
// =====================================

const btnCriarComanda =
document.getElementById("btnCriarComanda");


const listaComandas =
document.getElementById("listaComandas");


const template =
document.getElementById("templateComanda");


// =====================================
// CRIAR COMANDA
// =====================================

btnCriarComanda.addEventListener(
    "click",
    criarComanda
);



function criarComanda(){


    const nome =
    document.getElementById("cliente")
    .value.trim();


    const consumo =
    document.getElementById("tipoConsumo")
    .value;



    if(nome === ""){

        alert("Digite o nome do cliente!");

        return;

    }



    const nova = {


        id: contadorComandas,

        cliente: nome,

        consumo: consumo,

        criadaEm: new Date(),

        status:"PENDENTE",

        produtos:[],

        total:0


    };



    comandas.push(nova);


    renderizarComanda(nova);


    contadorComandas++;


    document.getElementById("cliente")
    .value="";


}



// =====================================
// MOSTRAR COMANDA
// =====================================


function renderizarComanda(comanda){


    const clone =
    template.content.cloneNode(true);



    const card =
    clone.querySelector(".comanda");



    card.dataset.id =
    comanda.id;



    card.querySelector(".numero")
    .innerText =
    "#" + String(comanda.id)
    .padStart(3,"0");



    card.querySelector(".cliente")
    .innerText =
    comanda.cliente;



    card.querySelector(".consumo")
    .innerText =
    comanda.consumo;



    const btnProduto =
    card.querySelector(".btnProduto");


    const btnPago =
    card.querySelector(".btnPago");


    const btnCancelar =
    card.querySelector(".btnCancelar");




    btnProduto.onclick = ()=>{

        abrirModal(comanda.id);

    };



    btnPago.onclick = ()=>{

        marcarPago(comanda.id, card);

    };



    btnCancelar.onclick = ()=>{

        cancelarComanda(comanda.id, card);

    };



    listaComandas.appendChild(clone);



    iniciarCronometro(
        comanda,
        card
    );


}



// =====================================
// CRONÔMETRO
// =====================================


function iniciarCronometro(comanda, card){


    const visor =
    card.querySelector(".cronometro");


    const intervalo = setInterval(()=>{


        // se não estiver pendente, para o relógio

        if(comanda.status !== "PENDENTE"){

            clearInterval(intervalo);

            return;

        }



        const agora =
        new Date();



        const tempo =
        Math.floor(
            (agora - comanda.criadaEm)
            /1000
        );



        const h =
        Math.floor(tempo / 3600);



        const m =
        Math.floor(
            (tempo % 3600) / 60
        );



        const s =
        tempo % 60;



        visor.innerText =

        String(h).padStart(2,"0")
        + ":"
        +
        String(m).padStart(2,"0")
        + ":"
        +
        String(s).padStart(2,"0");



    },1000);


}



// =====================================
// PAGAR
// =====================================


function marcarPago(id,card){


    const comanda =
    comandas.find(c=>c.id===id);



    comanda.status="PAGO";



    const status =
    card.querySelector(".status");



    status.innerText="PAGO";


    status.classList.remove(
        "pendente"
    );


    status.classList.add(
        "pago"
    );


}



// =====================================
// CANCELAR
// =====================================


function cancelarComanda(id,card){


    if(!confirm(
        "Cancelar esta comanda?"
    )) return;



    const comanda =
    comandas.find(c=>c.id===id);



    comanda.status =
    "CANCELADO";



    const status =
    card.querySelector(".status");



    status.innerText =
    "CANCELADO";



    status.classList.remove(
        "pendente"
    );


    status.classList.add(
        "cancelado"
    );


    card.style.opacity =
    "0.5";


}

// =====================================
// CARDÁPIO
// =====================================


const cardapio = {


    Doces:[

        {
            nome:"Brownie",
            preco:4
        },

        {
            nome:"Brownie recheado",
            preco:8
        },

        {
            nome:"Brigadeiro",
            preco:1
        },

        {
            nome:"Maçã do amor",
            preco:8
        },

        {
            nome:"Pirulito de chocolate",
            preco:5
        },

        {
            nome:"Suspiro",
            preco:5
        },

        {
            nome:"Pipoca gourmet",
            preco:5
        },

        {
            nome:"Fatia de bolo",
            preco:15
        }

    ],



    Sushi:[


        {
            nome:"Hot Holl (7 cortes)",
            preco:20,
            especificacao:true,
            opcoes:[
                "Salmão",
                "Camarão",
                "Filadélfia"
            ]
        },


        {
            nome:"Hot Holl (12 cortes)",
            preco:30,
            especificacao:true,
            opcoes:[
                "Salmão",
                "Camarão",
                "Filadélfia"
            ]
        },


        {
            nome:"Sushi Dog Hot",
            preco:38,
            especificacao:true,
            opcoes:[
                "Camarão",
                "Salmão cru"
            ]
        },


        {
            nome:"Uramaki",
            preco:35,
            especificacao:true,
            opcoes:[
                "Salmão",
                "Camarão",
                "Filadélfia"
            ]
        },


        {
            nome:"Hossomaki",
            preco:35,
            especificacao:true,
            opcoes:[
                "Salmão",
                "Camarão"
            ]
        },


        {
            nome:"Temaki no copo 300ml",
            preco:35,
            especificacao:true,
            opcoes:[
                "Salmão",
                "Camarão",
                "Filadélfia"
            ]
        },


        {
            nome:"Temaki no copo 400ml",
            preco:40,
            especificacao:true,
            opcoes:[
                "Salmão",
                "Camarão",
                "Filadélfia"
            ]
        },


        {
            nome:"Temaki frito",
            preco:40,
            especificacao:true,
            opcoes:[
                "Salmão",
                "Camarão"
            ]
        },


        {
            nome:"Barca mista (20 cortes)",
            preco:65
        },


        {
            nome:"Barca 40 cortes",
            preco:130,
            especificacao:true,
            opcoes:[
                "Mista",
                "Só Hot Holl"
            ]
        },


        {
            nome:"Harumaki",
            preco:5,
            especificacao:true,
            opcoes:[
                "Carne",
                "Queijo"
            ]
        },


        {
            nome:"Yakissoba misto",
            preco:30
        }


    ],



    Lanches:[


        {
            nome:"X-Salada",
            preco:10
        },


        {
            nome:"Hambúrguer artesanal",
            preco:15
        }


    ],



    Bebidas:[


        {
            nome:"Sukita lata",
            preco:6
        },


        {
            nome:"Coca-Cola lata",
            preco:6
        },


        {
            nome:"Baré 1L",
            preco:6
        },


        {
            nome:"Água",
            preco:5
        }


    ]


};



// =====================================
// ELEMENTOS DO MODAL
// =====================================


const categoria =
document.getElementById("categoria");


const produto =
document.getElementById("produto");


const especificacao =
document.getElementById("especificacao");


const campoEspecificacao =
document.getElementById("campoEspecificacao");



const modal =
document.getElementById("modalProduto");



// =====================================
// ABRIR MODAL
// =====================================


function abrirModal(id){


    comandaSelecionada = id;


    modal.classList.remove(
        "oculto"
    );


}



// =====================================
// FECHAR MODAL
// =====================================


document
.getElementById("btnFecharModal")
.addEventListener("click",()=>{


    modal.classList.add(
        "oculto"
    );


});



// =====================================
// CARREGAR PRODUTOS DA CATEGORIA
// =====================================


categoria.addEventListener(
"change",
()=>{


    produto.innerHTML =
    `
    <option value="">
    Selecione...
    </option>
    `;



    const lista =
    cardapio[categoria.value];



    lista.forEach(
    (item,index)=>{


        const option =
        document.createElement(
            "option"
        );


        option.value =
        index;


        option.textContent =
        item.nome;


        produto.appendChild(
            option
        );


    });



    campoEspecificacao
    .classList
    .add("oculto");



});



// =====================================
// CARREGAR ESPECIFICAÇÃO
// =====================================


produto.addEventListener(
"change",
()=>{


    const item =
    cardapio[categoria.value]
    [produto.value];



    especificacao.innerHTML =
    `
    <option value="">
    Selecione...
    </option>
    `;



    if(
        item &&
        item.especificacao
    ){


        campoEspecificacao
        .classList
        .remove(
            "oculto"
        );



        item.opcoes.forEach(
        (op)=>{


            const option =
            document.createElement(
                "option"
            );


            option.value =
            op;


            option.textContent =
            op;


            especificacao.appendChild(
                option
            );


        });



    }else{


        campoEspecificacao
        .classList
        .add(
            "oculto"
        );


    }


});

// =====================================
// ADICIONAR PRODUTO NA COMANDA
// =====================================


const btnAdicionarProduto =
document.getElementById("btnAdicionarProduto");



btnAdicionarProduto.addEventListener(
"click",
adicionarProduto
);



function adicionarProduto(){


    if(comandaSelecionada === null){

        alert("Nenhuma comanda selecionada!");

        return;

    }



    const categoriaEscolhida =
    categoria.value;



    const produtoEscolhido =
    produto.value;



    if(
        categoriaEscolhida === "" ||
        produtoEscolhido === ""
    ){

        alert("Selecione um produto!");

        return;

    }



    const item =
    cardapio[categoriaEscolhida]
    [produtoEscolhido];



    const quantidade =
    Number(
        document.getElementById("quantidade")
        .value
    );



    const sabor =
    especificacao.value;



    const observacao =
    document.getElementById("observacao")
    .value;



    const novoProduto = {


        nome:item.nome,


        preco:item.preco,


        quantidade:quantidade,


        sabor:sabor,


        observacao:observacao,


        subtotal:
        item.preco * quantidade


    };



    const comanda =
    comandas.find(
        c=>c.id===comandaSelecionada
    );



    comanda.produtos.push(
        novoProduto
    );



    comanda.total +=
    novoProduto.subtotal;



    atualizarComanda(
        comanda
    );



    limparModal();


}





// =====================================
// ATUALIZAR CARD DA COMANDA
// =====================================


function atualizarComanda(comanda){



    const card =
    document.querySelector(
        `.comanda[data-id="${comanda.id}"]`
    );



    if(!card) return;



    const lista =
    card.querySelector(".pedidos");



    lista.innerHTML="";



    comanda.produtos.forEach(
    item=>{


        const div =
        document.createElement(
            "div"
        );


        div.className =
        "item-pedido";



        let texto = `

        <strong>
        ${item.quantidade}x ${item.nome}
        </strong>

        <br>

        R$ ${item.subtotal.toFixed(2)}

        `;



        if(item.sabor){


            texto +=
            `
            <br>
            Sabor: ${item.sabor}
            `;


        }



        if(item.observacao){


            texto +=
            `
            <br>
            Obs: ${item.observacao}
            `;


        }



        div.innerHTML =
        texto;



        lista.appendChild(
            div
        );


    });



    card.querySelector(".total")
    .innerText =
    comanda.total
    .toFixed(2)
    .replace(".",",");



}





// =====================================
// LIMPAR MODAL
// =====================================


function limparModal(){



    categoria.value="";


    produto.innerHTML=
    `
    <option value="">
    Selecione...
    </option>
    `;


    especificacao.innerHTML=
    `
    <option value="">
    Selecione...
    </option>
    `;



    campoEspecificacao
    .classList
    .add(
        "oculto"
    );



    document.getElementById("quantidade")
    .value=1;



    document.getElementById("observacao")
    .value="";



    modal.classList.add(
        "oculto"
    );


}
