let piano__main_keys_content = document.querySelector("#piano__main_keys .content");
let piano = document.querySelector(".piano");
let piano__double_back = document.querySelector("#piano__double_back");
let piano__back = document.querySelector("#piano__back");
let piano__forward = document.querySelector("#piano__forward");
let piano__double_forward = document.querySelector("#piano__double_forward");
let audios = [];
let counter = 0;
let scrollValue = 0;

let notes = {
    0: "a",
    2: "b",
    3: "c",
    5: "d",
    7: "e",
    8: "f",
    10: "g",
}

// awsedftgyhujkolp;

let keyOrders = ["a", "w", "s", "e", "d", "f", "t", "g", "y", "h", "u", "j", "k", "o", "l", "p", ";"];
let keyObject = {
    97: "a",
    119: "w",
    115: "s",
    101: "e", 
    100: "d",
    102: "f",
    114: "t",
    103: "g",
    121: "y",
    104: "h",
    117: "u",
    106: "j",
    107: "k",
    111: "o",
    108: "l",
    112: "p",
    44: ";"
};

let colorsRegardingRange = {
    0: "rgb(240, 240, 240)",
    1: "rgb(210, 210, 210)",
    2: "plum",
    3: "lightblue",
    4: "lightgreen",
    5: "lightyellow",
    6: "#fcd1c0",
    7: "lightpink",
    8: "#facdd4",
}

let dataKeyCounter = 0;
let dataKeyFlag = false;

document.addEventListener('DOMContentLoaded', function() {
    var preventSelectLinks = document.querySelectorAll('.container');
  
    for (var i = 0; i < preventSelectLinks.length; i++) {
      preventSelectLinks[i].addEventListener('mousedown', function(event) {
        event.preventDefault();
      });
    }
  });

piano__main_keys_content.addEventListener('scroll', (event) => {
    console.log(piano__main_keys_content.clientWidth);
    
    console.log("Trial2", document.scrollValue);
});

document.addEventListener('DOMContentLoaded', function() {
    console.log(piano__main_keys_content.scrollWidth);
    console.log(piano__main_keys_content.offsetWidth);

    scrollValue = (piano__main_keys_content.scrollWidth - piano__main_keys_content.offsetWidth) / 2;
    piano__main_keys_content.scrollTo(scrollValue, 0);
  });
  
piano__double_back.addEventListener("click", () => {
    scrollValue -= 500;

    if (scrollValue <= 0) {
        scrollValue = 0;
    }

    piano__main_keys_content.scrollTo(scrollValue, 0);
    console.log("Trial1");
});

piano__back.addEventListener("click", () => {
    scrollValue -= 200;
    
    if (scrollValue <= 0) {
        scrollValue = 0;
    }

    piano__main_keys_content.scrollTo(scrollValue, 0);
});

piano__forward.addEventListener("click", () => {
    scrollValue += 200;

    console.log("Trial1", piano__main_keys_content.scrollWidth);

    // if (scrollValue > piano__main_keys_content.scrollLeft){
    //     scrollValue = piano__main_keys_content.scrollLeft;
    //     console.log("trial2");
    // }

    piano__main_keys_content.scrollTo(scrollValue, 0);
    console.log(scrollValue);
});

piano__double_forward.addEventListener("click", () => {
    scrollValue += 450;
    piano__main_keys_content.scrollTo(scrollValue, 0);
    console.log("Trial1");
});

for (let i = 0; i < 88; i++){
    audios.push(new Audio(`notes/${i}.ogg`));

    let str = "piano__main_key";
    let text = "";
    let left = i % 12;
    let hide = false;
    let dataKey = "";
    // console.log("i:", i, "left: ", left);

    if(left == 3){
        counter += 1;
    };

    if(left in notes){
        text = notes[left].toUpperCase();
    }

    if (left == 1 || left == 4 || left == 6 || left == 9 || left == 11){
        str = "piano__diez_key";
        hide = true;
    }

    if(text == "C" && counterTemp == 3){
        dataKeyFlag = true;
    }

    if(dataKeyFlag == true && dataKeyCounter < keyOrders.length){
        dataKey = keyOrders[dataKeyCounter];
        dataKeyCounter++;
    }
    else{
        dataKey = "";
    }
    
    counterTemp = counter;
    let display = "inline-block";

    if(hide){
        counterTemp = "";
        display = "none";
    }

    let html = `
    <a href="#piano__header_scrollbar" id="note${i}">
        <div class="${str}">
            <h3 style="display: ${display};background-color: ${colorsRegardingRange[counter]}" data-key="${dataKey}">${text}${counterTemp}</h3>
        </div>
    </a>
    `;

    piano__main_keys_content.insertAdjacentHTML("beforeend", html);

    let key = document.querySelector(`#note${i}`);

    key.addEventListener("click", () => {

            // audios[i].pause();
            audios[i].load();
            audios[i].play();
    });
};

let keyTrial = document.querySelector(`#note64`);
let previousNote = null;

document.addEventListener("keypress", function(event){
    if(Object.keys(keyObject).includes(event.keyCode.toString())){
        let note = document.querySelector(`[data-key="${keyObject[event.keyCode]}"]`);  

        if(previousNote != null){
            if(previousNote.parentElement.classList.value == "piano__main_key") {
                previousNote.parentNode.style.background = "white";
            }
            else {
                previousNote.parentNode.style.background = "linear-gradient(to left, rgb(16, 16, 16), rgb(64, 64, 64), rgb(16, 16, 16));";
            }
        }

        previousNote = note;

        if(note.parentElement.classList.value == "piano__main_key") {
            note.parentNode.style.background = "rgb(128, 128, 128)";
        }
        else {
            note.parentNode.style.background = "linear-gradient(to left, rgb(96, 96, 96), rgb(128, 128, 128), rgb(96, 96, 96))";
        }

        setTimeout(() => {
            if(note.parentElement.classList.value == "piano__main_key") {
                note.parentNode.style.background = "white";
            }
            else {
                note.parentNode.style.background = "linear-gradient(to left, rgb(16, 16, 16), rgb(64, 64, 64), rgb(16, 16, 16))";
            }
        }, 200);
        
        note.click();
    }

    // event.preventDefault();
});
