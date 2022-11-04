const linkPegarListaQuizzes = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes'
let promise = axios.get(linkPegarListaQuizzes);
promise.then(renderizarListaQuizzes)


function renderizarListaQuizzes(response) {
    let data = response.data
    const ListaDivQuizz = document.querySelector(".quizzesDisponiveis")
    ListaDivQuizz.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        const quizz = data[i];
        ListaDivQuizz.innerHTML +=divQuizz(quizz.title,quizz.image)        
    }
    
    
}

function divQuizz(titulo,urlImagem){
    let style = `background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%),url(${urlImagem});
                 background-size: 100%;`
    return `<div onclick="" class="quizz">         
                <div class="imagemQuiz" style='${style}'></div>
                <div class="nomeQuizz">${titulo}</div>
            </div>`

}