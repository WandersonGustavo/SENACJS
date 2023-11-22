//select elements
const display=document.querySelector("#displayInput");
const botaoIgual= document.querySelector(".igual");
const botaoPonto= document.querySelector(".ponto");
const botoesNumeros=document.querySelectorAll(".num");
const botoesOperadores=document.querySelectorAll(".operador");

//vars globais
let operacaoAtual="";
let operador=null;
let valorAnt="";
let calculando=false;


//func
const atualizarDisplay=()=>{
    display.value=operacaoAtual;
};

const insereNum=(evento)=>{
    if(calculando){
        operacaoAtual=evento.target.textContent;
        calculando=false;
    }else{
        operacaoAtual+=evento.target.textContent;
    }
    atualizarDisplay();
}

const inserePonto = () =>{
    if(operacaoAtual.indexOf(".")===-1){
        operacaoAtual+=".";
        atualizarDisplay();
    }
}

const insereOperador =(evento)=>{
    if(operacaoAtual!==""){
        if(!calculando){
            if(operador!==null) calcula();
            valorAnt=operacaoAtual;
            operacaoAtual="";
        }
        operador=evento.target.textContent;
    }
};
const calcula=()=>{
    let resultado=null;
    const operandoAnterior=parseFloat(valorAnt);
    const operandoAtual=parseFloat(operacaoAtual);

    switch(operador){
        case "+":
            resultado=operandoAnterior+operandoAtual;
            break;
        case "-":
            resultado=operandoAnterior-operandoAtual;
            break;
        case "*":
            resultado=operandoAnterior*operandoAtual;
            break;
        case "/":
            if(operacaoAtual!=0){
                resultado=operandoAnterior/operandoAtual;
            }else{
                alert("Não é possível dividir por ZERO!!")
            }
            break;
        }
        operacaoAtual=String(resultado);
        valorAnt=operacaoAtual;
        calculando=true;
        atualizarDisplay();
    }


//eventlista
botoesNumeros.forEach((botao) => botao.addEventListener("click",insereNum));

//evento do ponto
botaoPonto.addEventListener("click",inserePonto);
botoesNumeros.forEach((botao)=>botao.addEventListener("click",insereNum));

//evento operadores
botoesOperadores.forEach((botao)=>botao.addEventListener("click",insereOperador));

botaoIgual.addEventListener("click",()=>{
    if(operador!==null&&operacaoAtual!==""&& !calculando){
        calcula();
        operador=null;
    }
})
