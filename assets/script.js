let array = [[,,,],[,,,],[,,,]]
let win = [
    [[0,0],[0,1],[0,2]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,0],[1,1],[2,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[2,0],[1,1],[0,2]]
]
let input = document.querySelector('input')
let oyun = 0
let a = 'X'
input.setAttribute('placeholder','1-ci Oyuncu')
let oyuncu1 = ''
let oyuncu2 = ''
let x_p = []
let o_p = []
let ul = document.querySelectorAll('ul')
let player1 = document.createElement('h1')
let player2 = document.createElement('h1')
let qalib = document.createElement('h1')
let full = 0
$(document).ready(()=>{
    $('#root ul:first').before(player1)
    player1.after(player2)
    player2.after(qalib)
})
qalib.style.display = 'none'
player1.style.display = 'none'
player2.style.display = 'none'
qalib.setAttribute('class', 'qalib')

player1.setAttribute('class' , 'player1')
player2.setAttribute('class' , 'player2')
const ad = (e) => {

    let a = e.target.value
    if (e.key == 'Enter') {

        if (a == '' && oyuncu1 == '') {
            oyuncu1 = 'Player 1'
            input.value = ''
            input.setAttribute('placeholder', '2-ci Oyuncu')
        } else if (a == '' && oyuncu1 != '') {
            oyuncu2 = 'Player 2'
            input.value = ''
        } else if (oyuncu1 == '') {
            oyuncu1 = a
            input.value = ''
            input.setAttribute('placeholder', '2-ci Oyuncu')
        } else if (oyuncu2 == '') {
            oyuncu2 = a
            input.value = ''
        }
        if (oyuncu1 && oyuncu2) {
            player1.innerText = oyuncu1
            player2.innerText = oyuncu2
            
            if (full % 2 == 0) {
                $(document).ready(() => {
                    $('input').css('display', 'none')
                    $('.player1').css("display", "block")
                })
            } else {
                $(document).ready(() => {
                    $('input').css('display', 'none')
                    $('.player2').css("display", "block")
                })
            }
        }
    }
}
input.addEventListener('keyup',ad)

let o1 = 0
let o2 = 0

console.log(root)
const x_o_x = (l) => {
    ul.forEach((element,ind) => {
        let li = element.querySelectorAll(`li`)
        li.forEach((e,i) => {
            e.addEventListener('click',() => {
                if(oyuncu1 && oyuncu2){
                    if(array[ind][i] === undefined){
                    
                        if(oyun % 2 == 0){
                            $(document).ready(()=>{
                                $('.player1').css('display' , 'none')
                                $('.player2').css('display' , 'block')
                            })
                            input.setAttribute('placeholder', oyuncu2)
                            a = 'X'
                            x_p.push([ind,i])
                            
                        }else{
                            input.setAttribute('placeholder', oyuncu1)
                            $(document).ready(()=>{
                                $('.player2').css('display' , 'none')
                                $('.player1').css('display' , 'block')
                            })
                            a = 'O'
                            o_p.push([ind,i])
                            
                            
                        }
                        oyun += 1
                        array[ind][i] = a;
                        e.innerText = a
                        checkWin()
                        if (oyun === l) {
                            input.setAttribute('placeholder', 'Oyun Berabere!');
                        }
                    }
                }
            })
        })
    });
}
x_o_x(9+full)
const checkWin = () => {
    for(let i = 0; i < win.length; i++){
        let winArr = win[i]
        let xx = []
        let oo = []

        for(let j = 0; j < winArr.length; j++){
            let pos = winArr[j]

            for(let k = 0; k < x_p.length; k++){
                if (x_p[k][0] === pos[0] && x_p[k][1] === pos[1]){
                    xx.push(pos)
                    break
                }
            }
            for(let l = 0; l < o_p.length; l++){
                if(o_p[l][0] === pos[0] && o_p[l][1] === pos[1]){
                    oo.push(pos)
                    break
                }
            }
        }
        if(xx.length === winArr.length){
            $(document).ready(()=>{
                $('.qalib').css('display' , 'block')
                $('.player1').css('display' , 'none')
                $('.player2').css('display' , 'none')
            })
            o1+=1
            qalib.innerText = `${oyuncu1} - qalib oldu ${oyuncu1,'-',o1}:${oyuncu2,'-',o2}`
            
            disableClick()
            
            return
        }else if (oo.length === winArr.length){
            $(document).ready(()=>{
                $('.qalib').css('display' , 'block')
                $('.player2').css('display' , 'none')
                $('.player1').css('display' , 'none')
            })
            o2+=1
            qalib.innerText = `${oyuncu2} - qalib oldu ${oyuncu1,'-',o1}:${oyuncu2,'-',o2}`
            disableClick();
            return
        }
    }
}
const click = () =>{
    ul.forEach((element) => {
        let li = element.querySelectorAll(`li`);
        li.forEach((e) => {
            e.style.pointerEvents = 'auto';
            e.innerHTML = ''
        });
    });
}

const disableClick = () => {
    ul.forEach((element) => {
        let li = element.querySelectorAll(`li`);
        li.forEach((e) => {
            e.style.pointerEvents = 'none';
        });
    });
    setTimeout(()=>{
        if(confirm('tekrar oyna!')){
            if(confirm('rovans icin "Tamam"a yeni oyun icin "Cancel"a -tiklayin')){
                full+=1
                oyun = full
            }else{
                oyun = 0
                input.setAttribute('placeholder','1-ci Oyuncu')
                oyuncu1 = ''
                oyuncu2 = ''
                x_p = []
                o_p = []
                o1 = 0
                o2 = 0
                full = 0
                input.style.display = 'block'
            }
            array = [[,,,],[,,,],[,,,]]
            x_p = []
            o_p = []
            a = 'X'
            qalib.style.display = 'none'
            player1.style.display = 'none'
            player2.style.display = 'none'
            click()
            x_o_x()
        }else {
            root.style.display = 'none'
            let classRoot = document.querySelector('.root')
            classRoot.style.display = 'flex'
            let h1 = document.createElement('h1')
            classRoot.appendChild(h1)
            h1.innerHTML = 'Thanks You'
        }
    },1000)
};
