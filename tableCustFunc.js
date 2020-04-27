function getOutput(fixObject) {
  
    var boardData;
    if (fixObject.boardID === 1) {boardData = barLineArea;}
    else if (fixObject.boardID === 2) {boardData = linero22;}
    else if (fixObject.boardID === 3) {boardData = bar22;}
    else if (fixObject.boardID === 4) {boardData = line2;}
    else if (fixObject.boardID === 5) {boardData = ll;};
  
    var criMultiplier = fixObject.cri === '80' ? 1 : fixObject.color === '30k' ? .921 : fixObject.color === '35k' ? .899 : fixObject.color === '40k' ? .892 : fixObject.color === '50k' ? .892 : 1;
    if (fixObject.boardID > 3 || fixObject.color === '27k') {
      criMultiplier = 1;
    }
  
    var outputObject = {};
  
    var linBoardCount = fixObject.directShielding === '35' ? 4 : fixObject.fixture === 'L6D/I' ? 16 : fixObject.fixture === 'L8D/I' ? 16 : fixObject.fixture.includes('D') && fixObject.directShielding!=="WET" ? 4 : 6;
    // console.log(linBoardCount)
    Object.keys(boardData).forEach((key) => {
      var boardDataLine = boardData[key]
      var directmA = fixObject.family === 'LIN' ? linBoardCount * Number(boardDataLine.mA) : fixObject.directBoardCount * Number(boardDataLine.mA);
      var indirectmA = fixObject.family === 'LIN' ? directmA / (linBoardCount === 16 ? 2 : 1) : fixObject.indirectBoardCount * Number(boardDataLine.mA);
      var directWatts = (boardDataLine.boardWattage / driverEff(fixObject.boardID, directmA, fixObject.ulW)) * fixObject.directBoardCount;
      var indirectWatts = (boardDataLine.boardWattage / driverEff(fixObject.boardID, indirectmA, fixObject.ulW)) * fixObject.indirectBoardCount;
      
      if (outputFilter(directWatts, boardDataLine, fixObject.directTarget, fixObject.directEff, fixObject.directBoardCount, criMultiplier, 'direct', fixObject)) {
        if (!outputObject.hasOwnProperty('direct')) {
          outputObject.direct = {};
        }
        outputObject.direct.maxLumen = Number(boardDataLine[fixObject.color]) * criMultiplier;
        outputObject.direct.maxWatt = directWatts / fixObject.directBoardCount;
        outputObject.direct.mA = Number(boardDataLine.mA);
        outputObject.direct.maxBoardWatt = Number(boardDataLine.boardWattage);
      }
      if (outputFilter(indirectWatts, boardDataLine, fixObject.indirectTarget, fixObject.indirectEff, fixObject.indirectBoardCount, criMultiplier, 'indirect', fixObject)) {
        if (!outputObject.hasOwnProperty('indirect')) {
          outputObject.indirect = {};
        }
        outputObject.indirect.maxLumen = Number(boardDataLine[fixObject.color]) * criMultiplier;
        outputObject.indirect.maxWatt = indirectWatts / fixObject.indirectBoardCount;
        outputObject.indirect.mA = Number(boardDataLine.mA);
        outputObject.indirect.maxBoardWatt = Number(boardDataLine.boardWattage);
      }
      if (boardDataLine.mA === '50' && !fixObject.customUnit) {
        outputObject.minLumen = outputObject.hasOwnProperty('direct') ? outputObject.direct.maxLumen : outputObject.indirect.maxLumen;
        outputObject.minBoardWatt = outputObject.hasOwnProperty('direct') ? outputObject.direct.maxBoardWatt : outputObject.indirect.maxBoardWatt;
        if (outputObject.hasOwnProperty('direct')) {
          outputObject.direct.minWatt = outputObject.direct.maxWatt;
        }
        if (outputObject.hasOwnProperty('indirect')) {
          outputObject.indirect.minWatt = outputObject.indirect.maxWatt;
        }
      };
    });
    console.log(outputObject);
    
    return outputObject;
};
  
function outputFilter(wVar,lumenD,cTarget,eff,bCount,criM,hemi,selObject) {
    var inverse = hemi === 'direct' ? 'indirect' : 'direct';
    if (!selObject.customUnit) {
      
      if (selObject.hasOwnProperty(inverse + 'MaxWattage') && selObject.hasOwnProperty(hemi + 'MaxWattage')) {
        return wVar <= selObject.ulW - selObject[inverse + 'MaxWattage'];
      } else {
        if (selObject.fixture === 'EV3D' && wVar <= selObject.ulW) {
          return Number(lumenD.mA) <= 273;
        } else if (selObject.fixture === 'EX3D/I' && wVar <= selObject.ulW) {
          if (hemi === 'direct') {
            return Number(lumenD.mA) <= 330;
          } else {
            return Number(lumenD.mA) <= 325;
          }
        } else if (selObject.fixture === 'EV2D' && wVar <= selObject.ulW) {
          if (selObject.directShielding === "R") {
            return Number(lumenD.mA) <= 194;
          } else {
            return Number(lumenD.mA) <= 238;
          }
        } else if (selObject.fixture === 'EX2D/I' && wVar <= selObject.ulW) {
          if (hemi === 'direct') {
            return Number(lumenD.mA) <= 288;
          } else {
            return Number(lumenD.mA) <= 288;
          }
        } else if (selObject.fixture === 'EV4D' && wVar <= selObject.ulW) {
          if (selObject.directShielding === "R") {
            return Number(lumenD.mA) <= 206;
          } else {
            return Number(lumenD.mA) <= 250;
          }
        } else if (selObject.fixture === 'EX4D/I' && wVar <= selObject.ulW) {
          if (hemi === 'direct') {
            return Number(lumenD.mA) <= 288;
          } else {
            return Number(lumenD.mA) <= 288;
          }
        } else if ((selObject.fixture === 'L6D/I' || selObject.fixture === 'L8D/I') && wVar <= selObject.ulW) {
          if (hemi === 'direct') {
            return Number(lumenD.mA) <= 287;
          } else {
            return Number(lumenD.mA) <= 285;
          }
        } else if ((selObject.fixture === 'M' || selObject.fixture === 'MW') && wVar <= selObject.ulW) {
          return Number(lumenD.mA) <= 312;
        } else if (selObject.fixture === 'C' && wVar <= selObject.ulW) {
          return Number(lumenD.mA) <= 287;
        } else if (selObject.fixture !== 'EV3D' && selObject.fixture !== 'EX3D/I' && selObject.fixture !== 'L6D/I' && selObject.fixture !== 'L8D/I') {
          return wVar <= selObject.ulW;
        }
      }
    } else if (selObject.customUnit === 'Watts' && cTarget !== undefined) {
      if (selObject.hasOwnProperty(inverse + 'MaxWattage') && selObject.hasOwnProperty(hemi + 'MaxWattage')) {
        return wVar <= cTarget - selObject[inverse + 'MaxWattage'];
      } else {
        return wVar <= cTarget;
      }
    } else if (selObject.customUnit === 'Lumens' && cTarget !== undefined) {
      return (Math.floor10(Number(lumenD[selObject.color]), 1) <= cTarget / eff / criM / bCount);
    }
}