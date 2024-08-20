import { BlockComponentPlayerInteractEvent, BlockCustomComponent, Dimension, world, WorldInitializeBeforeEvent } from "@minecraft/server";
import { EventAPI } from "../../lib/EventAPI";
import { ItemAPI } from "../../lib/ItemAPI";

class StuffedHoglinComponent implements BlockCustomComponent {
    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
    }

    onPlayerInteract(args: BlockComponentPlayerInteractEvent) {
        const block = args.block;
        const dimension = args.dimension;
        const player = args.player;
        const servings = block.permutation.getState("nethersdelight:servings") as number
        const container = player?.getComponent("inventory")?.container?.getSlot(player.selectedSlotIndex)
        const direction = block.permutation.getState("minecraft:cardinal_direction") as 'north' | 'south' | 'east' | 'west';
        const part = block.permutation.getState("nethersdelight:part") as 'head' | 'foot';
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
                if (!container) return;
                if (!container.hasTag("farmersdelight:is_knife")) {
                    player?.onScreenDisplay.setActionBar({ translate: 'nethersdelight.feast.use_knife' });
                }
                else {
                    block.setPermutation(block.permutation.withState("nethersdelight:servings", servings + 1))
                    const targetBlock = dimension.getBlock(targetLocation)
                    if (!targetBlock) return
                    targetBlock.setPermutation(targetBlock.permutation.withState("nethersdelight:servings", servings + 1))
                    ItemAPI.spawn(block, "nethersdelight:hoglin_ear")
                    if (player?.getGameMode() == "creative") return
                    if (!player) return
                    ItemAPI.damage(player, player.selectedSlotIndex)

                }
            } catch (error) {
                player?.onScreenDisplay.setActionBar({ translate: 'nethersdelight.feast.use_knife' });
            }


        };
        if (servings == 2) {
            try {
                if (!container) return;
                if (container.typeId != "minecraft:bowl") {
                    player?.onScreenDisplay.setActionBar({ translate: 'farmersdelight.blockfood.minecraft:bowl' });
                }
                else {
                    block.setPermutation(block.permutation.withState("nethersdelight:servings", servings + 1))
                    const targetBlock = dimension.getBlock(targetLocation)
                    if (!targetBlock) return
                    targetBlock.setPermutation(targetBlock.permutation.withState("nethersdelight:servings", servings + 1))
                    ItemAPI.spawn(block, "nethersdelight:plate_of_stuffed_hoglin_snout")
                    if (player?.getGameMode() == "creative") return
                    if (!player) return
                    ItemAPI.clear(player, player.selectedSlotIndex)

                }
            } catch (error) {
                player?.onScreenDisplay.setActionBar({ translate: 'farmersdelight.blockfood.minecraft:bowl' });
            }

        };
        if (servings > 2 && servings <= 6) {
            try {
                if (!container) return;
                if (container.typeId != "minecraft:bowl") {
                    player?.onScreenDisplay.setActionBar({ translate: 'farmersdelight.blockfood.minecraft:bowl' });
                }
                else {
                    block.setPermutation(block.permutation.withState("nethersdelight:servings", servings + 1))
                    const targetBlock = dimension.getBlock(targetLocation)
                    if (!targetBlock) return
                    targetBlock.setPermutation(targetBlock.permutation.withState("nethersdelight:servings", servings + 1))
                    ItemAPI.spawn(block, "nethersdelight:plate_of_stuffed_hoglin_ham")
                    if (player?.getGameMode() == "creative") return
                    if (!player) return
                    ItemAPI.clear(player, player.selectedSlotIndex)

                }
            } catch (error) {
                player?.onScreenDisplay.setActionBar({ translate: 'farmersdelight.blockfood.minecraft:bowl' });
            }



        };
        if (servings > 6 && servings < 11) {
            try {
                if (!container) return;
                if (container.typeId != "minecraft:bowl") {
                    player?.onScreenDisplay.setActionBar({ translate: 'farmersdelight.blockfood.minecraft:bowl' });
                }
                else {
                    block.setPermutation(block.permutation.withState("nethersdelight:servings", servings + 1))
                    const targetBlock = dimension.getBlock(targetLocation)
                    if (!targetBlock) return
                    targetBlock.setPermutation(targetBlock.permutation.withState("nethersdelight:servings", servings + 1))
                    ItemAPI.spawn(block, "nethersdelight:plate_of_stuffed_hoglin_roast")
                    if (player?.getGameMode() == "creative") return
                    if (!player) return
                    ItemAPI.clear(player, player.selectedSlotIndex)
                }

            } catch (error) {
                player?.onScreenDisplay.setActionBar({ translate: 'farmersdelight.blockfood.minecraft:bowl' });
            }
        };
        if (servings == 11) {
            dimension.runCommandAsync(`/fill ${block.location.x} ${block.location.y} ${block.location.z} ${targetLocation.x} ${targetLocation.y} ${targetLocation.z} air destroy`)
            ItemAPI.spawn(block, "minecraft:bowl")
            ItemAPI.spawn(block, "minecraft:bone", 4)
        };
    }
}
export class StuffedHoglinBlockComponentRegister {
    @EventAPI.register(world.beforeEvents.worldInitialize)
    register(args: WorldInitializeBeforeEvent) {
        args.blockComponentRegistry.registerCustomComponent('nethersdelight:stuffed_hoglin', new StuffedHoglinComponent());
    }

}
