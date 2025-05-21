const Book = require('../models/Book');
const InterestedBook = require('../models/InterestedBook');
const User = require('../models/User');
const { Op } = require('sequelize');

exports.getMatches = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Get books this user owns (for exchange)
    const myBooks = await Book.findAll({
      where: { ownerId: userId, action: 'exchange' }
    });

    // 2. Get books this user is interested in
    const myInterests = await InterestedBook.findAll({
      where: { userId }
    });

    const interestedTitles = myInterests.map(item => item.title);
    const myBookTitles = myBooks.map(book => book.title);

    // 3. Find other users who own books that match my interest
    const potentialMatches = await Book.findAll({
      where: {
        title: { [Op.in]: interestedTitles },
        action: 'exchange',
        ownerId: { [Op.ne]: userId } // not the same user
      },
      include: [User]
    });

    // 4. Filter where they are also interested in my books
    const finalMatches = [];
    for (let matchBook of potentialMatches) {
      const theirInterests = await InterestedBook.findAll({
        where: {
          userId: matchBook.ownerId,
          title: { [Op.in]: myBookTitles }
        }
      });

      if (theirInterests.length > 0) {
        finalMatches.push(matchBook);
      }
    }

    res.status(200).json(finalMatches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
