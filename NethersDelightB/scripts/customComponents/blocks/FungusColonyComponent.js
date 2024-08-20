var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ItemStack, WorldInitializeBeforeEvent, world } from "@minecraft/server";
import { ItemAPI } from "../../lib/ItemAPI";
import { EventAPI } from "../../lib/EventAPI";
import { RandomAPI } from "../../lib/RandomAPI";
function spawnLoot(path, dimenion, location) {
    return dimenion.runCommand(`loot spawn ${location.x} ${location.y} ${location.z} loot "${path}"`);
}
class FungusColonyComponent {
    constructor() {
        this.onRandomTick = this.onRandomTick.bind(this);
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
        const growth = block.permutation.getState('farmersdelight:growth');
        const selectedSlot = container?.getSlot(player.selectedSlotIndex);
        try {
            const itemId = selectedSlot?.typeId;
            if (itemId == "minecraft:bone_meal" && growth < 4) {
                if (growth < 4 && growth >= 0 && RandomAPI.probability(70)) {
                    block.setPermutation(block.permutation.withState('farmersdelight:growth', growth + 1));
                }
                dimension.spawnParticle("minecraft:crop_growth_emitter", block.center());
                dimension.playSound("item.bone_meal.use", block.center());
                ItemAPI.clear(player, player.selectedSlotIndex);
            }
            if (itemId == "minecraft:shears" && growth > 0) {
                block.setPermutation(block.permutation.withState('farmersdelight:growth', growth - 1));
                if (block.typeId == "nethersdelight:warped_fungus_colony") {
                    spawnLoot("nethersdelight/crops/warped_fungus_colony0", dimension, { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
                }
                ;
                if (block.typeId == "nethersdelight:crimson_fungus_colony") {
                    spawnLoot("nethersdelight/crops/crimson_fungus_colony0", dimension, block.center());
                }
                ;
                ItemAPI.damage(player, player.selectedSlotIndex);
                dimension.playSound("mob.sheep.shear", block.center());
            }
        }
        catch (error) {
        }
    }
    onPlayerDestroy(args) {
        const brokenPerm = args.destroyedBlockPermutation;
        const blockId = brokenPerm.type.id;
        const player = args.player;
        const container = player?.getComponent("inventory")?.container;
        if (!player)
            return;
        if (!container)
            return;
        const selectedSlot = container?.getSlot(player.selectedSlotIndex);
        if ((blockId != 'nethersdelight:warped_fungus_colony' && blockId != 'nethersdelight:crimson_fungus_colony'))
            return;
        const growth = brokenPerm.getState('farmersdelight:growth');
        try {
            const itemId = selectedSlot?.typeId;
            const { x, y, z } = args.block.location;
            if (growth == 4 && itemId == 'minecraft:shears') {
                player.dimension.spawnItem(new ItemStack(`${blockId}`), { x: x + 0.5, y, z: z + 0.5 });
                if (player.getGameMode() == "creative")
                    return;
                ItemAPI.damage(player, player.selectedSlotIndex);
            }
            else {
                spawnLoot(`nethersdelight/crops/${blockId.split(':')[1]}${growth}`, player.dimension, { x: x + 0.5, y, z: z + 0.5 });
            }
        }
        catch {
        }
    }
    onRandomTick(args) {
        const block = args.block;
        const growth = block.permutation.getState('farmersdelight:growth');
        if (growth < 4) {
            block.setPermutation(block.permutation.withState('farmersdelight:growth', growth + 1));
        }
    }
}
export class FungusColonyComponentComponentRegister {
    register(args) {
        args.blockComponentRegistry.registerCustomComponent('nethersdelight:fungus_colony', new FungusColonyComponent());
    }
}
__decorate([
    EventAPI.register(world.beforeEvents.worldInitialize),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WorldInitializeBeforeEvent]),
    __metadata("design:returntype", void 0)
], FungusColonyComponentComponentRegister.prototype, "register", null);
//# sourceMappingURL=FungusColonyComponent.js.map