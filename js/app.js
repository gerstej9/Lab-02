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

/* Animal.prototype.render = function () {
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
}; */
const initialSort = () =>{
  animals.sort((leftVal, rightVal) => {
    if(leftVal.horns > rightVal.horns){
      return -1;
    }else if (leftVal.horns< rightVal.horns){
      return 1;
    }else{
      return 0;
    }
  });
};

let title = $('title').text();

if (title.includes('Page 2')) {
  $.ajax({
    url: './data/page-2.json',
    async: true
  }).then(parse => {

    parse.forEach(animalJSONObject => animals.push(new Animal(animalJSONObject)));
    initialSort();
    animals.forEach(animal => animal.render());
  });
} else {
  $.ajax({
    url: './data/page-1.json',
    async: true
  }).then(parse => {

    parse.forEach(animalJSONObject => animals.push(new Animal(animalJSONObject)));
    initialSort();
    animals.forEach(animal => animal.render());
  });
}


Animal.prototype.render = function () {
  const template = $('#photo-template').html();
  const animalHtml = Mustache.render(template, this)
  $('ul').append(animalHtml);
  const $newAnimalOption = $('#templateSelector').find('option').clone();
  if (keywordArray.includes(this.keyword) !== true) {
    keywordArray.push(this.keyword);
    $newAnimalOption.attr('value', this.keyword);
    $newAnimalOption.text(this.keyword);
    $('#keyword').append($newAnimalOption);
  }
};

$('#photo-template').hide();


const selectImages = (event) => {
  if (event.target.value !== 'default') {
    $('li').css('display', 'none');
    $(`.${event.target.value}`).css('display', 'block');
  } else {
    $('li').css('display', 'block');
  }
};

const sortSelectImages = (value) => {
  if (value !== 'default') {
    $('li').css('display', 'none');
    $(`.${value}`).css('display', 'block');
  } else {
    $('li').css('display', 'block');
  }
};




const sortImages = (event) => {
  const valueKey = $('#keyword option:selected').text();
  sortSelectImages(valueKey);
  if (event.target.value === 'horns') {
    //sort function by horns
    animals.sort((leftVal, rightVal) => {
      if(leftVal.horns > rightVal.horns){
        return -1;
      }else if (leftVal.horns< rightVal.horns){
        return 1;
      }else{
        return 0;
      }
    });
  } else if(event.target.value === 'title'){
    //sort function by title alphabetically
    animals.sort((leftVal, rightVal) => {
      if(leftVal.title.toLowerCase() > rightVal.title.toLowerCase()){
        return 1;
      }else if (leftVal.title.toLowerCase()< rightVal.title.toLowerCase()){
        return -1;
      }else{
        return 0;
      }
    });
  }
  $('ul').empty();
  animals.forEach(animal => animal.render());
};

$('#keyword').on('change', selectImages);
$('#sort').on('change', sortImages);


