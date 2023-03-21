export const getTxErrorReason = (message: string): string => {
  const regex = RegExp('reason="(.*?)"');
  const match = regex.exec(message);
  if (match) {
    const firstGroup = match[1];
    return firstGroup;
  }
  return message;
};
