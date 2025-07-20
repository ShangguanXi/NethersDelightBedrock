import {ScriptEventCommandMessageAfterEvent, system, world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
let register = true
export class CookingPotRecipeRegister {
    @EventAPI.register(system.afterEvents.scriptEventReceive)
    register(args: ScriptEventCommandMessageAfterEvent) {
        system.runInterval(() => {
            if (register) {
                world.getDimension("overworld").runCommand("function nethersdelight/recipe_registries");
                register = false
            }
        })
    }
}