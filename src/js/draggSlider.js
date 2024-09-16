let draggSlider = document.querySelector('.draggable-slider');
let draggInnerSlider = document.querySelector('.draggable-slider__inner');

let pressed = false;
let isLongDragging = false;
let startx;
let x;

draggSlider.addEventListener('mousedown', (e)=>{
    pressed = true;
    setTimeout(()=>{
        isLongDragging = true;
    }, 200);
    // startx = e.offsetX - draggInnerSlider.offsetLeft; //problem z linkami gdyż offsetX podaje odleglość od aktualnego obejktu
    startx = e.clientX - draggInnerSlider.offsetLeft;
    draggSlider.style.cursor = 'grabbing';
    // console.log(startx);
    //console.log(draggInnerSlider.offsetLeft);
})

draggSlider.addEventListener('mouseenter', ()=>{
    draggSlider.style.cursor = 'grab'
})

// draggSlider.addEventListener('mouseleave', ()=>{
//     draggSlider.style.cursor = 'default'
// })

draggSlider.addEventListener('mouseup', ()=>{
    draggSlider.style.cursor = 'grab';
    pressed = false;
    setTimeout(()=>{
        isLongDragging = false;
    }, 0);
})

draggSlider.addEventListener('mousemove', (e)=>{
    if(!pressed) return;
    e.preventDefault();
    // x = e.offsetX; //problem z interakcją
    x = e.clientX;

    draggInnerSlider.style.left = `${x - startx}px`;
//    console.log(isLongDragging);
    checkboundary();
})

function checkboundary() {
    let outer = draggSlider.getBoundingClientRect();
    let inner = draggInnerSlider.getBoundingClientRect();
    // console.log(outer);
    // console.log(inner);
    
    if(parseInt(draggInnerSlider.style.left) > 0) {
        draggInnerSlider.style.left = '0px';
        console.log('DragSlider: stop left');
        
    } else if (inner.right < outer.right) {
        draggInnerSlider.style.left = `-${inner.width - outer.width}px`;
        console.log('DragSlider: stop right');
    }
}

//preventer a dragging
draggInnerSlider.querySelectorAll('a').forEach(a => {
    a.addEventListener('dragstart', (e) => e.preventDefault());
})

draggInnerSlider.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        console.log('DragSlider: Click a prevent:', isLongDragging);
        if (isLongDragging) {
            e.preventDefault(); // Prevent navigation when dragging
        }
    });
});