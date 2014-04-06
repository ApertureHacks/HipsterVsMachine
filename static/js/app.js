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
  if (name.length > 40) {
    name = name.substring(0, 38) + '...';
  }
  $('#left-name').html(name);
  $('#left-button').click(cb);
}

function set_right(img, name, cb) {
  $('#right-image').attr('src', img);
  if (name.length > 40) {
    name = name.substring(0, 38) + '...';
  }
  $('#right-name').html(name);
  $('#right-button').click(cb);
}

function run_game() {
  var seen_items = {etsy: [], shapeways: []};
  var votes = {etsy: 0, shapeways: 0};
  var rounds = 10;
  var round = 0;

  var robot_attack = function() {
    $robo = $('#robot');
    $hipster = $('#hipster');
    $robo.attr('src', '/static/imgs/robo_hit.png');
    $hipster.animate({marginRight: '-=10px'}, 0);
    setTimeout(function() {
      $robo.attr('src', '/static/imgs/robo_stand.png');
      $hipster.animate({marginRight: '+=10px'}, 0);
    }, 500);
  };

  var hipster_attack = function() {
    $robo = $('#robot');
    $hipster = $('#hipster');
    $hipster.attr('src', '/static/imgs/hipster_hit.png');
    $robo.animate({marginLeft: '-=10px'}, 0);
    setTimeout(function() {
      $hipster.attr('src', '/static/imgs/hipster_stand.png');
      $robo.animate({marginLeft: '+=10px'}, 0);
    }, 500);
  };

  var click_etsy = function() {
    votes.etsy++;
    hipster_attack();
    next_round();
  };
  var click_shapeways = function() {
    votes.shapeways++;
    robot_attack();
    next_round();
  };

  var endgame = function() {
    console.log(round);
    console.log(votes);
    console.log(seen_items);

    $('#battle-zone').css('display', 'none');

    $('#right-image').attr('src', '/static/imgs/robo_stand.png');
    $('#right-header').html('Machine: ' + votes.shapeways);
    $('#right-name').html('');

    $('#left-image').attr('src', '/static/imgs/hipster_stand.png');
    $('#left-header').html('Hipster: ' + votes.etsy);
    $('#left-name').html('');

    $('#results-table').css('display', '');
    for (var i = 0; i < seen_items.etsy.length; i++) {
      console.log('in table for loop ' + i);
      etsy_item = seen_items.etsy[i];
      shapeways_item = seen_items.shapeways[i];
      etsy_link = '<a href="' + etsy_item.url + '">' + etsy_item.name + '</a>';
      shapeways_link = '<a href="' + shapeways_item.url + '">' + shapeways_item.name + '</a>';
      $('#results-table').append('<tr><td>' + etsy_link + '</td><td>' + shapeways_link + '</td></tr>');
    }
  };

  var next_round = function() {
    $('#left-button').off();
    $('#right-button').off();

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
