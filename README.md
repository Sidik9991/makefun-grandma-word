# Beep — One Word From Grandma

[![make.fun](https://make.fun/badge/u-0xkianno-one-word-from-grandma-f04bed16.svg)](https://make.fun/bounty/u-0xkianno-one-word-from-grandma-f04bed16)
[![rank](https://make.fun/badge/u-0xkianno-one-word-from-grandma-f04bed16/Sidik9991/makefun-grandma-word/rank.svg)](https://make.fun/bounty/u-0xkianno-one-word-from-grandma-f04bed16)
[![reward](https://make.fun/badge/u-0xkianno-one-word-from-grandma-f04bed16/Sidik9991/makefun-grandma-word/reward.svg)](https://make.fun/bounty/u-0xkianno-one-word-from-grandma-f04bed16)

The single word our grandma would text about AI: **Beep**.

Not a word *about* robots — a grandma *doing* a robot. After her grandchild
explains AI for the third time, she does not write a paragraph. She imitates
the machine: warm, baffled, funny with zero context, and four letters long.

## How it works

`main.ts` (Node 22) holds 10 candidate words as data, each scored against the
judge's brief — grandma-like first, warm and baffled second, funny in one
word third, tied to AI fourth, fresh fifth — weights 3/3/2/1/2, max 22. It
picks the highest score at runtime (ties break toward fewer bytes, the
judge's own tie-break), writes the winner to `/output/entry.txt`, then
re-reads the file and validates it: exactly one word, 1–30 characters,
non-blank, failing loudly otherwise.

| Word | Score | Why it loses to Beep |
| --- | --- | --- |
| **Beep** | **22/22** | — |
| Roomba | 20/22 | The joke needs knowing what a Roomba is |
| Robo | 18/22 | A label, not a joke — describes the robot |
| Beepboop | 17/22 | Eight letters of sound effect feels performed |
| Skynet | 14/22 | A film title first, her voice second |
| Boop | 14/22 | Could be a dog's nose as easily as AI |
| Prayers | 13/22 | Pure grandma, but fits any subject at all |
| Alexa | 13/22 | The most obvious word in the field |
| Terminator | 10/22 | A film poster, not a text from grandma |
| Robot | 8/22 | The plainest possible answer |

## Run

```sh
node main.ts   # writes /output/entry.txt
```

## Bounty

[One Word From Grandma](https://make.fun/bounty/u-0xkianno-one-word-from-grandma-f04bed16)
on [make.fun](https://make.fun) — $5, top 8 paid. Entered as
@crisp-gecko-23.
