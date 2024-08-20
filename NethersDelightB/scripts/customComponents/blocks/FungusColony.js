var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WorldInitializeBeforeEvent, world } from "@minecraft/server";
import { ItemAPI } from "../../lib/ItemAPI";
import { EventAPI } from "../../lib/EventAPI";
class RichSoulSoilComponent {
    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
    }
    onPlayerInteract(args) {
        const player = args.player;
        const face = args.face;
        const container = player?.getComponent("inventory")?.container;
        const block = args.block;
        const dimension = args.dimension;
        if (!player)
            return;
        if (!container)
            return;
        const selectedSlot = container?.getSlot(player.selectedSlotIndex);
        try {
            const itemId = selectedSlot?.typeId;
            const topLocation = { x: block.location.x, y: block.location.y + 1, z: block.location.z };
            const topBlockId = dimension.getBlock(topLocation)?.typeId;
            if (face == 'Up' && topBlockId == "minecraft:air") {
                if (itemId == "minecraft:sugar_cane") {
                    world.playSound("dig.grass", block.location);
                    dimension.setBlockType(topLocation, "farmersdelight:rich_soil_sugar_cane_bottom");
                    ItemAPI.clear(player, player.selectedSlotIndex);
                }
                if (itemId == "minecraft:crimson_fungus") {
                    world.playSound("dig.grass", block.location);
                    dimension.setBlockType(topLocation, "nethersdelight:crimson_fungus_colony");
                    ItemAPI.clear(player, player.selectedSlotIndex);
                }
                if (itemId == "minecraft:warped_fungus") {
                    world.playSound("dig.grass", block.location);
                    dimension.setBlockType(topLocation, "nethersdelight:warped_fungus_colony");
                    ItemAPI.clear(player, player.selectedSlotIndex);
                }
            }
        }
        catch (error) {
        }
    }
}
export class RichSoulSoilComponentRegister {
    register(args) {
        args.blockComponentRegistry.registerCustomComponent('nethersdelight:rich_soil', new RichSoulSoilComponent());
    }
}
__decorate([
    EventAPI.register(world.beforeEvents.worldInitialize),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WorldInitializeBeforeEvent]),
    __metadata("design:returntype", void 0)
], RichSoulSoilComponentRegister.prototype, "register", null);
//# sourceMappingURL=FungusColony.js.map