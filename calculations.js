function createList(effObject) {
  $('.shielding > article > div > p').hide();
  $('.led > article > .cri').hide();
  $('.led > article > .temp').hide();
  $('.led > article > .inputSection').hide();

  Object.keys(effObject).forEach(function(key) {
    Object.keys(effObject[key]).forEach(function(fixt) {
      var fixtFamily = key === "LIN" ? '.linear' : '.trougher';
      $(fixtFamily).append('<div class="fixture hover" id="' + fixt + '" data-family="' + key + '">' + fixt + '</div>');
    })
  })
};

createList(fixtures);
$('.modal').modal();

var selection = {};
var buttonNum = 0;

$('.fixture').click(function(){
  $('div').removeClass('selected');
  $(this).addClass('selected');
  selection = {};

  $('.shielding > article > .direct').find('*').not('p').remove();
  $('.shielding > article > .indirect').find('*').not('p').remove();
  $('.shielding > article > div > p').hide();
  $('.led > article > .cri').hide();
  $('.led > article > .temp').hide();
  $('.led > article > .inputSection').hide();

  selection.family = $(this).attr('data-family');
  selection.fixture = $(this).attr('id');

  var selectedFixtureShielding = fixtures[selection.family][selection.fixture].shielding;
  Object.keys(selectedFixtureShielding).forEach(function(key) {
    if (Object.keys(selectedFixtureShielding).length === 2 && (key === 'DIR' || key === 'IND')) {
      $('.shielding > article > div > p').show();
      var hemisphere = key === 'DIR' ? 'direct' : 'indirect';
      Object.keys(selectedFixtureShielding[key]).forEach(function(shield) {
        $('.shielding > article > .' + hemisphere).append('<div class="lens hover" id="' + key + "_" + shield + '" data-eff="' + selectedFixtureShielding[key][shield] + '">' + shield + '</div>');
      })
    } else if (key !== 'DIR' && key !== 'IND'){
      $('.shielding > article > .direct').append('<div class="lens hover" id="' + key + '" data-eff="' + selectedFixtureShielding[key] + '">' + key + '</div>');
    }
  });
});

$('.shielding > article').on('click','div > .lens',function() {

  $(this).siblings().removeClass('selected');
  $(this).addClass('selected');
  $('.cri > div').removeClass('selected');
  $('.led > article > .cri').show();
  $('.led > article > .temp').hide();
  $('.led > article > .inputSection').hide();

  var hemisphere = $(this).attr('id').includes('_') ? $(this).attr('id').split('_')[0] : $(this).attr('id');
  var hemiLabel = hemisphere === 'IND' ? 'indirect' : 'direct';

  selection[hemiLabel + 'Shielding'] = $(this).attr('id').includes('_') ? $(this).attr('id').split('_')[1] : $(this).attr('id');
  selection[hemiLabel + 'Eff'] = Number($(this).attr('data-eff'));
  selection[hemiLabel + 'BoardCount'] = fixtures[selection.family][selection.fixture].boardCount ? typeof fixtures[selection.family][selection.fixture].boardCount === 'object' ? Number(fixtures[selection.family][selection.fixture].boardCount[hemisphere]) : Number(fixtures[selection.family][selection.fixture].boardCount) : 1;

  selection.boardID = typeof fixtures[selection.family][selection.fixture].boardID === 'object' ? fixtures[selection.family][selection.fixture].boardID[selection.directShielding] : fixtures[selection.family][selection.fixture].boardID;

  if (typeof fixtures[selection.family][selection.fixture].ulLimit === 'object') {
    if (Object.keys(fixtures[selection.family][selection.fixture].ulLimit).includes(selection[hemiLabel + 'Shielding'])) {
      selection.ulW = Number(fixtures[selection.family][selection.fixture].ulLimit[selection[hemiLabel + 'Shielding']]);
    } else {
      selection.ulW = Number(fixtures[selection.family][selection.fixture].ulLimit[selection.fixture]);
    }
  } else {
    selection.ulW = Number(fixtures[selection.family][selection.fixture].ulLimit);
  }

});

$('.led > article').on('click', '.cri > .cri', function() {
  $(this).siblings().removeClass('selected');
  $('.temp > div').removeClass('selected');
  $(this).addClass('selected');
  $('.led > article > .temp').show();
  $('article > .temp > .temp:nth-child(2)').show();
  if ($(this).attr('data-cri') === '80' || selection.directShielding === '35') {
    $('article > .temp > .temp:nth-child(2)').hide();
  }
  $('.led > article > .inputSection').hide();

  selection.cri = $(this).attr('data-cri');
});

