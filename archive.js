//initialize arrays for colors present in processed dataset
let black = [];
let black_white = [];
let brown_tabby = [];
let brown_white_tabby = [];
let other_colors = [];

let all_colors = [];
let month_count = 10;
//10 records for each color

let upper_visual = function (upper) {
  upper.main_graph = function () {
    //initialize padding and variables
    upper.x_padding = 200;
    upper.y_padding = 200;
    upper.start_x = upper.x_padding;
    upper.end_x = upper.windowWidth - upper.x_padding;
    upper.x_length = upper.end_x - upper.start_x;
    upper.stroke_weight = 6;

    //make legend and axes
    

    upper.push();
    upper.fill('white')
    upper.textSize(10);
    
    upper.push();
    upper.textSize(17)
    upper.text("Year", upper.windowWidth/2, upper.windowHeight - upper.y_padding/4)
    
    upper.fill('white')
    upper.text("Adoption Rate (%) ", 10, upper.windowHeight/2 + 40)
    upper.pop()
    
    upper.text("Legend", 65, 20)
    
    upper.push();
    upper.noFill()
    upper.stroke('white')
    upper.strokeWeight(5)
    upper.rect(0,0,160, 140)
    upper.pop();

    upper.push();

    upper.fill('white')
    upper.text("Black Cats", 10, 40);
    upper.stroke("rgb(94, 200, 193)")
    upper.fill("rgba(0,0,0, 0.8)");
    upper.strokeWeight(upper.stroke_weight);
    upper.strokeWeight(1);
    upper.rectMode(CENTER)
    upper.square(140, 37, upper.stroke_weight);

    upper.pop();

    upper.push();
    upper.fill('white')
    upper.text("Black & White Cats", 10, 60);
    upper.stroke("white");
    upper.fill("rgba(0,0,0,0.8)");
    upper.strokeWeight(upper.stroke_weight);
    upper.strokeWeight(1);
    upper.circle(140, 57, upper.stroke_weight);
    upper.pop();

    upper.push();
    upper.fill('white')
    upper.text("Brown Tabbies", 10, 80);
    upper.stroke("rgb(94, 200, 193)");
    upper.fill("rgba(196, 80, 10, 0.8)");
    upper.strokeWeight(upper.stroke_weight);
    upper.rectMode(CENTER)
    upper.strokeWeight(1);
    upper.square(140, 77, upper.stroke_weight);
    upper.pop();

    upper.push();
    upper.fill('white')
    upper.text("Brown & White Tabbies", 10, 100);
    upper.stroke("white");
    upper.fill("rgba(196,80,10,0.8)");
    upper.strokeWeight(upper.stroke_weight);
    upper.strokeWeight(1);
    upper.circle(140, 97, upper.stroke_weight);
    upper.pop();

    upper.push();
    upper.fill('white')
    upper.text("All Other Cats", 10, 120);
    upper.stroke("white");
    upper.fill("rgb(10,196,62)");
    upper.strokeWeight(upper.stroke_weight);
    upper.strokeWeight(1);
    upper.circle(140, 117, upper.stroke_weight);
    upper.pop();

    upper.pop();

    //extract, map, and plot data points
    for (let i = 0; i < month_count; i++) {
      upper.i_x = map(i, 0, month_count - 1, upper.start_x, upper.end_x);

      //map each color
      upper.black_y = map(
        black[i],
        min(all_colors),
        max(all_colors),
        upper.windowHeight - upper.y_padding,
        upper.y_padding
      );

      upper.black_white_y = map(
        black_white[i],
        min(all_colors),
        max(all_colors),
        upper.windowHeight - upper.y_padding,
        upper.y_padding
      );

      upper.brown_tabby_y = map(
        brown_tabby[i],
        min(all_colors),
        max(all_colors),
        upper.windowHeight - upper.y_padding,
        upper.y_padding
      );

      upper.brown_white_tabby_y = map(
        brown_white_tabby[i],
        min(all_colors),
        max(all_colors),
        upper.windowHeight - upper.y_padding,
        upper.y_padding
      );

      upper.other_colors_y = map(
        other_colors[i],
        min(all_colors),
        max(all_colors),
        upper.windowHeight - upper.y_padding,
        upper.y_padding
      );

      //if first index make y axis labels

      upper.push();
      upper.stroke("rgb(94, 200, 193)")
      upper.fill("rgba(0,0,0, 0.8)");
      upper.strokeWeight(upper.stroke_weight);
      upper.strokeWeight(1);
      upper.rectMode(CENTER)
      upper.square(upper.i_x, upper.black_y, upper.stroke_weight);
      upper.pop();

      upper.push();
      upper.stroke("white");
      upper.fill("rgba(0,0,0, 0.8)");
      upper.strokeWeight(upper.stroke_weight);
      upper.strokeWeight(1);
      upper.circle(upper.i_x, upper.black_white_y, upper.stroke_weight);
      upper.pop();

      upper.push();
      upper.stroke("rgb(94, 200, 193)");
      upper.fill("rgba(196, 80, 10, 0.8)");
      upper.strokeWeight(upper.stroke_weight);
      upper.strokeWeight(1);
      upper.rectMode(CENTER)
      upper.square(upper.i_x, upper.brown_tabby_y, upper.stroke_weight);
      upper.pop();

      upper.push();
      upper.stroke("white");
      upper.fill("rgba(196, 80, 10, 0.8)");
      upper.strokeWeight(upper.stroke_weight);
      upper.strokeWeight(1);
      upper.circle(upper.i_x, upper.brown_white_tabby_y, upper.stroke_weight);
      upper.pop();

      upper.push();
      upper.stroke("white");
      upper.fill("rgb(10,196,62)");
      upper.strokeWeight(1);
      upper.circle(upper.i_x, upper.other_colors_y, upper.stroke_weight);
      upper.pop();
    }
  };

  upper.setup = function () {
    //create upper visual as top half of window, 2d viz
    let canvasH = upper.windowHeight;
    let canvasW = upper.windowWidth;

    canvas = upper.createCanvas(canvasW, canvasH);
    canvas.position(0, 0);

    other_colors = data_others.getColumn(1);

    all_colors = data_top4.getColumn(2);
    all_colors = concat(all_colors, other_colors);

    //iterate table and load into respective arrays
    for (let i = 0; i < month_count; i++) {
      black[i] = data_top4.getNum(i, 2);
      black_white[i] = data_top4.getNum(i + 10 * 1, 2);
      brown_tabby[i] = data_top4.getNum(i + 10 * 2, 2);
      brown_white_tabby[i] = data_top4.getNum(i + 10 * 3, 2);
    }
  };

  upper.draw = function () {
    upper.background(0);

    upper.main_graph();
  };
};
