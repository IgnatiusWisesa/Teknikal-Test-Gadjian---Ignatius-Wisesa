reverseCharacter = ( inputString ) => {
    var lastIndex = inputString.length - 1

    var output = ``

    for(var i = lastIndex; i >= 0; i--){
        output += inputString[i]
    }

    return output
}

console.log(reverseCharacter('abcde'))