$('.led > article').on('click', '.temp > .temp',function() {
  delete selection.indirectRemMaxLumens;
  delete selection.indirectRemMaxWattage;
  delete selection.directRemMaxLumens;
  delete selection.directRemMaxWattage;
  delete selection.directMaxWattage;
  delete selection.indirectMaxWattage;

  $(this).siblings().removeClass('selected');
  $(this).addClass('selected');
  $('.led > article > .inputSection').hide();

  if (selection.fixture === 'EX3D/I' || selection.fixture === 'EV3D') {
    if (selection.cri === '80') {
      selection.color = '8' + $(this).attr('data-temp');
    } else {
      selection.color = '9' + $(this).attr('data-temp');
    }
  } else {
    selection.color = $(this).attr('data-temp');
  }

  var outputData = getOutput(selection);

  $('.led > article > .inputSection').show();
  $('.inputSection > .customDirect').show();
  $('.inputSection > .customIndirect').show();

  if (outputData.hasOwnProperty('direct')) {
    if (!outputData.hasOwnProperty('indirect')) {
      $('.inputSection > .customIndirect').hide();
    }
    selection.directMaxLumens = Math.floor10(outputData.direct.maxLumen * selection.directBoardCount * selection.directEff, 1);
    selection.directMaxWattage = Math.ceil10(outputData.direct.maxWatt * selection.directBoardCount, -1);
    selection.directMaxBoardWattage = Math.ceil10(outputData.direct.maxBoardWatt * selection.directBoardCount, -1);
    selection.directMinLumens = Math.ceil10(outputData.minLumen * selection.directBoardCount * selection.directEff, 1);
    selection.directMinWattage = Math.ceil10(outputData.direct.minWatt * selection.directBoardCount, -1);
    selection.directMinBoardWattage = Math.ceil10(outputData.minBoardWatt * selection.directBoardCount, -1);
    selection.directmA = outputData.direct.mA * selection.directBoardCount;
  };
  if (outputData.hasOwnProperty('indirect')) {
    if (!outputData.hasOwnProperty('direct')) {
      $('.inputSection > .customDirect').hide();
    }
    selection.indirectMaxLumens = Math.floor10(outputData.indirect.maxLumen * selection.indirectBoardCount * selection.indirectEff, 1);
    selection.indirectMaxWattage = Math.ceil10(outputData.indirect.maxWatt * selection.indirectBoardCount, -1);
    selection.indirectMaxBoardWattage = Math.ceil10(outputData.indirect.maxBoardWatt * selection.indirectBoardCount, -1);
    selection.indirectMinLumens = Math.ceil10(outputData.minLumen * selection.indirectBoardCount * selection.indirectEff, 1);
    selection.indirectMinWattage = Math.ceil10(outputData.indirect.minWatt * selection.indirectBoardCount, -1);
    selection.indirectMinBoardWattage = Math.ceil10(outputData.minBoardWatt * selection.indirectBoardCount, -1);
    selection.indirectmA = outputData.indirect.mA * selection.indirectBoardCount;
  };

  var directInverseLumen;
  var directInverseWatt;
  var indirectInverseLumen;
  var indirectInverseWatt;

  if (selection.hasOwnProperty('directShielding') && selection.hasOwnProperty('indirectShielding') && selection.fixture.charAt(0) !== 'F') {
    var inverseData = getOutput(selection);

    selection.indirectRemMaxLumens = Math.floor10(inverseData.indirect.maxLumen * selection.indirectBoardCount * selection.indirectEff, 1);
    selection.indirectRemMaxWattage = Math.ceil10(inverseData.indirect.maxWatt * selection.indirectBoardCount, -1);

    selection.directRemMaxLumens = Math.floor10(inverseData.direct.maxLumen * selection.directBoardCount * selection.directEff, 1);
    selection.directRemMaxWattage = Math.ceil10(inverseData.direct.maxWatt * selection.directBoardCount, -1);

    directInverseLumen = ' (' + selection.indirectRemMaxLumens + ')';
    directInverseWatt = ' (' + selection.indirectRemMaxWattage + ')';
    indirectInverseLumen = ' (' + selection.directRemMaxLumens + ')';
    indirectInverseWatt = ' (' + selection.directRemMaxWattage + ')';

  } else {
    directInverseLumen = '';
    directInverseWatt = '';
    indirectInverseLumen = '';
    indirectInverseWatt = '';
  };

  var lumenLabel = selection.family === 'LIN' ? ' lm/ft @ ' : ' lumens total @ ';
  var wattLabel = selection.family === 'LIN' ? ' W/ft' : ' watts total';

  var fixtureName;
  if (selection.fixture === 'EX3D/I') {
    if (outputData.hasOwnProperty('direct') && outputData.hasOwnProperty('indirect')) {
      fixtureName = 'EX3DI';
    } else if (outputData.hasOwnProperty('direct')) {
      fixtureName = 'EX3D';
    } else {
      fixtureName = 'EX3I'
    }
  } else {
    fixtureName = selection.fixture;
  };

  var shieldingName = '';
  if (outputData.hasOwnProperty('direct')) {
    if (selection.fixture !== 'EVL' && selection.fixture !== 'L6A') {
      shieldingName += '-' + selection.directShielding;
    } else if (selection.fixture === 'L6A') {
      shieldingName += selection.directShielding;
    }
  }
  if (outputData.hasOwnProperty('indirect')) {
    shieldingName += '-' + selection.indirectShielding;
  }

  var criName = '-';
  if (selection.fixture !== 'EX3D/I' && selection.fixture !== 'EV3D') {
    if (selection.cri === '80') {
      criName += '8';
    } else {
      criName += '9';
    }
  };

  $('.outputSection').append('<article class="output' + buttonNum + ' outputCard"></article>');
  $('article.output' + buttonNum).append('<div class="output' + buttonNum + ' catolog">' + fixtureName + shieldingName + criName + selection.color + '</div>');
  if (outputData.hasOwnProperty('direct')) {
    if (selection.fixture.charAt(0) === 'F') {
      $('article.output' + buttonNum).append('<div class="directMax"><span>Dir Max:</span> See spec sheet</div>');

    } else {
      $('article.output' + buttonNum).append('<div class="directMax"><span>Dir Max:</span> ' + selection.directMaxLumens + directInverseLumen + lumenLabel + selection.directMaxWattage + directInverseWatt + wattLabel + '</div>');
    }
    $('article.output' + buttonNum).append('<div class="directMin"><span>Dir Min:</span> ' + selection.directMinLumens + lumenLabel + selection.directMinWattage + wattLabel + '</div>');
  }
  if (outputData.hasOwnProperty('indirect')) {
    if (selection.fixture.charAt(0) === 'F') {
      $('article.output' + buttonNum).append('<div class="indirectMax"><span>Ind Max:</span> See spec sheet</div>');

    } else {
      $('article.output' + buttonNum).append('<div class="indirectMax"><span>Ind Max:</span> ' + selection.indirectMaxLumens + indirectInverseLumen + lumenLabel + selection.indirectMaxWattage + indirectInverseWatt + wattLabel + '</div>');

    }
    $('article.output' + buttonNum).append('<div class="indirectMin"><span>Ind Min:</span> ' + selection.indirectMinLumens + lumenLabel + selection.indirectMinWattage + wattLabel + '</div>');
  }
  $('article.output' + buttonNum).append('<button class="output' + buttonNum + ' remove">Clear</button>');

  buttonNum++;

  $('button.remove').click(function() {
    var group = $(this).attr('class').split(' ')[0];
    $('article.' + group).remove();
  });
});

