const EX2DlumToMa = parseObjectHandler(Papa.parse(`shielding,board,aDir,bDir,cDir,aInd,bInd,cInd
    A,830,0.00001133,0.25040000,-0.67690000,,,
A,835,0.00001066,0.24290000,-0.67690000,,,
A,840,0.00001066,0.24290000,-0.67690000,,,
A,850,0.00000949,0.22910000,-0.67690000,,,
A,927,0.00001692,0.30600000,-0.67690000,,,
A,930,0.00001432,0.28150000,-0.67690000,,,
A,935,0.00001443,0.28260000,-0.67690000,,,
A,940,0.00001443,0.28260000,-0.67690000,,,
A,950,0.00001480,0.28620000,-0.67690000,,,
AL,830,0.00001090,0.24550000,-0.67690000,,,
AL,835,0.00001025,0.23820000,-0.67690000,,,
AL,840,0.00001025,0.23820000,-0.67690000,,,
AL,850,0.00000913,0.22470000,-0.67690000,,,
AL,927,0.00001628,0.30010000,-0.67690000,,,
AL,930,0.00001378,0.27610000,-0.67690000,,,
AL,935,0.00001388,0.27720000,-0.67690000,,,
AL,940,0.00001388,0.27720000,-0.67690000,,,
AL,950,0.00001424,0.28070000,-0.67690000,,,
BW,830,0.00000796,0.20980000,-0.67690000,0.00000622,0.1855,-0.6769
BW,835,0.00000749,0.20360000,-0.67690000,0.00000585,0.1799,-0.6769
BW,840,0.00000749,0.20360000,-0.67690000,0.00000585,0.1799,-0.6769
BW,850,0.00000667,0.19210000,-0.67690000,0.00000521,0.1698,-0.6769
BW,927,0.00001189,0.25650000,-0.67690000,0.00000929,0.2267,-0.6769
BW,930,0.00001006,0.23590000,-0.67690000,0.00000786,0.2086,-0.6769
BW,935,0.00001014,0.23690000,-0.67690000,0.00000792,0.2094,-0.6769
BW,940,0.00001014,0.23690000,-0.67690000,0.00000792,0.2094,-0.6769
BW,950,0.00001040,0.23990000,-0.67690000,0.00000812,0.212,-0.6769
HE,830,0.00000798,0.21010000,-0.67690000,0.00000541,0.1731,-0.6769
HE,835,0.00000751,0.20380000,-0.67690000,0.00000509,0.1679,-0.6769
HE,840,0.00000751,0.20380000,-0.67690000,0.00000509,0.1679,-0.6769
HE,850,0.00000668,0.19230000,-0.67690000,0.00000454,0.1584,-0.6769
HE,927,0.00001192,0.25680000,-0.67690000,0.00000809,0.2115,-0.6769
HE,930,0.00001009,0.23620000,-0.67690000,0.00000685,0.1946,-0.6769
HE,935,0.00001016,0.23720000,-0.67690000,0.0000069,0.1954,-0.6769
HE,940,0.00001016,0.23720000,-0.67690000,0.0000069,0.1954,-0.6769
HE,950,0.00001043,0.24020000,-0.67690000,0.00000708,0.1979,-0.6769
HEA,830,,,,0.00000723,0.2,-0.6769
HEA,835,,,,0.0000068,0.194,-0.6769
HEA,840,,,,0.0000068,0.194,-0.6769
HEA,850,,,,0.00000605,0.183,-0.6769
HEA,927,,,,0.0000108,0.2444,-0.6769
HEA,930,,,,0.00000914,0.2249,-0.6769
HEA,935,,,,0.00000921,0.2257,-0.6769
HEA,940,,,,0.00000921,0.2257,-0.6769
HEA,950,,,,0.00000945,0.2286,-0.6769
HED,830,0.00001216,0.25940000,-0.67690000,,,
HED,835,0.00001144,0.25160000,-0.67690000,,,
HED,840,0.00001144,0.25160000,-0.67690000,,,
HED,850,0.00001018,0.23740000,-0.67690000,,,
HED,927,0.00001816,0.31700000,-0.67690000,,,
HED,930,0.00001537,0.29160000,-0.67690000,,,
HED,935,0.00001549,0.29270000,-0.67690000,,,
HED,940,0.00001549,0.29270000,-0.67690000,,,
HED,950,0.00001588,0.29650000,-0.67690000,,,
WHE,830,0.00000835,0.215,-0.6769,0.000008,0.2105,-0.6769
WHE,835,0.00000786,0.2086,-0.6769,0.00000753,0.2042,-0.6769
WHE,840,0.00000786,0.2086,-0.6769,0.00000753,0.2042,-0.6769
WHE,850,0.000007,0.1968,-0.6769,0.00000671,0.1926,-0.6769
WHE,927,0.00001248,0.2628,-0.6769,0.00001196,0.2572,-0.6769
WHE,930,0.00001056,0.2418,-0.6769,0.00001012,0.2366,-0.6769
WHE,935,0.00001064,0.2427,-0.6769,0.0000102,0.2375,-0.6769
WHE,940,0.00001064,0.2427,-0.6769,0.0000102,0.2375,-0.6769
WHE,950,0.00001092,0.2458,-0.6769,0.00001046,0.2406,-0.6769
    `,{header: true}).data)

