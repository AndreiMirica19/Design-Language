let cmdline=process.argv.slice(2);
let source=cmdline[0]
let svgFile=cmdline[1]
let fileInput=require('fs')
let s=""
s = fileInput.readFileSync(source,'utf8');
let ss:string[]=s.split(/\n\r?/)
let ii=-1
let draw="<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\
<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"1024\" height=\"768\">\n\ "
let drawInit=draw;

class variab{
    name:string
    value:number
    constructor(name:string,value:number){
        this.name=name;
        this.value=value
    }
   setValue(value:number){
       this.value=value;
   }
   getValue():number{
       return this.value
   }
   getName():string{
       return this.name;
   }
}
let variables:variab[]=new Array()
class position{
    xCoord:string
    yCoord:string;
    constructor(xCoord:string,yCoord:string){
        this.xCoord=xCoord;
        this.yCoord=yCoord
    }
}
let pos:position=new position("0","0")


let penColor="rgb(0,0,0)"
let fillColor="rgb(255,255,255)"
let penWidth=1
let n=ss.length
let i=-1
let split:string[]=new  Array();
let characters:RegExp=/[%a-zA-Z]+/
let NumbersCharExp:RegExp=/[%a-z0-9A-Z]+/
let numbersExp:RegExp=/[0-9]+/
let elseCheck=undefined;
let repeatLoop:number[]=new Array;
let loopRepeat:number[]=new Array;
let repeatIndex:number[]=new Array;
let loopIndex:number[]=new Array;
let loopInd:number[]=new Array;
let cd=undefined
let variableWhile:number[]=new Array
function drawing(draw:any){
    fileInput.writeFile(svgFile, draw+"</svg>",  function(err:any) {
        if (err) {
            return console.error(err);
        }
        
    });
}
n=ss.length

