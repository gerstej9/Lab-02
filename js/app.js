'use strict';

const animals = [];

function Animal(jsonObject){
    this.image_url = jsonObject.image_url;
    this.title = jsonObject.title;
    this.description = jsonObject.description;
    this.keyword =jsonObject.keyword;
    this.horns = jsonObject.horns;
}

Animal.prototype.render = function(){
    const $newAnimalLi = $('#photo-template').find('li').clone();
    $newAnimalLi.find('h2').text(this.title);
    $newAnimalLi.find('img').attr('src', this.image_url);
    $newAnimalLi.find('p').text(this.description);
    console.log($newAnimalLi);
    $('ul').append($newAnimalLi);
}

$.ajax('../data/page-1.json', 'json').then(parse => {
console.log(parse);

parse.forEach(animalJSONObject => animals.push(new Animal(animalJSONObject)));

animals.forEach(animal => animal.render());
});

/* 

// $.ajax and $.get both make ajax request
// AJAX stands for Asynchronous Javascript and XML
// go external to the file/ app and get things

// AJAX takes time all asynchronous javascript takes time.
// All Ajax takes 1 million years

// .then is a method on all Promises that takes in a callback that fires off when the data returns to the javascript
// the callback has 1 parameter: data

$.get('data.json', 'json').then(dataPotato => {
  console.log('data potato async', dataPotato);

  // TODO: make a Dog out of each json object
  JSON.parse(dataPotato).forEach(dogJSONObject => dogs.push(new Dog(dogJSONObject)));

  // TODO: call render on each Dog
  dogs.forEach(dog => dog.render());
});
// console.log('dog json synchronously', dogJSON);


$('#template').hide();



// $.get('https://raw.githubusercontent.com/codefellows/code-301-guide/master/curriculum/class-02/demo/read-json/data.json?token=AHUYDZX2LB4KGHFZWFYYVGK7Z7NGI', 'json').then(dataPotato => { */
