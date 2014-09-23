var shuffle = function(tempPath){ 

//               --------------       Fisher-Yates (aka Knuth) Shuffle
        var currentIndex = slider1Val-1, temporaryValue, randomIndex ;

       // While there remain elements to shuffle...
        //console.log(currentIndex);
        while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);

        if(randomIndex<0)
            randomIndex=0;
        if(randomIndex>slider1Val-1)
            randomIndex=slider1Val-1;


        currentIndex -= 1;
        if(currentIndex<0)
         currentIndex=0;

        // And swap it with the current element.
        temporaryValue = tempPath[currentIndex];
        tempPath[currentIndex] = tempPath[randomIndex];
        tempPath[randomIndex] = temporaryValue;
      }
    
    return tempPath;
}