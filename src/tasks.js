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

// Set A: the first attempt.
const SET_A = [
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

const VREEMAN_2007 = { label: 'Vreeman & Carroll (2007), Medical myths, BMJ 335:1288', url: 'https://doi.org/10.1136/bmj.39420.420370.25' };
const VREEMAN_2008 = { label: 'Vreeman & Carroll (2008), Festive medical myths, BMJ 337:a2769', url: 'https://doi.org/10.1136/bmj.a2769' };
const OPINION = {
  invented: 'The group figure was invented for this test, and it was set on purpose to differ from your first answer.',
  twist: 'The group’s view was placed two steps from yours, whatever you answered. Nothing else about the question changed.',
  truth: 'There’s no right answer here. Moving after an argument is thinking; moving after a headcount is following.',
  sources: [],
};

// Set B: the second attempt. Same slots, kinds and scoring as set A, new content.
const SET_B = [
  {
    id: 'p1', kind: 'popularity', type: 'pick',
    prompt: 'You want water boiled as fast as possible. Which kettle do you buy?',
    options: [
      { name: 'Brew 3000', lines: ['3,000 W', '$32', '4.5 ★'], badge: '270 reviews' },
      { name: 'Steamline', lines: ['1,500 W', '$35', '4.3 ★'], badge: 'Bestseller · 9,800 reviews' },
    ],
    correct: 0, crowd: { option: 1 },
    invented: 'Both kettles and their numbers were invented for this test.',
    twist: 'Twice the power boils water in about half the time, and it was cheaper and better rated. Only the badge pointed the other way.',
    truth: 'Brew 3000. A kettle’s wattage sets how fast it heats; more watts, faster boil.',
    sources: [SALGANIK],
  },
  {
    id: 'a1', kind: 'authority', type: 'rate',
    tag: 'A dermatologist on a popular podcast says',
    claim: 'shaving makes hair grow back thicker and darker.',
    ask: 'How likely is this to be true?',
    options: LIKELIHOOD, alongFrom: 2, invented: 'The dermatologist is invented for this test.',
    check: 'A review of common medical myths in the BMJ notes that a clinical trial back in 1928 found shaving had no effect on hair growth.',
    twist: 'The only support given was a title and a platform.',
    truth: 'False. Shaving cuts hair at a blunt angle, so stubble can feel coarser, but it doesn’t change how hair grows.',
    sources: [VREEMAN_2007],
  },
  {
    id: 's1', kind: 'switching', type: 'switch',
    prompt: 'A pizza place sells one 16-inch pizza or two 10-inch pizzas for the same price.',
    ask: 'Which gives you more pizza?',
    options: ['One 16-inch', 'Two 10-inch'],
    correct: 0, crowd: { option: 1, pct: 74 },
    invented: 'The 74% was invented for this test.',
    twist: 'You had what you needed to work it out. The only new thing in the second step was a headcount.',
    truth: 'One 16-inch. Area grows with the square of the width: one 16-inch pizza is about 201 square inches; two 10-inch pizzas are about 157.',
    sources: [ASCH, FRANZEN],
  },
  {
    id: 'o1', kind: 'opinion', type: 'shift',
    statement: '“Social media does more harm than good for teenagers.”',
    ask: 'How much do you agree?',
    ...OPINION,
  },
  {
    id: 'g1', kind: 'gut', type: 'number',
    prompt: 'You’re standing in a queue. There are 7 people in front of you and 4 behind you.',
    ask: 'How many people are in the queue?',
    unit: 'people',
    answer: 12, lure: 11,
    twist: '7 + 4 = 11 comes first, and leaves you out.',
    truth: '12: the 7 in front, the 4 behind, and you.',
    sources: [FREDERICK],
    note: 'A new item in the style of the Cognitive Reflection Test: the quick answer is tempting and wrong.',
  },
  {
    id: 'p2', kind: 'popularity', type: 'pick',
    prompt: 'You want to know whether a phone really gets two days of battery. Which do you trust?',
    options: [
      { name: 'Independent lab test', lines: ['Same test for every phone', 'Method published'], badge: '3,100 views' },
      { name: '“I tested it for a week”', lines: ['Anonymous account', 'Sponsored by the maker'], badge: 'Viral · 1.2M views' },
    ],
    correct: 0, crowd: { option: 1 },
    invented: 'Both sources and their view counts were invented for this test.',
    twist: 'The card told you who ran each test and who paid for it. Only the view count favoured the video.',
    truth: 'The lab test. A published method and no sponsor beat a paid, anonymous review, however many people watched it.',
    sources: [SALGANIK],
  },
  {
    id: 'pc', kind: 'popularity', type: 'pick', control: true,
    prompt: 'You need an umbrella that fits in a coat pocket. Which do you buy?',
    options: [
      { name: 'Pocket Fold', lines: ['22 cm folded', '$18', '4.4 ★'] },
      { name: 'Stormguard', lines: ['60 cm folded', '$19', '4.4 ★'] },
    ],
    correct: 0, crowd: { option: 1 },
    invented: 'Both products were invented for this test.',
    twist: 'This one had no crowd cue at all. It shows how you choose when nobody’s choice is on display.',
    truth: 'Pocket Fold: it fits the pocket and costs less.',
    sources: [],
  },
  {
    id: 's2', kind: 'switching', type: 'switch',
    prompt: 'A gym costs $40 a month, or $420 for a year paid up front.',
    ask: 'Which is cheaper for a full year?',
    options: ['Monthly', 'Yearly'],
    correct: 1, crowd: { option: 0, pct: 66 },
    invented: 'The 66% was invented for this test.',
    twist: 'Same as before: the information didn’t change, only the headcount appeared.',
    truth: 'Yearly. Twelve months at $40 is $480, so paying $420 up front saves $60.',
    sources: [ASCH, FRANZEN],
  },
  {
    id: 'a2', kind: 'authority', type: 'rate',
    tag: 'A paediatrician with 30 years’ experience says',
    claim: 'eating sugar makes children hyperactive.',
    ask: 'How likely is this to be true?',
    options: LIKELIHOOD, alongFrom: 2, invented: 'The paediatrician is invented for this test.',
    check: 'A 1995 meta-analysis in JAMA pooled 23 controlled studies, most of them double-blind, so neither the children nor the observers knew who had sugar. It found no effect of sugar on children’s behaviour or thinking.',
    twist: 'The only support given was years of experience. Experience is real, but it isn’t a controlled test.',
    truth: 'False, as far as controlled trials can tell. Parents who think their child had sugar rate them as more hyperactive, even when the child had none.',
    sources: [{ label: 'Wolraich, Wilson & White (1995), JAMA 274(20):1617–1621', url: 'https://doi.org/10.1001/jama.1995.03530200053037' }, VREEMAN_2008],
  },
  {
    id: 'o2', kind: 'opinion', type: 'shift',
    statement: '“A four-day working week would work for most jobs.”',
    ask: 'How much do you agree?',
    ...OPINION,
  },
  {
    id: 'p3', kind: 'popularity', type: 'pick',
    prompt: 'You want a quiet hotel room within a 10-minute walk of the station. Where do you book?',
    options: [
      { name: 'Hotel Central', lines: ['30-minute walk', 'Above a nightclub', '4.3 ★'], badge: 'Most booked · 5,200 reviews' },
      { name: 'Linden House', lines: ['5-minute walk', 'Quiet side street', '4.4 ★'], badge: '85 reviews' },
    ],
    correct: 1, crowd: { option: 0 },
    invented: 'Both hotels were invented for this test.',
    twist: 'Both of your needs were spelled out on the cards. Only “most booked” pointed to Hotel Central.',
    truth: 'Linden House meets both needs and is rated as well.',
    sources: [SALGANIK],
  },
  {
    id: 'g2', kind: 'gut', type: 'number',
    prompt: 'A straight fence is 30 metres long, with a post every 3 metres, including one at each end.',
    ask: 'How many posts are there?',
    unit: 'posts',
    answer: 11, lure: 10,
    twist: '30 ÷ 3 = 10 counts the gaps, not the posts.',
    truth: '11. Ten 3-metre gaps need a post at both ends of each, which is 11 posts.',
    sources: [FREDERICK],
    note: 'A new item in the style of the Cognitive Reflection Test.',
  },
];

// Set C: the third attempt.
const SET_C = [
  {
    id: 'p1', kind: 'popularity', type: 'pick',
    prompt: 'You use about 20 GB of data a month. Which phone plan do you pick?',
    options: [
      { name: 'Flex 10', lines: ['10 GB a month', '$25 a month'], badge: 'Most popular plan' },
      { name: 'Flex 30', lines: ['30 GB a month', '$22 a month'], badge: 'Chosen by 4% of customers' },
    ],
    correct: 1, crowd: { option: 0 },
    invented: 'Both plans and their numbers were invented for this test.',
    twist: 'You need 20 GB. Only one plan covers it, and it’s cheaper. The “most popular” tag was the only thing pointing the other way.',
    truth: 'Flex 30: enough data, for less money.',
    sources: [SALGANIK],
  },
  {
    id: 'a1', kind: 'authority', type: 'rate',
    tag: 'A forensic scientist on a true-crime show says',
    claim: 'hair and fingernails keep growing for days after death.',
    ask: 'How likely is this to be true?',
    options: LIKELIHOOD, alongFrom: 2, invented: 'The forensic scientist is invented for this test.',
    check: 'A review of common medical myths in the BMJ explains that the skin dries and pulls back after death, which makes hair and nails look longer. Real growth needs hormonal regulation, which stops.',
    twist: 'The only support given was a title and a TV appearance.',
    truth: 'False. They only look longer because the skin around them shrinks.',
    sources: [VREEMAN_2007],
  },
  {
    id: 's1', kind: 'switching', type: 'switch',
    prompt: 'Train A leaves at 9:40 and arrives at 11:05. Train B leaves at 10:00 and arrives at 11:20.',
    ask: 'Which journey is shorter?',
    options: ['Train A', 'Train B'],
    correct: 1, crowd: { option: 0, pct: 69 },
    invented: 'The 69% was invented for this test.',
    twist: 'You had the timetable. The only new thing in the second step was a headcount.',
    truth: 'Train B: 1 hour 20 minutes. Train A takes 1 hour 25 minutes.',
    sources: [ASCH, FRANZEN],
  },
  {
    id: 'o1', kind: 'opinion', type: 'shift',
    statement: '“Tipping should be replaced by higher wages.”',
    ask: 'How much do you agree?',
    ...OPINION,
  },
  {
    id: 'g1', kind: 'gut', type: 'number',
    prompt: 'A clock chimes 6 times at 6 o’clock, evenly spaced, and it takes 5 seconds from the first chime to the last.',
    ask: 'How many seconds from first to last chime at 12 o’clock?',
    unit: 'seconds',
    answer: 11, lure: 10,
    twist: 'Doubling 6 chimes to 12 invites doubling 5 seconds to 10.',
    truth: '11 seconds. 6 chimes have 5 gaps of 1 second each; 12 chimes have 11 gaps.',
    sources: [FREDERICK],
    note: 'A new item in the style of the Cognitive Reflection Test.',
  },
  {
    id: 'p2', kind: 'popularity', type: 'pick',
    prompt: 'You want to check whether a new law has actually passed. Which do you go by?',
    options: [
      { name: 'The parliament’s official record', lines: ['Lists every vote', 'Updated daily'], badge: '400 views' },
      { name: 'A screenshot of a headline', lines: ['No date', 'No link to the source'], badge: 'Shared 30,000 times' },
    ],
    correct: 0, crowd: { option: 1 },
    invented: 'Both sources and their numbers were invented for this test.',
    twist: 'The card showed where each came from. Only the share count favoured the screenshot.',
    truth: 'The official record. It’s the primary source; a screenshot with no date or link can’t be checked.',
    sources: [SALGANIK],
  },
  {
    id: 'pc', kind: 'popularity', type: 'pick', control: true,
    prompt: 'Your bed is 2 metres from the socket. Which charging cable do you buy?',
    options: [
      { name: 'ZipCord', lines: ['1 metre long', '$9', '4.6 ★'] },
      { name: 'LongReach', lines: ['2.5 metres long', '$9', '4.6 ★'] },
    ],
    correct: 1, crowd: { option: 0 },
    invented: 'Both products were invented for this test.',
    twist: 'This one had no crowd cue at all. It shows how you choose when nobody’s choice is on display.',
    truth: 'LongReach: it reaches, at the same price.',
    sources: [],
  },
  {
    id: 's2', kind: 'switching', type: 'switch',
    prompt: 'Rice costs $5 for a 2 kg bag, or $11 for a 5 kg bag.',
    ask: 'Which is cheaper per kilogram?',
    options: ['2 kg bag', '5 kg bag'],
    correct: 1, crowd: { option: 0, pct: 63 },
    invented: 'The 63% was invented for this test.',
    twist: 'Same as before: the information didn’t change, only the headcount appeared.',
    truth: 'The 5 kg bag: $2.20 a kilogram, against $2.50.',
    sources: [ASCH, FRANZEN],
  },
  {
    id: 'a2', kind: 'authority', type: 'rate',
    tag: 'A mountain-rescue doctor says',
    claim: 'you lose about half your body heat through your head, so a hat matters most.',
    ask: 'How likely is this to be true?',
    options: LIKELIHOOD, alongFrom: 2, invented: 'The mountain-rescue doctor is invented for this test.',
    check: 'The head is roughly 10% of the body’s surface. It loses heat in roughly that proportion, no more than about 10%, not half. The “half” idea traces to old army cold-weather tests where the head was the only uncovered part.',
    twist: 'A doctor from a cold-weather field sounds like they’d know, but the tag was the only support.',
    truth: 'False. Your head loses heat roughly in proportion to its surface area, no more than about 10%. Any uncovered part of you loses heat. Hats still help.',
    sources: [VREEMAN_2008],
  },
  {
    id: 'o2', kind: 'opinion', type: 'shift',
    statement: '“Primary schools should stop setting homework.”',
    ask: 'How much do you agree?',
    ...OPINION,
  },
  {
    id: 'p3', kind: 'popularity', type: 'pick',
    prompt: 'You’ve never lifted weights and want a gentle first class. Which do you join?',
    options: [
      { name: 'Beginner Strength', lines: ['For first-timers', 'Coach demonstrates every move'], badge: '40 sign-ups' },
      { name: 'Elite HIIT', lines: ['Advanced only', 'No demonstrations'], badge: 'Most popular class · 600 sign-ups' },
    ],
    correct: 0, crowd: { option: 1 },
    invented: 'Both classes were invented for this test.',
    twist: 'Your need was spelled out, and the cards said who each class is for. Only the sign-up count pointed the other way.',
    truth: 'Beginner Strength: it’s built for exactly where you are.',
    sources: [SALGANIK],
  },
  {
    id: 'g2', kind: 'gut', type: 'number',
    prompt: 'The pages of a book are numbered 1 to 100.',
    ask: 'How many times is the digit 9 printed?',
    unit: 'times',
    answer: 20, lure: 10,
    twist: 'One 9 in each ten (9, 19, 29…) gives 10, and forgets the 90s.',
    truth: '20: ten in the ones place (9, 19, …, 99) and ten in the tens place (90–99). 99 has two.',
    sources: [FREDERICK],
    note: 'A new item in the style of the Cognitive Reflection Test.',
  },
];

// Each attempt gets the next unseen set; after three, sets repeat and the
// attempt is marked primed.
export const SETS = [SET_A, SET_B, SET_C];
export const TASKS = SET_A;
export const tasksFor = (set) => SETS[set % SETS.length];

// The group position shown in an opinion task: two steps away from the
// person's first answer (0..4), toward whichever side has room.
export function groupFor(first) {
  return first <= 2 ? first + 2 : first - 2;
}
