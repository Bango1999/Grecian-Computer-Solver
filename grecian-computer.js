/* * * * * * * * * * * * * * * * * * *
 *                                   *
 *      Grecian Computer Solver      *
 *      Logan Swango - 11/23/21      *
 *                                   *
 * * * * * * * * * * * * * * * * * * */

 //-------------------------------------
 // Global Variables
 //-------------------------------------

var firmament = [   //the backboard, non-rotating constant
  [2, 5, 10, 7, 16, 8, 7, 8, 8, 3, 4, 12],
  [3, 3, 14, 14, 21, 21, 9, 9, 4, 4, 6, 6],
  [8, 9, 10, 11, 12, 13, 14, 15, 4, 5, 6, 7],
  [14, 11, 14, 14, 11, 14, 11, 14, 11, 11, 14, 11]
];
var dial1 = [   //edits orbital 1 & 2
  [1, 0, 9, 0, 12, 0, 6, 0, 10, 0, 10, 0],
  [3, 26, 6, 0, 2, 13, 9, 0, 17, 19, 3, 12],
  [9, 20, 12, 3, 6, 0, 14, 12, 3, 8, 9, 0],
  [7, 0, 9, 0, 7, 14, 11, 0, 8, 0, 16, 2]
];
var dial2 = [   //edits orbital 2 & 3
  [22, 0, 16, 0, 9, 0, 5, 0, 10, 0, 8, 0],
  [11, 26, 14, 1, 12, 0, 21, 6, 15, 4, 9, 18],
  [17, 4, 5, 0, 7, 8, 9, 13, 9, 7, 13, 21]
];
var dial3 = [   //edits orbital 3 & 4
  [12, 0, 4, 0, 7, 15, 0, 0, 14, 0, 9, 0],
  [6, 17, 7, 3, 0, 6, 0, 11, 11, 6, 11, 0]
];
var dial4 = [   //edits orbital 4
  [7, 0, 15, 0, 8, 0, 3, 0, 6, 0, 10, 0]
];

//holds current state of the rotations
var config = []; //represents a valid overall position/configuration
var high42 = 0; //tracks the highest # of 42 matches in a config

//-------------------------------------
// Initialization Commands
//-------------------------------------

//start crunching the numbers
crunch();
//teststuff();

//-------------------------------------
//    Helper Functions
//-------------------------------------
function teststuff() {
  setConfig();
  console.log(['config',config]);
  dial1 = shiftit(dial1);
  //setConfig();
  //dial2 = shiftit(dial2);
  //setConfig();
  //dial3 = shiftit(dial3);
  //setConfig();
  //dial4 = shiftit(dial4);
  setConfig();
  console.log(['config',config]);
}

function resetConfig() {
  config = [   //the backboard, non-rotating constant
    [2, 5, 10, 7, 16, 8, 7, 8, 8, 3, 4, 12],
    [3, 3, 14, 14, 21, 21, 9, 9, 4, 4, 6, 6],
    [8, 9, 10, 11, 12, 13, 14, 15, 4, 5, 6, 7],
    [14, 11, 14, 14, 11, 14, 11, 14, 11, 11, 14, 11]
  ];
}

//iterate through all configurations, check for sums of 42
function crunch() { 
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 12; j++) {
      for (let k = 0; k < 12; k++) {
        for (let l = 0; l < 12; l++) {
          dial4 = shiftit(dial4);
          setConfig();
	   //console.log('shifted dial4');

          //TODO: this is the ideal case, but we never reach it
          //possible typo in array data?
          if (is42()) {
            console.log('WINNER!');
            console.log(config);
            process.exit(0);
          }
        }
        dial3 = shiftit(dial3);
        //console.log('shifted dial3');
      }
      dial2 = shiftit(dial2);
      //console.log('shifted dial2');
    }
    dial1 = shiftit(dial1);
    //console.log('shifted dial1');
  }

  //TODO: when we get 12 42s, delete these logs
  //at the end, tell them the highest count of 42 in a configuration
  //finish the algorithm
  console.log(['high 42', high42]);
  console.log('DONE CRUNCHING!');
}


//return whether the current configuration sums to 42 everywhere
function is42(repeating = false) {
  let num42 = 0;
    for (let file = 0; file < 12; file++) {
      let sum = config[0][file] + config[1][file] + config[2][file] + config[3][file];
      if (sum !== 42) {

        //TODO: ideally we should return false here, but we never get 12 42s
        // so we have to stick around and see the best we got

        // if (repeating) {
        //   console.log(config[0][file]+'+'+config[1][file] + '+' +config[2][file] + '+' + config[3][file] + ' = ' + sum);
        // }
        // console.log('sum is '+sum);


        //return false;

      } else {
        num42++;
      }
    }

    // TODO: delete this repeating business after we find the real answer
    //console.log(['number of 42s',num42]);
    high42 = (num42 > high42) ? num42 : high42;
    if (num42 == 11 && !repeating) {
      console.log(['high config', config]);
      is42(true);
    }
    if (num42 == 12) {
      return true;
    }
    return false;
}

//return the dial matrix, shifted by 1
function shiftit(thisdial) {
  thisdial[0].push(thisdial[0].shift());
  
  if (!!thisdial[1]) {
    thisdial[1].push(thisdial[1].shift());
  }
  if (!!thisdial[2]) {
    thisdial[2].push(thisdial[2].shift());
  }
  if (!!thisdial[3]) {
    thisdial[3].push(thisdial[3].shift());
  }
  
  return thisdial;
}

//set the new configuration after a shift
function setConfig() {
  resetConfig(); 
  for (let overnumber = 0; overnumber < 12; overnumber++) {
    //dial1 overwrites 
    config[0][overnumber] = (dial1[0][overnumber] !== 0) ? dial1[0][overnumber] : config[0][overnumber];
    config[1][overnumber] = (dial1[1][overnumber] !== 0) ? dial1[1][overnumber] : config[1][overnumber];
    config[2][overnumber] = (dial1[2][overnumber] !== 0) ? dial1[2][overnumber] : config[2][overnumber];
    config[3][overnumber] = (dial1[3][overnumber] !== 0) ? dial1[3][overnumber] : config[3][overnumber];
    //dial2 overwrites
    config[1][overnumber] = (dial2[0][overnumber] !== 0) ? dial2[0][overnumber] : config[1][overnumber];
    config[2][overnumber] = (dial2[1][overnumber] !== 0) ? dial2[1][overnumber] : config[2][overnumber];
    config[3][overnumber] = (dial2[2][overnumber] !== 0) ? dial2[2][overnumber] : config[3][overnumber];
    //dial3 overwrites
    config[2][overnumber] = (dial3[0][overnumber] !== 0) ? dial3[0][overnumber] : config[2][overnumber];
    config[3][overnumber] = (dial3[1][overnumber] !== 0) ? dial3[1][overnumber] : config[3][overnumber];
    //dial4 overwrites
    config[3][overnumber] = (dial4[0][overnumber] !== 0) ? dial4[0][overnumber] : config[3][overnumber];
  }
  //console.log(['new config',config]);
}
