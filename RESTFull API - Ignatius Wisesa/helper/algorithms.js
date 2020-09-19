// Reverse Algoritm
reverse = ( character ) => {
    var lastIndex = character.length - 1
    var output = ``
    for(var i = lastIndex; i >= 0; i--){
        output += character[i]
    }

    return output
}

// Fibonacci Algorithm
fibonacci = ( n ) => {
    var output = [0]
    for(var i = 1; i < n; i++){
        if(i === 1){
            output.push(output[i-1]+1)
        } else{
            output.push(output[i-1]+output[i-2])
        }
    }
    var printOutput = ``
    for(var i = 0; i < output.length; i++){
        printOutput += `${output[i]} `
    }

    return printOutput.trim()
}

// Factorial Algorithm
factorialOneInput = ( k ) => {
    var output = k
    while( k > 1 ){
        output *= k-1
        k--
    }

    return output
}

// Combination Algorithm
// Uses Factorial Algorithm
combination = ( n, r ) => {
    if(n === r){
        return 1
    }

    return factorialOneInput(n)/(factorialOneInput(r)*factorialOneInput(n-r))
}

module.exports =  {
    reverse,
    fibonacci,
    combination
};