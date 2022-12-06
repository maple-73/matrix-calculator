/*eslint-disable*/
'use strict';
/*文字計算実装*/
//＋、ーなどの表示
//i,e,πなどの数学関数の実装


/*----------------------------------------------------------*/
/*------------------行列A,Bのデータオブジェクト-----------------*/
/*----------------------------------------------------------*/ 

//値に\\などを読まないようにする
var matInfoA = {
    row: 3,
    column: 3,
    matA: function ()
    {
        //単配列の宣言（サイズ未定）
        var arrayA = [];
        //for文で要素を格納する
        for (var i = 0; i < matInfoA.row; i++) 
        {
            arrayA[i] = []; //単配列の中に単配列を宣言（サイズ未定）
            //配列の要素数を指定する
            for(var j = 0; j < matInfoA.column; j++)
            {
                if (isNaN(document.getElementsByClassName("inputform" + (i+1) + (j+1) + "A")[0].value) === false)
                {
                   //parsefloatは正常
                    arrayA[i][j] = parseFloat(document.getElementsByClassName("inputform" + (i+1) + (j+1) + "A")[0].value);
                    //代入も正常
                }
                else
                {
                    arrayA[i][j] = document.getElementsByClassName("inputform" + (i+1) + (j+1) + "A")[0].value;
                }
            }
        }
        
        return arrayA;
    }
};
            
var matInfoB = {
    row: 3,
    column: 3,
    matB: function(){
        //単配列の宣言（サイズ未定）
        var arrayB = [];

        //for文で要素を格納する
        for(var i=0; i<matInfoB.row; i++)
        {
            arrayB[i] = []; //単配列の中に単配列を宣言（サイズ未定）
            //配列の要素数を指定する
            for(var j=0; j<matInfoB.column; j++)
            {
                if (isNaN(document.getElementsByClassName("inputform" + (i+1) + (j+1) + "B")[0].value) === false)
                {
                    arrayB[i][j] = parseFloat(document.getElementsByClassName("inputform" + (i+1) + (j+1) + "B")[0].value);
                }
                else
                {
                    arrayB[i][j] = document.getElementsByClassName("inputform" + (i+1) + (j+1) + "B")[0].value;
                }
            }
        }
        return arrayB;
    }
};

/*----------------------------------------------------------*/
/*------------------------関数ライブラリ----------------------*/
/*----------------------------------------------------------*/

/*-------an increace and decreace in size of matrix---------*/
function addRow(mat,X)
{
    if (mat.row===10){
        return 0;
    }
    mat.row++;
    var newTr = document.createElement("tr");
    newTr.className = "Tr" + mat.row + X;
    var matPlace = document.getElementsByClassName("InputTable" + X)[0];
    matPlace.appendChild(newTr);
    var newTd = document.createElement("td");
    newTd.className = "Td" + mat.row + X;
     var newTrNode = document.getElementsByClassName("Tr" + mat.row + X)[0];
    newTrNode.appendChild(newTd);
    
    for (var i=1; i <= mat.column; i++){
        //テキストボックスの動的生成
        
        var newInput = document.createElement("input");
        //テキストボックスの詳細設定
        newInput.type = "text";
        newInput.className = "inputform" + mat.row + i + X;
        newInput.size = "2";
        newInput.maxlength = "40";
        //div0配下にテキストボックスを生成
         var newTdNode = document.getElementsByClassName("Td" + mat.row + X)[0];
        newTdNode.appendChild(newInput);
        }
}

function removeRow(mat,X)
{
    if (mat.row===1){
        return 0;
    }
    var matPlace = document.getElementsByClassName("InputTable" + X)[0];
    var TrNode = document.getElementsByClassName("Tr" + mat.row + X)[0];
    matPlace.removeChild(TrNode);
    mat.row--;
}

