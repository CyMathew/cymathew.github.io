let newsreel = document.getElementById('newsreel');
let articles = document.querySelectorAll("#newsreel article");
let selectors = document.querySelectorAll("#articleSelector span")

let selected = 1;
let previous = 0;

slideTo(0);

function slideTo(selected)
{
    articles[selected].style.transform = "scale(1)";
    newsreel.scrollLeft = articles[selected].offsetLeft;
    selectors[selected].className += " active";
}

function slideshow()
{
    articles[previous].style.transform = "scale(.90)";
    selectors[previous].className = "dot";
    slideTo(selected);     

    previous = selected++; 

    if(selected == articles.length)
        selected = 0;            
}

window.onload = setInterval(() => (slideshow()), 4000);