// AQ-10 (adult): Allison, Auyeung & Baron-Cohen (2012), J Am Acad Child Adolesc
// Psychiatry 51(2):202-212.e7, doi:10.1016/j.jaac.2011.11.003.
// Item text (c) SBC/CA/BA/ARC/Cambridge University, free for non-profit use
// including research and education (autismresearchcentre.com). Not covered by
// this repo's licence: commercial reuse needs a licence via Mapi ePROVIDE.
// Items and key as published by the Autism Research Centre. Each item scores 1 point when the
// answer falls on the keyed side ("agree" = definitely or slightly agree).
export const AQ10_OPTIONS = ['Definitely agree', 'Slightly agree', 'Slightly disagree', 'Definitely disagree'];

export const AQ10 = [
  { text: 'I often notice small sounds when others do not', key: 'agree' },
  { text: 'I usually concentrate more on the whole picture, rather than the small details', key: 'disagree' },
  { text: 'I find it easy to do more than one thing at once', key: 'disagree' },
  { text: 'If there is an interruption, I can switch back to what I was doing very quickly', key: 'disagree' },
  { text: 'I find it easy to ‘read between the lines’ when someone is talking to me', key: 'disagree' },
  { text: 'I know how to tell if someone listening to me is getting bored', key: 'disagree' },
  { text: 'When I’m reading a story I find it difficult to work out the characters’ intentions', key: 'agree' },
  { text: 'I like to collect information about categories of things (e.g. types of car, types of bird, types of train, types of plant etc)', key: 'agree' },
  { text: 'I find it easy to work out what someone is thinking or feeling just by looking at their face', key: 'disagree' },
  { text: 'I find it difficult to work out people’s intentions', key: 'agree' },
];

export const AQ10_CUTOFF = 6;

// answers: array of option indexes 0..3 (0,1 = agree side; 2,3 = disagree side).
export function scoreAQ10(answers) {
  if (!Array.isArray(answers) || answers.length !== AQ10.length) return null;
  let score = 0;
  for (let i = 0; i < AQ10.length; i++) {
    const a = answers[i];
    if (!Number.isInteger(a) || a < 0 || a > 3) return null;
    const agreed = a <= 1;
    if ((AQ10[i].key === 'agree') === agreed) score += 1;
  }
  return { score, max: AQ10.length, atOrAbove: score >= AQ10_CUTOFF };
}
