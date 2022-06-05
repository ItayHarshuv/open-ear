import {
  Constructor,
  AtLeastOne,
} from '../../../../shared/ts-utility';
import { Exercise } from '../../../Exercise';
import { BaseExercise } from '../base-exercises/BaseExercise';
import { collectionChain } from '../../../../shared/ts-utility/collectionChain';

export function SettingsDescriptors<GSettings extends Exercise.Settings>(...settingDescriptorList: AtLeastOne<Exercise.SettingsControlDescriptor<GSettings> & {defaultValue: GSettings[keyof GSettings]}>) {
  return function SettingsDescriptorDecorator<GConstructor extends Constructor<BaseExercise<any, GSettings>>>(BaseExercise: GConstructor) {
    // @ts-ignore
    return class extends BaseExercise {
      constructor(...params) {
        super(...params);
      }

      // setting the setting's descriptor
      protected override _getSettingsDescriptor(): Exercise.SettingsControlDescriptor<GSettings>[] {
        return [
          ...settingDescriptorList,
          ...super._getSettingsDescriptor(),
        ];
      }

      protected override _getDefaultSettings(): GSettings {
        return {
          ...super._getDefaultSettings(),
          ...collectionChain(settingDescriptorList).keyBy('key').mapValues('defaultValue').value(),
        };
      }
    }
  }
}
