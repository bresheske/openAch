# OpenACH
This is a very simple ACH parser. The spec used can be found here:
https://www.nacha.org/system/files/resources/AAP201%20-%20ACH%20File%20Formatting.pdf

## Installing
Run command:
```
npm install
npm run build
```
This creates an ach.exe file that is executable.

## Running
Here's an example call that writes out JSON from the ACH file:
```
ach -f spec/sampleData/basicPpdFile.ach > ach.json
```

## Running the test methods
Run command:
```
npm run test
```