const EX2DmAToLum = parseObjectHandler(Papa.parse(`shielding,board,aDir,bDir,cDir,aInd,bInd,cInd
    A,830,-0.00059290,3.97100000,4.01300000,,,
A,835,-0.00061470,4.09500000,4.02400000,,,
A,840,-0.00061470,4.09500000,4.02400000,,,
A,850,-0.00065840,4.34200000,4.06300000,,,
A,927,-0.00046510,3.24000000,4.11200000,,,
A,930,-0.00051500,3.52700000,4.03300000,,,
A,935,-0.00051260,3.51300000,4.03600000,,,
A,940,-0.00051260,3.51300000,4.03600000,,,
A,950,-0.00050470,3.46800000,4.04400000,,,
AL,830,-0.00060670,4.04900000,4.01900000,,,
AL,835,-0.00062900,4.17600000,4.03400000,,,
AL,840,-0.00062900,4.17600000,4.03400000,,,
AL,850,-0.00067350,4.42800000,4.08100000,,,
AL,927,-0.00047630,3.30500000,4.08900000,,,
AL,930,-0.00052720,3.59700000,4.02300000,,,
AL,935,-0.00052480,3.58300000,4.02500000,,,
AL,940,-0.00052480,3.58300000,4.02500000,,,
AL,950,-0.00051680,3.53700000,4.03200000,,,
BW,830,-0.00072960,4.74500000,4.16500000,-0.0008411,5.373,4.392
BW,835,-0.00075580,4.89300000,4.21200000,-0.0008708,5.54,4.463
BW,840,-0.00075580,4.89300000,4.21200000,-0.0008708,5.54,4.463
BW,850,-0.00080820,5.18800000,4.31800000,-0.0009302,5.873,4.614
BW,927,-0.00057600,3.87500000,4.00900000,-0.0006667,4.389,4.072
BW,930,-0.00063600,4.21600000,4.04000000,-0.0007348,4.775,4.174
BW,935,-0.00063310,4.19900000,4.03800000,-0.0007315,4.756,4.168
BW,940,-0.00063310,4.19900000,4.03800000,-0.0007315,4.756,4.168
BW,950,-0.00062370,4.14600000,4.03000000,-0.0007208,4.696,4.15
HE,830,-0.00072850,4.73900000,4.16300000,-0.00091,5.76,4.561
HE,835,-0.00075460,4.88600000,4.21000000,-0.0009419,5.939,4.645
HE,840,-0.00075460,4.88600000,4.21000000,-0.0009419,5.939,4.645
HE,850,-0.00080700,5.18100000,4.31500000,-0.001006,6.296,4.821
HE,927,-0.00057520,3.87000000,4.00900000,-0.0007228,4.706,4.153
HE,930,-0.00063510,4.21000000,4.04000000,-0.000796,5.119,4.292
HE,935,-0.00063220,4.19400000,4.03700000,-0.0007924,5.099,4.284
HE,940,-0.00063220,4.19400000,4.03700000,-0.0007924,5.099,4.284
HE,950,-0.00062280,4.14100000,4.03000000,-0.000781,5.035,4.261
HEA,830,,,,-0.0007714,4.981,4.242
HEA,835,,,,-0.0007989,5.135,4.298
HEA,840,,,,-0.0007989,5.135,4.298
HEA,850,,,,-0.0008539,5.445,4.422
HEA,927,,,,-0.00061,4.068,4.021
HEA,930,,,,-0.0006731,4.426,4.08
HEA,935,,,,-0.00067,4.408,4.077
HEA,940,,,,-0.00067,4.408,4.077
HEA,950,,,,-0.0006601,4.352,4.065
HED,830,-0.00056840,3.83100000,4.00800000,,,
HED,835,-0.00058940,3.95100000,4.01200000,,,
HED,840,-0.00058940,3.95100000,4.01200000,,,
HED,850,-0.00063150,4.19000000,4.03600000,,,
HED,927,-0.00044530,3.12600000,4.16300000,,,
HED,930,-0.00049330,3.40300000,4.06000000,,,
HED,935,-0.00049100,3.38900000,4.06300000,,,
HED,940,-0.00049100,3.38900000,4.06300000,,,
HED,950,-0.00048350,3.34600000,4.07600000,,,
WHE,830,-0.0007092,4.63,4.131,-0.0007271,4.731,4.16
WHE,835,-0.0007348,4.774,4.174,-0.0007532,4.878,4.207
WHE,840,-0.0007348,4.774,4.174,-0.0007532,4.878,4.207
WHE,850,-0.0007859,5.062,4.271,-0.0008055,5.173,4.312
WHE,927,-0.0005595,3.781,4.009,-0.000574,3.864,4.009
WHE,930,-0.000618,4.113,4.026,-0.0006338,4.203,4.038
WHE,935,-0.0006152,4.097,4.024,-0.0006309,4.187,4.036
WHE,940,-0.0006152,4.097,4.024,-0.0006309,4.187,4.036
WHE,950,-0.000606,4.045,4.019,-0.0006216,4.134,4.029
    `, {header: true}).data)

