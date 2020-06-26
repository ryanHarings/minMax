function getMinMax(fixObj) {
    var outputObject = {}
    
    var size = String(fixObj.fixture.match(/\d+/)[0])
    console.log(fixObj.fixture.match(/\d+/))
    var color = fixObj.cri.slice(0,1) + fixObj.color.slice(0,2)

    if (fixObj.hasOwnProperty("directShielding")) {
        var dirMaxValues = calculateOutput(getCoef(fixObj.fixture, size, color, "Lumens"), "lim", "D", fixObj.dirThermLim[1])
        var dirMinValues = calculateOutput(getCoef(fixObj.fixture, size, color, "Lumens"), "lim", "D", fixObj.dirThermLim[0])

        outputObject.direct = {}
        outputObject.direct.maxLumen = dirMaxValues[1] * fixObj.directEff
        outputObject.direct.maxWatt = dirMaxValues[2] * fixObj.dirWattAdj
        outputObject.direct.minLumen = dirMinValues[1] * fixObj.directEff
        outputObject.direct.minWatt = dirMinValues[2] * fixObj.dirWattAdj
    }
    if (fixObj.hasOwnProperty("indirectShielding")) {
        var indMaxValues = calculateOutput(getCoef(fixObj.fixture, size, color, "Lumens"), "lim", "I", fixObj.indThermLim[1])
        var indMinValues = calculateOutput(getCoef(fixObj.fixture, size, color, "Lumens"), "lim", "I", fixObj.indThermLim[0])

        outputObject.indirect = {}
        outputObject.indirect.maxLumen = indMaxValues[1] * fixObj.indirectEff
        outputObject.indirect.maxWatt = indMaxValues[2] * fixObj.indWattAdj
        outputObject.indirect.minLumen = indMinValues[1] * fixObj.indirectEff
        outputObject.indirect.minWatt = indMinValues[2] * fixObj.indWattAdj
    }

    return outputObject
}

function getCustomOutput(fixObj) {
    var outputObject = {}
    
    var size = String(fixObj.fixture.match(/\d+/)[0])
    var color = fixObj.cri.slice(0,1) + fixObj.color.slice(0,2)

    if (fixObj.hasOwnProperty("directTarget")) {
        var dirMaxValues = calculateOutput(getCoef(fixObj.fixture, size, color, fixObj.customUnit), fixObj.directTarget/fixObj.directEff, "D")

        outputObject.direct = {}
        outputObject.direct.maxLumen = dirMaxValues[1] * fixObj.directEff
        outputObject.direct.maxWatt = dirMaxValues[2] * fixObj.dirWattAdj
        outputObject.direct.mA = dirMaxValues[0]

    }
    if (fixObj.hasOwnProperty("indirectTarget")) {
        var indMaxValues = calculateOutput(getCoef(fixObj.fixture, size, color, fixObj.customUnit), fixObj.indirectTarget/fixObj.indirectEff, "I")

        outputObject.indirect = {}
        outputObject.indirect.maxLumen = indMaxValues[1] * fixObj.indirectEff
        outputObject.indirect.maxWatt = indMaxValues[2] * fixObj.indWattAdj
        outputObject.indirect.mA = indMaxValues[0]

    }
    console.log(outputObject)
    return outputObject
}

// getMinMax({"fixture":"F24D/I", "cri":"80", "color":"35k", "directShielding":"AL", "directEff":.744})

function calculateOutput(coeffArr, targetVal, hemisphere, limit) {
    var mA
    var lumens
    var watts
    if (typeof targetVal === "number") {
        mA = Math.round10(parseFloat(coeffArr[0]["a"+hemisphere] * Math.pow(targetVal, 2)) + parseFloat(coeffArr[0]["b"+hemisphere] * targetVal) + parseFloat(coeffArr[0]["c"+hemisphere]))
    } else {
        mA = limit
    }

    watts = Math.round10(parseFloat(coeffArr[1]["a"+hemisphere] * Math.pow(mA, 2)) + parseFloat(coeffArr[1]["b"+hemisphere] * mA) + parseFloat(coeffArr[1]["c"+hemisphere]))
    lumens = Math.round10(parseFloat(coeffArr[2]["a"+hemisphere] * Math.pow(mA, 2)) + parseFloat(coeffArr[2]["b"+hemisphere] * mA) + parseFloat(coeffArr[2]["c"+hemisphere]))
    
    // console.log([mA,lumens,watts])
    return [mA,lumens,watts]
}

function getCoef(fixt, fixtSize, coefBoard, targetUnit) {
    var fixture = fixt.includes("LF") && fixt.includes("D") ? "LFD" : "FND"
    var tableName = fixture.concat(targetUnit === "Watts" ? "wattToMa" : "lumToMa")
    // select the set of coefficients
    var coefArr = [
        eval(tableName)[fixtSize][coefBoard], // target to mA
        eval(fixture.concat("mAToWatt"))[fixtSize][coefBoard], // mA to watt
        eval(fixture.concat("mAToLum"))[fixtSize][coefBoard] // mA to lumen (actual)
    ]
    return coefArr
}

// calculateOutput(getCoef("14", "835", "Lumens"), 800, "D", 20, 105);
// calculateOutput(getCoef("24", "835", "Lumens"), "min", "D", 20, 105);