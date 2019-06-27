import commentParser from './commentParser';

const bonusParser = data => {
  const bonuses = data.data;
  const { included } = data;

  const userNames = included
    .filter(includedElem => includedElem.type === 'users')
    .map(user => user.attributes.username);

  const commentList = included.filter(includedElem => includedElem.type === 'comments');

  const commentIdList = bonuses
    .map(bonus => bonus.relationships.comments.data)
    .map(comments => {
      if (comments.length === 0) {
        return [];
      }

      return comments.map(item => item.id);
    });

  // console.log(commentIdList);

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

  const getParsedText = (text, points) => {
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

  const newbonuses = bonuses.map((item, index) => ({
    id: item.id,
    'created-at': item.attributes['created-at'],
    points: item.attributes.points,
    'total-points': item.attributes['total-points'],
    comments: commentParser(commentIdList[index], commentList),
    sender: getSender(item),
    receivers: getReceivers(item),
    text: getParsedText(item.attributes.text, item.attributes.points),
  }));

  return newbonuses;
};

export default bonusParser;