function addColumn(mat,X)
{
    if (mat.column===10){
        return 0;
    }
    mat.column++;
    for (var i = 1; i <= mat.row; i++)
    {
        //テキストボックスの動的生成
        var newInput = document.createElement("input");
        //テキストボックスの詳細設定
        newInput.type = "text";
        newInput.className = "inputform" + i + mat.column + X;
        newInput.size = "2";
        newInput.maxlength = "40";
        //div配下にテキストボックスを生成
        var tdNode = document.getElementsByClassName("Td" + i + X)[0];
        tdNode.appendChild(newInput);
    }
}

function removeColumn(mat,X)
{
    if (mat.column===1){
        return 0;
    }
    for (var i = 1; i <= mat.row; i++)
    {
        var tdNode = document.getElementsByClassName("Td" + i + X)[0];
        var formNode = document.getElementsByClassName("inputform" + i + mat.column + X)[0];
        tdNode.removeChild(formNode);
    }
    mat.column--;
}
/*----------------------------------------------------------*/

/*--------------addition,subtraction,multiplication---------*/
function addMat(matA,matB)
{
    var matResult = [];
    for (var i = 0; i<matA.length; i++)
    {
        matResult[i] = [];
        for (var j = 0; j<matB[0].length; j++)
        {
            matResult[i][j] = charSorting(charSorting(matA[i][j]) + charSorting(matB[i][j]));
        }
    }
    outputMat(matResult);
}

function subMat(matA,matB)
{
    var matResult = [];
    for (var i = 0; i<matA.length; i++)
    {
        matResult[i] = [];
        for (var j = 0; j<matB[0].length; j++)
        {
            matResult[i][j] = 0;
            matResult[i][j] += matA[i][j] - matB[i][j];
        }
    }
    outputMat(matResult);
}

function multiMat(matA,matB)
{
    var matResult = [];
    for (var i = 0; i<matA.length; i++)
    {
        matResult[i] = [];
        for (var j = 0; j<matB[0].length; j++)
        {
            matResult[i][j] = 0;
            for (var k = 0; k<matA.length; k++)
            {
                matResult[i][j] += matA[i][k] * matB[k][j];
            }
        }
    }
    outputMat(matResult);
}

/*----------------------------------------------------------*/
function makeTable(sizeOfRow,sizeOfColumn){
    
    var divNode = document.getElementsByClassName("OutputResult")[0];
    //計算結果の削除処理
    if(document.getElementsByClassName("OutputTable")[0]!==undefined){
        divNode.removeChild(document.getElementsByClassName("OutputTable")[0]);
    }
    if (document.getElementsByClassName("Explanation")[0]!==undefined){
        divNode.removeChild(document.getElementsByClassName("Explanation")[0]);
    }
    
    //計算結果を出力するテーブルの作成
    var newTable = document.createElement("table");
    newTable.className = "OutputTable";
    
    divNode.appendChild(newTable);
    
    for (var i= 0; i<sizeOfRow; i++)
    {
        var newTableRow = document.createElement("tr");
        newTableRow.className = "tr" + (i+1);
        var tableNode = document.getElementsByClassName("OutputTable")[0];
        tableNode.appendChild(newTableRow);
        
        for (var j = 0; j<sizeOfColumn; j++)
        {
            var newTableData = document.createElement("td");
            newTableData.className = "td" + (i+1) + (j+1);
            var tableRowNode = document.getElementsByClassName("tr" + (i+1))[0];
            tableRowNode.appendChild(newTableData);
        }
    }
}

function makeOutputDiv(parentClassName)
{
    var divNode = document.getElementsByClassName("OutputResult")[0];
    //計算結果の削除処理
    if(document.getElementsByClassName("OutputTable")[0]!==undefined){
        divNode.removeChild(document.getElementsByClassName("OutputTable")[0]);
    }
    if(document.getElementsByClassName("Explanation")[0]!==undefined){
        divNode.removeChild(document.getElementsByClassName("Explanation")[0]);
    }
    
    
    var newDiv = document.createElement("div");
    newDiv.className = "OutputTable";
    var parent = document.getElementsByClassName(parentClassName)[0];
    parent.appendChild(newDiv);
}

