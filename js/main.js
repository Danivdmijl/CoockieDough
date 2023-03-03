class Cookie{
    name = "";
    htmlElement = undefined;
    score = undefined;
    factor = 1;
    constructor(newName, newHTMLElement,newScore){
        this.name = newName;
        this.htmlElement = newHTMLElement;
        this.htmlElement.onclick = this.onCookieClicked;
        this.score = newScore;
    }

    onCookieClicked = () =>  {
        this.score.onCookieClicked(this.factor);
    }

    onStyleChanged() {
        this.htmlElement.classList.add("cookie--chocolate");
    }

    onStyleChangedRedValvet() {
        this.htmlElement.classList.add("cookie--redvalvet");
    }
}

class Score{
    score;
    name = "";
    htmlElement = undefined;

    constructor(newScore, newName, newHTMLElement) {
        this.score = newScore;
        this.name = newName;
        this.htmlElement = newHTMLElement;
        this.htmlElement.innerText = newScore;
    }

    onCookieClicked(factorFromCookie) {
        this.score = this.score + factorFromCookie;
        this.htmlElement.innerText = this.score;
    }

    subtractScore() {
        this.score = this.score - 100;
        this.htmlElement.innerText = this.score;
    }

    onAutoScoreClicked() {
        setInterval( () => {
            this.score = this.score + 500;
            this.htmlElement.innerText = this.score;
        }, 10000)
    }

    addPoints() {
        this.score = this.score + 10000;
        this.htmlElement.innerText = this.score;
    }

    scoreloaded(newScore){
        this.score = newScore;
        this.htmlElement.innerText = this.score;
    }
}

class Multiplier{
    factor = 100;
    htmlElement = undefined;
    cookie = undefined;
    bought = false;

    constructor(htmlElement, cookie) {
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onMultiplierClicked;
    }

    onMultiplierClicked = () => {
        if (this.bought === false) {
            this.bought = true;
            this.cookie.score.subtractScore();
            this.cookie.factor = this.factor;   
        }
    }
}

class AutoScore{
    htmlElement = undefined;
    score = undefined;
    bought = false;

    constructor(htmlElement, score) {
        this.htmlElement = htmlElement;
        this.score = score;
        this.htmlElement.onclick = this.onAutoScoreClicked;
    }

    onAutoScoreClicked = () => {
        if (this.bought === false) {
            this.bought = true;
            this.score.subtractScore();
            this.score.onAutoScoreClicked();            
        }
    }
}


class ChocolateCookie{
    htmlElement = undefined;
    bought = false;
    cookie = undefined;

    constructor(htmlElement, cookie) {
        this.htmlElement = htmlElement;  
        this.cookie = cookie;
        this.htmlElement.onclick = this.onChocolateCookieClicked;
    }

    onChocolateCookieClicked = () => {
        if (this.bought === false && window.localStorage.getItem("chocolateCookie") !== "true"){
            this.bought = true;
            window.localStorage.setItem("chocolateCookie",this.bought);
            this.cookie.onStyleChanged();
            this.cookie.score.addPoints();
        }
        this.cookie.onStyleChanged();
    }

}

class RedValvetCookie{
    htmlElement = undefined;
    bought = false;
    cookie = undefined;

    constructor(htmlElement, cookie) {
        this.htmlElement = htmlElement;  
        this.cookie = cookie;
        this.htmlElement.onclick = this.onRedValvetCookieClicked
    }

    onRedValvetCookieClicked = () => {
        if (this.bought === false) {
            this.bought = true
            this.cookie.onStyleChangedRedValvet();
            this.cookie.score.addPoints();
        }
    }
}

class Save{
    htmlElement;

    constructor(newHTMLElement){
        this.htmlElement = newHTMLElement;
        this.htmlElement.onclick = this.onSaveButtonClicked;
    }

    onSaveButtonClicked = () =>{
        window.localStorage.setItem("score",score.score);
    }
}

class Load{
    score;

    constructor(score){
        this.score = score;

        this.onLoad();
    }

    onLoad = function(){
        const scoreFromLocalStorage = window.localStorage.getItem("score");
        if(scoreFromLocalStorage !== null){
            this.score.scoreloaded(parseInt(scoreFromLocalStorage)); 
        }  
    }
}

const score = new Score(333, "Default Score", document.getElementById("js--score"));
const cookie = new Cookie("Default", document.getElementById("js--cookie"), score);


const multiplier = new Multiplier(document.getElementById("js--multiplier"), cookie);
const auto = new AutoScore(document.getElementById("js--autoscore"), score);
const chocolate = new ChocolateCookie(document.getElementById("js--chocolate"), cookie);
const redvalvet = new RedValvetCookie(document.getElementById("js--redvalvet"), cookie);
const save = new Save(document.getElementById("js--save"));
const load = new Load(score);

const multiplierPc = new Multiplier(document.getElementById("js--multiplier--pc"), cookie);
const autoPc = new AutoScore(document.getElementById("js--autoscore--pc"), score);
const chocolatePc = new ChocolateCookie(document.getElementById("js--chocolate--pc"), cookie);
const redvalvetPc = new RedValvetCookie(document.getElementById("js--redvalvet--pc"), cookie);