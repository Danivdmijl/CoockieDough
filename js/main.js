class Cookie{
    name = "";
    htmlElement = undefined;
    score = undefined;
    constructor(newName, newHTMLElement,newScore){
        this.name = newName;
        this.htmlElement = newHTMLElement;
        this.htmlElement.onclick = this.onCookieClicked;
        this.score = newScore;
    }

    onCookieClicked() {
        console.log("geklikt!");
        this.score.onCookieClicked();
    }

}

class Score{
    defaultScore = 10000;
    name = "";
    htmlElement = undefined;

    constructor(newDefaultScore, newName, newHTMLElement) {
        this.defaultScore = newDefaultScore;
        this.name = newName;
        this.htmlElement = newHTMLElement;
        this.htmlElement.innerText = newDefaultScore;
    }

    onCookieClicked() {
        console.log("Ewa boelers ik ben de score niet biggie doen");
    }
}

const score = new Score(0, "Default Score", document.getElementById("js--score"));
const cookie = new Cookie("Default", document.getElementById("js--cookie"), score);