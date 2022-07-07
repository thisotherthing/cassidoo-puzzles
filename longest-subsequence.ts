const str = "abppplee";
const dict = [ "able", "ale", "apple", "bale", "kangaroo" ];

const longestWord = (str: string, dict: string[]) => {
  const possible: string[] = [];

  const wordLength = str.length;

  
  dict.forEach((word) => {
    let char = "";
    let srtIdx = 0;
    for (let i = 0, l = word.length; i < l; i++) {
      char = word[i];

      for (; srtIdx < wordLength; srtIdx++) {
        if (char === str[srtIdx]) {
          if (i === l - 1) possible.push(word);
          break;
        }
      }
    }
  });

  possible.sort((a, b) => b.length - a.length);

  // console.log(possible);

  return possible[0];
}

console.log(longestWord(str, dict));
// 'apple'
// "able" and "ale" also work, but are shorter than "apple"
// "bale" has all the right letters, but not in the right order