function makeExplanationDiv(parentClassName){
    var divNode = document.getElementsByClassName("OutputResult")[0];
    //計算結果の削除処理
    if(document.getElementsByClassName("OutputTable")[0]!==undefined){
        divNode.removeChild(document.getElementsByClassName("OutputTable")[0]);
    }
    if(document.getElementsByClassName("Explanation")[0]!==undefined){
        divNode.removeChild(document.getElementsByClassName("Explanation")[0]);
    }
    var newDiv = document.createElement("div");
    newDiv.className = "Explanation";
    var parent = document.getElementsByClassName(parentClassName)[0];
    parent.appendChild(newDiv);
}
/*---------------------------行列の出力--------------------------*/
function outputMat(matResult)
{
    var divNode = document.getElementsByClassName("OutputResult")[0];
    //計算結果の削除処理
    if(document.getElementsByClassName("OutputTable")[0]!==undefined){
        divNode.removeChild(document.getElementsByClassName("OutputTable")[0]);
    }
    if (document.getElementsByClassName("Explanation")[0]!==undefined){
        divNode.removeChild(document.getElementsByClassName("Explanation")[0]);
    }
    
    var outputDiv = document.createElement("div");
    outputDiv.className = "OutputTable";
    (document.getElementsByClassName("OutputResult")[0]).appendChild(outputDiv);
    
    var matLengthRow = matResult.length;
    var matLengthColumn = matResult[0].length;
    var matrix = "\\[\\left(\\begin{array}{rrr}";
    for (var i= 0; i<matLengthRow; i++)
    {
        for (var j = 0; j<matLengthColumn; j++)
        {
            matrix += matResult[i][j];
            if (j<matLengthColumn-1){
                matrix += "&";
            }else{
                matrix += "\\" + "\\";
            }
        }
    }
    matrix += "\\end{array}\\right)\\]";
    document.getElementsByClassName("OutputTable")[0].classList.add("White"); (document.getElementsByClassName("OutputTable")[0]).innerHTML = matrix;
    MathJax.typeset();//何をしているか理解する。とりあえずうまくいった。
}

function outputDet(detX)
{
    var divNode = document.getElementsByClassName("OutputResult")[0];
    //計算結果の削除処理
    if(document.getElementsByClassName("OutputTable")[0]!==undefined){
        divNode.removeChild(document.getElementsByClassName("OutputTable")[0]);
    }
    if (document.getElementsByClassName("Explanation")[0]!==undefined){
        divNode.removeChild(document.getElementsByClassName("Explanation")[0]);
    }
    
    if (detX!=="false"){
        makeOutputDiv("OutputResult");
        document.getElementsByClassName("OutputTable")[0].classList.add("White");
        document.getElementsByClassName("OutputTable")[0].textContent = detX;
    }else{
        makeExplanationDiv("OutputResult");
        var outputDiv = document.getElementsByClassName("Explanation")[0];
        outputDiv.innerHTML = "行列式は正方行列に対して定義される値です。";
        outputDiv.classList.add("White");
    }
}
/*------------------------単位行列を設定-------------------------*/
function setIdentity(matInfo,A)
{
    if (matInfo.row===matInfo.column){
        for (var i= 0; i<matInfo.row; i++)
        {
            for (var j = 0; j<matInfo.column; j++)
            {
                if (i===j){
                    document.getElementsByClassName("inputform" + (i+1) + (j+1) + A)[0].value = "1";
                }else{
                    document.getElementsByClassName("inputform" + (i+1) + (j+1) + A)[0].value = "0";
                }
            }
        }
    }
}

