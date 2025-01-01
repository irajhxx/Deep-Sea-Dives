//Volcano Code
const volcano = document.getElementById('volcano');

function simulateEruption() {
    let intensity = Math.random() * 0.1 + 1;
    volcano.style.transform = `scale(${intensity})`;
}

setInterval(simulateEruption, 100);


//Stars Background
const starryBackground = document.querySelector('.starry-background');
let starCount = 0;

function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    const size = Math.random() * 3 + 1; 
    const left = Math.random() * 100; 
    const top = Math.random() * 100; 
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${left}%`;
    star.style.top = `${top}vh`; 
    star.style.animationDuration = `${Math.random() * 1.5 + 1}s`; 
    star.style.animationDelay = `${Math.random() * 2}s`; 
    return star;
}

function populateStars(numStars) {
    for (let i = 0; i < numStars; i++) {
        starryBackground.appendChild(createStar());
    }
}

function addMoreStarsOnScroll() {
    if (window.scrollY > starCount * 200) {
        populateStars(50); 
        starCount++;
    }
}

populateStars(100);
starCount++;
window.addEventListener('scroll', addMoreStarsOnScroll);


//Cursor
const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
});

const hoverElements = document.querySelectorAll('.hover-btn, button, a'); 

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
    });
});

document.addEventListener('click', () => {
    cursor.classList.add('clicked');
    setTimeout(() => {
        cursor.classList.remove('clicked');
    }, 200);
});
