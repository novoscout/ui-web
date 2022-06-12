const stopwords = [
  'a', 'about', 'above', 'across', 'after', 'afterwards', 'again', 'against',
  'ain', 'all', 'almost', 'alone', 'along', 'already', 'also', 'although',
  'always', 'am', 'among', 'amongst', 'amount', 'an', 'and', 'another', 'any',
  'anyhow', 'anyone', 'anything', 'anyway', 'anywhere', 'are', 'aren', "aren't",
  'around', 'as', 'at', 'back', 'be', 'became', 'because', 'become', 'becomes',
  'becoming', 'been', 'before', 'beforehand', 'behind', 'being', 'below', 'beside',
  'besides', 'between', 'beyond', 'both', 'bottom', 'but', 'by', 'ca', 'call',
  'can', 'cannot', 'could', 'couldn', "couldn't", 'd', 'did', 'didn', "didn't",
  'do', 'does', 'doesn', "doesn't", 'doing', 'don', "don't", 'done', 'down', 'due',
  'during', 'each', 'eight', 'either', 'eleven', 'else', 'elsewhere', 'empty',
  'enough', 'even', 'ever', 'every', 'everyone', 'everything', 'everywhere',
  'except', 'few', 'fifteen', 'fifty', 'first', 'five', 'for', 'former', 'formerly',
  'forty', 'four', 'from', 'front', 'full', 'further', 'get', 'give', 'go', 'had',
  'hadn', "hadn't", 'has', 'hasn', "hasn't", 'have', 'haven', "haven't", 'having',
  'he', 'hence', 'her', 'here', 'hereafter', 'hereby', 'herein', 'hereupon', 'hers',
  'herself', 'him', 'himself', 'his', 'how', 'however', 'hundred', 'i', 'if', 'in',
  'indeed', 'into', 'is', 'isn', "isn't", 'it', "it's", 'its', 'itself', 'just',
  'keep', 'last', 'latter', 'latterly', 'least', 'less', 'll', 'm', 'ma', 'made',
  'make', 'many', 'may', 'me', 'meanwhile', 'might', 'mightn', "mightn't", 'mine',
  'more', 'moreover', 'most', 'mostly', 'move', 'much', 'must', 'mustn', "mustn't",
  'my', 'myself', "n't", 'name', 'namely', 'needn', "needn't", 'neither', 'never',
  'nevertheless', 'next', 'nine', 'no', 'nobody', 'none', 'noone', 'nor', 'not',
  'nothing', 'now', 'nowhere', 'n‘t', 'n’t', 'o', 'of', 'off', 'often', 'on',
  'once', 'only', 'onto', 'or', 'other', 'others', 'otherwise', 'our', 'ours',
  'ourselves', 'out', 'over', 'own', 'part', 'per', 'perhaps', 'please', 'put',
  'quite', 'rather', 're', 'really', 'regarding', 's', 'same', 'say', 'see',
  'seem', 'seemed', 'seeming', 'seems', 'serious', 'several', 'shan', "shan't",
  'she', "she's", 'should', "should've", 'shouldn', "shouldn't", 'show', 'side',
  'since', 'so', 'some', 'somehow', 'someone', 'something', 'sometime',
  'sometimes', 'somewhere', 'still', 'such', 't', 'take', 'than', 'that',
  "that'll", 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'thence',
  'there', 'thereafter', 'thereby', 'therefore', 'therein', 'thereupon', 'these',
  'they', 'third', 'this', 'those', 'though', 'three', 'through', 'throughout',
  'thru', 'thus', 'to', 'together', 'too', 'top', 'toward', 'towards', 'under',
  'unless', 'until', 'up', 'upon', 'us', 'used', 'using', 'various', 've', 'very',
  'via', 'was', 'wasn', "wasn't", 'we', 'well', 'were', 'weren', "weren't", 'what',
  'whatever', 'when', 'whence', 'whenever', 'where', 'whereafter', 'whereas',
  'whereby', 'wherein', 'whereupon', 'wherever', 'whether', 'which', 'while',
  'whither', 'who', 'whoever', 'whole', 'whom', 'whose', 'why', 'will', 'with',
  'within', 'without', 'won', "won't", 'would', 'wouldn', "wouldn't", 'y', 'yet',
  'you', "you'd", "you'll", "you're", "you've", 'your', 'yours', 'yourself',
  'yourselves', '‘d', '‘ll', '‘m', '‘re', '‘s', '‘ve', '’d', '’ll', '’m', '’re',
  '’s', '’ve'
];