while(i<=n+1){
    i++;
    
    if(ss[i]!=undefined&&ss[i]!=""&&ss[i]!=" "){
     if(ss[i]!="")
     ss[i]=ss[i].replace(":","")
    split=ss[i].split(" ")
    split=deleteSpaces(split)
  // console.log(split)
   //console.log(variables)
    if(i<ii){
    i++
   

    }
    else
    if(split[0]=="POSITION"){
        split=strTovar()
        if(split.length==3){
      pos.xCoord=split[1]
      pos.yCoord=split[2]
        }
    else
    console.log("ERROR LINE ("+(i+1)+"): POSITION has 2 parameters, you wrote "+ (split.length-1))
  }
 else
  if(split[0]=="LINE"){
    split=strTovar()
          if(split[3]=="location"&& split.length==4&&numbersExp.exec(split[1])?.toString()==split[1]&&numbersExp.exec(split[2])?.toString()==split[2]){
           
           // console.log(strTovar())
            draw+="<line x1=\""+pos.xCoord+ "\" y1=\""+pos.yCoord +"\" x2=\""+split[1]+"\" y2=\""+split[2]+"\" stroke=\""+penColor+"\" stroke-width=\""+penWidth+"\"/>\n\ "
          //drawing(draw)
          pos.xCoord=split[1]
          pos.yCoord=split[2]
          
          }
          else 
           if(split[3]=="polar"){
            split=strTovar()
               let dx=(parseInt(split[1])*Math.cos((parseInt(split[2])*(Math.PI/180))))
               let dy=(parseInt(split[1])*Math.sin((parseInt(split[2])*(Math.PI/180))))
              
               draw+="<line x1=\""+pos.xCoord+ "\" y1=\""+pos.yCoord +"\" x2=\""+ (Math.round(dx)+parseInt(pos.xCoord)) +"\" y2=\""+(parseInt(pos.yCoord)-Math.round(dy))+"\" stroke=\""+penColor+"\" stroke-width=\""+penWidth+"\"/>\n\ "
               //drawing(draw)
               pos.xCoord=(Math.round(dx)+parseInt(pos.xCoord))+""
               pos.yCoord=(parseInt(pos.yCoord)-Math.round(dy))+""
             

           }
          else{
               split=strTovar()
              if(split[3]!="polar")
               console.log("ERROR LINE ("+(i+1)+"): LINE parameter 3 needs to be one of (location, polar), you wrote "+split[3])
              if (split.length!=4)
              console.log("ERROR LINE ("+i+"): LINE has 3 parameters, you wrote ("+(split.length-1)+")")

              
          }
      }
  
  else

  if(split[0]=="CIRCLE"){
    split=strTovar()
    
    if(split.length==4&&numbersExp.exec(split[1])?.toString()==split[1]&&numbersExp.exec(split[2])?.toString()==split[2]
    &&numbersExp.exec(split[3])?.toString()==split[3]){
     draw+="<circle cx=\""+split[1]+"\" cy=\""+split[2]+"\" r=\""+split[3]+"\" stroke=\""+penColor+"\" stroke-width=\""+penWidth+"\" fill=\""+fillColor+"\" />\n\ " 
     //drawing(draw)
    }
    else{
        if(split.length!=4)
         console.log("ERROR LINE ("+(i+1)+"): CIRCLE has 4 paramaters,you wrote "+(split.length-1))
         if(numbersExp.exec(split[1])?.toString()==null)
         console.log("ERROR LINE ("+(i+1)+"): Undefined variable "+split[1].substr(1,split[1].length))
         if(numbersExp.exec(split[2])?.toString()==null)
         console.log("ERROR LINE ("+(i+1)+"): Undefined variable "+split[2].substr(1,split[2].length))
         if(numbersExp.exec(split[3])?.toString()==null)
         console.log("ERROR LINE ("+(i+1)+"): Undefined variable "+split[3].substr(1,split[3].length))

    }
  }
  else
  if(split[0]=="ELLIPSE"){
    
    split=strTovar()
    
    if(split.length==5&&numbersExp.exec(split[1])?.toString()==split[1]&&numbersExp.exec(split[2])?.toString()==split[2]
    &&numbersExp.exec(split[3])?.toString()==split[3]&&numbersExp.exec(split[3])?.toString()==split[3]){
      draw+="<ellipse cx=\""+split[1]+"\" cy=\""+split[2]+"\" rx=\""+split[3]+"\" ry=\""+split[4]+"\" stroke=\""+penColor+"\" stroke-width=\""+penWidth+"\" fill=\""+fillColor+"\"  />\n\ "
     // drawing(draw)
    }
    else{
        if(split.length!=5)
        console.log("ERROR LINE ("+(i+1)+"): ELLIPSE has 4 parameters, you wrote "+(split.length-1))
        else{
        if(numbersExp.exec(split[1])?.toString()==null&&split[1]!=null)
        console.log("ERROR LINE ("+(i+1)+"): Undefined variable "+split[1].substr(0,split[1].length))
        if(numbersExp.exec(split[2])?.toString()==null&&split[2]!=null)
        console.log("ERROR LINE ("+(i+1)+"): Undefined variable "+split[2].substr(0,split[2].length))
        if(numbersExp.exec(split[3])?.toString()==null&&split[3]!=null)
        console.log("ERROR LINE ("+(i+1)+"): Undefined variable "+split[3].substr(0,split[3].length))
        if(numbersExp.exec(split[4])?.toString()==null&&split[4]!=null)
        console.log("ERROR LINE ("+(i+1)+"): Undefined variable "+split[4].substr(0,split[4].length))
        }
    }
  }
  else
  if(split[0]=="COLOR"){
       split=strTovar()
      if(split[1]=="pen"&&split.length==5)
       penColor="rgb("+split[2]+","+split[3]+","+split[4]+")"
       else
       if(split[1]=="fill"&&split.length==5)
       fillColor="rgb("+split[2]+","+split[3]+","+split[4]+")"
       //onsole.log(fillColor)
       else{
         if(split.length!=5)
          console.log("ERROR LINE ("+i+"): COLOR has 5 parameters, you wrote ("+(split.length-1))
         if(split[1]!="pen"&&split[1]!="fill")
         console.log("ERROR LINE ("+(i+1)+"): COLOR parameter 1 needs to be one of (pen, fill), you wrote "+split[1])
       }
  }
  else 
        if(split[0]=="RECTANGLE"){
            split=strTovar()
            
        if(split.length==5&&numbersExp.exec(split[1])?.toString()==split[1]&&numbersExp.exec(split[2])?.toString()==split[2]
        &&numbersExp.exec(split[3])?.toString()==split[3]&&numbersExp.exec(split[4])?.toString()==split[4]){
           
            
           
            draw+="<polygon points=\""+split[1]+","+split[2]+" "+split[3]+","+split[2]+" "+split[3]+","+split[4]+" "+ split[1]+","+split[4]+"\" "+ "stroke=\""+penColor+"\"  stroke-width=\""+penWidth+"\"  fill=\""+fillColor+"\"/>\n\ "
            //drawing(draw)
        }
        else{
            
            if(split.length!=5)
            console.log("ERROR LINE ("+(i+1)+"): RECTANGLE has 4 paramaters, you wrote "+(split.length-1))
            if(numbersExp.exec(split[1])?.toString()!=split[1]&&split[1]!=null)
            console.log("ERROR LINE ("+(i+1)+"): Undefined variable "+split[1].substr(1,split[1].length))
            if(numbersExp.exec(split[2])?.toString()!=split[2]&&split[2]!=null)
            console.log("ERROR LINE ("+(i+1)+"): Undefined variable "+split[2].substr(1,split[2].length))
            if(numbersExp.exec(split[3])?.toString()!=split[3]&&split[3]!=null)
            console.log("ERROR LINE ("+(i+1)+"): Undefined variable "+split[3].substr(1,split[3].length))
            if(numbersExp.exec(split[4])?.toString()!=split[4]&&split[4]!=null)
            console.log("ERROR LINE ("+(i+1)+"): Undefined variable "+split[4].substr(1,split[4].length))
        }
    }
  else
  if(split[0]=="SET"){
    if(numbersExp.exec(split[2])?.toString()!=split[2]){
       let spl=split;
        toVar()
        //console.log(spl)
        //console.log(split)
        if(findIndex(split[1])==-1){

        variables.push(new variab(split[1],parseInt(spl[2])))
      
        }
        else{
           
        variables[findIndex(split[1])].setValue(parseInt(spl[2]))
        
       
        }
    }
      
  if(NumbersCharExp.exec(split[1])?.toString()==split[1]&&NumbersCharExp.exec(split[2])?.toString()==split[2]&&split.length==3){
    if(findIndex(split[1])==-1){
        variables.push(new variab(split[1],parseInt(split[2])))
      
        }
        else{
        variables[findIndex(split[1])].setValue(parseInt(split[2]))
       
        }
  }
  else{
  if(NumbersCharExp.exec(split[1])?.toString()!=split[1])
      console.log("ERROR LINE ("+i+"): SET parameter 1 requires a variable, you wrote ("+split[1]+")")    
  
   if(NumbersCharExp.exec(split[2])?.toString()!=split[2])
   console.log("ERROR LINE ("+i+"):  SET parameter 2 requires a number or a variable, you wrote  ("+split[2]+")")   
   if(split.length!=3)
   console.log("ERROR LINE ("+i+"): SET has 2 parameters, you wrote ("+split.length+")")
  }
}
else
   if(split[0]=="ADD"){
       
    if(NumbersCharExp.exec(split[2])?.toString()==split[2]&&NumbersCharExp.exec(split[1])?.toString()==split[1]){
         let index=findIndex(split[1])
        if(numbersExp.exec(split[2])?.toString()==split[2]&& variables[index]!=undefined){
          variables[index].setValue(parseInt(split[2])+variables[index].getValue())   
        }
        else
        variables[index].setValue(variables[findIndex(split[2])].getValue()+variables[index].getValue())
    }
    else{
        if(NumbersCharExp.exec(split[1])?.toString()!=split[1])
            console.log("ERROR LINE ("+i+"): ADD parameter 1 requires a variable, you wrote ("+split[1]+")")    
        
         if(NumbersCharExp.exec(split[2])?.toString()!=split[2])
         console.log("ERROR LINE ("+i+"):  ADD parameter 2 requires a number or a variable, you wrote  ("+split[2]+")")   
         if(split.length!=3)
         console.log("ERROR LINE ("+i+"): ADD has 2 parameters, you wrote ("+split.length+")")
        }
    }
    else
   if(split[0]=="SUB"){
      
    if(NumbersCharExp.exec(split[2])?.toString()==split[2]&&NumbersCharExp.exec(split[1])?.toString()==split[1]){
         let index=findIndex(split[1])
        if(numbersExp.exec(split[2])?.toString()==split[2]&& variables[index]!=undefined){
          variables[index].setValue(variables[index].getValue()-parseInt(split[2]))  
        }
        else
        variables[index].setValue(variables[findIndex(split[2])].getValue()-variables[index].getValue())
    }
    else{
        if(NumbersCharExp.exec(split[1])?.toString()!=split[1])
            console.log("ERROR LINE ("+i+"): SUB parameter 1 requires a variable, you wrote ("+split[1]+")")    
        
         if(NumbersCharExp.exec(split[2])?.toString()!=split[2])
         console.log("ERROR LINE ("+i+"):  SUB parameter 2 requires a number or a variable, you wrote  ("+split[2]+")")   
         if(split.length!=3)
         console.log("ERROR LINE ("+i+"): SUB has 2 parameters, you wrote ("+split.length+")")
        }
    }
    else
    if(split[0]=="MUL"){
       
     if(NumbersCharExp.exec(split[2])?.toString()==split[2]&&NumbersCharExp.exec(split[1])?.toString()==split[1]){
          let index=findIndex(split[1])
         if(numbersExp.exec(split[2])?.toString()==split[2]&& variables[index]!=undefined){
           variables[index].setValue(variables[index].getValue()*parseInt(split[2]))  
         }
         else
         variables[index].setValue(variables[findIndex(split[2])].getValue()*variables[index].getValue())
     }
     else{
         if(NumbersCharExp.exec(split[1])?.toString()!=split[1])
             console.log("ERROR LINE ("+i+"): MUL parameter 1 requires a variable, you wrote ("+split[1]+")")    
         
          if(NumbersCharExp.exec(split[2])?.toString()!=split[2])
          console.log("ERROR LINE ("+i+"):  MUL parameter 2 requires a number or a variable, you wrote  ("+split[2]+")")   
          if(split.length!=3)
          console.log("ERROR LINE ("+i+"): MUL has 2 parameters, you wrote ("+split.length+")")
         }
     }
     else
     if(split[0]=="DIV"){
        
      if(NumbersCharExp.exec(split[2])?.toString()==split[2]&&NumbersCharExp.exec(split[1])?.toString()==split[1]){
           let index=findIndex(split[1])
          if(numbersExp.exec(split[2])?.toString()==split[2]&& variables[index]!=undefined){
            variables[index].setValue(variables[index].getValue()/parseInt(split[2]))  
          }
          else
          variables[index].setValue(variables[findIndex(split[2])].getValue()/variables[index].getValue())
      }
      else{
          if(NumbersCharExp.exec(split[1])?.toString()!=split[1])
              console.log("ERROR LINE ("+i+"): DIV parameter 1 requires a variable, you wrote ("+split[1]+")")    
          
           if(NumbersCharExp.exec(split[2])?.toString()!=split[2])
           console.log("ERROR LINE ("+i+"):  DIV parameter 2 requires a number or a variable, you wrote  ("+split[2]+")")   
           if(split.length!=3)
           console.log("ERROR LINE ("+i+"): DIV has 2 parameters, you wrote ("+split.length+")")
          }
      }
      else
      if(split[0]=="IDIV"){
         
       if(NumbersCharExp.exec(split[2])?.toString()==split[2]&&NumbersCharExp.exec(split[1])?.toString()==split[1]){
            let index=findIndex(split[1])
           if(numbersExp.exec(split[2])?.toString()==split[2]&& variables[index]!=undefined){
             variables[index].setValue(parseInt(variables[index].getValue()/parseInt(split[2])+""))  
           }
         
       }
       else{
           if(NumbersCharExp.exec(split[1])?.toString()!=split[1])
               console.log("ERROR LINE ("+i+"): IDIV parameter 1 requires a variable, you wrote ("+split[1]+")")    
           
            if(NumbersCharExp.exec(split[2])?.toString()!=split[2])
            console.log("ERROR LINE ("+i+"):  IDIV parameter 2 requires a number or a variable, you wrote  ("+split[2]+")")   
            if(split.length!=3)
            console.log("ERROR LINE ("+i+"): IDIV has 2 parameters, you wrote ("+split.length+")")
           }
       }
       else
       
       if(split[0]=="MOD"){
          
        if(NumbersCharExp.exec(split[2])?.toString()==split[2]&&NumbersCharExp.exec(split[1])?.toString()==split[1]){
             let index=findIndex(split[1])
            if(numbersExp.exec(split[2])?.toString()==split[2]&& variables[index]!=undefined){
              variables[index].setValue(variables[index].getValue()%parseInt(split[2]))  
            }
            else
            variables[index].setValue(variables[findIndex(split[2])].getValue()%variables[index].getValue())
        }
        else{
            if(NumbersCharExp.exec(split[1])?.toString()!=split[1])
                console.log("ERROR LINE ("+i+"): MOD parameter 1 requires a variable, you wrote ("+split[1]+")")    
            
             if(NumbersCharExp.exec(split[2])?.toString()!=split[2])
             console.log("ERROR LINE ("+i+"):  MOD parameter 2 requires a number or a variable, you wrote  ("+split[2]+")")   
             if(split.length!=3)
             console.log("ERROR LINE ("+i+"): MOD has 2 parameters, you wrote ("+split.length+")")
            }
        }
       else
       if(split[0]=="IF"){
           ii=-1
        let index=findIndex(split[1])
        if(variables[index].getValue()!=0&&split.length==2&&variables[index].getValue()!=null&&findEnd(i)!=-1){
         elseCheck=false
        }
        else
        {
        if(variables[index].getValue()==0&&split.length==2&&variables[index].getValue()!=null&&findEnd(i)!=-1)
         if(findElse(i)!=-1){
            elseCheck=true;
            ii=findElse(i)
            }
            else{
            ii=findEnd(i);
            
            }
        if(variables[index].getValue()==null)
            console.log("ERROR LINE ("+i+"): IF parameter 1 requires a variable, you wrote ("+split[1]+")")    
        
        if(findEnd(i)==-1)
         console.log("You have"+ (ss.length-i)+" IF without END")   
        if(split.length!=2)
        console.log("ERROR LINE ("+i+"): IF has 1 parameters, you wrote ("+split.length+")")
        }
        }
        else
        if(split[0]=="ELSE"){
            ii=-1
            if(split.length!=1)
            console.log("ERROR LINE ("+i+"): ELSE has 0 parameters, you wrote ("+split.length+")")
            if (elseCheck==undefined)
            console.log("ERROR LINE ("+i+"): ELSE and no IF")
        
            if(elseCheck==false){
            i=findEnd(i);
           
            }
         }
         else
         if(split[0]=="END"){
             ii=-1
            if(split.length!=1)
            console.log("ERROR LINE ("+i+"): END has 0 parameters, you wrote ("+split.length+")")
            if (elseCheck==undefined)
            console.log("ERROR LINE ("+i+"): END and no IF")
            else
            elseCheck=undefined
             ii=-1
            }
         else
         if(split[0]=="LOOP"){
            let index=findIndex(split[1])
            if(NumbersCharExp.exec(split[1])?.toString()==split[1]&&split.length==2&&findRepeat(i)!=-1){
                if(variables[index]?.getValue()!=null){
                 repeatLoop.push(variables[index].getValue())
                 repeatIndex.push(0)
                 loopIndex.push(i);
                }
                 else{
                  repeatLoop.push(parseInt(split[1]))
                  repeatIndex.push(0)
                  loopIndex.push(i);
                  
                 }
               }
             else{
                if(split.length!=2)
                console.log("ERROR LINE ("+(i+1)+"): LOOP has 1 parameters, you wrote "+(split.length-1))
                if (findRepeat(i)==-1)
                console.log("ERROR LINE ("+(i+1)+"): LOOP with no REPEAT")
                if(variables[index]?.getValue()!=null||NumbersCharExp.exec(split[1])?.toString()!=split[1])
                console.log("ERROR LINE ("+(i+1)+"): LOOP parameter 1 requires a variable, you wrote ("+split[1]+")")  
             }  
         }
         else
         if(split[0]=="WHILE"){
            let index=findIndex(split[1])
            if(variables[index].getValue()!=0&&split.length==2&&variables[index].getValue()!=null&&findRepeat(i)!=-1){
             variableWhile.push(index);
             loopInd.push(i)
            }
            else{
            if(variables[index].getValue()==null)
            console.log("ERROR LINE ("+(i+1)+"): While parameter 1 requires a variable, you wrote ("+split[1]+")")    
            
            if(findRepeat(i)==-1)
             console.log("ERROR LINE ("+(i+1)+"): WHILE with no REPEAT")   
            if(split.length!=2)
            console.log("ERROR LINE ("+(i+1)+"): WHILE has 1 parameters, you wrote "+(split.length-1))
            }

         }
       
         else
         if(split[0]=="REPEAT"){
             if(repeatLoop.length!=0&&split.length==1){
                  cd=1
               
                repeatIndex[repeatIndex.length-1]=repeatIndex[repeatIndex.length-1]+1;
                if(repeatLoop[repeatLoop.length-1]!=repeatIndex[repeatIndex.length-1]){
                i=loopIndex[loopIndex.length-1]
              
                }
                else{
                repeatLoop.pop()
                repeatIndex.pop()
                loopIndex.pop()
              
                }
             }
             else
               if(variableWhile.length!=0&&split.length==1){
                    cd=1
                   if(variables[variableWhile[variableWhile.length-1]].getValue()!=0)
                   i=loopInd[loopInd.length-1]
                   else{
                   variableWhile.pop()
                   loopInd.pop()
                   }
               }
             else
             {
                 if(split.length!=1)
                 
                 console.log("ERROR LINE ("+(i+1)+"): REPEAT has 0 parameters, you wrote "+(split.length-1))
                else
                 if(cd==undefined)
                 console.log("ERROR LINE ("+(i+1)+"): REPEAT and no LOOP")
                 cd=undefined;
             }
            

         }

        }
      }
      
            drawing(draw) 
            //console.log(variables)
       
       
   
