//Slideshow
var slide = 1;
if(document.getElementsByClassName("slideShow-container").length !== 0){
    slideShow(slide);
}
function slideShow(index){
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("indicator");
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    for (var i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" activeI", "");
    }
    if(index > slides.length) slide = 1;
    if(index < 1) slide = slides.length;
    slides[slide-1].style.display = "block";
    dots[slide-1].className += " activeI"; 
}
function toggle(x){
    slideShow(slide += x);
}
function current(x){
    slideShow(slide = x);
}
//Modal
var modal = document.getElementById('myModal');
var btn = document.getElementById("modalBtn");
var span = document.getElementsByClassName("close")[0];
if(modal !== null){
    btn.onclick = function() {
        modal.style.display = "block";
    }
    span.onclick = function() {
        modal.style.display = "none";
    }     
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
//Quote of the day
var data;
var request = new XMLHttpRequest();
if(document.getElementById("dailyMessage") !== null){
    loadData();
} 
function loadData() {
  request.open('GET', './json/messages.json');
  request.onload = loadComplete;
  request.send();
}
function loadComplete(evt) {
    data = JSON.parse(request.responseText);
    var d = new Date();
    var messageContainer = document.getElementById("dailyMessage");

    for(var i = 0; i < 7; i++){
        if(d.getDay() === i){
            messageContainer.innerHTML = ""+data.messages[i];
        }
    }
    console.log("new message");
}
//Scroll to top
function topFunction(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
window.onscroll = function() {
    if(document.getElementById("toTopBtn") !== null){
        scrollFunction()
    }
};
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("toTopBtn").style.display = "inline-block";
    } else {
        document.getElementById("toTopBtn").style.display = "none";
    }
}
//Parallax
if(document.getElementsByClassName("parallax") !== null){
    setParallax();
}
function setParallax(){
    // var parallax = document.getElementsByClassName("parallax")[0];
    // var img = parallax.getElementsByTagName("img")[0];
    // parallax.style.backgroundImage = "url('"+img.src+"')";
    // img.style.display = "none";
    var parallax = document.getElementsByClassName("parallax");
    var img = [];
    for (var i = 0; i < parallax.length; i++) {
        img.push(parallax[i].getElementsByTagName("img")[0]); 
    }
    for (var i = 0; i < img.length; i++) {
        parallax[i].style.backgroundImage = "url('"+img[i].src+"')";
        img[i].style.display = "none";
    }
}
//Sticky Navbar
// window.onscroll = function() {stickNavbar()};

var navbar = document.getElementsByClassName("nav")[0];
var sticky = navbar.offsetTop;

function stickNavbar() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}