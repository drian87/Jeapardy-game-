// To run this assignment, right click on index.html in the Visual Studio Code file explorer to the left
// and select "Open with Live Server"

// YOUR CODE HERE!
let url
let answer
let question
let questionArray = []
let currentQuestion = 0
let randomQuestion
let totalScore

let formElement = document.getElementById("form")
let scoreCount = document.getElementById("scoreCount")
let questionArea = document.getElementById("h1Element")
let correctScore = document.getElementById("correct")
document.getElementById("secondPelement").style.display = "none"
let score = 0
let answerCorrectIncorrect
// console.log(scoreCount.innerText=score+1)

function endOfGame() {
    console.log(questionArray)
}


function checkAnswer() {

    let typedAnswer = document.getElementById("answerInput")
    let answerTyped = typedAnswer.value.toLowerCase()
    console.log(answerTyped)
    let correctAnswer = answer.toLowerCase() === answerTyped
    if (correctAnswer) {
        // currentQuestion+=1
        document.getElementById("secondPelement").style.display = "block"
        score += 1
        console.log(currentQuestion)
        scoreCount.innerText = score
        answerCorrectIncorrect = `Correct`
        correctScore.innerHTML = answerCorrectIncorrect
        typedAnswer.value = ""
        if (score >= questionArray.length) {
            h3Element.innerText = `Congratulations you finished the game. Want to play again, press Reset game`
            questionArea.append(h3Element)
            console.log("congrats")
            formElement.innerHTML = ""
            let button = document.createElement("button")
            button.innerHTML = `reset Game`
            document.body.append(button)
            button.addEventListener("click", function () {
                location.reload()
            })
        } else {
            displayQuestion()
        }

    } else {
        document.getElementById("secondPelement").style.display = "block"
        score += 1
        totalScore = score - 1
        console.log(totalScore)
        typedAnswer.value = ""
        score = 0
        answerCorrectIncorrect = `Incorrect`
        correctScore.innerHTML = answerCorrectIncorrect
        scoreCount.innerText = score
        h3Element.innerText = `You missed a question, press start and try again Your total score is ${totalScore}`
        questionArea.append(h3Element)
        console.log("You missed a question")
    }
    console.log(answer)
    // console.log(correctAnswer)


}

function hideAnswer() {

    document.getElementById("secondPelement").style.display = "none"
}




let startButton = document.getElementById("starbutton")
// startButton.addEventListener("click",getInfo)
startButton.addEventListener("click", function () {
    getInfo()
    hideAnswer()
})

let button = document.getElementById("submitAnswer")
button.addEventListener("click", function (event) {
    event.preventDefault()
    checkAnswer()
})


let h3Element = document.createElement("h3")
function displayQuestion() {
    randomQuestion = Math.floor(Math.random() * questionArray.length)
    console.log(randomQuestion)
    console.log(questionArray)
    question = questionArray[randomQuestion].question
    console.log(question)
    answer = questionArray[randomQuestion].answer
    console.log(answer)



    h3Element.innerText = ""
    h3Element.innerText = question
    questionArea.append(h3Element)


}


function getQuestionAnswer(data) {
    // console.log(data)
    // question = data[0].question
    // console.log(question)
    // answer = data[0].answer
    // console.log(answer)
    // console.log(data)

    let category = data[0].category_id
    getCategory(category)

    // checkAnswer(answer)

}

function getCategory(id) {
    url = `https://jservice.io/api/clues?category=${id}`
    let fetchUrl = fetch(url)
    fetchUrl.then(response => response.json())
        .then(data => {
            data.forEach(data => questionArray.push(data))

            displayQuestion(data)
        })
}

function confirmResponse(response) {
    let getresponse = response.json()
    getresponse.then(getQuestionAnswer)
}

function getInfo() {

    url = `https://jservice.io/api/random`

    console.log(url)

    let fetchUrl = fetch(url)
    fetchUrl.then(confirmResponse)
}

