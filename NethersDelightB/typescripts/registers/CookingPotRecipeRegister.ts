import {ScriptEventCommandMessageAfterEvent, system, world, WorldLoadAfterEvent } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
let register = true
export class CookingPotRecipeRegister {
    @EventAPI.register(world.afterEvents.worldLoad)
    register(args: WorldLoadAfterEvent) {
        system.runInterval(() => {
            if (register) {
                world.getDimension("overworld").runCommand("function nethersdelight/recipe_registries");
                register = false
            }
        })
    }
}