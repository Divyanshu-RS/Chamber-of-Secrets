// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Function to handle button clicks
    function handleButtonClick(buttonId) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.click();
        }
    }

    // Calculator functions
    function getHistory() {
        return document.getElementById('history-value').innerText;
    }

    function printHistory(num) {
        document.getElementById("history-value").innerText = num;
    }

    function getOutput() {
        return document.getElementById("output-value").innerText;
    }

    function printOutput(num) {
        if (num == "") {
            document.getElementById("output-value").innerText = num;
        } else {
            document.getElementById("output-value").innerText = getFormattedNumber(num);
        }
    }

    function getFormattedNumber(num) {
        if (num == "-") {
            return "";
        }
        var n = Number(num);
        var value = n.toLocaleString("en");
        return value;
    }

    function reverseNumberFormat(num) {
        return Number(num.replace(/,/g, ''));
    }

    // Add event listeners for operator buttons
    var operator = document.getElementsByClassName("operator");
    for (var i = 0; i < operator.length; i++) {
        operator[i].addEventListener('click', function () {
            if (this.id == "clear") {
                printHistory("");
                printOutput("");
            } else if (this.id == "backspace") {
                var output = reverseNumberFormat(getOutput()).toString();
                if (output) {
                    output = output.substr(0, output.length - 1);
                    printOutput(output);
                }
            } else {
                var output = getOutput();
                var history = getHistory();
                if (output == "" && history != "") {
                    if (isNaN(history[history.length - 1])) {
                        history = history.substr(0, history.length - 1);
                    }
                }
                if (output != "" || history != "") {
                    output = output == "" ? output : reverseNumberFormat(output);
                    history = history + output;
                    if (this.id == "=") {
                        var result = eval(history);
                        printOutput(result);
                        printHistory("");
                    } else if (this.id == "%") {
                        var n = reverseNumberFormat(getOutput());
                        var percent = n / 100;
                        printOutput(percent.toFixed(4));
                    } else {
                        history = history + this.id;
                        printHistory(history);
                        printOutput("");
                    }
                }
            }
        });
    }

    // Add event listeners for number buttons
    var number = document.getElementsByClassName("number");
    for (var i = 0; i < number.length; i++) {
        number[i].addEventListener('click', function () {
            var output = reverseNumberFormat(getOutput());
            // if output is a number
            if (!isNaN(output)) {
                output = output + this.id;
                printOutput(output);
            }
        });
    }

    // Add event listener for theme toggle
    let checkbox = document.querySelector('input[name=theme]');
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    });

    // Add event listener for keyboard input
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case '0':
                handleButtonClick('0');
                break;
            case '1':
                handleButtonClick('1');
                break;
            case '2':
                handleButtonClick('2');
                break;
            case '3':
                handleButtonClick('3');
                break;
            case '4':
                handleButtonClick('4');
                break;
            case '5':
                handleButtonClick('5');
                break;
            case '6':
                handleButtonClick('6');
                break;
            case '7':
                handleButtonClick('7');
                break;
            case '8':
                handleButtonClick('8');
                break;
            case '9':
                handleButtonClick('9');
                break;
            case '+':
                handleButtonClick('+');
                break;
            case '-':
                handleButtonClick('-');
                break;
            case '*':
                handleButtonClick('*');
                break;
            case '/':
                handleButtonClick('/');
                break;
            case 'Enter':
            case '=':
                handleButtonClick('=');
                break;
            case 'Backspace':
                handleButtonClick('backspace');
                break;
case 'Delete':
                handleButtonClick('clear');
                break;
            case 'Escape':
                handleButtonClick('clear');
                break;
            case '%':
                handleButtonClick('%');
                break;
            default:
                break;
        }
    });
});
