import { ItemStopUseAfterEvent, world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { RandomAPI } from "../lib/RandomAPI";
export class FoodRegister {
    @EventAPI.register(world.afterEvents.itemStopUse)
    eat(args: ItemStopUseAfterEvent) {
        const itemStack = args.itemStack;
        const player = args.source
        const useDuration = args.useDuration
        if (itemStack && useDuration == 0) {
            switch (itemStack.typeId) {
                case "nethersdelight:hoglin_loin":
                case "nethersdelight:hoglin_sirloin":
                    if (RandomAPI.probability(75)) {
                        player.addEffect('nausea', 20 * 20, { amplifier: 0 });
                    }
                    break;
                case "nethersdelight:strider_slice":
                    player.addEffect('fire_resistance', 20 * 20, { amplifier: 0 });
                    break;
                case "nethersdelight:ground_strider":
                    player.addEffect('fire_resistance', 10 * 20, { amplifier: 0 });
                    if (RandomAPI.probability(35)) {
                        player.addEffect('poison', 20 * 20, { amplifier: 0 });
                    }
                case "nethersdelight:warped_moldy_meat":
                    player.addEffect('nausea', 10 * 20, { amplifier: 0 });
                    player.addEffect('blindness', 20 * 20, { amplifier: 0 });
                    break;
                case "nethersdelight:grilled_strider":
                    player.addEffect('fire_resistance', 30 * 20, { amplifier: 0 });
                    player.addEffect('saturation', 120 * 20, { amplifier: 0 });
                    break;
                case "nethersdelight:plate_of_stuffed_hoglin_snout":
                    player.addEffect('saturation', 240 * 20, { amplifier: 0 });
                    break;
                case "nethersdelight:plate_of_stuffed_hoglin_ham":
                case "nethersdelight:plate_of_stuffed_hoglin_roast":
                    player.addEffect('saturation', 120 * 20, { amplifier: 0 });
                    break;
                case "nethersdelight:propelpearl":
                    player.setOnFire(5)
                    break;
                case "nethersdelight:propelpearl":
                    player.addEffect('fire_resistance', 60 * 20, { amplifier: 0 });
                    player.setOnFire(60)
                    break;

            }
        }
    }
}