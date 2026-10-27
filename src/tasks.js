// The 12 tasks and the kinds of going along. Herd-first: 8 tasks test the
// crowd's pull in three forms; authority and first impression stay as contrast.
// Content only: judging lives in scoring.js. Every fact has a source; every
// invented detail (crowd figures, expert tags, products) is marked `invented`
// and said so in the reveal.

const ASCH = { label: 'Asch (1956), Studies of independence and conformity, Psychological Monographs 70(9)', url: 'https://doi.org/10.1037/h0093718' };
const FRANZEN = { label: 'Franzen & Mader (2023), replication of Asch, PLOS ONE', url: 'https://doi.org/10.1371/journal.pone.0294325' };
const SALGANIK = { label: 'Salganik, Dodds & Watts (2006), Science 311:854–856', url: 'https://doi.org/10.1126/science.1121066' };
const FREDERICK = { label: 'Frederick (2005), Cognitive Reflection and Decision Making, J. Econ. Perspectives 19(4)', url: 'https://doi.org/10.1257/089533005775196732' };

export const KINDS = {
  popularity: {
    name: 'Popularity',
    family: 'herd',
    short: 'Choosing what’s popular over what fits',
    idea: 'Popularity is a signal: if many people chose something, maybe they knew something. Joining the longer queue at a food stall often works.',
    fails: 'Popularity snowballs. In one large online experiment, when people could see download counts, hits became bigger and which songs became hits became harder to predict. When the facts you need are in front of you, the count adds noise, not knowledge.',
    principle: 'When you can check the thing itself, check it before you count the crowd.',
  },
  switching: {
    name: 'Switching',
    family: 'herd',
    short: 'Dropping your own answer when the majority disagreed',
    idea: 'Hearing that most people disagree feels like evidence you’re wrong, and sometimes it is.',
    fails: 'When you worked it out yourself and the only new thing is a headcount, the headcount isn’t a reason. In Asch’s line studies, and in a 2023 replication, about a third of answers went along with a clearly wrong majority.',
    principle: 'Before switching, ask what you’ve learned besides how many people disagree.',
  },
  opinion: {
    name: 'Opinion shift',
    family: 'herd',
    short: 'Moving your view toward the group’s',
    idea: 'Views drift toward the people around us. It smooths social life and is often harmless.',
    fails: 'On questions you haven’t looked into, the group’s number can replace thinking instead of starting it.',
    principle: 'If you moved, ask whether you learned an argument or only a headcount.',
  },
  authority: {
    name: 'Authority',
    family: 'others',
    short: 'Taking a claim on an expert’s word',
    idea: 'We often accept a claim because of who said it. That’s a sensible shortcut: nobody can check everything.',
    fails: 'It fails when the title does the work instead of the evidence: a vague credential, an expert outside their field, or a tag nobody can check.',
    principle: 'Ask “what’s the evidence?” before “who said it?”',
  },
  gut: {
    name: 'First impression',
    family: 'self',
    short: 'Going with the answer that arrived first',
    idea: 'Fast, intuitive thinking hands us answers instantly, like autocomplete. Most of the time it’s right, which is why we trust it.',
    fails: 'It fails on problems built to look like easier ones. The quick answer feels so right that we never check it.',
    principle: 'When an answer arrives instantly, plug it back in once before you commit.',
  },
};

export const KIND_ORDER = ['popularity', 'switching', 'opinion', 'authority', 'gut'];
export const HERD_KINDS = ['popularity', 'switching', 'opinion'];

const LIKELIHOOD = ['Very unlikely', 'Unlikely', 'Likely', 'Very likely'];
export const AGREE5 = ['Strongly disagree', 'Disagree', 'Unsure', 'Agree', 'Strongly agree'];

