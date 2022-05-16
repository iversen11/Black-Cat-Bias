/*
Author: Larkin Iversen

Description:
This program visualizes Austin Animal Center Outcomes to further explore black cat bias.  

How to interact: 
Use your arrow keys on the upper graph to cycle through the years. 

Click the paw on the lower graph to cahnge the screen. 

Reference list: inspiration drawn from Weidi Zhang in GRADTDA 5150. 

1. https://carnegiemnh.org/superstitions-and-black-cats/#:~:text=Black%20cats%20appear%20in%20the,happened%20to%20cross%20your%20path.
2. [https://pubmed.ncbi.nlm.nih.gov/31033416/#:~:text=There%20is%20anecdotal%20and%20empirical,often%20than%20lighter%20colored%20cats](https://pubmed.ncbi.nlm.nih.gov/31033416/#:~:text=There%20is%20anecdotal%20and%20empirical,often%20than%20lighter%20colored%20cats).
3. [https://www.smithsonianmag.com/smart-news/people-discriminate-against-cats-based-on-color-too-91031536/#:~:text=Around%20this%20time%20of%20year,the%20fates%20of%20these%20felines](https://www.smithsonianmag.com/smart-news/people-discriminate-against-cats-based-on-color-too-91031536/#:~:text=Around%20this%20time%20of%20year,the%20fates%20of%20these%20felines).
4. https://www.mdpi.com/2076-2615/10/10/1720
*/

let data;
let lower_screen = 0;


function preload(){
  data_top4 = loadTable("assets/data_top4.csv", "csv", "header");
  data_others = loadTable("assets/data_others.csv", "csv", "header");
  black_cat_image = loadImage("assets/test_image.png")
}

function setup() {
  reset()
}

function draw() {

}

function reset() {
  new p5(lower_visual)
  new p5(upper_visual)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  reset()
}