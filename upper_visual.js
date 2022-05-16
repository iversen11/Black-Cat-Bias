//initialize arrays for colors present in processed dataset
let black = [];
let other_colors = [];

let all_colors = [];
let month_count = 10;
let years = [
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
];

let upper_title = "Austin Animal Shelter Adoption Rates from 2013-2022";
//10 records for each color

let upper_visual = function (upper) {
  let current_year = 0;
  upper.angleMode(DEGREES);

  upper.cat_point = function (x, y, sW, color) {
    upper.push();

    upper.translate(x, y);
    upper.stroke("white");
    upper.rotate(35);
    upper.fill(color);
    upper.triangle(-1, -3, 0, -6, 2, -1);
    upper.pop();

    upper.push();
    upper.stroke("white");
    upper.translate(x, y);
    upper.rotate(-35);
    upper.fill(color);
    upper.triangle(-1, -3, 0, -6, 3, -1);
    upper.pop();

    upper.push();
    upper.stroke("white");
    upper.fill(color);
    upper.strokeWeight(1);
    upper.circle(x, y, sW);

    upper.pop();
  };

  upper.main_graph = function () {
    //initialize padding and variables
    upper.x_padding = 250;
    upper.y_padding = 200;
    upper.start_x = upper.x_padding;
    upper.end_x = upper.windowWidth - upper.x_padding;
    upper.x_length = upper.end_x - upper.start_x;
    upper.stroke_weight = 6;

    upper.y_min = map(
      min(all_colors),
      min(all_colors),
      max(all_colors),
      upper.windowHeight / 2 - upper.y_padding,
      upper.y_padding
    );

    upper.y_max = map(
      max(all_colors),
      min(all_colors),
      max(all_colors),
      upper.windowHeight / 2 - upper.y_padding,
      upper.y_padding
    );

    //make legend and axes

    upper.push();
    upper.fill("white");
    upper.textSize(17);

    upper.push();
    upper.textSize(17);
    upper.text(
      "Year",
      upper.windowWidth / 2,
      upper.windowHeight / 2 - upper.y_padding / 4
    );
    
    upper.push();
    upper.fill('white')
    upper.noStroke();
    upper.textSize(17);
    upper.textAlign(CENTER);
    upper.text(
      upper_title,
      upper.windowWidth / 2,
      50
    );
    
    upper.pop();

    upper.fill("white");
    upper.translate(0,  upper.windowHeight / 4 + 40)
    upper.rotate(-90);
    upper.text("Adoption Rate (%) ", 0, 140);
    upper.pop();

    //upper.text("Legend", 60, 27);

    //uncomment to make legend box
    //     upper.push();
    //     upper.noFill();
    //     upper.stroke("rgb(124, 252, 4)");
    //     upper.strokeWeight(1);
    //     upper.rect(-1, -1, 170, 110);
    //     upper.pop();

    upper.push();
    upper.textSize(17);

    upper.fill("white");
    upper.text("Black Cats", 10, 50);

    upper.cat_point(140, 47, upper.stroke_weight, "rgba(0,0,0,1)");

    upper.push();
    upper.fill("white");
    upper.text("All Other Cats", 10, 80);

    upper.cat_point(140, 77, upper.stroke_weight, "rgba(252,132,4,1)");

    upper.pop();

    upper.pop();

    //extract, map, and plot data points
    for (let i = 0; i < month_count; i++) {
      upper.push();

      upper.textSize(17);
      upper.fill("white");
      upper.text("Current Year:", upper.windowWidth - 175, 50);
      upper.text(years[current_year], upper.windowWidth - 50, 50);

      upper.text("Adoption Rate", upper.windowWidth - 175, 80);
      upper.text("(%)", upper.windowWidth - 50, 80);

      upper.text("Black Cats:", upper.windowWidth - 175, 110);
      upper.text(round(black[current_year]), upper.windowWidth - 50, 110);

      upper.text("Other Cats:", upper.windowWidth - 175, 140);
      upper.text(
        round(other_colors[current_year]),
        upper.windowWidth - 50,
        140
      );
      upper.pop();

      upper.i_x = map(i, 0, month_count - 1, upper.start_x, upper.end_x);

      //map each color
      upper.black_y = map(
        black[i],
        min(all_colors),
        max(all_colors),
        upper.windowHeight / 2 - upper.y_padding,
        upper.y_padding
      );

      upper.other_colors_y = map(
        other_colors[i],
        min(all_colors),
        max(all_colors),
        upper.windowHeight / 2 - upper.y_padding,
        upper.y_padding
      );

      upper.current_year = years[i];

      //if first index make y axis labels

      upper.cat_point(
        upper.i_x,
        upper.black_y,
        upper.stroke_weight,
        "rgba(0,0,0,1)"
      );

      upper.cat_point(
        upper.i_x,
        upper.other_colors_y,
        upper.stroke_weight,
        "rgba(252,132,4,1)"
      );

      if (i == current_year) {
        upper.push();
        upper.fill("rgb(4, 248, 252)");
        upper.textSize(15);
        upper.text(
          upper.current_year,
          upper.i_x - 20,
          upper.windowHeight / 2 - upper.y_padding / 4 - 75
        );
        upper.pop();
      } else {
        upper.push();
        upper.fill("white");
        upper.textSize(15);
        upper.text(
          upper.current_year,
          upper.i_x - 20,
          upper.windowHeight / 2 - upper.y_padding / 4 - 75
        );
        upper.pop();
      }
    }
  };

  upper.setup = function () {
    //create upper visual as top half of window, 2d viz
    let canvasH = upper.windowHeight / 2;
    let canvasW = upper.windowWidth;

    canvas = upper.createCanvas(canvasW, canvasH);
    canvas.position(0, 0);

    other_colors = data_others.getColumn(1);

    all_colors = data_top4.getColumn(2);
    all_colors = concat(all_colors, other_colors);

    //iterate table and load into respective arrays
    for (let i = 0; i < month_count; i++) {
      black[i] = data_top4.getNum(i, 2);
    }
  };

  upper.draw = function () {
    upper.background(0);

    upper.main_graph();
  };

  upper.keyPressed = function () {
    if (upper.keyCode == upper.LEFT_ARROW) {
      if (current_year > 0) {
        current_year--;
      }
    } else if (upper.keyCode == upper.RIGHT_ARROW) {
      if (current_year < 9) {
        current_year++;
      }
    }
  };
};
