// Generic function to assert that a value is not null or undefined
export const assertIsDefined: <T>(val: T) => asserts val is NonNullable<T> = <
  T
>(
  val: T
) => {
  // If the value is null or undefined, throw an error
  if (!val) {
    throw new Error("Expected 'val' to be defined, but received " + val);
  }
};
