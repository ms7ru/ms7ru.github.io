function calculate() {
    const input = document.getElementById('calculator').value;
    let result;
    try {
        result = math.evaluate(input);
    } catch (e) {
        result = 'Error: Invalid expression';
    }
    document.getElementById('result').innerText = 'Result: ' + result;
}