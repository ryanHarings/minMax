const V3lumToMa = parseObjectHandler(Papa.parse(`shielding,board,aDir,bDir,cDir,aInd,bInd,cInd
    A,830,0.00000487,0.22520000,2.09700000,0.00000487,0.2252,2.097
A,835,0.00000462,0.21920000,2.09700000,0.00000462,0.2192,2.097
A,840,0.00000447,0.21570000,2.09700000,0.00000447,0.2157,2.097
A,927,0.00000731,0.27580000,2.09700000,0.00000731,0.2758,2.097
A,930,0.00000684,0.26690000,2.09700000,0.00000684,0.2669,2.097
A,935,0.00000662,0.26250000,2.09700000,0.00000662,0.2625,2.097
A,940,0.00000629,0.25580000,2.09700000,0.00000629,0.2558,2.097
WS,830,,,,0.00000381,0.199,2.097
WS,835,,,,0.00000361,0.1937,2.097
WS,840,,,,0.00000349,0.1906,2.097
WS,927,,,,0.00000571,0.2437,2.097
WS,930,,,,0.00000535,0.2359,2.097
WS,935,,,,0.00000517,0.232,2.097
WS,940,,,,0.00000491,0.226,2.097
    `,{header: true}).data)

const V3mAToLum = parseObjectHandler(Papa.parse(`shielding,board,aDir,bDir,cDir,aInd,bInd,cInd
    A,830,-0.00038770,4.43600000,-8.97400000,-0.0003877,4.436,-8.974
A,835,-0.00039920,4.55700000,-9.24500000,-0.0003992,4.557,-9.245
A,840,-0.00040640,4.63200000,-9.41300000,-0.0004064,4.632,-9.413
A,927,-0.00030990,3.62000000,-7.10700000,-0.0003099,3.62,-7.107
A,930,-0.00032150,3.74100000,-7.39100000,-0.0003215,3.741,-7.391
A,935,-0.00032750,3.80400000,-7.53700000,-0.0003275,3.804,-7.537
A,940,-0.00033700,3.90400000,-7.76900000,-0.000337,3.904,-7.769
WS,830,,,,-0.0004435,5.021,-10.27
WS,835,,,,-0.0004566,5.158,-10.57
WS,840,,,,-0.0004647,5.243,-10.76
WS,927,,,,-0.0003554,4.097,-8.211
WS,930,,,,-0.0003685,4.235,-8.522
WS,935,,,,-0.0003753,4.306,-8.682
WS,940,,,,-0.0003861,4.419,-8.938
    `, {header: true}).data)

const V3mAToWatt = parseObjectHandler(Papa.parse(`shielding,board,aDir,bDir,cDir,aInd,bInd,cInd
    A,830,-0.00000625,0.03306000,-0.23010000,-0.00000625,0.03306,-0.2301
A,835,-0.00000649,0.03306000,-0.22490000,-0.00000649,0.03306,-0.2249
A,840,0.00000469,0.02992000,-0.01255000,0.00000469,0.02992,-0.01255
A,927,-0.00000271,0.03251000,-0.22440000,-0.00000271,0.03251,-0.2244
A,930,-0.00000270,0.03243000,-0.20770000,-0.0000027,0.03243,-0.2077
A,935,-0.00000110,0.03186000,-0.15880000,-0.0000011,0.03186,-0.1588
A,940,0.00000212,0.03055000,-0.04020000,0.00000212,0.03055,-0.0402
WS,830,,,,0.0000049,0.02992,-0.01346
WS,835,,,,0.00000534,0.0295,0.04126
WS,840,,,,0.00000539,0.0295,0.04023
WS,927,,,,0.00000212,0.03055,-0.03951
WS,930,,,,-0.00000804,0.03385,-0.3041
WS,935,,,,-0.00000822,0.03385,-0.2997
WS,940,,,,-0.00000622,0.03306,-0.2309
    `, {header: true}).data)

const V3wattToMa = parseObjectHandler(Papa.parse(`shielding,board,aDir,bDir,cDir,aInd,bInd,cInd
    A,830,0.21220000,30.12000000,7.31100000,0.2122,30.12,7.311
A,835,0.22080000,30.12000000,7.15100000,0.2208,30.12,7.151
A,840,-0.15020000,33.30000000,0.59770000,-0.1502,33.3,0.5977
A,927,0.08792000,30.74000000,7.02300000,0.08792,30.74,7.023
A,930,0.08793000,30.82000000,6.51500000,0.08793,30.82,6.515
A,935,0.03562000,31.39000000,5.00300000,0.03562,31.39,5.003
A,940,-0.06864000,32.70000000,1.37700000,-0.06864,32.7,1.377
WS,830,,,,-0.1578,33.31,0.603
WS,835,,,,-0.1776,33.79,-1.221
WS,840,,,,-0.1796,33.79,-1.191
WS,927,,,,-0.06874,32.7,1.346
WS,930,,,,0.2721,29.31,9.632
WS,935,,,,0.2785,29.31,9.497
WS,940,,,,0.2111,30.13,7.334
    `, {header: true}).data)