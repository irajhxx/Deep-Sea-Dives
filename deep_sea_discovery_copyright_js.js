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
