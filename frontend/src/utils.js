function toTitle(arg) {
  // replace underscores with spaces
  const result = arg
    .replace("_", " ")
    .split(" ")
    .map((x) => {
      return x.charAt(0).toUpperCase() + x.slice(1);
    });

  return result.join(" ");
}

export { toTitle };
