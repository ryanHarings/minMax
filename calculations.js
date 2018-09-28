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

var textColor;

// dis for THE David Barbour, boy you fancy AF
$('.stylin').click(function(){
  textColor = $('body').css('color');
  if (textColor === 'rgba(0, 0, 0, 0.87)' || textColor === 'rgb(0, 0, 0)') {
    $('body').css('color', 'pink');
    textColor = $('body').css('color');
  } else {
    $('body').css('color', 'black');
    textColor = $('body').css('color');
  }
  $('.input-field label').css('color', textColor)
});

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
      $('.direct').show();
      $('.indirect').show();
      var hemisphere = key === 'DIR' ? 'direct' : 'indirect';
      Object.keys(selectedFixtureShielding[key]).forEach(function(shield) {
        $('.shielding > article > .' + hemisphere).append('<div class="lens hover" id="' + key + "_" + shield + '" data-eff="' + selectedFixtureShielding[key][shield] + '">' + shield + '</div>');
      })
    } else if (key !== 'DIR' && key !== 'IND'){
      $('.direct').show();
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
  
  if ((selection.fixture.split('').reverse()[0] !== 'B' && selection.fixture !== 'EX3D/I' && selection.fixture !== 'L6D/I') && selection.fixture !== 'L8D/I' || Number($(this).attr('id').split('_')[1]) > 0) {
    if (hemiLabel === 'direct') {
      $('.indirect').hide();
    }
    if (hemiLabel === 'indirect') {
      $('.direct').hide();
    }
  }

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

  // if (selection.fixture === 'EX3D/I' || selection.fixture === 'EV3D') {
  if (selection.boardID === 4) {
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

  //if there are any watts remaining for use on inverse side
  if (selection.hasOwnProperty('directShielding') && selection.hasOwnProperty('indirectShielding') && selection.fixture.charAt(0) !== 'F') {
    
    if (selection.fixture !== 'L6D/I' && selection.fixture !== 'L8D/I') {
      var inverseData = getOutput(selection);
    } else {
      var inverseData = {
        indirect: {
          maxLumen: 0,
          maxWatt: 0
        },
        direct: {
          maxLumen: 0,
          maxWatt: 0
        }
      }
    }

    selection.indirectRemMaxLumens = Math.floor10(inverseData.indirect.maxLumen * selection.indirectBoardCount * selection.indirectEff, 1);
    selection.indirectRemMaxWattage = Math.ceil10(inverseData.indirect.maxWatt * selection.indirectBoardCount, -1);

    selection.directRemMaxLumens = Math.floor10(inverseData.direct.maxLumen * selection.directBoardCount * selection.directEff, 1);
    selection.directRemMaxWattage = Math.ceil10(inverseData.direct.maxWatt * selection.directBoardCount, -1);

    directInverseLumen = ' (ind: ' + selection.indirectRemMaxLumens + ')';
    directInverseWatt = ' (ind: ' + selection.indirectRemMaxWattage + ')';
    indirectInverseLumen = ' (dir: ' + selection.directRemMaxLumens + ')';
    indirectInverseWatt = ' (dir: ' + selection.directRemMaxWattage + ')';

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
  } else if (selection.fixture === 'L6D/I' || selection.fixture === 'L8D/I') {
    if (selection.directShielding === '100') {
      fixtureName = selection.fixture.replace('/I', '');
    } else {
      fixtureName = selection.fixture.replace('/', '')
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
  // if (selection.fixture !== 'EX3D/I' && selection.fixture !== 'EV3D') {
  if (selection.boardID !== 4) {
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
  console.log(selection)
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
    var mALabel = selection.family === 'LIN' ? ' mA/ft @ ' : ' mA total @ ';

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
  if (fixObject.boardID === 4 || fixObject.color === '27k') {
    criMultiplier = 1;
  }

  var outputObject = {};

  var linBoardCount = fixObject.directShielding === '35' ? 4 : fixObject.fixture === 'L6D/I' ? 16 : fixObject.fixture === 'L8D/I' ? 16 : fixObject.fixture === 'EX3D/I' ? 4 : fixObject.fixture === 'EV3D' ? 4 : 6;
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
      } else if ((selObject.fixture === 'L6D/I' || selObject.fixture === 'L8D/I') && wVar <= selObject.ulW) {
        if (hemi === 'direct') {
          return Number(lumenD.mA) <= 287;
        } else {
          return Number(lumenD.mA) <= 285;
        }
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

function driverEff(boardType,mA,ul) {
  var driverEff;

  if (boardType === 3) { //bar22
    if (mA < 1984) {driverEff = .91;}
    if (mA < 1900) {driverEff = .911;}
    if (mA < 1800) {driverEff = .911;}
    if (mA < 1700) {driverEff = .91;}
    if (mA < 1600) {driverEff = .907;}
    if (mA < 1500) {driverEff = .902;}
    if (mA < 1400) {driverEff = .901;}
    if (mA < 1300) {driverEff = .894;}
    if (mA < 1200) {driverEff = .89;}
    if (mA < 1100) {driverEff = .911;}
    if (mA < 1000) {driverEff = .907;}
    if (mA < 900) {driverEff = .897;}
    if (mA < 800) {driverEff = .879;}
    if (mA < 700) {driverEff = .85;}
    if (mA < 600) {driverEff = .822;}
    if (mA < 500) {driverEff = .818;}
    if (mA < 400) {driverEff = .779;}
    if (mA < 300) {driverEff = .711;}
    if (mA < 200) {driverEff = .597;}
    if (mA < 100) {driverEff = .559;}
  } else if (boardType === 1) { //bar, line, area
    if (mA > 2300) {
      mA = mA / Math.ceil(ul / 85);
    };

    if (mA <= 2300) {driverEff = .90;}
    if (mA < 2200) {driverEff = .897;}
    if (mA < 2100) {driverEff = .898;}
    if (mA < 2000) {driverEff = .898;}
    if (mA < 1900) {driverEff = .897;}
    if (mA < 1800) {driverEff = .898;}
    if (mA < 1700) {driverEff = .897;}
    if (mA < 1600) {driverEff = .897;}
    if (mA < 1500) {driverEff = .908;}
    if (mA < 1400) {driverEff = .90;}
    if (mA < 1300) {driverEff = .896;}
    if (mA < 1200) {driverEff = .894;}
    if (mA < 1100) {driverEff = .89;}
    if (mA < 1000) {driverEff = .86;}
    if (mA < 900) {driverEff = .859;}
    if (mA < 841) {driverEff = .859;}
    if (mA < 800) {driverEff = .844;}
    if (mA < 700) {driverEff = .828;}
    if (mA < 600) {driverEff = .828;}
    if (mA < 561) {driverEff = .832;}
    if (mA < 500) {driverEff = .805;}
    if (mA < 400) {driverEff = .762;}
    if (mA < 300) {driverEff = .692;}
    if (mA < 200) {driverEff = .576;}
    if (mA < 100) {driverEff = .563;}
  } else if (boardType === 2) { //line22

    if (mA <= 1872) {driverEff = .91;}
    if (mA < 1800) {driverEff = .912;}
    if (mA < 1700) {driverEff = .912;}
    if (mA < 1600) {driverEff = .908;}
    if (mA < 1500) {driverEff = .908;}
    if (mA < 1400) {driverEff = .909;}
    if (mA < 1300) {driverEff = .906;}
    if (mA < 1200) {driverEff = .903;}
    if (mA < 1100) {driverEff = .913;}
    if (mA < 1000) {driverEff = .907;}
    if (mA < 900) {driverEff = .90;}
    if (mA < 800) {driverEff = .891;}
    if (mA < 700) {driverEff = .855;}
    if (mA < 600) {driverEff = .855;}
    if (mA < 500) {driverEff = .855;}
    if (mA < 441) {driverEff = .856;}
    if (mA < 400) {driverEff = .78;}
    if (mA < 300) {driverEff = .758;}
    if (mA < 200) {driverEff = .612;}
    if (mA < 100) {driverEff = .572;}

  } else if (boardType === 4) { //line2
    if (mA > 2300) {
      mA = mA / Math.ceil(mA/2300);
    };

    if (mA <= 2300) {driverEff = .873;}
    if (mA < 1600) {driverEff = .873;}
    if (mA < 1400) {driverEff = .885;}
    if (mA < 1300) {driverEff = .872;}
    if (mA < 1150) {driverEff = .872;}
    if (mA < 1050) {driverEff = .864;}
    if (mA < 1000) {driverEff = .866;}
    if (mA < 950) {driverEff = .838;}
    if (mA < 900) {driverEff = .834;}
    if (mA < 850) {driverEff = .831;}
    if (mA < 800) {driverEff = .833;}
    if (mA < 750) {driverEff = .828;}
    if (mA < 700) {driverEff = .821;}
    if (mA < 650) {driverEff = .814;}
    if (mA < 600) {driverEff = .804;}
    if (mA < 550) {driverEff = .814;}
    if (mA < 525) {driverEff = .805;}
    if (mA < 479) {driverEff = .799;}
    if (mA < 470) {driverEff = .802;}
    if (mA < 461) {driverEff = .796;}
    if (mA < 450) {driverEff = .791;}
    if (mA < 400) {driverEff = .773;}
    if (mA < 350) {driverEff = .759;}
    if (mA < 250) {driverEff = .678;}
    if (mA < 150) {driverEff = .527;}
  }
  return driverEff;
};

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
