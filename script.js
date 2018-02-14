class Calc{
    constructor(state="num1",num1="",operand="+",num2=""){
        this.state = state; //num1 , num2  ,operand, ac etc
        this.num1 = num1;
        this.operand = operand; //+ - x /
        this.num2 = num2;
        this.display = "";
    }

    numPress(num){
        switch(this.state){
            case "num1":
                if(this.num1.replace(/[^0-9]/g,"").length < 9){
                    this.num1 = this.num1 + num;
                    this.display = this.num1;
                }
                break;
            case "num2":
                if(this.num2.replace(/[^0-9]/g,"").length < 9){
                    this.num2 = this.num2 + num;
                    this.display = this.num2;
                }
                break;
            case "operand":
                this.num2 = num;
                this.state = "num2";
                this.display = this.num2;
                break;
            case "equals":
            case "error":
                this.num1 = num;
                this.state = "num1"
                this.display = this.num1;
            break;
        }
        return this;
    }
    decimelPress(){
        switch(this.state){
            case "num1":
                if(!this.num1.includes(".")){//just one "."
                    this.numPress("."); // treat "." like a number
                }
                break;
            case "num2":
                if(!this.num2.includes(".")){
                    this.numPress(".");
                }
                break;
            case "operand":
                this.num2 = "0.";
                this.state = "num2";
                this.display = this.num2;
                break;
            case "equals":
            case "error":
                this.num1 = "0.";
                this.state = "num1"
                this.display = this.num1;
            break;
        }
        return this;
    }
    operandPress(operand){
        switch(this.state){
            case "operand":
            case "error":
                break;// do nothing more;
            case "num1":
                this.state = "operand";
                this.operand = operand;
                break;
            case "num2":
            case "equals":
                this.state = "equals";
                this.equalsPress();//like pressing equals and adding operand
                this.operand = operand;
                this.state = "operand";
                break;
         }
         return this;
    }
    equalsPress(){
         let objRef = this;
        function to9(num){
          if(num === "."){ //parseFloat doesn't like this
              return "0";
          }
          num = parseFloat(num);
          if(Math.abs(num) > 999999999){
              objRef.state = "error";
              return "too high";
          }
          if(Math.abs(num) < .1){
              return parseFloat(Number.parseFloat(num).toPrecision(4));
          }         
          return parseFloat(Number.parseFloat(num).toPrecision(9));
        }
        function add(){
            objRef.display = "" + to9(parseFloat(objRef.num1) + parseFloat(objRef.num2));
            objRef.num1 = objRef.display; //for repeated equals presses
        }
        function minus(){
            objRef.display = "" + to9(parseFloat(objRef.num1) - parseFloat(objRef.num2));
            objRef.num1 = objRef.display;
        }
        function multiply(){
            objRef.display = "" + to9(parseFloat(objRef.num1) * parseFloat(objRef.num2));
            objRef.num1 = objRef.display;
        }
        function divide(){
            if(parseFloat(objRef.num2) === 0){
                objRef.display = "infinity!"
                objRef.state = "error";
            }
            else{
                objRef.display = "" + to9(parseFloat(objRef.num1) / parseFloat(objRef.num2));
                objRef.num1 = objRef.display;
            }
        }
        switch(this.state){
            case "num1":
            case "error":
            break;//do nothing
            case "operand":
                this.num2 = this.num1;//essentailly performing operation on self
                //follow through intentional            
            case "num2":
            case "equals":
                this.state = "equals";
                switch(this.operand){
                    case "+":
                    add();
                    break;
                    case "-":
                    minus();
                    break;
                    case "*":
                    multiply();
                    break;
                    case "/":
                    divide();
                    break;
                }
        }
    return this;
    }
    acPress(){
        this.state ="num1";
        this.num1 = "";
        this.operand = "+";
        this.num2 = "";
        this.display = "";
        return this;
    }
    delPress(){
        switch(this.state){
            case "num1":
                this.num1 = this.num1.slice(0, -1);
                this.display = this.num1;
                break;
            case "num2":
                this.num2 = this.num2.slice(0, -1);
                this.display = this.num2;
                break;
            //do nothing in all other cases
        }
        return this;
    }

}
function updateDisplay(num){
   document.querySelector('#display').textContent = num; 
}
let mainCalc = new Calc();
document.querySelector('#n-0').addEventListener('click', () => updateDisplay(mainCalc.numPress("0").display));
document.querySelector('#n-1').addEventListener('click', () => updateDisplay(mainCalc.numPress("1").display));
document.querySelector('#n-2').addEventListener('click', () => updateDisplay(mainCalc.numPress("2").display));
document.querySelector('#n-3').addEventListener('click', () => updateDisplay(mainCalc.numPress("3").display));
document.querySelector('#n-4').addEventListener('click', () => updateDisplay(mainCalc.numPress("4").display));
document.querySelector('#n-5').addEventListener('click', () => updateDisplay(mainCalc.numPress("5").display));
document.querySelector('#n-6').addEventListener('click', () => updateDisplay(mainCalc.numPress("6").display));
document.querySelector('#n-7').addEventListener('click', () => updateDisplay(mainCalc.numPress("7").display));
document.querySelector('#n-8').addEventListener('click', () => updateDisplay(mainCalc.numPress("8").display));
document.querySelector('#n-9').addEventListener('click', () => updateDisplay(mainCalc.numPress("9").display));
document.querySelector('#decimal').addEventListener('click', () => updateDisplay(mainCalc.decimelPress().display));
document.querySelector('#add').addEventListener('click', () => updateDisplay(mainCalc.operandPress("+").display));
document.querySelector('#minus').addEventListener('click', () => updateDisplay(mainCalc.operandPress("-").display));
document.querySelector('#multiply').addEventListener('click', () => updateDisplay(mainCalc.operandPress("*").display));
document.querySelector('#divide').addEventListener('click', () => updateDisplay(mainCalc.operandPress("/").display));
document.querySelector('#equals').addEventListener('click', () => updateDisplay(mainCalc.equalsPress().display));
document.querySelector('#del').addEventListener('click', () => updateDisplay(mainCalc.delPress().display));
document.querySelector('#ac').addEventListener('click', () => updateDisplay(mainCalc.acPress().display));




