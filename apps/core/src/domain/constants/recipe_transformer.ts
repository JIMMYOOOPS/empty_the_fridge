const TargetAudience = "cooking beginner"
const RecipeJSONProperty = ['name', 'ingredients', 'origin', 'calories', 'steps to produce' , 'skills required']
const RecipeJSONPropertyExample = {
    "name": "Chicken and Egg Fried Rice",
    "ingredients": [
      {"name": "chicken", "quantity": "200", "quantity_measurement": "g", "part": "thigh", "processing_method": "diced"},
      {"name": "rice", "quantity": "250", "quantity_measurement": "g", "processing_method": "cooked"},
      {"name": "cabbage", "quantity": "100", "quantity_measurement": "g", "processing_method": "shredded"},
      {"name": "eggs", "quantity": "2", "processing_method": "beaten"},
      {"name": "onion", "quantity": "1", "quantity_measurement": "g", "processing_method": "chopped"},
      {"name": "salt", "quantity": "10g", "quantity_measurement": "g"},
      {"name": "pepper", "quantity": "5g", "quantity_measurement": "g"},
      {"name": "soy sauce", "quantity": "10g", "quantity_measurement": "g"},
    ],
    "origin": "Asian",
    "calories": "400",
    "stepsToProduce": [
      "Heat a tablespoon of oil in a large pan or wok over medium-high heat.",
      "Add chopped onion and diced chicken. Cook until chicken is no longer pink.",
      "Push chicken to one side of the pan, pour beaten eggs onto the other side. Scramble eggs until cooked through.",
      "Add shredded cabbage to the pan. Stir-fry for a couple of minutes until cabbage begins to soften.",
      "Add cooked rice to the pan. Stir everything together.",
      "Season with salt, pepper, and soy sauce to taste. Stir well to combine.",
      "Continue to cook, stirring frequently, until everything is heated through.",
      "Serve hot and enjoy!"
    ],
    "skillsRequired": ["Chopping", "Stirring", "Frying"]
  }
const PromptConstraint = {
    json_markers: "Do not wrap the json codes in JSON markers.",
    quantity: "The quantity of each ingredient should be in  International System of Units, for example g, cm and etc. The quantity field should not use tablespoon(tbsp) or cup as a unit of measurement.",
    empty_fields: "Do not leave any json fields empty such as: null, N/A or simply empty. If the information is not available in the json object, please remove the field."
}

export {
    TargetAudience,
    RecipeJSONProperty,
    RecipeJSONPropertyExample,
    PromptConstraint
}