function setNumber(matInfo,A)
{
    
    var count = 0;
    for (var i= 0; i<matInfo.row; i++)
    {
        for (var j = 0; j<matInfo.column; j++)
        {
            count++;
            document.getElementsByClassName("inputform" + (i+1) + (j+1) + A)[0].value = count;
        }
    }
}
/*---------------------------転置行列--------------------------*/
function transpose(matX)
{
    
    var matRow = matX.length;
    var matColumn = matX[0].length;
    
    var transeMat = [];
    for (var i = 0; i<matColumn; i++)
    {
        transeMat[i] = [];
        for (var j = 0; j<matRow; j++)
        {
            transeMat[i][j] = matX[j][i];
        }
    }
    return transeMat;
}
/*----------------------------------------------------------*/
/*-------------行列式計算に必要な関数ライブラリ------------------*/
/*----------------------------------------------------------*/
function minerDet(I,J,matX,X)
{
    
    var mat = {
        row: matX.length,
        column: matX.length,
    };
    var minDetX = []; 
    
    var counti = 0;
    for(var i=0; i<mat.row; i++)
    {
        var countj = 0; 
        if (i!==I){
            minDetX[counti] = []; //単配列の中に単配列を宣言（サイズ未定)
            //配列の要素数を指定する
            for (var j = 0; j<mat.column; j++)
            {
                if (j!==J){
                    minDetX[counti][countj] = matX[i][j];
                    countj++;
                }
            }
            counti++;
        }
    }
    return minDetX;
}

function cofactor(i,j,matX,X)
{
    
    if ((i+j)%2===0){
        var cof = determinant(minerDet(i,j,matX,X),X);
    }else{
        var cof = -1*determinant(minerDet(i,j,matX,X),X);
    }
    return cof;
}

function determinant(matX,X)
{
    /*when matX isn't square matrix, return false*/
    if (matX.length!==matX[0].length){
        return "false";
    }
    var mat = {
        matY: matX,
        row: undefined,
        column: undefined,
    };
    if (X==='A'){
        mat.row = matInfoA.row;
        mat.column = matInfoA.column;
    }else if (X==='B'){
        mat.row = matInfoB.row;
        mat.column = matInfoB.column;
    }
    
    
    if (matX.length === 1){
        var detA = parseInt(matX[0]);
    }else{
        var detA = 0;
        for (var i = 0; i<matX.length; i++)
        {
            detA += matX[i][0]*parseInt(cofactor(i,0,mat.matY,X));
        }
    }
        return detA;
}

function adjugateMat(matX,X)
{
    if (matX.length===matX[0].length){
        makeTable(matX.length,matX.length);

        var matSize = matX.length;
        var adjMat = []; 
        for(var i=0; i<matSize; i++)
        {
            adjMat[i] = []; //単配列の中に単配列を宣言（サイズ未定)
            //配列の要素数を指定する
            for (var j = 0; j<matSize; j++)
            {
                adjMat[i][j] = cofactor(i,j,matX,X);
            }
        }
        outputMat(transpose(adjMat));
    }else{
        makeExplanationDiv("OutputResult");
        var outputDiv = document.getElementsByClassName("Explanation")[0];
        outputDiv.innerHTML = "余因子行列は正方行列に対して定義される行列です。";
        outputDiv.classList.add("White");
    }
}

function charSorting(strArray,operator)
{
//strArray is number
    if (isNaN(strArray) === false)
    {
        
        return parseInt(strArray);  
    }
    
//strArray is NOT number
    var strlen = strArray.length;
    
    if (strlen === 1)
    {
        return strArray[0];
    }
    
    var num = 1;
    var charArray = [];
    var count = 0;
    for (var i = 0; i < strlen; i++)
    {
        if (isNaN(strArray[i]) === false)
        {
            switch (operator)
            {
                case '+':
                    num += strArray[i];
                    break;
                case '-':
                    num -= strArray[i];
                    break;
                case '*':
                    num *= strArray[i];
                    break;
            }
        }
        else
        {
            count++;
            charArray[count - 1] = strArray[i];
        }
    }

    if (count - 1 > 0)
    {
        charArray.sort(); 
    }

    var char = "";
    for (var i = 0; i < count; i++)
    {
        char += charArray[i];
    }

    if (num === 1)
    {
        
        return char;
    }
        
        var result = num + char;
    
    
    return result;
}

