let best_distance = 0;
let index_of_best_distance = 0;

function nextGeneration() {

  console.log('Next generation.');
  generation_number++;

  for (let i = 0; i < savedCats.length; i++) { // GET THE SMARTES CAT
    if (savedCats[i].distance_passed >= best_distance) {
      best_distance = savedCats[i].distance_passed;
      index_of_best_distance = i;
    }
  }

  for (let i = 0; i < savedCats.length; i++) { // MUTATE AND CREATE NEW MUTATED CATS
    cats[i] = new Cat(img_cat_head, canvas_width / 10, canvas_height / 4, savedCats[index_of_best_distance].cat_brain);
    cats[i].mutate();
  }

  for (let i = 0; i < savedCats.length; i++) { // GET RID OF OLD STUPID CATS
    savedCats[i].dispose();
  }
  savedCats = [];
}