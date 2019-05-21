const bonusParser = (data) => {
  const bonuses = data.data;
  const included = data.included;

  console.log(data);
  // console.log(comments);
  // console.log(users);
  // console.log(bots);

  const getSender = (item) => {
    const senderId = item.relationships.sender.data.id;
    const senderType = item.relationships.sender.data.type;
    const senderObj = included.find(includedItem => includedItem.id === senderId && includedItem.type === senderType);

    if (senderObj.type === 'bots') {
      return 'bot';
    }
    return senderObj.attributes['full-name'];
  };

  const getReceivers = (item) => {
    const receivers = item.relationships.receivers.data;
    const newReceivers = receivers.map((receiver) => {
      const newReceiver = included.find(includedItem => includedItem.id === receiver.id && includedItem.type === receiver.type);
      return {
        ...newReceiver.attributes,
      };
    });
    return newReceivers;
  };

  const newbonuses = bonuses.map(item => ({
    id: item.id,
    'created-at': item.attributes['created-at'],
    points: item.attributes.points,
    text: item.attributes.text,
    'total-points': item.attributes['total-points'],
    comments: item.relationships.comments,
    sender: getSender(item),
    receivers: getReceivers(item),
  }));

  console.log(newbonuses);

  return newbonuses;
};

export default bonusParser;