function minerDet2(I,J,matX,X)
{
    var mat = {
        row: matX.length,
        column: matX.length,
    };
    var minDetX = []; 
    
    var counti = 0;
    for(var i=0; i<mat.row; i++)
    {
        var countj = 0; 
        if (i!==I){
            minDetX[counti] = []; //単配列の中に単配列を宣言（サイズ未定)
            //配列の要素数を指定する
            for (var j = 0; j<mat.column; j++)
            {
                if (j!==J){
                    minDetX[counti][countj] = matX[i][j];
                    countj++;
                }
            }
            counti++;
        }
    }
    return minDetX;
}

function cofactor2(i,j,matX,X)
{
    
    if ((i+j)%2===0){
        var cof = determinant(minerDet(i,j,matX,X),X);
    }else{
        var cof = -1*determinant(minerDet(i,j,matX,X),X);
    }
    return cof;
}

function determinant2(matX,X)
{
    if (matX.length!==matX[0].length){
        return "false";
    }
    var mat = {
        matY: matX,
        row: undefined,
        column: undefined,
    };
    if (X==='A'){
        mat.row = matInfoA.row;
        mat.column = matInfoA.column;
    }else if (X==='B'){
        mat.row = matInfoB.row;
        mat.column = matInfoB.column;
    }

    if (matX.length === 1){
        var detA = parseInt(matX[0]);
    }else{
        var detA = 0;
        for (var i = 0; i<matX.length; i++)
        {
            detA += matX[i][0]*parseInt(cofactor(i,0,mat.matY,X));
        }
    }
        return detA;
}



function GaussJordanElimination(matX){
    
    var row = matX.length;
    var column = matX[0].length;
    var j = 0;
    
    for (var i = 0; i < row; i++)//行の変更
    {
        if ((matX[i][j] % 1) === 0)//
        {
            
        }
        else
        {
            
            for (var j = 0; j < column; j++)
            {
                matX[i][j] = makeDecimalInteger
            }
        }
    }
    
    
}

function checkDecimalPoint (str)
{
    var checker = false;
    for (var i = 0; i < str.length; i++)
    {
        if (str[i] === '.')
        {
            checker === true;
            break;
        }
    }
    return checker;
}

function countDigitsAfterDecimalPoint (str)
{
    var strLength = str.length;
    var decimalPoint = 0;
    while (str[decimalPoint]!=='.')
    {
        decimalPoint++;
    }
    
    var count = 0;
    for (var i = decimalPoint; i < strLength; i++)
    {
        count++;
    }
    return count;
}

function makeDecimalInteger (str)
{
    var newStr = '';
    var decimalPoint = 0;
    
    while (str[decimalPoint] !== '.')
    {
        newStr += str[decimalPoint];
        decimalPoint++;
    }
    
    for (var i = decimalPoint; i < str.length - 1; i++)
    {
        newStr += str[decimalPoint + 1];
        decimalPoint++;
    }
    
    
    return newStr;
}

function power10N(str, n)
{
    for (var i = 0; i < n; i++)
    {
        str += '0';
    }
    return str;
}

function charCalculate(a,b,operater)
{
    var result;
    switch (operater)
    {   case '+':
        result = a + '+' + b;
        break;
        
        case '-':
        result = a + '-' + b;
    }
    
}

/*function test(str) {
    var Length = str.length;
    var container = [];

    for (var i = 0; i < length; i++) {
        if (alphabetChecker(str[i]) === false) {
            switch (str[i])
                    case '(':
                if ()
            }
            container[i] = str[i];
        }
    }
}*/

