import { world, PlayerBreakBlockBeforeEvent, ItemComponentTypes, system } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { ItemAPI } from "../lib/ItemAPI";

export class StuffedHoglin {
    @EventAPI.register(world.beforeEvents.playerBreakBlock)
    break(args: PlayerBreakBlockBeforeEvent) {

        const typeId = args.block.typeId;
        const block = args.block;
        const player = args.player;
        const dimension = args.dimension;
        if (typeId == "nethersdelight:stuffed_hoglin") {
            if (player.getGameMode() == "creative") return;
            const selectedItem = player?.getComponent("inventory")?.container?.getSlot(player.selectedSlotIndex).getItem();
            if (!selectedItem) return
            const silkTouch = selectedItem.getComponent(ItemComponentTypes.Enchantable)?.hasEnchantment("silk_touch");
            if (!silkTouch) return;
            args.cancel = true;
            const direction = block.permutation.getState("minecraft:cardinal_direction") as 'north' | 'south' | 'east' | 'west';
            const part = block.permutation.getState("nethersdelight:part") as 'head' | 'foot';
            const servings = block.permutation.getState("nethersdelight:servings") as number;
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
                if (servings==0){
                    ItemAPI.spawn(block, typeId)
                }
                dimension.runCommandAsync(`/fill ${block.location.x} ${block.location.y} ${block.location.z} ${targetLocation.x} ${targetLocation.y} ${targetLocation.z} air destroy`)
                ItemAPI.damage(player, player.selectedSlotIndex, 1);
            })

        };
    };


}