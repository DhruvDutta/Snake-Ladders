const ladders = {
    "4":14,
    "9":31,
    "20":38,
    "28":84,
    "36":44,
    "51":67,
    "62":81,
    "71":90,
}
const snakes = {
    "25":3,
    "56":48,
    "59":1,
    "69":32,
    "83":57,
    "91":73,
    "94":26,
    "95":85,
    "99":80
}
a=1;
b=1;
function moveto(n,dice){
    r=document.getElementById(dice).style;
    if(n<100 && n>=0){
    var row = Math.floor((n)/10);
    var col = n%10;
    console.log(n+1,row,col);
    if(row%2==0){
        r.left = (col*3.255 + 4.8) +"em";
        r.top = (33.5 - row*3.166) + "em";
    }else{
        r.left = (34.1 - col*3.255) +"em";
        r.top = (33.5 - row*3.166) + "em";
    }
    if(n+1==100){
        alert(dice+" Wins!!");
    }
    return n+1;
    }
}
function sORl(pos,dice){
    setTimeout(function(){
        if(Object.keys(ladders).includes(String(pos))){
            final = moveto(ladders[String(pos)]-1,dice);
            if(dice=="r"){
                a = final;
            }else{
                b = final;
            }
        }else if(Object.keys(snakes).includes(String(pos))){
            final = moveto(snakes[String(pos)]-1,dice);
            if(dice=="r"){
                a = final;
            }else{
                b = final;
            }
        }
    },500);
}
function kill(dice){
    setTimeout(function(){
        if(a==b){
            final = moveto(0,dice);
            if(dice=="r"){
                a = final;
            }else{
                b = final;
            }
        }
    },500);
}
function act(){
    setTimeout(function(){
        document.getElementById("num").style.display = "block";
        document.getElementById("nu").style.display = "none";
    },500);
}
var i = 0;
function num1(){
    document.getElementById("num").style.display = "none";
    document.getElementById("nu").style.display = "block";
    var N = Math.ceil(Math.random()*(5)+1);
    var num = N;

    document.getElementById("num").innerHTML = num;
    document.getElementById("nu").innerHTML = num;
    if(num==6){
        num+="+"+Math.ceil(Math.random()*(5)+1);
        document.getElementById("num").innerHTML = num;
    document.getElementById("nu").innerHTML = num;
    }
    if(eval(num)==12){
        num+="+"+Math.ceil(Math.random()*(5)+1);
        document.getElementById("num").innerHTML = num;
    document.getElementById("nu").innerHTML = num;
    }
    if(eval(num)==18){
        alert("Three 6s");
        return
    }
    num=eval(num);
    if(i%2==0){
        var g=moveto(a+num-1,"r");
        i+=1;
        if(g!=undefined){
        a=g;
        sORl(a,"r")
        kill("b");
        }else if(a==100){
            alert("Red Wins!")
        }
    }else{
        var g= moveto(b+num-1,"b");
        i+=1;
        if(g!=undefined){
        b=g;
        sORl(b,"b")
        kill("r");
        }else if(a==100){
            i+=1;
            alert("Blue Wins!")
        }
    }
    act();
    num=0;

}
