let pet, interval, properties, startTime;
let image = document.getElementById('image');
let msg = document.getElementById('petMsg');

// pet class and animal sub classes
class Cyberpet {
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.hunger = 100;
        this.thirsty = 100;
    }

    drink() {
        this.health = (this.health + 10 >= 100) ? 100 : this.health + 10;
        this.thirsty = (this.thirsty + 15 >= 100) ? 100 : this.thirsty + 15;
    }

    eat() {
        this.health = (this.health + 15 >= 100) ? 100 : this.health + 15;
        this.thirsty -= 7;
        this.hunger = (this.hunger + 10 >= 100) ? 100 : this.hunger + 10;
    }
}

class Dog extends Cyberpet {
    constructor(name) {
        super (name);
        this.happy = 100;
    }

    playFetch() {
        this.hunger -= 10;
        this.thirsty -= 10;
        this.happy = (this.happy + 20 >= 100) ? 100 : this.happy + 20;
    }

    walk() {
        this.hunger -= 10;
        this.thirsty -= 10;
        this.happy = (this.happy + 15 >= 100) ? 100 : this.happy + 15;
    }

    action(activity) {
        (activity === 'Eat') ? this.eat()
            : (activity === 'Drink') ? this.drink()
            : (activity === 'Play Fetch') ? this.playFetch()
            : (activity === 'Walk') ? this.walk()
            : null;
    }

    isAlive() {
        if(this.health <= 0){
            msg.textContent = `${this.name} ran out of life and died`
            petDied()
        } else if(this.hunger <= 0){
            msg.textContent = `${this.name} starved to death`
            petDied()
        } else if(this.thirsty <= 0){
            msg.textContent = `${this.name} died of dehydration`
            petDied()
        } else if(this.happy <= 0){
            msg.textContent = `${this.name} died of sadness`
            petDied()
        }
    }
}

class Cat extends Cyberpet {
    constructor(name) {
        super (name);
        this.satisfied = 100;
    }

    groom() {
        this.hunger -= 5;
        this.thirsty -= 5;
        this.satisfied = (this.satisfied + 20 >= 100) ? 100 : this.satisfied + 20;
    }

    chaseWool() {
        this.hunger -= 10;
        this.thirsty -= 10;
        this.satisfied += 15;
        this.satisfied = (this.satisfied + 15 >= 100) ? 100 : this.satisfied + 15;

    }

    action(activity) {
        (activity === 'Eat') ? this.eat()
            : (activity === 'Drink') ? this.drink()
            : (activity === 'Groom') ? this.groom()
            : (activity === 'Chase Wool') ? this.chaseWool()
            : null;
    }

    isAlive() {
        if(this.health <= 0){
            msg.textContent = `${this.name} ran out of life and died`
            petDied()
        } else if(this.hunger <= 0){
            msg.textContent = `${this.name} starved to death`
            petDied()
        } else if(this.thirsty <= 0){
            msg.textContent = `${this.name} died of dehydration`
            petDied()
        } else if(this.satisfied <= 0){
            msg.textContent = `${this.name} died of boredom`
            petDied()
        }
    }
}

// function that runs every time the interval runs and change animation
const timerFunc = () => {
    for (let i = 0; i < properties.length; i++) {
        if(properties[i] === "health"){
            pet[properties[i]] -= 5
            document.getElementById(properties[i]).value = pet[properties[i]]
        } else if(properties[i] === "hunger" || properties[i] === "thirsty"){
            pet[properties[i]] -= 2
            document.getElementById(properties[i]).value = pet[properties[i]]
        } else {
            document.getElementById(properties[i]).value = pet[properties[i]]--
        }
    }

    if(pet.health > 75){
        image.style.animation = 'happy 1s infinite steps(2)'
        msg.textContent = `they are happy`
    } else if(pet.health <= 75 && pet.health > 25){
        document.getElementById('image').style.animation = 'idle 1s infinite steps(2)'
        msg.textContent = `they are ok`
    } else {
        document.getElementById('image').style.animation = 'sad 1s infinite steps(2)'
        msg.textContent = `they are sad`
    }

    pet.isAlive()
}

// add starting stat loader and buttons
const addBtns = (optionArr, propertiesArr) => {
    for(let i = 0; i < optionArr.length; i++){
        document.getElementById('buttonWrapper').innerHTML += `<button onclick="pet.action('${optionArr[i]}')">${optionArr[i]}</button>`
    }  
    
    for(let i = 1; i < propertiesArr.length; i++){
        document.getElementById('statWrapper').innerHTML += `
        <div>
            <label for="${propertiesArr[i]}">${propertiesArr[i]}:</label>
            <progress id="${propertiesArr[i]}" name="${propertiesArr[i]}" class="stats" value="100" max="100"></progress>
        </div>
        `
    }

    msg.textContent = `they are happy`
}

// pet died logic
const petDied = () => {
    clearInterval(interval);
    let time = new Date(new Date().getTime() - startTime)
    document.getElementById('lifeSpan').textContent = `They lived for ${time.getMinutes()} minutes ${('0' + time.getSeconds()).slice(-2)} seconds`
    image.style.animation = 'dead 1s infinite steps(2)';
    setTimeout(() => {
        document.getElementById('restartScreen').style.height = '150px';
    }, 2000);
}

// reset screen and game
document.getElementById('restartBtn').addEventListener('click', () => {
    document.getElementById('restartScreen').style.height = '0px';
    setTimeout(() => {
        document.querySelector('#initialModal').style.display = "grid";
        interval = null;
        properties = null;
        pet = null;
        startTime = null;
        document.getElementById('statWrapper').innerHTML = "";
        document.getElementById('buttonWrapper').innerHTML = "";
        image.style.backgroundImage = "";
        image.style.animation = 'happy 1s infinite steps(2)';
        msg.textContent = ``;
        
        document.getElementById('petName').textContent = ``;
        document.getElementById('petType').textContent = ``;
    }, 500);
})


// initial set up of choice and name
document.getElementById('submitBtn').addEventListener('click', () => {
    let animalChosen = false;
    let animalName = false;
    // check if pet has been picked
    document.querySelectorAll('.choice').forEach((el) => {
        if(el.checked){
            animalChosen = el.value 
        }
    })
    // check if name has been inputed
    if(document.querySelector('#name').value.trim() !== ""){
        animalName = document.querySelector('#name').value.trim()
    }

    // if both have been inputted then do this or display error message
    if(animalChosen && animalName) {
        document.querySelector('#initialModal').style.display = "none";
        if(animalChosen === "cat"){
            pet = new Cat(animalName)
            addBtns(['Eat', 'Drink', 'Groom', 'Chase Wool'], Object.getOwnPropertyNames(pet))
            image.style.backgroundImage = "url('/cat-cyberpet.png')"
        } else if(animalChosen === "dog"){
            pet = new Dog(animalName)
            addBtns(['Eat', 'Drink', 'Walk', 'Play Fetch'], Object.getOwnPropertyNames(pet))
            image.style.backgroundImage = "url('/dog-cyberpet.png')"
        }
        document.getElementById('petName').textContent = `${animalName}`
        document.getElementById('petType').textContent = `The ${(Object.getOwnPropertyNames(pet).indexOf('happy') === -1) ? "Cat" : "Dog"}`

        let arr = Object.getOwnPropertyNames(pet)
        arr.shift()
        properties = arr

        startTime = new Date().getTime()

        document.querySelectorAll('.choice').forEach((el) => { el.checked = false })
        document.querySelector('#name').value = ""

        interval = setInterval(timerFunc, 500);
    } else {
        document.querySelector('#initialModal div p').textContent = "please select a pet and name"
    }
})