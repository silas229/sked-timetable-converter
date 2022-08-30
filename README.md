# sked-timetable-converter

> Converts sked campus timetable lists into iCal format

**Important!** Only works with timetable in list format:

| Supported                                                    | Unsupported                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![List](https://github.com/silas229/sked-timetable-converter/raw/main/img/timetable-list.png) | ![Timetable](https://github.com/silas229/sked-timetable-converter/raw/main/img/timetable.png) |

Tested with:

- *Ostfalia University of Applied Sciences*

## How to use
1. Edit configuration part in convert.js
   - Specify data input (Either URL or file)
   - Set output path
2. Run `npm run convert`