var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { world, PlayerBreakBlockBeforeEvent, ItemComponentTypes, system } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { ItemAPI } from "../lib/ItemAPI";
export class StuffedHoglin {
    break(args) {
        const typeId = args.block.typeId;
        const block = args.block;
        const player = args.player;
        const dimension = args.dimension;
        if (typeId == "nethersdelight:stuffed_hoglin") {
            if (player.getGameMode() == "creative")
                return;
            const selectedItem = player?.getComponent("inventory")?.container?.getSlot(player.selectedSlotIndex).getItem();
            if (!selectedItem)
                return;
            const silkTouch = selectedItem.getComponent(ItemComponentTypes.Enchantable)?.hasEnchantment("silk_touch");
            if (!silkTouch)
                return;
            args.cancel = true;
            const direction = block.permutation.getState("minecraft:cardinal_direction");
            const part = block.permutation.getState("nethersdelight:part");
            const servings = block.permutation.getState("nethersdelight:servings");
            const directions = {
                'head': {
                    'north': { x: block.location.x, y: block.location.y, z: block.location.z - 1 },
                    'south': { x: block.location.x, y: block.location.y, z: block.location.z + 1 },
                    'east': { x: block.location.x + 1, y: block.location.y, z: block.location.z },
                    'west': { x: block.location.x - 1, y: block.location.y, z: block.location.z }
                },
                'foot': {
                    'north': { x: block.location.x, y: block.location.y, z: block.location.z + 1 },
                    'south': { x: block.location.x, y: block.location.y, z: block.location.z - 1 },
                    'east': { x: block.location.x - 1, y: block.location.y, z: block.location.z },
                    'west': { x: block.location.x + 1, y: block.location.y, z: block.location.z }
                }
            };
            const targetLocation = directions[part][direction];
            system.runTimeout(() => {
                if (servings == 0) {
                    ItemAPI.spawn(block, typeId);
                }
                dimension.runCommandAsync(`/fill ${block.location.x} ${block.location.y} ${block.location.z} ${targetLocation.x} ${targetLocation.y} ${targetLocation.z} air destroy`);
                ItemAPI.damage(player, player.selectedSlotIndex, 1);
            });
        }
        ;
    }
    ;
}
__decorate([
    EventAPI.register(world.beforeEvents.playerBreakBlock),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PlayerBreakBlockBeforeEvent]),
    __metadata("design:returntype", void 0)
], StuffedHoglin.prototype, "break", null);
//# sourceMappingURL=StuffedHoglin.js.map