$('.led').on('click','.lever',function() {
  if ($("#unitSwitch").prop("checked") === false) {
    selection.customUnit = 'Watts';
  } else {
    selection.customUnit = 'Lumens';
  }
  $('.customError > span').text(selection.customUnit.toLowerCase());
  $('h4.customError > span').text(selection.customUnit);


  $('.directTarget').text('Direct Custom ' + selection.customUnit + ':');
  $('.indirectTarget').text('Indirect Custom ' + selection.customUnit + ':');
  var butUnit = selection.customUnit === 'Lumens' ? 'L' : 'W';
  $('.clButton').text('Add C' + butUnit);
});

$('.led').on('click','.inputSection > .clButton',function() {
  var directInputVal = $('#directTarget').val();
  var indirectInputVal = $('#indirectTarget').val();

  if ($("#unitSwitch").prop("checked") === true) {
    selection.customUnit = 'Watts';
  } else {
    selection.customUnit = 'Lumens';
  }

  if (directInputVal !== '') {
    selection.directTarget = Number($('#directTarget').val());
    $('#directTarget').val([]);
  }
  if (indirectInputVal !== '') {
    selection.indirectTarget = Number($('#indirectTarget').val());
    $('#indirectTarget').val([]);
  }
  var customOutput = getOutput(selection);

  if (customOutput.hasOwnProperty('direct')) {
    selection.directCustomLumens = Math.round(customOutput.direct.maxLumen * selection.directBoardCount * selection.directEff, 1);
    selection.directCustomWattage = Math.ceil10(customOutput.direct.maxWatt * selection.directBoardCount, -1);
    selection.directCustomBoardWattage = Math.ceil10(customOutput.direct.maxBoardWatt * selection.directBoardCount, -1);
    selection.directCustommA = customOutput.direct.mA * selection.directBoardCount;
  };
  if (customOutput.hasOwnProperty('indirect')) {
    selection.indirectCustomLumens = Math.round(customOutput.indirect.maxLumen * selection.indirectBoardCount * selection.indirectEff, 1);
    selection.indirectCustomWattage = Math.ceil10(customOutput.indirect.maxWatt * selection.indirectBoardCount, -1);
    selection.indirectCustomBoardWattage = Math.ceil10(customOutput.indirect.maxBoardWatt * selection.indirectBoardCount, -1);
    selection.indirectCustommA = customOutput.indirect.mA * selection.indirectBoardCount;
  };

  if (validateCustomOutput(selection)) {
    $('.led > article > .inputSection').hide();
    $('.temp > div').removeClass('selected');

    var LumensLabel = selection.family === 'LIN' ? ' lm/ft @ ' : ' lumens total @ ';
    var WattsLabel = selection.family === 'LIN' ? ' W/ft' : ' watts total';
    var mALabel = selection.family === 'LIN' ? ' mA/board @ ' : ' mA total @ ';

    var customCat = $('.output' + (buttonNum - 1) + '.catolog').text();

    if (customOutput.hasOwnProperty('direct')) {
      customCat += '-' + selection.directTarget;

      $('<div class="directCO"><span>Dir Custom:</span> ' + selection.directCustomLumens + LumensLabel + selection.directCustomWattage + WattsLabel + '</div>').insertBefore('.output' + (buttonNum - 1) + ' > .directMin');
      $('<div class="directProg"><span>Dir Driver Output:</span> ' + selection.directCustommA + mALabel + selection.directCustomBoardWattage + WattsLabel + '</div>').insertBefore('.output' + (buttonNum - 1) + '.remove');

    }
    if (customOutput.hasOwnProperty('indirect')) {
      customCat += '-' + selection.indirectTarget;

      $('<div class="indirectCO"><span>Ind Custom:</span> ' + selection.indirectCustomLumens + LumensLabel + selection.indirectCustomWattage + WattsLabel + '</div>').insertBefore('.output' + (buttonNum - 1) + ' > .indirectMin');
      $('<div class="indirectProg"><span>Ind Driver Output:</span> ' + selection.indirectCustommA + mALabel + selection.indirectCustomBoardWattage + WattsLabel + '</div>').insertBefore('.output' + (buttonNum - 1) + '.remove');
    }
    $('.output' + (buttonNum - 1) + '.catolog').text(customCat);

    if (selection.fixture === 'EV3D' && selection.directCustommA >= 227) {
      $('<div class="thermalWarn"><span>!!! Driver Thermal Concerns - See Art !!!</span></div>').insertBefore('.output' + (buttonNum - 1) + '.remove');
    }

    console.log(selection, 'selection');

  } else {
    // $('#modal1').show()
    $('#modal1').modal('open');

    console.log(selection);

  }
  delete selection.customUnit;

});

