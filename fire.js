//Array linear, todos os pixels do fogo um do lado do outro

const firePixelsArray = []
const fireWidth = 100;
const fireHeight = 50;
const fireColor =  [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

function start(){
    dataFire();
    fireSource();
    renderFire(); 

    setInterval(firePropagation, 30);
}
//dividido em: Estrutura de dados, algoritmo e renderização

function dataFire(){
 const numberOfPixels = fireHeight * fireWidth

 for(let i = 0; i<numberOfPixels; i++){
     firePixelsArray[i] = 0
 }
}

function firePropagation(){
    for(let column = 0; column < fireWidth; column++){
        for(let row = 0; row< fireHeight; row++){
           const pixelIndex = column + (fireWidth * row)
           updateIntensity(pixelIndex);
        }
    }
    renderFire();
}
//olha pro pixel abaixo e implementa o valor: 
function updateIntensity(currentPixelIndex){
    const belowPinxelIndex = currentPixelIndex + fireWidth 

    if(belowPinxelIndex >= fireWidth * fireHeight){
        return
    }
    const decay = Math.floor(Math.random() * 3) //valor do desconto de intensidade do fogo
    const belowPinxelFireIntensity = firePixelsArray[belowPinxelIndex]
    const newFireIntensity = 
    belowPinxelFireIntensity - decay >= 0 ? belowPinxelFireIntensity - decay : 0;

    firePixelsArray[currentPixelIndex - decay] = newFireIntensity
}
function renderFire(){
    const debug = false

    let html = '<table cellpadding=0 cellspacing=0>'
    for(let row=0; row<fireHeight;row++){
        html += '<tr>'
        for(let column=0; column<fireWidth;column++){
            const pixelIndex = column + (fireWidth * row)//column para descobrir a posição horizontal e Largura vs altura pra descobre a vertical
            const fireIntensity = firePixelsArray[pixelIndex];

            if(debug === true){
                html += '<td>'
                html += `<div class="pixel-index">${pixelIndex}</div>`
                html += fireIntensity
                html += '</td>'
            }else {
                const color = fireColor[fireIntensity]
                const colorString = `${color.r},${color.g},${color.b}`
                html += `<td class="pixel" style="background-color:rgb(${colorString})">`
                html+=  '</td>'
            }

        
        }
        html += '</tr>'
    } 

    html += '</table>' //table, primeiro cria uma linha pra dps criar uma tabledata coluna
    document.querySelector('#fireCanvas').innerHTML = html

}

function fireSource(){
    for(let column = 0; column <= fireWidth; column++){
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth)  + column

        firePixelsArray[pixelIndex] = 36;
    }
}
start();