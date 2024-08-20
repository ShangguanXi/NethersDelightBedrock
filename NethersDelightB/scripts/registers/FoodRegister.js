var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ItemStopUseAfterEvent, world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { RandomAPI } from "../lib/RandomAPI";
export class FoodRegister {
    eat(args) {
        const itemStack = args.itemStack;
        const player = args.source;
        const useDuration = args.useDuration;
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
                    player.setOnFire(5);
                    break;
                case "nethersdelight:propelpearl":
                    player.addEffect('fire_resistance', 60 * 20, { amplifier: 0 });
                    player.setOnFire(60);
                    break;
            }
        }
    }
}
__decorate([
    EventAPI.register(world.afterEvents.itemStopUse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ItemStopUseAfterEvent]),
    __metadata("design:returntype", void 0)
], FoodRegister.prototype, "eat", null);
//# sourceMappingURL=FoodRegister.js.map