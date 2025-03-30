document.addEventListener("DOMContentLoaded", function () {
    let data;
    let flatDays = [];
    let currentIndex = 0;

    // Array de 30 perguntas (uma para cada dia)
    const questions = [
        { id: 1, question: "Como você se sentiu ao iniciar o desafio de hoje? O que mais te tocou?" },
        { id: 2, question: "Qual momento do dia te surpreendeu e fortaleceu sua conexão?" },
        { id: 3, question: "Que sentimento profundo surgiu durante a atividade de hoje?" },
        { id: 4, question: "Houve algum aprendizado inesperado hoje? Descreva-o." },
        { id: 5, question: "De que maneira o desafio de hoje aproximou vocês ainda mais?" },
        { id: 6, question: "O que você descobriu sobre si mesmo(a) enquanto realizava a atividade de hoje?" },
        { id: 7, question: "Como a criatividade empregada hoje refletiu a conexão entre vocês?" },
        { id: 8, question: "Que lembrança positiva você gostaria de guardar deste dia?" },
        { id: 9, question: "O que você aprendeu sobre a pessoa que está ao seu lado hoje?" },
        { id: 10, question: "Quais emoções marcaram seu dia e como você lidou com elas?" },
        { id: 11, question: "Houve um momento de superação pessoal hoje? Como foi essa experiência?" },
        { id: 12, question: "Se pudesse resumir o dia de hoje em uma palavra, qual seria e por quê?" },
        { id: 13, question: "Qual a parte mais divertida do desafio de hoje? O que a tornou especial?" },
        { id: 14, question: "O que hoje te fez sentir mais conectado(a) com quem você ama?" },
        { id: 15, question: "Qual surpresa ou detalhe tocou seu coração neste dia?" },
        { id: 16, question: "Que desafio interno você superou hoje durante a experiência?" },
        { id: 17, question: "Como a atividade de hoje inspirou uma nova forma de ver sua relação?" },
        { id: 18, question: "Você sentiu alguma emoção inesperada? Compartilhe essa descoberta." },
        { id: 19, question: "Que conselho você daria a alguém que está começando este desafio?" },
        { id: 20, question: "Como o desafio de hoje contribuiu para seu autoconhecimento?" },
        { id: 21, question: "Em que momento você se emocionou mais hoje e por quê?" },
        { id: 22, question: "Como um instante de silêncio ou introspecção marcou seu dia?" },
        { id: 23, question: "De que forma a atividade fortaleceu a confiança entre vocês?" },
        { id: 24, question: "Que aspecto do desafio de hoje te fez refletir sobre sua história familiar?" },
        { id: 25, question: "Qual lição valiosa você aprendeu hoje que pode transformar outros momentos?" },
        { id: 26, question: "Como você descreveria a atmosfera do dia e o que a tornou única?" },
        { id: 27, question: "Houve um instante de calma ou reflexão que marcou o dia? Como foi?" },
        { id: 28, question: "Qual gesto carinhoso você presenciou ou realizou hoje?" },
        { id: 29, question: "De que maneira o desafio revelou algo novo sobre a pessoa ao seu lado?" },
        { id: 30, question: "Ao refletir sobre hoje, o que mais te enche de gratidão e por quê?" }
    ];

    // Função para exibir o conteúdo (mensagem, desafio e pergunta) do dia atual
    function displayDay(index) {
        const headerTema = document.getElementById("tema-header");
        const mensagemElement = document.getElementById("mensagem");
        const desafioElement = document.getElementById("desafio");

        const current = flatDays[index];
        headerTema.textContent = current.semana + " - Dia " + current.dia;
        mensagemElement.textContent = current.mensagem;
        desafioElement.textContent = current.desafio;

        // Exibe a pergunta do dia
        displayQuestion(index);

        // Atualiza o localStorage com a data atual e o índice corrente
        localStorage.setItem("challengeData", JSON.stringify({
            date: new Date().toLocaleDateString(),
            index: index
        }));
    }

    // Função para exibir a pergunta no formulário de experiência
    function displayQuestion(index) {
        const container = document.getElementById("experienciaContainer");
        const currentQuestion = questions[index] ? questions[index].question : "";
        container.innerHTML = `
            <div class="experiencia-item">
                <label for="pergunta_${index}">${currentQuestion}</label>
                <textarea id="pergunta_${index}" name="resposta" required></textarea>
                <input type="hidden" name="question" value="${currentQuestion}">
            </div>
        `;
    }

    // Recupera os dados salvos para saber qual foi o último dia exibido (usando localStorage)
    const savedData = localStorage.getItem("challengeData");
    const today = new Date().toLocaleDateString();

    if (savedData) {
        try {
            const dataObj = JSON.parse(savedData);
            if (dataObj.date === today) {
                // Se já foi exibido hoje, mantém o mesmo índice
                currentIndex = dataObj.index;
            } else {
                // Se é um novo dia, incrementa o índice em 1 (de forma circular)
                currentIndex = (dataObj.index + 1) % 30; // 30 dias de desafio
            }
        } catch (error) {
            console.error("Erro ao fazer parsing do localStorage:", error);
            currentIndex = 0;
        }
    } else {
        currentIndex = 0;
        localStorage.setItem("challengeData", JSON.stringify({ date: today, index: 0 }));
    }

    // Carrega o conteúdo dos desafios do arquivo JSON
    fetch('index.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar o arquivo JSON");
            }
            return response.json();
        })
        .then(jsonData => {
            // O JSON possui estrutura de semanas com dias; vamos "achatar" essa estrutura
            data = jsonData;
            data.semanas.forEach(semana => {
                semana.dias.forEach(dia => {
                    flatDays.push({
                        semana: semana.nome,
                        dia: dia.dia,
                        mensagem: dia.mensagem,
                        desafio: dia.desafio
                    });
                });
            });
            // Exibe o desafio do dia corrente conforme o índice calculado
            displayDay(currentIndex);
        })
        .catch(err => {
            console.error("Erro ao carregar o arquivo JSON:", err);
        });

    // Event listener para o formulário de experiência (pode ser expandido conforme necessário)
    const experienciaForm = document.getElementById("experienciaForm");
    experienciaForm.addEventListener("submit", function (event) {
        // Lógica adicional para marcar a pergunta do dia como respondida pode ser adicionada aqui
    });
});
