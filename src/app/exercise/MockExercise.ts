import { Exercise } from './Exercise';
import {
  PlayerService,
  PartToPlay,
  NoteEvent,
} from '../services/player.service';
import MatchableArgs = jasmine.MatchableArgs;

export class MockExercise implements Exercise.IExercise {
  static instance: Readonly<MockExercise> = new MockExercise();
  static mockQuestion: Exercise.Question<string> = {
    segments: [
      {
        rightAnswer: 'Answer 1',
        partToPlay: 'C4',
      },
      {
        rightAnswer: 'Answer 2',
        partToPlay: 'D4',
      },
    ],
    cadence: 'E4',
  };

  readonly explanation: Exercise.ExerciseExplanationContent = 'This is my exercise explanation';
  readonly id: string = 'mockExerciseId';
  readonly name: string = 'mockExerciseName';
  readonly summary: string = 'mockExerciseSummary';

  getAnswerList(): Exercise.AnswerList<string> {
    return [];
  }

  getQuestion(): Exercise.Question<string> {
    return MockExercise.mockQuestion;
  }

  /**
   * figure out how to make a more flexible test here
   * For example, there are multiple ways to pass in time
   * (Like a custom matcher?)
   */
  static cadenceToPlayExpectation: MatchableArgs<PlayerService['playMultipleParts']>[0][] = [
    // cadence
    jasmine.objectContaining<PartToPlay>({
      partOrTime: [
        jasmine.objectContaining<NoteEvent>({
          notes: ['E4'],
          duration: '4n',
        }),
      ],
    }),
    jasmine.objectContaining<PartToPlay>({ // this can be optional, need to make the test more relaxed
      partOrTime: 100,
    }),
  ]

  static questionToPlayExpectation: MatchableArgs<PlayerService['playMultipleParts']>[0][] = [
    // first segment
    jasmine.objectContaining<PartToPlay>({
      partOrTime: [
        jasmine.objectContaining({
          notes: ['C4'],
          duration: '4n',
        }),
      ],
    }),
    //second segment
    jasmine.objectContaining<PartToPlay>({
      partOrTime: [
        jasmine.objectContaining({
          notes: ['D4'],
          duration: '4n',
        }),
      ],
    }),
  ];
}