const startRegex = new RegExp('^\\s?(?:' + stopwords.join("|") + ')\\s', 'isu');
const endRegex = new RegExp('\\s(?:' + stopwords.join("|") + ')\\s?$', 'isu');

const types = {
  review: [
    'literature',

    'narrative\\s+literature',
    'narrative',

    'qualitative\\s+systematic',
    'systematic',
  ],
  trial: [
    'randomi(?:s|z)ed\\s+controlled',
    'randomi(?:s|z)ed',
  ],
  misc: [
    'narrative\\s+synthesis',
    'narrative\\s+syntheses',

    'network\\s+meta(?:\-|\\s)analys(?:e|i)s',
    'meta(?:\\-|\\s)analys(?:e|i)s',

    'observational\\s+study',
    'observational\\s+studies',

    'synthes(?:e|i)s',
  ]
}

const remove = {
  review: new RegExp('\\s*(?:' + String(types.review.join('\\s+reviews?|')) + '\\s+reviews?)', 'i'),
  trial:  new RegExp('\\s*(?:' + String(types.trial.join('\\s+trials?|')) + '\\s+trials?)',   'i'),
  misc:   new RegExp('\\s*(?:' + types.misc.join('|') + ')', 'i'),
}

const shrink = (s) => {
  s = s.trimLeft().trimRight();
  s = " " + s;

  while (s.match(remove.review) || s.match(remove.trial) || s.match(remove.review) || s.match(startRegex) || s.match(endRegex)) {
    s = s.replace(startRegex, "").trimLeft()
    s = s.replace(endRegex, "").trimRight()
    s = s.replace(remove.review, '').trimLeft().trimRight()
    s = s.replace(startRegex, "").trimLeft()
    s = s.replace(endRegex, "").trimRight()
    s = s.replace(remove.trial, '').trimLeft().trimRight()
    s = s.replace(startRegex, "").trimLeft()
    s = s.replace(endRegex, "").trimRight()
    s = s.replace(remove.misc, '').trimLeft().trimRight()
    s = s.replace(startRegex, "").trimLeft()
    s = s.replace(endRegex, "").trimRight()
  }

  // If only one word left, remove it.
  if (! s.match(/\s+/)) { s = "" }

  return s;
}

const elide = (s) => {
  s = s.trimLeft().trimRight();
  let old = s;

  s = s.replace(/^a\sliterature\sreview$/i, "").trimLeft().trimRight();
  s = s.replace(/^literature\sreview$/i, "").trimLeft().trimRight();
  s = s.replace(/^an\sobservational\study$/i, "").trimLeft().trimRight();
  s = s.replace(/^observational\study$/i, "").trimLeft().trimRight();
  s = s.replace(/^a\srandomised\scontrolled\trial$/i, "").trimLeft().trimRight();
  s = s.replace(/^randomised\scontrolled\trial$/i, "").trimLeft().trimRight();
  s = s.replace(/^a\srandomized\scontrolled\trial$/i, "").trimLeft().trimRight();
  s = s.replace(/^randomized\scontrolled\trial$/i, "").trimLeft().trimRight();
  s = s.replace(/^a\srandomised\trial$/i, "").trimLeft().trimRight();
  s = s.replace(/^randomised\trial$/i, "").trimLeft().trimRight();
  s = s.replace(/^a\srandomized\trial$/i, "").trimLeft().trimRight();
  s = s.replace(/^randomized\trial$/i, "").trimLeft().trimRight();
  s = s.replace(/^a\ssystematic\sreview$/i, "").trimLeft().trimRight();
  s = s.replace(/^systematic\sreview$/i, "").trimLeft().trimRight();
  s = s.replace(/^a\squalitative\ssystematic\sreview$/i, "").trimLeft().trimRight();
  s = s.replace(/^qualitative\ssystematic\sreview$/i, "").trimLeft().trimRight();
  if (! s) {
    return ""
  }
  return old;
}

const shrinkTitle = (title) => {
  if (! title) { return title }
  const chunks = title.split(":");
  if (chunks.length == 2) {
    chunks[0] = elide(chunks[0]).trimRight();
    chunks[1] = shrink(elide(chunks[1])).trimLeft();
    if (chunks[0] && ! chunks[1]) {
      return chunks[0]
    }
    if (chunks[1] && ! chunks[0]) {
      return chunks[1]
    }
    if (chunks[0] && chunks[1]) {
      return chunks.join(": ")
    }
  }
  return title;
}

module.exports = shrinkTitle;
