'use strict';

const animals = [];
const keywordArray = [];

function Animal(jsonObject) {
  this.image_url = jsonObject.image_url;
  this.title = jsonObject.title;
  this.description = jsonObject.description;
  this.keyword = jsonObject.keyword;
  this.horns = jsonObject.horns;
}

Animal.prototype.render = function () {
  const $newAnimalLi = $('#photo-template').find('li').clone();
  $newAnimalLi.attr('class', this.keyword);
  $newAnimalLi.find('h2').text(this.title);
  $newAnimalLi.find('img').attr('src', this.image_url);
  $newAnimalLi.find('p').text(this.description);
  $('ul').append($newAnimalLi);

  const $newAnimalOption = $('#templateSelector').find('option').clone();
  if (keywordArray.includes(this.keyword) !== true) {
    keywordArray.push(this.keyword);
    $newAnimalOption.attr('value', this.keyword);
    $newAnimalOption.text(this.keyword);
    $('select').append($newAnimalOption);
  }
};

$.ajax('Lab-02/data/page-1.json', 'json').then(parse => {

  parse.forEach(animalJSONObject => animals.push(new Animal(animalJSONObject)));

  animals.forEach(animal => animal.render());
});

const selectImages = (event) => {
  event.preventDefault();
  if (event.target.value !== 'default'){
    $('li').css('display', 'none');
    $(`.${event.target.value}`).css('display', 'block');
  }else{
    $('li').css('display', 'block');

  }
  //# change display property to none all images
  //# create new css rule for class .keyword change display property on class "event.target.value"
};


$('select').on('change', selectImages);


// Filter by keyword : li {display: auto}
// keyword : li {display none}

//           li attribute (keyword)
//           $ #keyword display

