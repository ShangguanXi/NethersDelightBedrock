import { BlockCustomComponent, BlockComponentRandomTickEvent, world, WorldInitializeBeforeEvent, BlockPermutation, BlockVolume } from "@minecraft/server";
import { EventAPI } from "../../lib/EventAPI";
const organicCompostDetectList = [
    'minecraft:soul_sand',
    'minecraft:soul_soil',
    'minecraft:podzol',
    'minecraft:mycelium',
    'minecraft:nether_wart',
    'minecraft:bone_block',
    'nethersdelight:soul_compost',
    'nethersdelight:rich_soul_soil',
    'minecraft:crimson_fungus',
    'minecraft:warped_fungus'
]
class SoulCompostComonent implements BlockCustomComponent {
    constructor() {
        this.onRandomTick = this.onRandomTick.bind(this);
    }
    onRandomTick(args: BlockComponentRandomTickEvent): void {
        let transChance: number = 0.1;
        let hasWater: boolean = false;
        const compostBlock = args.block;
        if (compostBlock?.typeId !== "nethersdelight:soul_compost") return;
        const currentProcess = compostBlock.permutation.getState("farmersdelight:process") as number ?? 0;
        const { x, y, z } = compostBlock.location;
        const dimension = compostBlock.dimension;
        const fromLocation = { x: x - 1, y: y - 1, z: z - 1 };
        const toLocation = { x: x + 1, y: y + 1, z: z + 1 };
        const detectLocs = new BlockVolume(fromLocation, toLocation).getBlockLocationIterator();
        for (const location of detectLocs) {
            const block = dimension.getBlock(location);
            if (!block) continue;
            if (organicCompostDetectList.includes(block.typeId)) {
                transChance += 0.02;
            }
            else if (block.hasTag('compost_activators')) {
                transChance += 0.02;
            }
            else if (block.typeId in ['minecraft:lava','minecraft:fire','minecraft:soul_fire']) {
                hasWater = true;
            }
        };
        if (hasWater) transChance += 0.1;
        if (Math.random() < transChance) {
            if (currentProcess < 7) {
                compostBlock.setPermutation(compostBlock.permutation.withState('farmersdelight:process', currentProcess + 1));
            }
            else {
                compostBlock.setPermutation(BlockPermutation.resolve('nethersdelight:rich_soul_soil'));
            }
        }

    }
}
export class SoulCompostComonentRegister {
    @EventAPI.register(world.beforeEvents.worldInitialize)
    register(args: WorldInitializeBeforeEvent) {
        args.blockComponentRegistry.registerCustomComponent('nethersdelight:soul_compost', new SoulCompostComonent());
    }

}