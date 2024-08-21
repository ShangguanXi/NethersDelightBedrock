import { BlockCustomComponent, BlockComponentPlayerInteractEvent, WorldInitializeBeforeEvent, world, Dimension, Vector3, BlockComponentRandomTickEvent, EntityInventoryComponent, Container, BlockComponentPlayerDestroyEvent, BlockComponentTickEvent, system } from "@minecraft/server";
import { ItemAPI } from "../../lib/ItemAPI";
import { EventAPI } from "../../lib/EventAPI";
import { RandomAPI } from "../../lib/RandomAPI";

class PropelplantCaneComponent implements BlockCustomComponent {
    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
        this.onRandomTick = this.onRandomTick.bind(this);
        this.onTick = this.onTick.bind(this);
        this.onPlayerDestroy = this.onPlayerDestroy.bind(this);
    }
    onPlayerDestroy(args: BlockComponentPlayerDestroyEvent): void {
        const block = args.block;
        const player = args.player;
        const dimension = args.dimension;
        if (player?.getGameMode() == "creative") return
        try {
            const isKnife = player?.getComponent("inventory")?.container?.getSlot(player.selectedSlotIndex).hasTag("farmersdelight:is_knife")
            if (!isKnife) {
                dimension.createExplosion(block.location, 1)
            }
        } catch (error) {
            dimension.createExplosion(block.location, 1)
        }
    }
    onTick(args: BlockComponentTickEvent): void {
        const block = args.block;
        const dimension = args.dimension;
        const arr = dimension.getEntitiesAtBlockLocation(block.location)
        if (arr.length>0){
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].typeId!="minecraft:item"){
                    dimension.createExplosion(block.location, 1)
                }
            }  
        }
    }
    onPlayerInteract(args: BlockComponentPlayerInteractEvent): void {
        const block = args.block;
        const player = args.player;
        const berry = Boolean(block.permutation.getState("nethersdelight:berry"))
        const stage = String(block.permutation.getState("nethersdelight:stage"))
        const random = Math.floor(Math.random() * 101)
        if (!player) return;
        const container: Container | undefined = player.getComponent(EntityInventoryComponent.componentId)?.container;
        try {
            const itemId = player?.getComponent("inventory")?.container?.getSlot(player.selectedSlotIndex).typeId
            if ((!berry) && (stage == "berry_stem" || stage == "berry_cane")) {
                if (itemId == "minecraft:bone_meal") {
                    world.playSound("item.bone_meal.use", block.location)
                    if (player?.getGameMode() == "creative") {
                        block.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
                        block.setPermutation(block.permutation.withState("nethersdelight:berry", true))
                    }
                    else {
                        if (random <= 60) {
                            block.setPermutation(block.permutation.withState("nethersdelight:berry", true))
                        }
                        block.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
                        if (!container) return;
                        ItemAPI.clear(player, player?.selectedSlotIndex)
                    }
                }

            }
            if (berry && (stage == "berry_stem" || stage == "berry_cane")) {
                world.playSound("item.bone_meal.use", block.location)
                block.setPermutation(block.permutation.withState("nethersdelight:berry", false))
                ItemAPI.spawn(block, "nethersdelight:propelpearl", 1 + RandomAPI.RandomInt(2))
            }

        } catch (error) {
            if (berry && (stage == "berry_stem" || stage == "berry_cane")) {
                world.playSound("item.bone_meal.use", block.location)
                block.setPermutation(block.permutation.withState("nethersdelight:berry", false))
                ItemAPI.spawn(block, "nethersdelight:propelpearl", 1 + RandomAPI.RandomInt(2))
            }
        }
    }
    onRandomTick(args: BlockComponentRandomTickEvent): void {
        const block = args.block
        const dimension = args.dimension
        const topLocation = { x: block.location.x, y: block.location.y + 1, z: block.location.z };
        const bottopmLocation = { x: block.location.x, y: block.location.y - 1, z: block.location.z };
        const berry = Boolean(block.permutation.getState("nethersdelight:berry"))
        const stage = String(block.permutation.getState("nethersdelight:stage"))
        if (stage == "berry_stem" && !berry) {
            if (RandomAPI.probability(50)) {
                block.setPermutation(block.permutation.withState("nethersdelight:berry", true))
            }
            else {
                if (dimension.getBlock(topLocation)?.isAir) {
                    block.setPermutation(block.permutation.withState("nethersdelight:stage", "stem"))
                    dimension.setBlockType(topLocation, "nethersdelight:propelplant_cane")
                    system.run(() => {
                        const growthBlock = dimension.getBlock(topLocation)
                        growthBlock?.setPermutation(growthBlock.permutation.withState("nethersdelight:stage", "berry_cane"))
                    })
                }
            }
        }
        if (stage == "berry_cane" && !berry) {
            if (RandomAPI.probability(50)) {
                block.setPermutation(block.permutation.withState("nethersdelight:berry", true))
            }
            else {
                if (dimension.getBlock(topLocation)?.isAir && (dimension.getBlock(bottopmLocation)?.permutation.getState("nethersdelight:stage") != "cane")) {
                    block.setPermutation(block.permutation.withState("nethersdelight:stage", "cane"))
                    dimension.setBlockType(topLocation, "nethersdelight:propelplant_cane")
                    system.run(() => {
                        const growthBlock = dimension.getBlock(topLocation)
                        growthBlock?.setPermutation(growthBlock.permutation.withState("nethersdelight:stage", "berry_cane"))
                    })
                }
            }
        }
        if (stage == "stem" && !berry) {
            if (dimension.getBlock(topLocation)?.isAir) {
                dimension.setBlockType(topLocation, "nethersdelight:propelplant_cane")
                system.run(() => {
                    const growthBlock = dimension.getBlock(topLocation)
                    growthBlock?.setPermutation(growthBlock.permutation.withState("nethersdelight:stage", "berry_cane"))
                })
            }
        }
    }
}
export class PropelplantCaneComponentRegister {
    @EventAPI.register(world.beforeEvents.worldInitialize)
    register(args: WorldInitializeBeforeEvent) {
        args.blockComponentRegistry.registerCustomComponent('nethersdelight:propelplant_cane', new PropelplantCaneComponent());
    }
    
}
