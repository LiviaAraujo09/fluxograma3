
const perguntas = [
    {
        pergunta: "Você gosta de trabalhar em equipe?",
        opcoes: [
            { texto: "🤝 Sim, gosto muito!", destino: "colaborativo" },
            { texto: "🎯 Não, prefiro sozinho.", destino: "independente" }
        ]
    },
    {
        pergunta: "Como você resolve problemas?",
        opcoes: [
            { texto: "💬 Converso com outras pessoas.", destino: "comunicacao" },
            { texto: "🧠 Penso e resolvo sozinho.", destino: "analise" }
        ]
    },
    {
        pergunta: "Você gosta de assumir responsabilidades?",
        opcoes: [
            { texto: "⭐ Sim, gosto de liderar.", destino: "lideranca" },
            { texto: "🙌 Prefiro ajudar nos bastidores.", destino: "apoio" }
        ]
    },
    {
        pergunta: "Como você reage diante de desafios?",
        opcoes: [
            { texto: "🔥 Enfrento com confiança.", destino: "proativo" },
            { texto: "🔎 Analiso antes de agir.", destino: "cuidadoso" }
        ]
    }
];

let indice = 0;
let historico = [];

function iniciar() {
    indice = 0;
    historico = [];

    document.getElementById("inicio").classList.add("escondido");
    document.getElementById("resultado").classList.add("escondido");
    document.getElementById("quiz").classList.remove("escondido");

    mostrarPergunta();
    atualizarFluxograma();
}

function mostrarPergunta() {
    const atual = perguntas[indice];

    document.getElementById("contador").textContent =
        `PERGUNTA ${String(indice + 1).padStart(2, "0")} DE ${perguntas.length}`;

    const porcentagem = Math.round(
        (indice / perguntas.length) * 100
    );

    document.getElementById("porcentagem").textContent =
        porcentagem + "%";

    document.getElementById("progresso").style.width =
        porcentagem + "%";

    document.getElementById("pergunta").textContent =
        atual.pergunta;

    const area = document.getElementById("opcoes");
    area.innerHTML = "";

    atual.opcoes.forEach(opcao => {
        const botao = document.createElement("button");

        botao.className = "opcao";
        botao.textContent = opcao.texto;

        botao.onclick = () => responder(opcao);

        area.appendChild(botao);
    });

    document.querySelector(".voltar").style.visibility =
        indice === 0 ? "hidden" : "visible";
}

function responder(opcao) {
    historico = historico.slice(0, indice);

    historico.push({
        pergunta: perguntas[indice].pergunta,
        resposta: opcao.texto,
        destino: opcao.destino
    });

    atualizarFluxograma();

    indice++;

    if (indice < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function voltarPergunta() {
    if (indice > 0) {
        indice--;

        historico = historico.slice(0, indice);

        document.getElementById("resultado").classList.add("escondido");
        document.getElementById("quiz").classList.remove("escondido");

        mostrarPergunta();
        atualizarFluxograma();
    }
}

function atualizarFluxograma() {
    const area = document.getElementById("diagrama");

    area.innerHTML = `
        <div class="no inicio-no">🏁 INÍCIO</div>
    `;

    historico.forEach(item => {
        area.innerHTML += `
            <div class="seta">↓</div>
            <div class="no">
                ❓ ${item.pergunta}
            </div>
            <div class="seta">↓</div>
            <div class="no resposta-no">
                ✓ ${item.resposta}
            </div>
        `;
    });

    if (historico.length === perguntas.length) {
        area.innerHTML += `
            <div class="seta">↓</div>
            <div class="no final-no">
                🏆 CAMINHO CONCLUÍDO!
            </div>
        `;
    } else {
        area.innerHTML += `
            <div class="seta">↓</div>
            <div class="no aguardando">
                ⏳ Aguardando próxima resposta...
            </div>
        `;
    }
}

function mostrarResultado() {
    document.getElementById("quiz").classList.add("escondido");
    document.getElementById("resultado").classList.remove("escondido");

    document.getElementById("progresso").style.width = "100%";
    document.getElementById("porcentagem").textContent = "100%";

    const respostas = historico.map(item => item.destino);

    let titulo = "";
    let mensagem = "";
    let foto = "";

    if (respostas.includes("lideranca") &&
        respostas.includes("proativo")) {

        titulo = "🌟 Perfil de Líder";

        mensagem = "Você demonstra iniciativa, confiança e capacidade de liderança. Gosta de assumir responsabilidades e enfrentar novos desafios!";

        foto = "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900";

    } else if (respostas.includes("colaborativo") &&
               respostas.includes("comunicacao")) {

        titulo = "🤝 Perfil Colaborativo";

        mensagem = "Você valoriza o trabalho em equipe, a comunicação e a cooperação. Sua capacidade de trabalhar com outras pessoas é um grande diferencial!";

        foto = "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=900";

    } else if (respostas.includes("independente") &&
               respostas.includes("analise")) {

        titulo = "🧠 Perfil Analítico";

        mensagem = "Você gosta de pensar, analisar situações e encontrar soluções de maneira independente. Sua capacidade de reflexão é uma qualidade!";

        foto = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900";

    } else {

        titulo = "🚀 Perfil Versátil";

        mensagem = "Você demonstra diferentes habilidades e consegue se adaptar a diversas situações. Continue explorando seu potencial!";

        foto = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900";
    }

    document.getElementById("tituloResultado").textContent = titulo;
    document.getElementById("mensagem").textContent = mensagem;

    const imagem = document.getElementById("resultadoFoto");
    imagem.src = foto;
    imagem.alt = titulo;

    const resumo = document.getElementById("caminho");
    resumo.innerHTML = "";

    historico.forEach((item, i) => {
        const etapa = document.createElement("div");
        etapa.className = "resumo-item";
        etapa.textContent = `${i + 1}. ${item.pergunta} — ${item.resposta}`;
        resumo.appendChild(etapa);
    });
}

function reiniciar() {
    document.getElementById("resultado").classList.add("escondido");
    document.getElementById("inicio").classList.remove("escondido");

    indice = 0;
    historico = [];

    document.getElementById("progresso").style.width = "0%";
    document.getElementById("porcentagem").textContent = "0%";

    atualizarFluxograma();
}
