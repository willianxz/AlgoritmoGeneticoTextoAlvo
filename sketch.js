// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 5: Evolutionary Computing

// Genetic Algorithm, Evolving Shakespeare

// Demonstration of using a genetic algorithm to perform a search

// setup()
//  # Step 1: The Population
//    # Create an empty population (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

// draw()
//  # Step 1: Selection
//    # Create an empty mating pool (an empty ArrayList)
//    # For every member of the population, evaluate its fitness based on some criteria / function,
//      and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it
//      is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

//  # Step 2: Reproduction Create a new empty population
//    # Fill the new population by executing the following steps:
//       1. Pick two "parent" objects from the mating pool.
//       2. Crossover -- create a "child" object by mating these two parents.
//       3. Mutation -- mutate the child's DNA based on a given probability.
//       4. Add the child object to the new population.
//    # Replace the old population with the new population
//
//   # Rinse and repeat


var target = "";
var popmax;
var mutationRate;
var population;

var bestPhrase;
var allPhrases;
var stats;

var input, button;
var terminouPopulacao;

function setup() {
  
  noCanvas();
  
  input = createInput();
  input.position(windowWidth / 2 - 200, height);
  input.style('width', '400px');
  
  
  button = createButton("Definir Texto Alvo");
  button.position(input.x + input.width, height);
  button.mousePressed(defineTarget);
  
  bestPhrase = createP("Best phrase:");
  bestPhrase.position(windowWidth / 2 - 60, height + 20);
  bestPhrase.class("best");
  bestPhrase.style('font-size', '40px');
 

  allPhrases = createP("All phrases:");
  allPhrases.position(10,10);
  allPhrases.class("all");
  allPhrases.style('font-size', '16px');

  stats = createP("Stats");
  stats.position(windowWidth / 2 - 80, height + 80);
  stats.class("stats");
  stats.style('font-size', '30px');
  
  popmax = 200;
  mutationRate = 0.01;

  // Create a populationation with a target phrase, mutation rate, and populationation max
  
}

function draw() {
  
  if(target !== ""){
    // Generate mating pool
     population.naturalSelection();
    //Create next generation
     population.generate();
    // Calculate fitness
    population.calcFitness();
  
     population.evaluate();
  
    // If we found the target phrase, stop
    if (population.isFinished()) {
      //println(millis()/1000.0);
      noLoop();
      terminouPopulacao = true;
    }
  
    displayInfo();
  }
 }




function defineTarget(){
  
  if(terminouPopulacao){
    terminouPopulacao = false;
    loop();
    loop();
  }
  
  target = input.value();
  population = new Population(target, mutationRate, popmax);
}

function displayInfo() {
  // Display current status of populationation
  var answer = population.getBest();

  bestPhrase.html("Best phrase:<br>" + answer);

  var statstext = "<br><br> Total generations:     " + population.getGenerations() + "<br>";
  statstext +=    "Average fitness:       " + nf(population.getAverageFitness()) + "<br>";
  statstext +=    "Total population:      " + popmax + "<br>";
  statstext +=    "Mutation rate:         " + floor(mutationRate * 100) + "%";

  stats.html(statstext);

  allPhrases.html("All phrases:<br>" + population.allPhrases())
}