const EX2DmAToWatt = parseObjectHandler(Papa.parse(`shielding,board,aDir,bDir,cDir,aInd,bInd,cInd
    A,830,-0.00002226,0.04469000,-0.39460000,,,
A,835,-0.00001111,0.03937000,0.19010000,,,
A,840,-0.00001111,0.03937000,0.19010000,,,
A,850,0.00000127,0.03543000,0.45680000,,,
A,927,0.00002500,0.02501000,1.59200000,,,
A,930,0.00000697,0.03291000,0.73490000,,,
A,935,0.00000696,0.03291000,0.73770000,,,
A,940,0.00000696,0.03291000,0.73770000,,,
A,950,0.00001672,0.02931000,1.06400000,,,
AL,830,-0.00001092,0.03938000,0.19190000,,,
AL,835,0.00000145,0.03544000,0.47400000,,,
AL,840,0.00000145,0.03544000,0.47400000,,,
AL,850,-0.00004618,0.05187000,-0.80990000,,,
AL,927,0.00002540,0.02501000,1.56200000,,,
AL,930,0.00000699,0.03291000,0.72120000,,,
AL,935,0.00000698,0.03291000,0.72390000,,,
AL,940,0.00000698,0.03291000,0.72390000,,,
AL,950,0.00000697,0.03291000,0.73280000,,,
BW,830,-0.00004101,0.04945000,-0.59850000,0.00000853,0.03349,0.6135
BW,835,-0.00004254,0.04945000,-0.57950000,0.00002023,0.03027,0.7909
BW,840,-0.00004254,0.04945000,-0.57950000,0.00002023,0.03027,0.7909
BW,850,0.00000844,0.03349000,0.63450000,0.00006382,0.02108,1.22
BW,927,-0.00002155,0.04469000,-0.40510000,-0.00004571,0.05186,-0.8174
BW,930,0.00000141,0.03544000,0.46980000,-0.00004132,0.04945,-0.5946
BW,935,0.00000143,0.03544000,0.47150000,-0.00004112,0.04945,-0.597
BW,940,0.00000143,0.03544000,0.47150000,-0.00004112,0.04945,-0.597
BW,950,0.00000149,0.03544000,0.47720000,-0.0000405,0.04945,-0.6051
HE,830,-0.00004095,0.04945000,-0.59930000,0.00002082,0.03026,0.7615
HE,835,-0.00004247,0.04945000,-0.58020000,0.00006448,0.02107,1.207
HE,840,-0.00004247,0.04945000,-0.58020000,0.00006448,0.02107,1.207
HE,850,0.00000843,0.03349000,0.63530000,0.0000108,0.03492,0.3984
HE,927,-0.00002151,0.04468000,-0.40560000,-0.00004061,0.04945,-0.6036
HE,930,0.00000141,0.03544000,0.47030000,-0.00001779,0.03998,0.2586
HE,935,0.00000143,0.03544000,0.47210000,-0.0000177,0.03998,0.2595
HE,940,0.00000143,0.03544000,0.47210000,-0.0000177,0.03998,0.2595
HE,950,0.00000149,0.03544000,0.47780000,-0.000044,0.04945,-0.5623
HEA,830,,,,-0.00004345,0.04945,-0.5687
HEA,835,,,,-0.00001787,0.03998,0.2578
HEA,840,,,,-0.00001787,0.03998,0.2578
HEA,850,,,,0.00001998,0.03028,0.8043
HEA,927,,,,-0.000011,0.03937,0.1912
HEA,930,,,,-0.00004615,0.05187,-0.8104
HEA,935,,,,-0.00004594,0.05186,-0.8137
HEA,940,,,,-0.00004594,0.05186,-0.8137
HEA,950,,,,0.00000126,0.03543,0.4559
HED,830,0.00000754,0.03310000,0.61850000,,,
HED,835,-0.00002211,0.04469000,-0.39670000,,,
HED,840,-0.00002211,0.04469000,-0.39670000,,,
HED,850,0.00000144,0.03544000,0.47250000,,,
HED,927,0.00002361,0.02531000,1.62200000,,,
HED,930,0.00002601,0.02499000,1.51800000,,,
HED,935,0.00002593,0.02499000,1.52400000,,,
HED,940,0.00002593,0.02499000,1.52400000,,,
HED,950,0.00002566,0.02500000,1.54300000,,,
WHE,830,-0.00003982,0.04945,-0.6141,-0.00004345,0.04945,-0.5687
WHE,835,-0.00004131,0.04945,-0.5946,-0.00001787,0.03998,0.2578
WHE,840,-0.00004131,0.04945,-0.5946,-0.00001787,0.03998,0.2578
WHE,850,-0.00001752,0.03998,0.2612,0.00001998,0.03028,0.8043
WHE,927,0.00000752,0.0331,0.6265,-0.000011,0.03937,0.1912
WHE,930,-0.00001119,0.03937,0.1894,-0.00004615,0.05187,-0.8104
WHE,935,-0.00001112,0.03937,0.19,-0.00004594,0.05186,-0.8137
WHE,940,-0.00001112,0.03937,0.19,-0.00004594,0.05186,-0.8137
WHE,950,-0.0000109,0.03938,0.1921,0.00000126,0.03543,0.4559

    `, {header: true}).data)

