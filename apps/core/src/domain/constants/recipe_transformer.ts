const TargetAudience = "cooking beginner"
const RecipeJSONProperty = ['name', 'ingredients', 'origin', 'calories', 'stepsToProduce' , 'skillsRequired', 'cookingTime']
const RecipeJSONPropertyExample = {
    "name": "Chicken and Egg Fried Rice",
    "ingredients": [
      {"name": "chicken", "type": "meat", "quantity": "200", "quantityMeasurement": "g", "part": "thigh", "processingMethod": "diced"},
      {"name": "rice", "type": "carbohydrate", "quantity": "250", "quantityMeasurement": "g", "processingMethod": "cooked"},
      {"name": "cabbage", "type": "vegetable", "quantity": "100", "quantityMeasurement": "g", "processingMethod": "shredded"},
      {"name": "eggs", "type": "protein", "quantity": "2", "processingMethod": "beaten"},
      {"name": "onion", "type": "vegetable", "quantity": "1", "quantityMeasurement": "g", "processingMethod": "chopped"},
      {"name": "salt", "type": "seasoning", "quantity": "10g", "quantityMeasurement": "g"},
      {"name": "pepper", "type": "seasoning", "quantity": "5g", "quantityMeasurement": "g"},
      {"name": "soy sauce", "type": "seasoning", "quantity": "10g", "quantityMeasurement": "g"},
    ],
    "origin": "Asian",
    "calories": "400",
    "cookingTime": "30",
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
    jsonMarkers: "Do not wrap the json codes in JSON markers.",
    quantityMeasurement: "The quantityMeasurement field must not use 'tablespoon, 'tbsp, 'tsp, or 'cup' as quantity measurement. The quantityMeasurement field should be in International System of Units.",
    emptyFields: "All json fields should contain values. If no information is not available in the field remove the field.",
    lowerCase: "All json keys and value should be in lower case.",
    ingredientSingularity: "The ingredient field should be singular."
}

export {
    TargetAudience,
    RecipeJSONProperty,
    RecipeJSONPropertyExample,
    PromptConstraint
}