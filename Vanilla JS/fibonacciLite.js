fibonacciWithNInput = ( n ) => {
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

    return printOutput
}
console.log(fibonacciWithNInput(10))