function validateCustomOutput(fixParam) {
  var unit = fixParam.customUnit === 'Watts' ? 'Wattage' : 'Lumens';

  if (fixParam.hasOwnProperty('indirectCustomWattage') && fixParam.hasOwnProperty('directCustomWattage')) {
    return fixParam.directCustomWattage + fixParam.indirectCustomWattage <= fixParam.ulW;
  }
  if (fixParam.hasOwnProperty('directCustom' + unit)) {
    return (fixParam.directTarget <= fixParam['directMax' + unit] && fixParam.directTarget >= fixParam['directMin' + unit]);
  }
  if (fixParam.hasOwnProperty('indirectCustom' + unit)) {
    return fixParam.indirectTarget <= fixParam['indirectMax' + unit] && fixParam.indirectTarget >= fixParam['indirectMin' + unit];
  }
};

function getOutput(fixObject) {

  var boardData;
  if (fixObject.boardID === 1) {boardData = barLineArea;}
  else if (fixObject.boardID === 2) {boardData = linero22;}
  else if (fixObject.boardID === 3) {boardData = bar22;}
  else if (fixObject.boardID === 4) {boardData = line2;};

  var criMultiplier = fixObject.cri === '80' ? 1 : fixObject.color === '30k' ? .921 : fixObject.color === '35k' ? .899 : fixObject.color === '40k' ? .892 : fixObject.color === '50k' ? .892 : 1;
  if (fixObject.fixture === 'EX3D/I' || fixObject.fixture === 'EV3D' || fixObject.color === '27k') {
    criMultiplier = 1;
  }

  var outputObject = {};

  var linBoardCount = fixObject.directShielding === '35' ? 4 : 6;

  Object.keys(boardData).forEach((key) => {
    var boardDataLine = boardData[key]
    var directmA = fixObject.family === 'LIN' ? linBoardCount * Number(boardDataLine.mA) : fixObject.directBoardCount * Number(boardDataLine.mA);
    var indirectmA = fixObject.family === 'LIN' ? directmA : fixObject.indirectBoardCount * Number(boardDataLine.mA);
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
        if (!selObject.hasOwnProperty('indirectShielding')) {
          return Number(lumenD.mA) <= 330;
        } else {
          return Number(lumenD.mA) <= 325;
        }
      } else if (!selObject.fixture === 'EV3D' && !selObject.fixture === 'EX3D/I') {
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

function driverEff(boardType,mA,ul) {
  var driverEff;

  if (boardType === 3) {
    if (mA < 2300) {driverEff = .8425;}
    if (mA < 1458) {driverEff = .8225;}
    if (mA < 1219) {driverEff = .835;}
    if (mA < 1145) {driverEff = .8625;}
    if (mA < 813) {driverEff = .845;}
    if (mA < 673) {driverEff = .815;}
    if (mA < 549) {driverEff = .785;}
    if (mA < 372) {driverEff = .7575;}
    if (mA < 279) {driverEff = .695;}
    if (mA < 219) {driverEff = .6425;}
    if (mA < 189) {driverEff = .6025;}
    if (mA < 151) {driverEff = .568;}
  } else if (boardType === 1) {
    if (mA > 2300) {
      mA = mA / Math.ceil(ul / 50);
    };

    if (mA < 2300) {driverEff = .8365;}
    if (mA < 1675) {driverEff = .825;}
    if (mA < 1450) {driverEff = .8175;}
    if (mA < 1384) {driverEff = .85;}
    if (mA < 940) {driverEff = .828;}
    if (mA < 751) {driverEff = .808;}
    if (mA < 600) {driverEff = .79;}
    if (mA < 400) {driverEff = .76;}
    if (mA < 350) {driverEff = .725;}
    if (mA < 270) {driverEff = .685;}
    if (mA < 234) {driverEff = .65;}
    if (mA < 199) {driverEff = .60;}

  } else if (boardType === 2) {

    if (mA < 2300) {driverEff = .8425;}
    if (mA < 1458) {driverEff = .8225;}
    if (mA < 1219) {driverEff = .835;}
    if (mA < 1145) {driverEff = .8625;}
    if (mA < 813) {driverEff = .845;}
    if (mA < 673) {driverEff = .815;}
    if (mA < 549) {driverEff = .785;}
    if (mA < 372) {driverEff = .7575;}
    if (mA < 279) {driverEff = .695;}
    if (mA < 219) {driverEff = .6425;}

  } else if (boardType === 4) {

    if (mA < 2300) {driverEff = .88;}
    if (mA < 1800) {driverEff = .87;}
    if (mA < 1400) {driverEff = .87;}
    if (mA < 1200) {driverEff = .85;}
    if (mA < 940) {driverEff = .828;}
    if (mA < 700) {driverEff = .808;}
    if (mA < 600) {driverEff = .79;}
    if (mA < 400) {driverEff = .76;}
    if (mA < 350) {driverEff = .725;}
    if (mA < 270) {driverEff = .745;}
    if (mA < 234) {driverEff = .65;}
    if (mA < 199) {driverEff = .60;}
  }
  return driverEff;
};

// function getOutputOld(fixObject) {
//
//   var boardData = fixObject.boardType === "1" ? barLineArea : fixObject.boardType === "2" ? linero22 : line22;
//   var shieldCheck = fixObject.shielding === "NA" ? ' ' : fixObject.altShielding ? fixObject.shielding + ' ' + fixObject.altShielding : fixObject.shielding;
//   var fixEff = Number(fixObject.eff);
//   var criX = fixObject.cri === '80' ? 1 : fixObject.color === '30k' ? .921 : fixObject.color === '35k' ? .899 : fixObject.color === '40k' ? .892 : fixObject.color === '50k' ? .892 : 1;
//
//   var boardMin = boardData[0];
//   var boardMax;
//   var maxBoardLumen;
//   var minBoardLumen;
//
//   var outputObject = {};
//
//   var altWatts;
//   var altBoardMax;
//   var altMaxBoardLumen;
//   var altMinBoardLumen;
//   var altFixEff = Number(fixObject.altEff);
//
//
//   if (fixObject.family === 'LIN') {
//
//     var crappyL6A35workaroud;
//
//     Object.keys(boardData).forEach(function(key) {
//       if (Number(boardData[key].mA) === 350) {
//         crappyL6A35workaroud = boardData[key]
//       }
//       if (Number(boardData[key].inputWattage) < Number(fixObject.ul)) {
//         boardMax = boardData[key];
//         maxBoardLumen = Number(boardMax[fixObject.color]);
//         minBoardLumen = Number(boardMin[fixObject.color]);
//       }
//     });
//
//     // if ()
//
//     if (fixObject.altFixture) {
//       altWatts = Number(fixObject.ul) - Number(boardMax['inputWattage']);
//       Object.keys(boardData).forEach(function(key) {
//         if (Number(boardData[key].inputWattage) < altWatts) {
//           altBoardMax = boardData[key];
//           altMaxBoardLumen = Number(altBoardMax[fixObject.color]);
//         }
//       });
//
//       outputObject.altMax = Math.round10(altFixEff * altMaxBoardLumen * criX, 1) + ' lm/ft @ ' + Math.round10(altBoardMax['inputWattage'], -1) + ' W/ft';
//       // outputObject.altMaxWatt = Math.round10(altBoardMax['inputWattage'], -1);
//
//     };
//
//     outputObject.catalog = fixObject.fixture + ' ' + shieldCheck + ' ' + fixObject.cri + ' ' + fixObject.color;
//     outputObject.max = Math.floor10(fixEff * maxBoardLumen * criX, 1) + ' lm/ft @ ' + Math.round10(boardMax['inputWattage'], -1) + ' W/ft';
//     outputObject.min = Math.ceil10(fixEff * minBoardLumen * criX, 1) + ' lm/ft @ ' + Math.round10(boardMin['inputWattage'], -1) + ' W/ft';
//     outputObject.maxLumens = Math.floor10(fixEff * maxBoardLumen * criX, 1);
//     outputObject.minLumens = Math.ceil10(fixEff * minBoardLumen * criX, 1);
//     outputObject.maxWatts = Math.round10(boardMax['inputWattage'], -1);
//     outputObject.minWatts = Math.round10(boardMin['inputWattage'], -1);
//
//   } else {
//     var boardCount = fixBoardCounts[fixObject.fixture];
//     var driverEff;
//     var fixWatt;
//     var totalmA;
//
//     Object.keys(boardData).forEach(function(key) {
//
//       var tempmA = boardCount * Number(boardData[key].mA);
//       var tempDrivEff;
//
//       if (fixObject.boardType === '3') {
//
//         if (tempmA < 2300 && tempmA >= 1458) {
//           tempDrivEff = .8425;
//         } else if (tempmA < 1458 && tempmA >= 1219) {
//           tempDrivEff = .8225;
//         } else if (tempmA < 1219 && tempmA >= 1145) {
//           tempDrivEff = .835;
//         } else if (tempmA < 1145 && tempmA >= 813) {
//           tempDrivEff = .8625;
//         } else if (tempmA < 813 && tempmA >= 673) {
//           tempDrivEff = .845;
//         } else if (tempmA < 673 && tempmA >= 549) {
//           tempDrivEff = .815;
//         } else if (tempmA < 549 && tempmA >= 372) {
//           tempDrivEff = .785;
//         } else if (tempmA < 372 && tempmA >= 279) {
//           tempDrivEff = .7575;
//         } else if (tempmA < 279 && tempmA >= 219) {
//           tempDrivEff = .695;
//         } else if (tempmA < 219 && tempmA >= 189) {
//           tempDrivEff = .6425;
//         } else if (tempmA < 189 && tempmA >= 151) {
//           tempDrivEff = .6025;
//         } else if (tempmA < 151) {
//           tempDrivEff = .568;
//         };
//       } else {
//         if (tempmA > 2300) {
//           tempmA = tempmA / Math.ceil(fixObject.ul / 50);
//         };
//
//         if (tempmA < 2300 && tempmA >= 1675) {
//           tempDrivEff = .8365;
//         } else if (tempmA < 1675 && tempmA >= 1450) {
//           tempDrivEff = .825;
//         } else if (tempmA < 1450 && tempmA >= 1384) {
//           tempDrivEff = .8175;
//         } else if (tempmA < 1384 && tempmA >= 940) {
//           tempDrivEff = .85;
//         } else if (tempmA < 940 && tempmA >= 751) {
//           tempDrivEff = .828;
//         } else if (tempmA < 751 && tempmA >= 600) {
//           tempDrivEff = .808;
//         } else if (tempmA < 600 && tempmA >= 400) {
//           tempDrivEff = .79;
//         } else if (tempmA < 400 && tempmA >= 350) {
//           tempDrivEff = .76;
//         } else if (tempmA < 350 && tempmA >= 270) {
//           tempDrivEff = .725;
//         } else if (tempmA < 270 && tempmA >= 234) {
//           tempDrivEff = .685;
//         } else if (tempmA < 234 && tempmA >= 199) {
//           tempDrivEff = .65;
//         } else if (tempmA < 199) {
//           tempDrivEff = .60;
//         }
//       }
//
//       var totalWatts = Number(boardData[key].boardWattage) / tempDrivEff * boardCount;
//
//       if (totalWatts < Number(fixObject.ul)) {
//         driverEff = tempDrivEff
//         fixWatt = totalWatts;
//         boardMax = boardData[key];
//         totalmA = Number(boardData[key].mA) * boardCount;
//
//         maxBoardLumen = Number(boardMax[fixObject.color]);
//         minBoardLumen = Number(boardMin[fixObject.color]);
//       }
//     });
//
//     outputObject.catalog = fixObject.fixture + ' ' + shieldCheck + ' ' + fixObject.cri + ' ' + fixObject.color;
//     outputObject.max = fixObject.fixture.slice(0,1) === 'F' ? 'Please see spec sheet for max lumens' : Math.round10(maxBoardLumen * boardCount * criX * fixEff, 1) + ' lumens @ ' + Math.round10(fixWatt, -1) + ' watts';
//     outputObject.min = Math.round10(fixEff * minBoardLumen * boardCount * criX, 1) + ' lumens @ ' + Math.round10(boardMin['inputWattage'] * boardCount, -1) + ' watts';
//     outputObject.maxLumens = Math.round10(maxBoardLumen * boardCount * criX * fixEff, 1);
//     outputObject.minLumens = Math.round10(fixEff * minBoardLumen * boardCount * criX, 1);
//     outputObject.maxWatts = Math.round10(fixWatt, -1);
//     outputObject.minWatts = Math.round10(boardMin['inputWattage'] * boardCount, -1);
//
//   };
//
//   return outputObject;
// };
//
// function getCustomOutput(fixObject) {
//
//   var boardData = fixObject.boardType === "1" ? barLineArea : fixObject.boardType === "2" ? linero22 : line22;
//   var fixEff = Number(fixObject.eff);
//   var criX = fixObject.cri === '80' ? 1 : fixObject.color === '30k' ? .921 : fixObject.color === '35k' ? .899 : fixObject.color === '40k' ? .892 : fixObject.color === '50k' ? .892 : 1;
//
//   var custTarget = Number(fixObject.customTarget);
//   var altCustTarget = Number(fixObject.altCustomTarget);
//   var custUnit = fixObject.customUnit;
//
//   var boardMax;
//   var maxBoardLumen;
//
//   var outputObject = {};
//
//   var altInputWatts;
//   var altOutputWatts;
//   var altBoardMax;
//   var altMaxBoardLumen;
//   var altFixEff = Number(fixObject.altEff);
//
//   if (fixObject.family === 'LIN') {
//
//     Object.keys(boardData).forEach(function(key) {
//       var relevantBoardData = custUnit === 'Watts' ? Number(boardData[key]['inputWattage']) : Number(boardData[key][fixObject.color]) * fixEff * criX;
//       var altRelevantBoardData = custUnit === 'Watts' ? Number(boardData[key]['inputWattage']) : Number(boardData[key][fixObject.color]) * altFixEff * criX;
//       if (relevantBoardData <= custTarget || boardMax === undefined) {
//         boardMax = custUnit === 'Lumens' ? boardData[Number(key) + 1] : boardData[key];
//         maxBoardLumen = Number(boardMax[fixObject.color]);
//       }
//       if (fixObject.altCustomTarget) {
//         if (altRelevantBoardData <= altCustTarget || altBoardMax === undefined) {
//           altBoardMax = custUnit === 'Lumens' ? boardData[Number(key) + 1] : boardData[key];
//           altMaxBoardLumen = Number(altBoardMax[fixObject.color]);
//           altInputWatts = Number(altBoardMax['inputWattage']);
//           altOutputWatts = Number(altBoardMax['outputWattage']);
//         }
//
//         outputObject.altCustomOutput = Math.round10(altFixEff * altMaxBoardLumen * criX, 1) + ' lm/ft @ ' + Math.round10(altBoardMax['inputWattage'], -1) + ' W/ft (fixture)';
//         outputObject.altCustomProg = Math.round10(altBoardMax['boardWattage'], -1) + ' W/ft (board) @ ' + Number(altBoardMax['mA']) + ' mA/ft';
//
//       };
//     });
//
//     outputObject.customOutput = Math.round10(fixEff * maxBoardLumen * criX, 1) + ' lm/ft @ ' + Math.round10(boardMax['inputWattage'], -1) + ' W/ft (fixture)';
//     outputObject.customProg = Math.round10(boardMax['boardWattage'], -1) + ' W/ft (board) @ ' + Number(boardMax['mA']) + ' mA/ft';
//
//   } else {
//     var boardCount = fixBoardCounts[fixObject.fixture];
//     var altBoardCount = fixBoardCounts[fixObject.altFixture];
//     var driverEff;
//     var fixWatt;
//     var totalmA;
//
//     Object.keys(boardData).forEach(function(key) {
//
//       var tempmA = boardCount * Number(boardData[key].mA);
//       var tempDrivEff;
//
//       if (fixObject.boardType === '3') {
//
//         if (tempmA < 2300 && tempmA >= 1458) {
//           tempDrivEff = .8425;
//         } else if (tempmA < 1458 && tempmA >= 1219) {
//           tempDrivEff = .8225;
//         } else if (tempmA < 1219 && tempmA >= 1145) {
//           tempDrivEff = .835;
//         } else if (tempmA < 1145 && tempmA >= 813) {
//           tempDrivEff = .8625;
//         } else if (tempmA < 813 && tempmA >= 673) {
//           tempDrivEff = .845;
//         } else if (tempmA < 673 && tempmA >= 549) {
//           tempDrivEff = .815;
//         } else if (tempmA < 549 && tempmA >= 372) {
//           tempDrivEff = .785;
//         } else if (tempmA < 372 && tempmA >= 279) {
//           tempDrivEff = .7575;
//         } else if (tempmA < 279 && tempmA >= 219) {
//           tempDrivEff = .695;
//         } else if (tempmA < 219 && tempmA >= 189) {
//           tempDrivEff = .6425;
//         } else if (tempmA < 189 && tempmA >= 151) {
//           tempDrivEff = .6025;
//         } else if (tempmA < 151) {
//           tempDrivEff = .568;
//         };
//       } else {
//         var altRelevantBoardData = custUnit === 'Watts' ? Number(boardData[key]['inputWattage']) * altBoardCount : Number(boardData[key][fixObject.color]) * altFixEff * altBoardCount * criX;
//
//         if (altRelevantBoardData <= altCustTarget || altBoardMax === undefined) {
//           altBoardMax = custUnit === 'Lumens' ? boardData[Number(key) + 1] : boardData[key];
//         }
//
//         if (tempmA > 2300) {
//           tempmA = tempmA / Math.ceil(fixObject.ul / 50);
//         };
//
//         if (tempmA < 2300 && tempmA >= 1675) {
//           tempDrivEff = .8365;
//         } else if (tempmA < 1675 && tempmA >= 1450) {
//           tempDrivEff = .825;
//         } else if (tempmA < 1450 && tempmA >= 1384) {
//           tempDrivEff = .8175;
//         } else if (tempmA < 1384 && tempmA >= 940) {
//           tempDrivEff = .85;
//         } else if (tempmA < 940 && tempmA >= 751) {
//           tempDrivEff = .828;
//         } else if (tempmA < 751 && tempmA >= 600) {
//           tempDrivEff = .808;
//         } else if (tempmA < 600 && tempmA >= 400) {
//           tempDrivEff = .79;
//         } else if (tempmA < 400 && tempmA >= 350) {
//           tempDrivEff = .76;
//         } else if (tempmA < 350 && tempmA >= 270) {
//           tempDrivEff = .725;
//         } else if (tempmA < 270 && tempmA >= 234) {
//           tempDrivEff = .685;
//         } else if (tempmA < 234 && tempmA >= 199) {
//           tempDrivEff = .65;
//         } else if (tempmA < 199) {
//           tempDrivEff = .60;
//         }
//       }
//
//       var relevantBoardData = custUnit === 'Watts' ? Number(boardData[key]['boardWattage']) / tempDrivEff  * boardCount : Number(boardData[key][fixObject.color]) * fixEff * boardCount * criX;
//
//       if (relevantBoardData <= custTarget || boardMax === undefined) {
//         driverEff = tempDrivEff
//         fixWatt = Number(boardData[key]['boardWattage']) / tempDrivEff  * boardCount;
//         boardMax = custUnit === 'Lumens' && key != 0 ? boardData[Number(key) + 1] : boardData[key];
//         totalmA = Number(boardData[key].mA) * boardCount;
//
//         maxBoardLumen = Number(boardMax[fixObject.color]);
//       }
//     });
//
//     // outputObject.max = fixObject.fixture.slice(0,1) === 'F' ? 'Please see spec sheet for max lumens' : Math.round10(maxBoardLumen * boardCount * criX * fixEff, 1) + ' lumens @ ' + Math.round10(fixWatt, -1) + ' watts';
//     // outputObject.min = Math.round10(fixEff * minBoardLumen * boardCount * criX, 1) + ' lumens @ ' + Math.round10(boardMin['inputWattage'] * boardCount, -1) + ' watts';
//     if (altCustTarget) {
//       outputObject.altCustomOutput = Math.round10(altFixEff * Number(altBoardMax[fixObject.color]) * criX * altBoardCount, 1) + ' lumens @ ' + Math.round10(altBoardMax['inputWattage'] * altBoardCount, -1) + ' watts (fixture) total';
//       outputObject.altCustomProg = Math.round10(altBoardMax['boardWattage'] * altBoardCount, -1) + ' watts (board) @ ' + Number(altBoardMax['mA']) * altBoardCount + ' mA total';
//     };
//
//     var customWattage = Number(boardMax['mA']) === 50 ? fixObject.minWatts : Math.round10(boardMax['boardWattage'] / driverEff * boardCount, -1);
//
//     outputObject.customOutput = Math.round10(fixEff * maxBoardLumen * boardCount * criX, 1) + ' lumens @ ' + customWattage + ' watts (fixture) total';
//     outputObject.customProg = Math.round10(boardMax['boardWattage'] * boardCount, -1) + ' watts (board) @ ' + Number(boardMax['mA']) * boardCount + ' mA total';
//
//   };
//
//   return outputObject;
// };

(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (value === null || isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // If the value is negative...
    if (value < 0) {
      return -decimalAdjust(type, -value, exp);
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();
