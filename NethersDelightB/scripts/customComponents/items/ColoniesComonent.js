var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BlockPermutation, Direction, WorldInitializeBeforeEvent, world } from "@minecraft/server";
import { EventAPI } from "../../lib/EventAPI";
import { ItemAPI } from "../../lib/ItemAPI";
class ColoniesComonent {
    constructor() {
        this.onUseOn = this.onUseOn.bind(this);
    }
    onUseOn(args) {
        const itemStack = args.itemStack;
        const block = args.block;
        const blockFilter = [
            "nethersdelight:rich_soul_soil",
            "minecraft:mycelium",
            "minecraft:crimson_nylium",
            "minecraft:warped_nylium"
        ];
        if (itemStack.typeId !== 'nethersdelight:warped_fungus_colony' && itemStack.typeId !== 'nethersdelight:crimson_fungus_colony')
            return;
        if (args.blockFace != Direction.Up)
            return;
        if (blockFilter.includes(block.typeId)) {
            const player = args.source;
            const main = block.above();
            const mainPerm = BlockPermutation.resolve(itemStack.typeId, { 'farmersdelight:growth': 4 });
            main?.setPermutation(mainPerm);
            if (player.getGameMode() == "creative")
                return;
            ItemAPI.clear(player, player.selectedSlotIndex);
        }
    }
}
export class ColoniesComonentRegister {
    register(args) {
        args.itemComponentRegistry.registerCustomComponent('nethersdelight:colonies', new ColoniesComonent());
    }
}
__decorate([
    EventAPI.register(world.beforeEvents.worldInitialize),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WorldInitializeBeforeEvent]),
    __metadata("design:returntype", void 0)
], ColoniesComonentRegister.prototype, "register", null);
//# sourceMappingURL=ColoniesComonent.js.map