function alphabetChecker(char)
{
    if (('a' <= char && char <= 'z') || (('A' <= char && char <= 'Z')))
    {
        return true;
    }
    return false;
}
function operatorChecker(char)
{
    if (char == '+' || char == '-' || char == '*')
    {
        return true;
    }
    return false;
}

//+,-の演算では+,-をつけて値を返す
    /*a(a+b)=a^2+abを返せるようにする*/
function operatorCount(str)
{
    let Length = str.length;
    let count = 0;
    for (let i = 0; i < Length; i++)
    {
        if (str[i] === '+' || str[i] === '-')
        {
            count++;
        }
    }

    return count;
}

function separateOperator(str)
{
    var terms = [];
    var operators = [];
    var numOfterms = operatorCount(str) + 1;
    var count = 0,start = 0;
    var oprcount = 0;
    for (var i = 0; i < numOfterms; i++)
    {
        //次の演算子までのアルファベットの数を記憶
        //ex. abc+dce -> 3
        while (alphabetChecker(str[count]) === true)
        {
            count++;
        }

        //termsの要素を空文字で初期化
        terms[i] = '';

        //項ごとに別の要素に代入
        for ( ; start < count ; start++)
        {
            terms[i] += str[start];
        }

        //演算子を代入して、演算子でないところまでカウントを進める
        do {
            operators[oprcount] = str[count];
            count++;
            start++;
            if(count >= str.length)
            {
                break;
            }
        } while (operatorChecker(str[i]) == true)
    } 
    var strObject = {
        terms: terms,
        operators: operators,
    }
    
    return strObject;
}

function charMultiple(a, b)/*演算子の数をa,bについて数えて、その数-1ずつループで掛け算を行う（文字列の足し算）*/
{
    /*ex. a = a + b + c , b = b^2 + ac*/
    var Acount = operatorCount(a);
    var Bcount = operatorCount(b);
    
    var A = removeOperator(a);
    var B = removeOperator(b);
    
    
    var res = '';

    for (var i = 0; i < Acount + 1; i++)
    {
        for (var j = 0; j < Bcount + 1; j++)
        {
            res += (A[i] + B[j]);
            if (i !== Acount || j !== Bcount)
            {
                res += '+';
            }
        }
    }
    
    return res;
}

function charAdd(a, b)
{
    //(a+b+c)+(a+d+(-e))=2a+b+c+d-e
}

function subtractionConvertToAddition(str)
{
    var newStr = [];
    var count = 0;
    for(var i = 0; i < str.length; i++)
    {
        if(str[i] === '-')
        {
            newStr[count] = '+'; 
            count++;
        }
        newStr[count] = str[i];
    }

    var res = '';
    for(var i = 0; i < count; i++)
    {
        res += newStr[i];
    }

    return res;
}

function removeMinusSign(str)
{
    var count = 0;
    for(var i = 0; i < str.length; i++)
    {
        if(str[i] === '-')
        {
            count++;
        }
    }
    if(count % 2 !== 0)
    {
        var newStr = '-';
        newStr += str;
        return str
    }
    return 
}

/*function (S,*){
    1. 引数a,bをとる
    2. 引数a,bの中身を配列A,Bに項別に分ける(負の項の分け方を工夫する)
        (演算子も保存する)
        {
            ・ a+b-c等をa+b+-cのように変換する
                (-演算を負の数の+演算と考える) ->subtractionConvertToAddition()
            ・ -a-a=aaとする
        }
    3. 演算子*についてA,Bを演算する
    (+,-演算子については計算結果に'+','-'を含めて出力しなければいけない)
    (特に-演算子については'-'が偶数個ある時は'-'を出力してはいけない)
    4. alphabet順に演算結果を並べ替える。
    5. 演算結果をmath.jaxで出力する。
}*/

function convert(a, b)
{
    
}

function removePrevent(){
    document.getElementsByClassName("k_prevent");
    
}



