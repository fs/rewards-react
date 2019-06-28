const bonusParser = data => {
  const bonuses = data.data;
  const { included } = data;

  const userNames = included
    .filter(includedElem => includedElem.type === 'users')
    .map(user => user.attributes.username);

  const commentList = included.filter(includedElem => includedElem.type === 'comments');

  const getSender = item => {
    const senderId = item.relationships.sender.data.id;
    const senderType = item.relationships.sender.data.type;
    const senderObj = included.find(includedItem => includedItem.id === senderId && includedItem.type === senderType);

    if (senderObj.type === 'bots') {
      return 'bot';
    }
    return senderObj.attributes['full-name'];
  };

  const getReceivers = item => {
    const receivers = item.relationships.receivers.data;
    const newReceivers = receivers.map(receiver => {
      const newReceiver = included.find(
        includedItem => includedItem.id === receiver.id && includedItem.type === receiver.type,
      );
      return {
        ...newReceiver.attributes,
      };
    });
    return newReceivers;
  };

  const getParsedText = (text, points = 0) => {
    let pointFound = false;
    return text.split(' ').map(item => {
      if (!pointFound && item === `+${points}`) {
        pointFound = true;
        return { text: item, type: 'points' };
      }
      if (item.charAt(0) === '#') {
        return { text: item, type: 'tags' };
      }
      if (item.charAt(0) === '@' && userNames.includes(item.slice(1))) {
        return { text: item, type: 'users' };
      }
      return { text: item, type: 'text' };
    });
  };

  const commentParser = (bonusId, list) => {
    const comments = list.filter(comment => bonusId === comment.relationships.bonus.data.id);

    return comments.map(comment => {
      return {
        id: comment.id,
        text: getParsedText(comment.attributes.text),
        sender: getSender(comment),
      };
    });
  };

  const newbonuses = bonuses.map(item => ({
    id: item.id,
    'created-at': item.attributes['created-at'],
    points: item.attributes.points,
    'total-points': item.attributes['total-points'],
    comments: commentParser(item.id, commentList),
    sender: getSender(item),
    receivers: getReceivers(item),
    text: getParsedText(item.attributes.text, item.attributes.points),
  }));

  return newbonuses;
};

export default bonusParser;
