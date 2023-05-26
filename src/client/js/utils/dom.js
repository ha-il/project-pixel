export const $ = (selector, $target) => {
  if ($target) {
    return $target.querySelector(selector);
  }
  return document.querySelector(selector);
};

export const toggleClass = ($element, before, after) => {
  $element.classList.remove(before);
  $element.classList.add(after);
};
