import { InjectionToken } from '@angular/core';
import { OneOrMany } from '../shared/ts-utility';

export const RELEASE_NOTES_TOKEN: InjectionToken<ReleaseNotes> = new InjectionToken('Release Notes');

export type ReleaseNotes = {
  version: string,
  notes: OneOrMany<string>
}[];

export const releaseNotes: ReleaseNotes = [
  {
    version: '1.1.3',
    notes: 'Cadence is always played in 120BPM regardless of BPM settings',
  },
  {
    version: '1.1.3',
    notes: 'Support multiple notes for Note in Key exercise (can be set up via "Number of notes" in the exercise settings)',
  },
  {
    version: '1.1.3',
    notes: 'Add the option to disable resolution in tonal exercise (Notes and Chords in Key)',
  },
  {
    version: '1.1.4',
    notes: 'Add the option move immediately to next question after answering',
  },
  {
    version: '1.1.5',
    notes: 'Add "Common Chord Progressions" Exercise. Try this to identify on the most popular and used progression.'
  },
  {
    version: '1.1.6',
    notes: 'Fix bug where right answers were not highlighted correctly'
  },
  {
    version: '1.2.1',
    notes: 'Support the minor mode for note in key exercise. Note you have to manually select relevant notes and cadence type (for now)'
  },
  {
    version: '1.2.2',
    notes: 'New "Notes with Chords" exercise. Practice it to memorize the sound of the same scale degrees above different chords.'
  },
  {
    version: '1.2.3',
    notes: 'Click other answers to listen to what they sound like after correct answer received',
  }
]