export const TASKS = [
  {
    id: 'p1', kind: 'popularity', type: 'pick',
    prompt: 'You want the most charge for your money. Which power bank do you buy?',
    options: [
      { name: 'VoltPak 10', lines: ['10,000 mAh', '$25', '4.2 ★'], badge: 'Bestseller · 12,480 reviews' },
      { name: 'Juno 20', lines: ['20,000 mAh', '$22', '4.6 ★'], badge: '310 reviews' },
    ],
    correct: 1, crowd: { option: 0 },
    invented: 'Both products and their numbers were invented for this test.',
    twist: 'Everything you needed was on the card: twice the charge, cheaper, better rated. Only the bestseller badge and the review count pointed the other way.',
    truth: 'Juno 20 wins on every fact shown. 310 reviews is plenty to trust a 4.6 rating.',
    sources: [SALGANIK],
  },
  {
    id: 'a1', kind: 'authority', type: 'rate',
    tag: 'A sleep researcher at a leading university says',
    claim: 'reading in dim light permanently damages your eyesight.',
    ask: 'How likely is this to be true?',
    options: LIKELIHOOD, alongFrom: 2, invented: 'The sleep researcher is invented for this test.',
    check: 'A review of common medical myths in the BMJ found no evidence that reading in dim light causes lasting damage. It can cause short-term eye strain, which passes.',
    twist: 'The only support given was an expert tag, and that expert doesn’t exist.',
    truth: 'False. Dim light can tire your eyes for a while, but there’s no evidence it causes permanent damage.',
    sources: [{ label: 'Vreeman & Carroll (2007), Medical myths, BMJ 335:1288', url: 'https://doi.org/10.1136/bmj.39420.420370.25' }],
  },
  {
    id: 's1', kind: 'switching', type: 'switch',
    prompt: 'A jacket costs $80 at one shop with 25% off, or $70 at another with 10% off.',
    ask: 'Which is cheaper?',
    options: ['$80 with 25% off', '$70 with 10% off'],
    correct: 0, crowd: { option: 1, pct: 71 },
    invented: 'The 71% was invented for this test.',
    twist: 'You had everything needed to work it out. The only new thing in the second step was a headcount.',
    truth: '$80 with 25% off is $60. $70 with 10% off is $63.',
    sources: [ASCH, FRANZEN],
  },
  {
    id: 'o1', kind: 'opinion', type: 'shift',
    statement: '“Working from home makes most teams less productive.”',
    ask: 'How much do you agree?',
    invented: 'The group figure was invented for this test, and it was set on purpose to differ from your first answer.',
    twist: 'The group’s view was placed two steps from yours, whatever you answered. Nothing else about the question changed.',
    truth: 'There’s no right answer here. What matters is whether a number alone moved you.',
    sources: [],
  },
  {
    id: 'g1', kind: 'gut', type: 'number',
    prompt: 'A notebook and a pen cost $1.20 in total. The notebook costs $1.00 more than the pen.',
    ask: 'How much does the pen cost, in cents?',
    unit: 'cents',
    answer: 10, lure: 20,
    twist: '20 cents comes to mind first. But then the notebook would be $1.20 and the total $1.40.',
    truth: 'The pen costs 10 cents and the notebook $1.10. Check: $1.10 − $0.10 = $1.00 more, and $1.10 + $0.10 = $1.20.',
    sources: [FREDERICK],
    note: 'A reworded version of the bat-and-ball item, one of the best-known puzzles in this research, so you may have seen it.',
  },
  {
    id: 'p2', kind: 'popularity', type: 'pick',
    prompt: 'You want to know whether a new diet supplement works. Which do you read?',
    options: [
      { name: '“Doctors are stunned by this supplement”', lines: ['Anonymous wellness blog', 'No studies linked'], badge: 'Trending · 48,000 shares' },
      { name: '“Supplement shows no benefit in 12 trials”', lines: ['Review in a medical journal', 'Links every trial'], badge: '212 shares' },
    ],
    correct: 1, crowd: { option: 0 },
    invented: 'Both articles and their share counts were invented for this test.',
    twist: 'The card told you who wrote each one and what evidence they linked. The share count was the only thing favouring the blog.',
    truth: 'The journal review. A summary of 12 trials with every one linked is far stronger evidence than an anonymous post, however many people shared it.',
    sources: [SALGANIK],
  },
  {
    id: 'pc', kind: 'popularity', type: 'pick', control: true,
    prompt: 'You need a day pack that fits a 15-inch laptop. Which do you buy?',
    options: [
      { name: 'Trailhead 18', lines: ['Fits up to 13-inch laptop', '$45', '4.5 ★'] },
      { name: 'Ridge 22', lines: ['Fits up to 16-inch laptop', '$42', '4.5 ★'] },
    ],
    correct: 1, crowd: { option: 0 },
    invented: 'Both products were invented for this test.',
    twist: 'This one had no crowd cue at all. It shows how you choose when nobody’s choice is on display.',
    truth: 'Ridge 22: it fits the laptop and costs less.',
    sources: [],
  },
  {
    id: 's2', kind: 'switching', type: 'switch',
    prompt: 'Shop A sells 6 eggs for $3.00. Shop B sells 10 eggs for $4.50.',
    ask: 'Where is each egg cheaper?',
    options: ['Shop A', 'Shop B'],
    correct: 1, crowd: { option: 0, pct: 68 },
    invented: 'The 68% was invented for this test.',
    twist: 'Same as before: the information didn’t change, only the headcount appeared.',
    truth: 'Shop B. Shop A is 50 cents an egg; Shop B is 45 cents.',
    sources: [ASCH, FRANZEN],
  },
  {
    id: 'a2', kind: 'authority', type: 'rate',
    tag: 'A chemist who won two Nobel Prizes says',
    claim: 'taking vitamin C every day will stop you catching colds.',
    ask: 'How likely is this to be true?',
    options: LIKELIHOOD, alongFrom: 2, invented: null,
    check: 'A Cochrane review pooled the trials. Taking vitamin C every day did not reduce how often people caught colds in the general population. The exception was people under heavy physical stress, such as marathon runners.',
    twist: 'This one is real: Linus Pauling won the Nobel Prizes in Chemistry and Peace, and he promoted this claim. A great scientist, but outside his field.',
    truth: 'False for most people. Taking it every day may shorten colds a little, but it doesn’t prevent them.',
    sources: [{ label: 'Hemilä & Chalker (2013), Cochrane review, Vitamin C for preventing and treating the common cold', url: 'https://doi.org/10.1002/14651858.CD000980.pub4' }],
  },
  {
    id: 'o2', kind: 'opinion', type: 'shift',
    statement: '“Cities should ban private cars from their centres.”',
    ask: 'How much do you agree?',
    invented: 'The group figure was invented for this test, and it was set on purpose to differ from your first answer.',
    twist: 'Again the group’s view was placed two steps from yours.',
    truth: 'There’s no right answer here either. Moving after an argument is thinking; moving after a headcount is following.',
    sources: [],
  },
  {
    id: 'p3', kind: 'popularity', type: 'pick',
    prompt: 'You’re vegetarian and want dinner within a 10-minute walk. Where do you go?',
    options: [
      { name: 'The Corner Grill', lines: ['25-minute walk', 'No vegetarian mains', '4.4 ★'], badge: 'Most popular nearby · 2,300 reviews' },
      { name: 'Fig & Thyme', lines: ['6-minute walk', 'Full vegetarian menu', '4.5 ★'], badge: '64 reviews' },
    ],
    correct: 1, crowd: { option: 0 },
    invented: 'Both restaurants were invented for this test.',
    twist: 'Your own two needs were spelled out. Only the “most popular” tag pointed to the grill.',
    truth: 'Fig & Thyme meets both needs and is rated as well.',
    sources: [SALGANIK],
  },
  {
    id: 'g2', kind: 'gut', type: 'number',
    prompt: 'A patch of moss on a pond doubles in size every day. It takes 30 days to cover the whole pond.',
    ask: 'How many days did it take to cover half the pond?',
    unit: 'days',
    answer: 29, lure: 15,
    twist: '“Half” invites halving the days.',
    truth: '29 days. If it doubles every day, it was half the size the day before it covered everything.',
    sources: [FREDERICK],
    note: 'A reworded version of the lily-pad item, also widely known.',
  },
];

// The group position shown in an opinion task: two steps away from the
// person's first answer (0..4), toward whichever side has room.
export function groupFor(first) {
  return first <= 2 ? first + 2 : first - 2;
}
