# OpenACH
![coverage](https://img.shields.io/badge/Coverage-99%25-green.svg)

This is a very simple ACH parser. The spec used can be found here:
https://www.nacha.org/system/files/resources/AAP201%20-%20ACH%20File%20Formatting.pdf

## Installing
Run command:
```bash
npm install
npm run deploy
```
These commands will install the dependencies, run the unit tests, deploy the software executable, and run the e2e tests.  The executable is then found in the 'dist' directory.

## Running
Here's an example call that writes out JSON from the ACH file:
```bash
dist/ach -f spec/sampleData/basicPpdFile.ach > ach.json
```
Or it also accepts piped input:
```bash
type spec/sampleData/basicPpdFile.ach | dist/ach > ach.json
dist/ach < spec/sampleData/basicPpdFile.ach > ach.json
```

## Running in Development Mode
Run command:
```bash
npm run dev
```
