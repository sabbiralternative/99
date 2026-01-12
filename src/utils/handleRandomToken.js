const handleRandomToken = () => {
  const utcTimestamp = Math.floor(Date.now() / 1000);

  const multipliedTimestamp = utcTimestamp * 247;
  const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);

  return `${randomSixDigitNumber}${multipliedTimestamp}`;
};
export default handleRandomToken;
