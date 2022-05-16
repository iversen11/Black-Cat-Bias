let main_title = "What is Black Cat Bias?";
let main_text =
  "Cats are beautiful creatures and companions, and black cats are just as amazing as any other cat. Black cats have often been seen as bad luck because of superstitious beliefs. Because of this, there is a phenomenon that researchers have dubbed ‘black cat bias’ wherein black cats may be less likely to be adopted and more likely to be euthanized. Because of the negative consequences of black cat bias, better understanding it can help us address the root causes and ensure all cats have a good chance of finding a loving home. Prior studies have indicated the presence of black cat bias should be accounted for by shelters in order to reallocate resources to help black cats find homes. \n \nLook through the data above, and use your arrow keys to move through the years. Do you think black cat bias exists within this data? If so, what do you think should be done?  ";

let data_title = "Data and Analysis Information";
let data_text =
  "Publicly available data for the project were retrieved from the Austin Animal Center Outcomes website (https://data.austintexas.gov/Health-and-Community-Services/Austin-Animal-Center-Outcomes/9t4d-g238). \n\nData were processed and analyzed using PySpark, and then uploaded into P5 for visualization. \nThe adoption rate was calculated as the number of adoptions/number of all outcomes. Return to Owner and RTO-Adopt cases in the dataset were excluded. I opted to remove these as return to owner cases fit neither as adoptions nor as other outcomes such as euthanasia. \n\nI will likely upload all of my code to GitHub for more permanent storage (https://github.com/iversen11). Because the dataset is subject to change, I would expect the analysis may change as well over time. ";

