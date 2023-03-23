// I created this function to return change in the multiple of the coins

export function bureauDeChange(money:any, denom:any){
    if (denom[0] < denom[1]) denom.reverse();
    const change:any = {};
    const changeArr: any[] = [];
    denom.forEach((x:any) => {
       change[x] = Math.floor(money/x);
       money -= x*change[x];
    }) 
    denom.forEach((x:any) => {
        for(var i = 1;i<=change[x];i++){
            changeArr.push(x);
        }
    })
    return changeArr;
}
