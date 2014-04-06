function get_item(endpoint, callback) {
  $.ajax({
    type: 'GET',
    url: window.location + endpoint,
    success: function(result){
      var item = JSON.parse(result);
      callback(item);
    }
  });
}

function get_etsy_item(callback) {
  get_item('get_etsy', callback);
}

function get_shapeways_item(callback) {
  get_item('get_shapeways', callback);
}

function set_left(img, name, cb) {
  $('#left-image').attr('src', img);
  $('#left-name').html(name);
  $('#left-button').click(cb);
}

function set_right(img, name, cb) {
  $('#right-image').attr('src', img);
  $('#right-name').html(name);
  $('#right-button').click(cb);
}

function run_game() {
  var seen_items = {etsy: [], shapeways: []};
  var votes = {etsy: 0, shapeways: 0};
  var rounds = 10;
  var round = 0;

  var click_etsy = function() {
    $(this).off();
    votes.etsy++;
    next_round();
  };
  var click_shapeways = function() {
    $(this).off();
    votes.shapeways++;
    next_round();
  };

  var endgame = function() {
    console.log(round);
    console.log(votes);
    console.log(seen_items);
  };

  var next_round = function() {
    // $('#left-button').off();
    // $('#right-button').off();

    if (round++ >= rounds) {
      return endgame();
    }

    var rand = Math.round(Math.random());
    if (rand) {

      get_shapeways_item(function(item) {
        seen_items.shapeways.push(item);
        set_left(item.img, item.name, click_shapeways);
      });
      get_etsy_item(function(item) {
        seen_items.etsy.push(item);
        set_right(item.img, item.name, click_etsy);
      });
    } else {
      get_shapeways_item(function(item) {
        seen_items.shapeways.push(item);
        set_right(item.img, item.name, click_shapeways);
      });
      get_etsy_item(function(item) {
        seen_items.etsy.push(item);
        set_left(item.img, item.name, click_etsy);
      });
    }
  };

  next_round();
}

run_game();

// vim: set ts=2 sts=2 sw=2 :
