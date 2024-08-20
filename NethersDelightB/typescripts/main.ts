import { StuffedHoglin } from "./blocks/StuffedHoglin";
import { PropelplantCaneComponentRegister } from "./customComponents/blocks/PropelplantCaneComponent";
import { StuffedHoglinBlockComponentRegister } from "./customComponents/blocks/StuffedHoglinComponent";
import { StuffedHoglinComponentRegister } from "./customComponents/items/StuffedHoglinComponent";
import { CookingPotRecipeRegister } from "./registers/CookingPotRecipeRegister";
import { FoodRegister } from "./registers/FoodRegister";
import { LootingRegister } from "./registers/LootRegister";

new PropelplantCaneComponentRegister();
new StuffedHoglinComponentRegister();
new StuffedHoglinBlockComponentRegister();
new StuffedHoglin();
new LootingRegister();
new FoodRegister();
new CookingPotRecipeRegister();