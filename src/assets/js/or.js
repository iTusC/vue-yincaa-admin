var circle = document.getElementById("c1");
var percent = 0.7, perimeter = Math.PI * 2 * 170;
circle.setAttribute('stroke-dasharray', perimeter * percent + " " + perimeter * (1- percent));