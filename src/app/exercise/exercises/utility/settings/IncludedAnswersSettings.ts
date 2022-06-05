import { Exercise } from '../../../Exercise';
import { Constructor } from '../../../../shared/ts-utility';
import { BaseExercise } from '../base-exercises/BaseExercise';

export type IncludedAnswersSettings<GAnswer extends string> = {
  includedAnswers: GAnswer[];
}

type IncludedAnswersBaseExercise<GAnswer extends string, GSettings extends IncludedAnswersSettings<GAnswer>> = BaseExercise<GAnswer, GSettings> & {
  getAnswerList(): Exercise.AnswerList<GAnswer>;
}

export function IncludedAnswersSetting<GAnswer extends string, GSettings extends IncludedAnswersSettings<GAnswer>>(params: {
  default: GAnswer[],
}) {
  if (params.default.length < 2) {
    throw new Error(`Must provide at least 2 answers selected by default`);
  }

  return function IncludedAnswersSettingDecorator<GConstructor extends Constructor<IncludedAnswersBaseExercise<GAnswer, GSettings>>>(BaseExercise: GConstructor) {
    // @ts-ignore
    return class HasIncludedAnswersSettings extends BaseExercise {
      constructor() {
        super();
      }

      protected override _getDefaultSettings(): GSettings {
        return {
          ...super._getDefaultSettings(),
          includedAnswers: params.default,
        };
      }

      // setting the setting's descriptor
      protected override _getSettingsDescriptor(): Exercise.SettingsControlDescriptor<GSettings>[] {
        const includedAnswersDescriptor: Exercise.IncludedAnswersControlDescriptor<GAnswer> = {
          controlType: 'included-answers',
          label: 'Included Options',
          answerList: super.getAnswerList(),
        }
        const settingsDescriptorList: Exercise.SettingsControlDescriptor<GSettings>[] = [
          {
            key: 'includedAnswers',
            descriptor: includedAnswersDescriptor,
          },
        ];

        return [
          ...settingsDescriptorList,
          ...super._getSettingsDescriptor(),
        ];
      }

      getAnswerList(): Exercise.AnswerList<GAnswer> {
        return Exercise.filterIncludedAnswers(super.getAnswerList(), this._settings.includedAnswers);
      }
    }
  }
}
