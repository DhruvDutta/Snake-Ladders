
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
var t = 37;
var l = 1;
var t1= 37;
var l1 = 1;
function change(go,turn){
    
    if(go=="up"){
        if(turn =="r"){
            t-=4;
            a+=1;
        }else{
            t1-=4;
            b+=1;
        }
    }else if(go=="right"){
        if(turn =="r"){
            l+=4;
            a+=1;
        }else{
            l1+=4;
            b+=1;
        }
    }else if(go=="left"){
        if(turn =="r"){
            l-=4;
            a+=1;
        }else{
            l1-=4;
            b+=1;
        }
    }
    else{
        if(turn =="r"){
            t+=4;
        }else{
            t1+=4;
        }
    }
}
function move(n,d){
    if (d=="r"){
        var r = document.getElementById(d);
        for(let i=0;i<n;i++){
            if(a%10==0){
                change("up",d)
                r.style.top = t+"em";
            }
            else{
                if(parseInt(a/10)%2==0){
                    change("right",d);
                    r.style.left = l+"em";
                }else{
                    change("left",d);
                    r.style.left = l+"em";
                }
            }
        }
        return a;
    }else if(d=="b"){    
        var r = document.getElementById(d);
        for(let i=0;i<n;i++){
            if(b%10==0){
                change("up",d)
                r.style.top = t1+"em";
            }
            else{
                if(parseInt(b/10)%2==0){
                    change("right",d,4);
                    r.style.left = l1+"em";
                }else{
                    change("left",d,4);
                    r.style.left = l1+"em";
                }
            }
        }
        return b;
    }
    else if(d=="R" || d=="B"){
        d = d.toLowerCase();
        if(d=="r"){
            diff = a-n;
            console.log("r:diff: "+diff)
            while(a>= Math.ceil(n/10)*10 || a<=(Math.ceil(n/10)*10-9) ){
                a-=10;
                change("down",d)
                document.getElementById(d).style.top = t+"em";
                console.log("a goes to "+a);
                diff-=10;
            }
            while(diff!=0){
                console.log("diff isnot 0")
                if(diff<0){
                    console.log(diff)
                a = move(-diff+1,d);
                diff=0;
                console.log("done r")
                }else if(diff>0){
                    for(let k =diff;k>0;k--){ 
                    if(parseInt(a/10)%2==0){
                        change("left",d);
                        document.getElementById(d).style.left = l+"em";
                    }else{
                        change("right",d);
                        document.getElementById(d).style.left = l+"em";
                    }
                    }
                    diff=0;
                }
            }
        }else{
            diff = b-n;
            console.log("b:diff: "+diff)
            while(b>= Math.ceil(n/10)*10 || b<=(Math.ceil(n/10)*10-9) ){
                b-=10;
                change("down",d)
                document.getElementById(d).style.top = t1+"em";
                console.log("b goes to "+b);
                diff-=10;
            }
            while(diff!=0){
                console.log("diff isnot 0")
                if(diff<0){
                    console.log(diff)
                b = move(-diff+1,d);
                diff=0;
                console.log("done b")
                }else{
                    for(let k =diff;k>0;k--){ 
                    if(parseInt(b/10)%2==0){
                        change("left",d);
                        document.getElementById(d).style.left = l1+"em";
                    }else{
                        change("right",d);
                        document.getElementById(d).style.left = l1+"em";
                    }
                    }
                    diff=0;
                }
            }
        }
        
        if(a==b){
            if(d=="r"){
                kill("b");
            }else{
                kill("r")
            }
        }
    }
}
function kill(k){
    if(k=="r"){
    setTimeout(function(){a=1;
        t=37;
        l=1;
        document.getElementById("r").style.top = 37+"em";
        document.getElementById("r").style.left = 1+"em";},1000);
    }else{
        setTimeout(function(){b=1;
            t1=37;
            l1=1;
            document.getElementById("b").style.top = 37+"em";
            document.getElementById("b").style.left = 1+"em";},1000);
}}
a=1;
b=1;
var played=0;
function num(){
    var n = parseInt(Math.random()*(5)+1);
    n=68;
    document.getElementById("num").innerHTML = n;
    if(played%2==0 && a+n <=100){
        a= move(n,"r");
        console.log("red goes to: "+a);
        if(a==100){
            alert("a wins!")
            return
        }
        if(a==b){
            console.log("b killed a");
            kill("b");
            
        }
        if(Object.keys(ladders).includes(String(a))){
            setTimeout(function(){console.log("ladder");
            a = move(ladders[String(a)]-a,"r");
            if(a==b){
                console.log("a killed b");
                kill("b");
                
            }},1000);
        }
        if(Object.keys(snakes).includes(String(a))){
            setTimeout(function(){console.log("snake");
            setTimeout(a = move(snakes[String(a)],"R"),1000);
            if(a==b){
                console.log("a killed b");
                kill("b");}
                
            },1000);
            
        }
        
    }else if(played%2!=0 && b+n<=100){
        b= move(n,"b");
        console.log("blue goes to: "+b);
        if(b==100){
            alert("b wins!")
            return
        }
        
        if(a==b){
            console.log("b killed a");
            kill("r")
        }
        if(Object.keys(ladders).includes(String(b))){
            setTimeout(function(){console.log("ladder");
            b = move(ladders[String(b)]-b,"b");
            if(a==b){
                console.log("b killed a");
                kill("r");
            }
        },1000);
        }
        if(Object.keys(snakes).includes(String(b))){
            setTimeout(function(){console.log("snake b");
            setTimeout(b = move(snakes[String(b)],"B"),1000);
            if(a==b){
                console.log("b killed a");
                kill("r");
            }
        },1000);
        }
    }
    played+=1;
}
