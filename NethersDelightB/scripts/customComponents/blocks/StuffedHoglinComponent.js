var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { world, WorldInitializeBeforeEvent } from "@minecraft/server";
import { EventAPI } from "../../lib/EventAPI";
import { ItemAPI } from "../../lib/ItemAPI";
class StuffedHoglinComponent {
    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
    }
    onPlayerInteract(args) {
        const block = args.block;
        const dimension = args.dimension;
        const player = args.player;
        const servings = block.permutation.getState("nethersdelight:servings");
        const container = player?.getComponent("inventory")?.container?.getSlot(player.selectedSlotIndex);
        const direction = block.permutation.getState("minecraft:cardinal_direction");
        const part = block.permutation.getState("nethersdelight:part");
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
        if (servings <= 1) {
            try {
                if (!container)
                    return;
                if (!container.hasTag("farmersdelight:is_knife")) {
                    player?.onScreenDisplay.setActionBar({ translate: 'nethersdelight.feast.use_knife' });
                }
                else {
                    block.setPermutation(block.permutation.withState("nethersdelight:servings", servings + 1));
                    const targetBlock = dimension.getBlock(targetLocation);
                    if (!targetBlock)
                        return;
                    targetBlock.setPermutation(targetBlock.permutation.withState("nethersdelight:servings", servings + 1));
                    ItemAPI.spawn(block, "nethersdelight:hoglin_ear");
                    if (player?.getGameMode() == "creative")
                        return;
                    if (!player)
                        return;
                    ItemAPI.damage(player, player.selectedSlotIndex);
                }
            }
            catch (error) {
                player?.onScreenDisplay.setActionBar({ translate: 'nethersdelight.feast.use_knife' });
            }
        }
        ;
        if (servings == 2) {
            try {
                if (!container)
                    return;
                if (container.typeId != "minecraft:bowl") {
                    player?.onScreenDisplay.setActionBar({ translate: 'farmersdelight.blockfood.minecraft:bowl' });
                }
                else {
                    block.setPermutation(block.permutation.withState("nethersdelight:servings", servings + 1));
                    const targetBlock = dimension.getBlock(targetLocation);
                    if (!targetBlock)
                        return;
                    targetBlock.setPermutation(targetBlock.permutation.withState("nethersdelight:servings", servings + 1));
                    ItemAPI.spawn(block, "nethersdelight:plate_of_stuffed_hoglin_snout");
                    if (player?.getGameMode() == "creative")
                        return;
                    if (!player)
                        return;
                    ItemAPI.clear(player, player.selectedSlotIndex);
                }
            }
            catch (error) {
                player?.onScreenDisplay.setActionBar({ translate: 'farmersdelight.blockfood.minecraft:bowl' });
            }
        }
        ;
        if (servings > 2 && servings <= 6) {
            try {
                if (!container)
                    return;
                if (container.typeId != "minecraft:bowl") {
                    player?.onScreenDisplay.setActionBar({ translate: 'farmersdelight.blockfood.minecraft:bowl' });
                }
                else {
                    block.setPermutation(block.permutation.withState("nethersdelight:servings", servings + 1));
                    const targetBlock = dimension.getBlock(targetLocation);
                    if (!targetBlock)
                        return;
                    targetBlock.setPermutation(targetBlock.permutation.withState("nethersdelight:servings", servings + 1));
                    ItemAPI.spawn(block, "nethersdelight:plate_of_stuffed_hoglin_ham");
                    if (player?.getGameMode() == "creative")
                        return;
                    if (!player)
                        return;
                    ItemAPI.clear(player, player.selectedSlotIndex);
                }
            }
            catch (error) {
                player?.onScreenDisplay.setActionBar({ translate: 'farmersdelight.blockfood.minecraft:bowl' });
            }
        }
        ;
        if (servings > 6 && servings < 11) {
            try {
                if (!container)
                    return;
                if (container.typeId != "minecraft:bowl") {
                    player?.onScreenDisplay.setActionBar({ translate: 'farmersdelight.blockfood.minecraft:bowl' });
                }
                else {
                    block.setPermutation(block.permutation.withState("nethersdelight:servings", servings + 1));
                    const targetBlock = dimension.getBlock(targetLocation);
                    if (!targetBlock)
                        return;
                    targetBlock.setPermutation(targetBlock.permutation.withState("nethersdelight:servings", servings + 1));
                    ItemAPI.spawn(block, "nethersdelight:plate_of_stuffed_hoglin_roast");
                    if (player?.getGameMode() == "creative")
                        return;
                    if (!player)
                        return;
                    ItemAPI.clear(player, player.selectedSlotIndex);
                }
            }
            catch (error) {
                player?.onScreenDisplay.setActionBar({ translate: 'farmersdelight.blockfood.minecraft:bowl' });
            }
        }
        ;
        if (servings == 11) {
            dimension.runCommandAsync(`/fill ${block.location.x} ${block.location.y} ${block.location.z} ${targetLocation.x} ${targetLocation.y} ${targetLocation.z} air destroy`);
            ItemAPI.spawn(block, "minecraft:bowl");
            ItemAPI.spawn(block, "minecraft:bone", 4);
        }
        ;
    }
}
export class StuffedHoglinBlockComponentRegister {
    register(args) {
        args.blockComponentRegistry.registerCustomComponent('nethersdelight:stuffed_hoglin', new StuffedHoglinComponent());
    }
}
__decorate([
    EventAPI.register(world.beforeEvents.worldInitialize),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WorldInitializeBeforeEvent]),
    __metadata("design:returntype", void 0)
], StuffedHoglinBlockComponentRegister.prototype, "register", null);
//# sourceMappingURL=StuffedHoglinComponent.js.map