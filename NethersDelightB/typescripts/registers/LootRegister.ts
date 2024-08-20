import { EntityEquippableComponent, EntityHurtAfterEvent, EquipmentSlot, ItemStack, world } from "@minecraft/server"
import { EventAPI } from "../lib/EventAPI"
import { RandomAPI } from "../lib/RandomAPI";
import { ItemAPI } from "../lib/ItemAPI";

export class LootingRegister {
    @EventAPI.register(world.afterEvents.entityHurt)
    knifeLoot(args: EntityHurtAfterEvent) {
        const entity = args.damageSource.damagingEntity
        const hurtEntity = args.hurtEntity
        if (!entity || !hurtEntity)
            return;
        const equipment = entity.getComponent(EntityEquippableComponent.componentId);
        const onFire = hurtEntity.getComponent('minecraft:onfire')?.onFireTicksRemaining;
        const mainHand = equipment?.getEquipmentSlot(EquipmentSlot.Mainhand);
        if (!mainHand) return;
        //if (!mainHand?.hasTag('nethersdelight:is_machete')) return;
        const health = hurtEntity.getComponent('minecraft:health');
        if (!health?.currentValue && hurtEntity.typeId === 'minecraft:hoglin') {
            if (onFire != undefined) {
                ItemAPI.spawn(hurtEntity, 'nethersdelight:hoglin_hide', 1 + RandomAPI.RandomInt(2));
            } else {
                ItemAPI.spawn(hurtEntity, 'nethersdelight:hoglin_loin', 1 + RandomAPI.RandomInt(2));
            }
            if (!mainHand?.hasTag('farmersdelight:is_knife')) return;
            ItemAPI.spawn(hurtEntity, 'nethersdelight:hoglin_hide', 1 + RandomAPI.RandomInt(1));
        }
        if (!health?.currentValue && hurtEntity.typeId === 'minecraft:strider') {
            if (!mainHand?.hasTag('farmersdelight:is_knife')) return;
            ItemAPI.spawn(hurtEntity, 'nethersdelight:strider_slice', 1 + RandomAPI.RandomInt(1));
        }
    }
}