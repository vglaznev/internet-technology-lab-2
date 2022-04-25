window.addEventListener('load', function OnWindowLoaded() {
    let signs = [
        '1', '2', '3',
        '4', '5', '6',
        '7', '8', '9',
        '0', 'OK', 'C',
    ];
    let calc = document.getElementById('keyboard');
    textArea = document.getElementById('inputVal');
    signs.forEach(function (sign) {
        let signElement = document.createElement('div');
        signElement.className = 'btn';
        signElement.innerHTML = sign;
        calc.appendChild(signElement);
    });

    document.querySelectorAll('.btn').forEach(function (button) {
        button.addEventListener('click', onButtonClick);
    });

    document.querySelectorAll('.range').forEach(function (button) {
        button.addEventListener('click', installRange);
    });

    document.querySelectorAll('.sign').forEach(function (button) {
        button.addEventListener('click', installSign);
    });

    document.getElementById('create-example').addEventListener('click', createExample);
});

let range;
let sign;
let result;
let previousRangeButton;
let previousSignButton;
let textArea;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function resetStyles(e) {
    e.target.style.background = '';
    e.target.style.color = '';
}

function setStyles(e) {
    e.target.style.background = '#6B5B95';
    e.target.style.color = '#FFFFFF';
}

function installSign(e) {
    if (previousSignButton != undefined) {
        resetStyles(previousSignButton);
    }
    sign = e.target.innerHTML;
    setStyles(e);
    previousSignButton = e;
}

function installRange(e) {
    if (previousRangeButton != undefined){
        resetStyles(previousRangeButton);
    }
    range = e.target.innerHTML;
    setStyles(e);
    previousRangeButton = e;
}

function generateNumber(range) {
    const rangeMap = new Map([
        ['0-10', 10],
        ["0-20", 20],
        ["0-100", 100]
    ]);
    return getRandomInt(rangeMap.get(range));
}

function createExample(e) {
    if (sign == undefined || range == undefined) {
        alert("Please select sign and range!");
        return;
    }
    let generatedNumbers = [generateNumber(range), generateNumber(range)];
    document.getElementById('first').value = generatedNumbers[0];
    document.getElementById('second').value = generatedNumbers[1];
    document.getElementById('sign').value = sign;
    result = eval(generatedNumbers[0] + sign + generatedNumbers[1]).toString(8);
}

function onButtonClick(e) {

    if (e.target.innerHTML === 'C') {
        textArea.value = '';
    } else if (e.target.innerHTML === 'OK') {
        if (result == undefined) {
            alert("Please generate example!");
            return;
        }
        document.getElementById('result').value = result;
        if (result == textArea.value) {
            alert("Correct answer");
        } else {
            alert("Wrong answer");
        }

    } else if (e.target.innerHTML === '9') {
        textArea.value = 'Блять мы в восьмеричной работаем.';
    } else if (e.target.innerHTML === '8') {
        textArea.value = 'Куда жмать';
    } else {
        textArea.value += e.target.innerHTML;
    }
}
