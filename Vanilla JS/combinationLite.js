factorialOneInput = ( k ) => {
    var output = k
    
    while( k > 1 ){
        output *= k-1
        k--
    }

    return output
}

combinationTwoInput = ( n, r ) => {
    if(n === r){
        return 1
    }

    return factorialOneInput(n)/(factorialOneInput(r)*factorialOneInput(n-r))

}

console.log(combinationTwoInput(4,4))