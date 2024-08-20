import { BlockComponentPlayerInteractEvent, BlockCustomComponent, ItemEnchantableComponent, WorldInitializeBeforeEvent, world } from "@minecraft/server";
import { ItemAPI } from "../../lib/ItemAPI";
import { EventAPI } from "../../lib/EventAPI";

class RichSoulSoilComponent implements BlockCustomComponent {
    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this);


    }
    onPlayerInteract(args: BlockComponentPlayerInteractEvent): void {

        const player = args.player;
        const face = args.face;
        const container = player?.getComponent("inventory")?.container;
        const block = args.block;
        const dimension = args.dimension;
        if (!player) return;
        if (!container) return;
        const selectedSlot = container?.getSlot(player.selectedSlotIndex)
        try {
            const itemId = selectedSlot?.typeId;
            const topLocation = { x: block.location.x, y: block.location.y + 1, z: block.location.z }
            const topBlockId = dimension.getBlock(topLocation)?.typeId
            if (face == 'Up' && topBlockId == "minecraft:air") {
                if (itemId == "minecraft:sugar_cane") {
                    world.playSound("dig.grass", block.location)
                    dimension.setBlockType(topLocation, "farmersdelight:rich_soil_sugar_cane_bottom")
                    ItemAPI.clear(player, player.selectedSlotIndex)
                }
                if (itemId == "minecraft:crimson_fungus") {
                    world.playSound("dig.grass", block.location)
                    dimension.setBlockType(topLocation, "nethersdelight:crimson_fungus_colony")
                    ItemAPI.clear(player, player.selectedSlotIndex)

                }
                if (itemId == "minecraft:warped_fungus") {
                    world.playSound("dig.grass", block.location)
                    dimension.setBlockType(topLocation, "nethersdelight:warped_fungus_colony")
                    ItemAPI.clear(player, player.selectedSlotIndex)

                }

            }
        } catch (error) {

        }


    }
}
export class RichSoulSoilComponentRegister {
    @EventAPI.register(world.beforeEvents.worldInitialize)
    register(args: WorldInitializeBeforeEvent) {
        args.blockComponentRegistry.registerCustomComponent('nethersdelight:rich_soil', new RichSoulSoilComponent());
    }

}