let lower_visual = function (lower) {
  lower.modifyScreen = function (x, y, size) {
    if (lower.dist(lower.mouseX, lower.mouseY, x, y) < size) {
      if (lower_screen == 0) {
        lower_screen = 1;
      } else {
        lower_screen = 0;
      }
    }
  };

  function mouseClicked() {
    lower.modifyScreen();
  }
  lower.setup = function () {
    //create lower visual as top half of window, 2d viz
    let canvasH = lower.windowHeight / 2;
    let canvasW = lower.windowWidth;

    canvas = lower.createCanvas(canvasW, canvasH);
    canvas.position(0, canvasH);
  };

  lower.draw = function () {
    lower.background(0);

    if (lower_screen === 0) {
      lower.home_screen();
    } else if (lower_screen === 1) {
      lower.data_screen();
    }

    if (lower_screen === 0) {
      //paw buttons, pass in pre translation coordinates to allow color change
      lower.push();
      lower.stroke("white");
      lower.noFill();
      lower.translate(lower.windowWidth - 175, lower.windowHeight / 2 - 100);
      lower.rotate(90);

      //add 3 to x to better center within button
      lower.paw_button(
        0,
        0,
        25,
        lower.windowWidth - 175 + 3,
        lower.windowHeight / 2 - 100,
        "Data & Analysis"
      );
      lower.pop();
    } else if (lower_screen === 1) {
      lower.push();
      lower.stroke("white");
      lower.noFill();
      lower.translate(140, lower.windowHeight / 2 - 100);
      lower.rotate(-90);

      //add 3 to x to better center within button
      lower.paw_button(0, 0, 25, 140 + 3, lower.windowHeight / 2 - 100, "Home");
      lower.pop();
    }
  };

  lower.home_screen = function () {
    lower.x_padding = 400;
    lower.y_padding = 200;

    lower.push();
    lower.fill("white");
    lower.stroke("rgb(124, 252, 4)");
    lower.strokeWeight(1);
    lower.line(0, 0, lower.windowWidth, 0);
    lower.pop();

    lower.push();
    lower.fill("white");
    lower.textSize(30);
    lower.text(
      main_title,
      lower.windowWidth / 2 - 150,
      lower.y_padding / 4,
      lower.windowWidth - lower.x_padding * 2,
      lower.WindowHeight - lower.y_padding / 4
    );

    lower.textSize(20);

    lower.text(
      main_text,
      lower.x_padding,
      lower.y_padding / 4 + 60,
      lower.windowWidth - lower.x_padding * 2,
      lower.WindowHeight - lower.y_padding / 4
    );
    lower.pop();
  };

  lower.data_screen = function () {
    lower.x_padding = 400;
    lower.y_padding = 200;

    lower.push();
    lower.fill("white");
    lower.stroke("rgb(124, 252, 4)");
    lower.strokeWeight(1);
    lower.line(0, 0, lower.windowWidth, 0);
    lower.pop();

    lower.push();
    lower.fill("white");
    lower.textSize(30);
    lower.text(
      data_title,
      lower.windowWidth / 2 - 150,
      lower.y_padding / 4,
      lower.windowWidth - lower.x_padding * 2,
      lower.WindowHeight - lower.y_padding / 4
    );

    lower.textSize(20);

    lower.text(
      data_text,
      lower.x_padding,
      lower.y_padding / 4 + 60,
      lower.windowWidth - lower.x_padding * 2,
      lower.WindowHeight - lower.y_padding / 4
    );
    lower.pop();
  };

  lower.paw_button = function (
    x,
    y,
    size,
    original_coordinate_x,
    original_coordinate_y,
    text_
  ) {
    lower.angleMode(DEGREES);
    if (lower.mouseIsPressed) {
      lower.modifyScreen(original_coordinate_x, original_coordinate_y, size);
    }

    lower.push();

    if (
      lower.dist(
        lower.mouseX,
        lower.mouseY,
        original_coordinate_x,
        original_coordinate_y
      ) < size
    ) {
      lower.fill("rgba(4, 248, 252,0.5)");

      if (lower_screen === 0) {
        lower.push();
        lower.rotate(-90);
        lower.textAlign(lower.CENTER);
        lower.stroke("rgba(4, 248, 252,0.5)");
        lower.text(text_, 15, -40);
        lower.pop();
      } else if (lower_screen == 1) {
        lower.push();
        lower.rotate(90);
        lower.textAlign(lower.CENTER);
        lower.stroke("rgba(4, 248, 252,0.5)");
        lower.text(text_, -15, -40);
        lower.pop();
      }
    } else {
      if (lower_screen === 0) {
        lower.push();
        lower.rotate(-90);
        lower.textAlign(lower.CENTER);
        lower.stroke("white");
        lower.text(text_, 15, -40);
        lower.pop();
      } else if (lower_screen == 1) {
        lower.push();
        lower.rotate(90);
        lower.textAlign(lower.CENTER);
        lower.stroke("white");
        lower.text(text_, -15, -40);
        lower.pop();
      }

      lower.noFill();
    }

    //draw bottom pad
    lower.push();
    //lower.noFill();
    lower.beginShape();
    lower.vertex(x, y + 2.5);
    lower.bezierVertex(x + 10, y + 10, x + 15, y, x - 5, y - 15);
    lower.endShape();
    lower.pop();

    lower.push();
    //lower.noFill();
    lower.translate(x - 10, y);
    lower.rotate(180);
    lower.beginShape();
    lower.vertex(0, -2.5);
    lower.bezierVertex(10, -10, 15, 0, -5, 15);
    lower.endShape();
    lower.pop();

    lower.push();
    lower.beginShape();
    lower.vertex(x - 10, y + 2.5);
    lower.bezierVertex(x - 7.5, y + 1, x - 5, y, x, y + 2.5);
    lower.endShape();
    lower.pop();

    //add circle to fill in bottom pad completely when mouse is hovered
    // lower.push();
    // lower.noStroke();
    // lower.circle(x-5,y-10, 40)
    // lower.pop();

    //draw toes
    lower.push();
    //smaller outer toes
    lower.ellipse(x - 18, y - 15, 6.5, 10);
    lower.ellipse(x + 7, y - 15, 6.5, 10);
    //larger inner toes
    lower.ellipse(x - 10, y - 20, 6.5, 10);
    lower.ellipse(x, y - 20, 6.5, 10);
    lower.pop();

    //draw outer paw
    lower.push();
    //lower.noFill()
    lower.translate(x, y);
    lower.arc(-5, -5, 45, 35, 0, 185);
    lower.pop();

    //draw outer paw toes
    lower.push();
    //lower.noFill()
    lower.beginShape();
    lower.vertex(x + 17.75, y - 5);
    lower.bezierVertex(x + 20, y - 18, x + 15, y - 28, x + 10, y - 28);
    lower.vertex(x + 10, y - 28);
    lower.bezierVertex(x + 5, y - 38, x, y - 38, x - 5, y - 33);
    lower.vertex(x - 5, y - 33);
    lower.bezierVertex(x - 10, y - 38, x - 15, y - 38, x - 18, y - 28);
    lower.vertex(x - 18, y - 28);
    lower.bezierVertex(x - 25, y - 28, x - 28, y - 28, x - 27.5, y - 3);
    lower.endShape();
    lower.pop();

    lower.pop();
  };
};
