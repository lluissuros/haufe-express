const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./src/data/db.json');
const database = low(adapter);

const bookDefaults = [
  {
    id: "SJJFqf15Z",
    title: "the power of habits",
    author: "Charles Duhigg",
    ratingId: "awesome",
    buyHref: "https://www.amazon.com/Power-Habit-What-Life-Business-ebook/dp/B0055PGUYU",
    description: "In The Power of Habit, Pulitzer Prize–winning business reporter Charles Duhigg takes us to the thrilling edge of scientific discoveries that explain why habits exist and how they can be changed. Distilling vast amounts of information into engrossing narratives that take us from the boardrooms of Procter & Gamble to sidelines of the NFL to the front lines of the civil rights movement, Duhigg presents a whole new understanding of human nature and its potential. At its core, The Power of Habit contains an exhilarating argument: The key to exercising regularly, losing weight, being more productive, and achieving success is understanding how habits work. As Duhigg shows, by harnessing this new science, we can transform our businesses, our communities, and our lives."
  },
  {
    id: "S2JFqf15Z",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    ratingId: "good",
    buyHref: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship-ebook/dp/B001GSTOAM/ref=sr_1_1?s=digital-text&ie=UTF8&qid=1503958436&sr=1-1&keywords=clean+code",
    description: "Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn’t have to be that way."
  },
  {
    id: "SJJFqf15d",
    title: "Guide to the I Ching",
    author: "Katherine something",
    ratingId: "bad",
    buyHref: "https://www.amazon.com/Guide-Ching-Carol-K-Anthony-ebook/dp/B005HXM6SO/ref=sr_1_4?s=digital-text&ie=UTF8&qid=1503958498&sr=1-4&keywords=i+ching",
    description: "Used by its readers as an oracle, this book, based on the terminology used in the classic Wilhelm/Baynes translation, puts the I Ching into modern language. This allows its wisdom to be applied to the situations of everyday life. Decoded are words such as the superior and inferior man, and the inferiors, which refer respectively to the true self, the ego, and the bodily self. Expressions such as crossing the great water and seeing the great man are seen to mean getting past the danger of giving up on oneself, and remembering the potential for good in every person. "
  },
];

const ratings = [
  {
    id: 'bad',
    text: 'bad',
  },
  {
    id: 'good',
    text: 'good',
  },
  {
    id: 'awesome',
    text: 'awesome',
  },
];

// Set some defaults if your JSON file is empty
database.defaults({ "books": bookDefaults, "ratings": ratings,  "user": {}})
  .write();

 module.exports = database;