/*
//tests
let test1 = new Calc();
test1.numPress("4");
test1.numPress("3");
console.assert(test1.num1 === "43");
test1.decimelPress().numPress("5");
console.assert(test1.num1 === "43.5");
console.assert(test1.num2 === "");
let test2 = new Calc("operand");
console.assert(test2.state === "operand");
test2.numPress("5");
console.assert(test2.num1 === "");
console.assert(test2.num2 === "5");
console.assert(test2.state === "num2");
test2.numPress("0");
console.assert(test2.num2 === "50");
test2.decimelPress().numPress("4");
console.assert(test2.num2 === "50.4");
let test3 = new Calc("equals");
test3.numPress("6");
console.assert(test3.state === "num1");
console.assert(test3.num1)
let test4 = new Calc("num1", "4.4","/","3.33");
test4.numPress("5");
console.assert(test4.num1 === "4.45");
let test5 = new Calc();
test5.numPress("7").decimelPress();
console.assert(test5.num1 === "7.");
test5.numPress("6");
console.assert(test5.num1 === "7.6");
let test6 = new Calc("equals");
test6.decimelPress();
console.assert(test6.num1 === "0.");
test7 = new Calc("num2","2","+","8");
test7.equalsPress();
console.assert(test7.display === "10");
test7 = new Calc("num2","2","-","8");
test7.equalsPress();
console.assert(test7.num1 === "-6");
test7 = new Calc("num2","2","*","8");
test7.equalsPress();
console.assert(test7.display === "16");
test7 = new Calc("num2","2","/","8");
test7.equalsPress();
console.assert(test7.num1 === "0.25");
test7.equalsPress();
console.assert(test7.display === "0.03125");
test7 = new Calc("num2","2","/","0");
test7.equalsPress();
test7 = new Calc("num2","2","*","2");
test7.equalsPress().equalsPress().equalsPress();
console.assert(test7.display === "16");
test8 = new Calc("operand","3","+");
test8.equalsPress().equalsPress().equalsPress();
console.assert(test8.display === "12",{"num1":test8.num1,"num2":test8.num2,"display":test8.display});
test9 =new Calc();
test9.numPress("2").operandPress("+");
console.assert(test9.operand === "+");
console.assert(test9.state === "operand");
test9.numPress("3").equalsPress();
console.assert(test9.display === "5");
test9.equalsPress();
console.assert(test9.display === "8");
test9.numPress("8").operandPress("-").numPress("1").operandPress("*").numPress("8").equalsPress();
console.assert(test9.display === "56", {"num1":test9.num1,"operand":test9.operand,"num2":test9.num2,"display":test9.display});
test9.acPress();
console.assert(test9.display === "");
test9.numPress("3").numPress("4").delPress();
console.assert(test9.num1 === "3");
test9.operandPress("/").numPress("8").decimelPress().numPress("5").delPress().delPress().
decimelPress().numPress("1");
console.assert(test9.num2 === "8.1");
test10 = new Calc();
test10.numPress("3").operandPress("*").numPress("2").operandPress("-");
console.assert(test10.display === "6", {"display":test10.display});

*/
