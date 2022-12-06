/*eslint-disable*/

function addRow(mat,A){
    var newDiv = document.createElement("div");
    var matPlace = document.getElementsByClassName("div" + A)[0];
    matPlace.appendChild(newDiv);
    mat.row++;
    newDiv.className = "div" + mat.row + A;
    var divid = document.getElementsByClassName("div" + mat.row + A)[0];

    for (var i=1; i <= mat.column; i++){
        //テキストボックスの動的生成
        var newInput = document.createElement("input");
        //テキストボックスの詳細設定
        newInput.type = "text";
        newInput.className = "inputform" + mat.row + i + A;
        newInput.size = "2";
        newInput.maxlength = "40";
        //div0配下にテキストボックスを生成
        console.log(divid);
        divid.appendChild(newInput);
        }
    var newLine = document.createElement("p");
    divid.appendChild(newLine);
    newLine.className = "div" + mat.row + A + "p";
}

function addColumn(mat,A)
{
    mat.column++;
    for (var i = 1; i <= mat.row; i++)
    {
        //テキストボックスの動的生成
        var newInput = document.createElement("input");
        //テキストボックスの詳細設定
        newInput.type = "text";
        newInput.className = "inputform" + i + mat.column + A;
        newInput.size = "2";
        newInput.maxlength = "40";
        //div配下にテキストボックスを生成
        var divid = document.getElementsByClassName("div" + i + A)[0];
        console.log(divid);
        divid.removeChild(document.getElementsByClassName("div" + i + A + "p")[0]);
        divid.appendChild(newInput);
        var newLine = document.createElement("p");
        divid.appendChild(newLine);
        newLine.className = "div" + i + A + "p";
    }
}

function productMat(matInfo)
{
    var matResult = [];
    for (var i= 0; i<matInfo.row*matInfo.column; i++)
    {
        matResult[i] = 0;
        console.log(matResult[i]);
    }
    var count = 0;
    for (var i= 0; i<matInfo.row; i++)
    {
        for (var j = 0; j<matInfo.column; j++)
        {
            for (var k = 0; k<matInfo.row; k++)
            {
                matResult[count] += parseInt(document.getElementsByClassName("inputform" + (i+1) + (k+1) + "A")[0].value)*parseInt(document.getElementsByClassName("inputform" + (k+1) + (j+1) + "B")[0].value);
                console.log(matResult[count]);
                console.log(count);
            }
            count++;        
        }
    }
    outputMat(matResult);
}

function outputMat(matResult){
    var text,count = 0;
    for (var i= 0; i<matInfo.row; i++)
    {
        for (var j = 0; j<matInfo.column; j++)
        { 
            document.getElementsByClassName("outputresult")[0].textContent = matResult[count];
            console.log(matResult[count]);
        }
    }
    console.log(document.getElementsByClassName("outputresult")[0]);
}

function setIdentity(matInfo,A){
    for (var i= 0; i<matInfo.row; i++)
    {
        for (var j = 0; j<matInfo.column; j++)
        {
            var matPlace = document.getElementsByClassName("inputform" + i + j + A).value;

            if (i===j){
                matPlace = "1";
            }else{
                matPlace = "0";
            }
        }
    }
}

