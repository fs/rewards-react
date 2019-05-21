const bonusParser = (data) => {

  const bonuses = data.data;

  const comments = data.included.filter(item => item.type === 'comments');
  const users = data.included.filter(item => item.type === 'users');
  const tags = data.included.filter(item => item.type === 'tags');
  const bots = data.included.filter(item => item.type === 'bots');

  // console.log(bonuses);
  // console.log(comments);
  // console.log(users);
  // console.log(bots);


  const newbonuses =
    bonuses.map(item => ({
      id: item.id,
      'created-at': item.attributes['created-at'],
      points: item.attributes.points,
      text: item.attributes.text,
      'total-points': item.attributes['total-points'],
      comments: item.relationships.comments,
      'sender': users.filter(user => user.id === item.relationships.sender.data.id) || bots.filter(bot => bot.id === item.relationships.sender.data.id),
    }));

    console.log(newbonuses)

    return newbonuses;
};

export default bonusParser;
