const linkPegarListaQuizzes = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes'
const UserQuizzesListaIds = [1,2,3];

function pegarUserQuizzes(){
    let content = localStorage.getItem('listaUserQuizzes')
    if (content){
        let listaIds = JSON.parse(content)
        for (let Id = 0; Id < listaIds.length; Id++) {
            const quizz = listaIds[Id];
            UserQuizzesListaIds.push(quizz)
        }
        renderizarListaUserQuizzes()
    }
}

// Pegar a lista de quizzes no api e renderizar na tela 1
let promise = axios.get(linkPegarListaQuizzes);
promise.then(renderizarListaQuizzes)
renderizarListaUserQuizzes()

function renderizarListaUserQuizzes() {
    if(UserQuizzesListaIds.length>0){
        let linkQuizzId = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/ID_DO_QUIZZ"
        const divListaQuizzUser = document.querySelector(".quizzUser")
        divListaQuizzUser.innerHTML = ""
        for (let i = 0; i < UserQuizzesListaIds.length; i++) {
            const quizzId = UserQuizzesListaIds[i];
            let linkQuizzId = `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzId}`
            axios.get(linkQuizzId)
                .then((response)=>{
                    let quizz = response.data
                    divListaQuizzUser.innerHTML+=divQuizz(quizz.title,quizz.image)
                })
        }
        // falta tratar o esconder/mostrar dos conteiners caso exista quiz criados pelo usuário
        const divConteinerQuizzUser = document.querySelector(".quizzExistenteUsuario") 
        const divConteinerUserSemQuizz = document.querySelector(".quizzUsuario") 
        divConteinerQuizzUser.classList.toggle("escondido")
        divConteinerUserSemQuizz.classList.toggle("escondido")


    }
    
}
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