const EX2DwattToMa = parseObjectHandler(Papa.parse(`shielding,board,aDir,bDir,cDir,aInd,bInd,cInd
    A,830,0.47580000,20.76000000,13.32000000,,,
A,835,0.25490000,24.77000000,-3.51600000,,,
A,840,0.25490000,24.77000000,-3.51600000,,,
A,850,-0.02743000,28.24000000,-12.89000000,,,
A,927,-0.49650000,36.16000000,-46.18000000,,,
A,930,-0.14980000,30.30000000,-21.51000000,,,
A,935,-0.14950000,30.30000000,-21.58000000,,,
A,940,-0.14950000,30.30000000,-21.58000000,,,
A,950,-0.33680000,32.94000000,-30.84000000,,,
AL,830,0.24990000,24.77000000,-3.56600000,,,
AL,835,-0.03120000,28.24000000,-13.36000000,,,
AL,840,-0.03120000,28.24000000,-13.36000000,,,
AL,850,1.00800000,14.52000000,28.16000000,,,
AL,927,-0.50690000,36.20000000,-45.42000000,,,
AL,930,-0.15100000,30.31000000,-21.13000000,,,
AL,935,-0.15080000,30.31000000,-21.21000000,,,
AL,940,-0.15080000,30.31000000,-21.21000000,,,
AL,950,-0.15000000,30.30000000,-21.45000000,,,
BW,830,0.86780000,16.88000000,20.24000000,-0.1842,29.9,-17.99
BW,835,0.90500000,16.82000000,19.72000000,-0.4395,32.63,-24.12
BW,840,0.90500000,16.82000000,19.72000000,-0.4395,32.63,-24.12
BW,850,-0.18110000,29.89000000,-18.59000000,-1.203,38.97,-35.83
BW,927,0.45820000,20.79000000,13.58000000,0.996,14.55,28.37
BW,930,-0.03030000,28.24000000,-13.24000000,0.8753,16.86,20.14
BW,935,-0.03067000,28.24000000,-13.29000000,0.8706,16.87,20.21
BW,940,-0.03067000,28.24000000,-13.29000000,0.8706,16.87,20.21
BW,950,-0.03187000,28.24000000,-13.45000000,0.8554,16.89,20.42
HE,830,0.86630000,16.88000000,20.27000000,-0.455,32.66,-23.27
HE,835,0.90350000,16.82000000,19.75000000,-1.218,38.99,-35.47
HE,840,0.90350000,16.82000000,19.75000000,-1.218,38.99,-35.47
HE,850,-0.18100000,29.89000000,-18.61000000,-0.2043,28.6,-11.11
HE,927,0.45720000,20.79000000,13.60000000,0.8582,16.89,20.39
HE,930,-0.03042000,28.24000000,-13.26000000,0.4275,23.9,-4.597
HE,935,-0.03079000,28.24000000,-13.31000000,0.425,23.91,-4.618
HE,940,-0.03079000,28.24000000,-13.31000000,0.425,23.91,-4.618
HE,950,-0.03198000,28.24000000,-13.47000000,0.9409,16.77,19.25
HEA,830,,,,0.9273,16.79,19.43
HEA,835,,,,0.4297,23.9,-4.58
HEA,840,,,,0.4297,23.9,-4.58
HEA,850,,,,-0.4328,32.62,-24.5
HEA,927,,,,0.252,24.77,-3.545
HEA,930,,,,1.007,14.53,28.18
HEA,935,,,,1.002,14.54,28.27
HEA,940,,,,1.002,14.54,28.27
HEA,950,,,,-0.0272,28.24,-12.86
HED,830,-0.15990000,30.11000000,-17.95000000,,,
HED,835,0.47220000,20.76000000,13.37000000,,,
HED,840,0.47220000,20.76000000,13.37000000,,,
HED,850,-0.03088000,28.24000000,-13.32000000,,,
HED,927,-0.46670000,35.90000000,-46.92000000,,,
HED,930,-0.52270000,36.26000000,-44.31000000,,,
HED,935,-0.52060000,36.25000000,-44.46000000,,,
HED,940,-0.52060000,36.25000000,-44.46000000,,,
HED,950,-0.51360000,36.23000000,-44.95000000,,,
WHE,830,0.839,16.92,20.67,0.8643,16.88,20.3
WHE,835,0.8752,16.86,20.14,0.9014,16.83,19.77
WHE,840,0.8752,16.86,20.14,0.9014,16.83,19.77
WHE,850,0.4202,23.91,-4.658,-0.1809,29.89,-18.64
WHE,927,-0.1589,30.11,-18.17,0.4561,20.8,13.61
WHE,930,0.257,24.76,-3.496,-0.03058,28.24,-13.28
WHE,935,0.2553,24.76,-3.513,-0.03095,28.24,-13.33
WHE,940,0.2553,24.76,-3.513,-0.03095,28.24,-13.33
WHE,950,0.2494,24.77,-3.57,0.2593,24.76,-3.474

    `, {header: true}).data)