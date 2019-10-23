export default <K, V>(map: Map<K, V>, key: K): V => {
  const value = map.get(key);

  if (value === undefined) {
    throw new Error(`key not found: ${String(key)}`);
  }

  return value;
};