function toVar(){
    if(findIndex(split[2])!=-1)
split[2]=variables[findIndex(split[2])]?.getValue()+""
}
function deleteSpaces(s:string[]):string[]{
    let x:string []=new Array
    for(let i=0;i<s.length;i++){
        if(s[i]==''||s[i]==' '||s[i]==":")
         continue
         x.push(s[i])
    }
    
    return x;
}
function strTovar():string[]{
    let ss=""
    for(let i=1;i<split.length;i++){
        if(numbersExp.exec(split[i])?.toString()!=split[i]){
            if(findIndex(split[i])!=-1){
               split[i]=variables[findIndex(split[i])].getValue()+""
               
        }
    }
    }
    return split;
}

function findRepeat(index:number):number{
    let loopCheck=0
    for(let i=index;i<ss.length;i++){
       if(ss[i].includes("LOOP"))
        loopCheck++;
        if(ss[i].includes("WHILE"))
        loopCheck++;
        if(ss[i].includes("REPEAT")&&loopCheck!=0)
        loopCheck--
        if(ss[i]=="REPEAT"&&loopCheck==0)
        return i;
    }
    return -1;
}
function findElse(index:number):number{
    let strbkp=ss
    for(let i=index;i<strbkp.length;i++){
        
        if(strbkp[i].includes("ELSE"))
         return i
        if(strbkp[i].includes("END"))
        return -1;
    }
    return -1;
}
function findEnd(index:number):number{
    
    for(let i=index;i<ss.length;i++){
        if(ss[i].includes("END"))
        return i;
    }
    return -1;
}
function findIndex(s:string):number{
    for(let i=0;i<variables.length;i++){
        if(variables[i].getName()==s)
        return i;
    }
    return -1
}


