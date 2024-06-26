const ulW = {
  C: 20,
  CU1: 18.5,
  CU3: 18.5,
  EV: 11.9,
  EV2D: 9.9,
  EV3D: 12.7,
  EV4D: 12.7,
  EVLL: 13,
  EX: 25,
  EXLL: 26,
  EV1D: 9.3,
  EX1D: 25,
  EX2D: 25.4,
  EX3D: 25,
  EX4D: 25.4,
  EW: 10,
  EWB: 20,
  EWG: 12.5,
  EWW: 10,
  EX1B: 18,
  EX12: 9,
  EVL: 10,
  EXXX: 12.5,
  L6: 26.2,
  L8: 26.2,
  V3: 16.5,
  V4: 16.5,
  F14: 25,
  F18: 36,
  F24: 71,
  F36: 169,
  F48: 249,
  F14D: 25,
  F18D: 36,
  F24D: 71,
  F36D: 169,
  F48D: 249,
  F60: 251,
  F72: 380,
  TRO11: 25, //roughly
  TRO22: 48,
  TRO14: 80,
  TRO24: 80,
  ARE11: 20,
  ARE12: 30,
  ARE22: 60,
  ARE14: 60,
  ARE24: 120,
  ARE44: 140,
  M: 16.5
}

const fixBoardCounts = {
  TRO11: 2,
  TRO14: 2,
  TRO22: 1,
  TRO24: 2,
  F14: 3,
  F18: 4,
  L6D_DIR: 2,
  L6D_IND: 1,
  F24B_DIR: 8,
  F24B_IND: 4,
  F36B_DIR: 20,
  F36B_IND: 8,
  F48B_DIR: 42,
  F48B_IND: 16,
  F24D_IND: 4,
  F36D_IND: 8,
  F48D_IND: 12,
  F60: 56,
  F72: 80,
  LF11: 1,
  LF12: 2,
  LF14: 4,
  LF22: 4,
  LF24: 8,
  LF44: 16
};

const fixtures = {
  LIN: {
    C: {
      shielding: {
        A: 0.80
      },
      ulLimit: ulW.C,
      boardID: 4 //line2
    },
    CDR: {
      shielding: {
        A: 1
      },
      ulLimit: 10,
      wattAdj: {
        DIR: 1,
        IND: 1
      },
      // boardCount: {
      //   DIR: 9, //strings
      //   IND: fixBoardCounts.F24D_IND * 3 //strings
      // },
      // thermalLimits: {
      //   DIR: [100,300],
      //   IND: [30,275]
      // },
      boardID: 1 //bar,line,area
    },
    CDS: {
      shielding: {
        DIR: {
          A: 1
          // A: 0.718
        },
        IND: {
          BW: 1
          // BW: 0.818
        }
      },
      ulLimit: {
        A: 11.25,
        ABW: 16.88
      },
      wattAdj: {
        DIR: 1,
        IND: 1
      },
      // boardCount: {
      //   DIR: 9, //strings
      //   IND: fixBoardCounts.F24D_IND * 3 //strings
      // },
      thermalLimits: {
        DIR: [100,300],
        IND: [30,300]
      },
      boardID: 1 //bar,line,area
    },
    CU1: {
      shielding: {
        DIR: {
          A: 1,
          BW: 1
        },
        IND: {
          A: 1,
          BW: 1
        }
      },
      ulLimit: ulW.CU1,
      thermalLimits: {
        DIR: [50,450],
        IND: [50,450]
      },
      wattAdj: {
        DIR: 1,
        IND: 1
      },
      boardID: 4 //now line2, was bar,line,area
    },
    CU3: {
      shielding: {
        DIR: {
          A: 1,
          BW: 1
        },
        IND: {
          A: 1,
          BW: 1
        }
      },
      ulLimit: ulW.CU1,
      thermalLimits: {
        DIR: [100,450],
        IND: [100,450]
      },
      wattAdj: {
        DIR: 1,
        IND: 1
      },
      boardID: 4 //now line2, was bar,line,area
    },
    // E2: {
    //   shielding: {
    //     A:	0.5365
    //   },
    //   ulLimit: ulW.EV,
    //   boardID: 1 //bar,line,area
    // },
    // E4: {
    //   shielding: {
    //     A:	0.6110
    //   },
    //   ulLimit: ulW.EV,
    //   boardID: 1 //bar,line,area
    // },
    // ET4: {
      // shielding: {
        // A: 0.634,
        // AL: 0.900,
        // HE: 0.740,
        // WHE: 0.694,
        // BW: 0.727,
        // H: 0.545,
        // R: 0.63

      // },
      // ulLimit: ulW.EV,
      // boardID: 1 //bar,line,area
    // },
    // ET4D: {
      // shielding: {
        // A: 0.643,
        // AL: 0.825,
        // HE: 0.740,
        // WHE: 0.694,
        // BW: 0.727,
        // P: 0.400,
        // H: 0.591,
        // R: 0.63,
        // WET: 0.5234
      // },
      // ulLimit: ulW.EV,
      // boardID: 4 //line2
    // },
    // ET6: {
    //   shielding: {
    //     A: 0.6689,
    //     AL: 0.7664,
    //     C: 0.646,
    //     CG: 0.628,
    //     CL: 0.562,
    //     CM: 0.577,
    //     CR: 0.516,
    //     D: 0.721,
    //     DG: 0.704,
    //     DL: 0.636,
    //     DM: 0.652,
    //     DR: 0.594,
    //     V: 0.6497,
    //     R: 0.6689
    //   },
    //   ulLimit: ulW.EV,
    //   boardID: 1 //bar,line,area
    // },
    EV1D: {
      shielding: {
        A: 1,
        HE: 1,
        HED: 1,
        BW: 1,
        P: 1,
        WHE: 1
      },
      ulLimit: ulW.EV1D,
      thermalLimits: {
        DIR: [30,250]
      },
      wattAdj: {
        DIR: 1
      },
      boardID: 4 //now line2, was bar,line,area
    },
    EV3: {
      shielding: {
        // A: 0.545,
        // AL: 0.6547,
        // C: 0.524,
        // CG: 0.508,
        // CL: 0.455,
        // CM: 0.465,
        // CR: 0.434,
        // D: 0.603,
        // DG: 0.586,
        // DL: 0.529,
        // DM: 0.54,
        // DR: 0.51,
        // H: 0.4815,
        // HE: 0.6441,
        // R: 0.5779,
        // V: 0.5749,
        WG: 0.43,
        // WW: 0.4613,
        WET: 0.596
      },
      ulLimit: {
        EV3: ulW.EV,
        WW: ulW.EWW,
        WG: ulW.EWG
      },
      boardID: 4 //bar,line,area
    },
    EV6: {
      shielding: {
        A: 0.6689,
        AL: 0.7664,
        // C: 0.646,
        // CG: 0.628,
        // CL: 0.562,
        // CM: 0.577,
        // CR: 0.516,
        // D: 0.721,
        // DG: 0.704,
        // DL: 0.636,
        // DM: 0.652,
        // DR: 0.594,
        R: 0.6689,
        V: 0.6497,
        WET: 0.5995
      },
      ulLimit: {
        EV6: ulW.EV,
        WET: ulW.EW
      },
      boardID: 1 //bar,line,area
    },
    EVL: {
      shielding: {
        NA: 0.4525
      },
      ulLimit: ulW.EVL,
      boardID: 1 //bar,line,area
    },
    "EX1D/I": {
      shielding: {
        DIR: {
          A: 1,
          BW: 1,
          HE: 1,
          HED: 1,
          WHE: 1,
          P: 1
        },
        IND: {
          BW: 1,
          HE: 1,
          WHE: 1,
          HEA: 1
        }
      },
      ulLimit: ulW.EX1D,
      thermalLimits: {
        DIR: [30,388],
        IND: [30,388]
      },
      wattAdj: {
        DIR: 1,
        IND: 1
      },
      boardID: 4 //now line2, was bar,line,area
    },
    "EX12D/I": {
      shielding: {
        DIR: {
          A: 1,
          HE: 1,
          BW: 1,
          WHE: 1,
          HED: 1,
          P: 1
        },
        IND : {
          HE: 1,
          BW: 1,
          WHE: 1,
          HEA: 1
        }
      },
      thermalLimits: {
        DIR: [30,388],
        IND: [30,405]
      },
      wattAdj: {
        DIR: 1,
        IND: 1
      },
      ulLimit: ulW.EX12,
      boardID: 4 //bar,line,area
    },
    // EX1B: {
    //   shielding: {
    //     DIR: {
    //       A: 0.5673,
    //       HE: 0.5818,
    //       HED: 0.575,
    //       BW: 0.4488,
    //       WHE: 0.5302,
    //       P: 0.4138
    //     },
    //     IND: {
    //       HE: 0.7143,
    //       HEA: 0.6785,
    //       // BW: 0.897,
    //       BW: 0.733,
    //       WHE: 0.5112
    //     }
    //   },
    //   ulLimit: ulW.EX1B,
    //   boardID: 4 //bar,line,area
    // },
    // EX2: {
    //   shielding: {
    //     DIR: {
    //       A: 0.5365
    //     },
    //     IND: {
    //       O: 0.8092
    //     }
    //   },
    //   ulLimit: ulW.EX,
    //   boardID: 1 //bar,line,area
    // },
    // EX2B: {
    //   shielding: {
    //     DIR: {
    //       A: 0.4745
    //     },
    //     IND: {
    //       O: 0.8373
    //     }
    //   },
    //   ulLimit: ulW.EX,
    //   boardID: 1 //bar,line,area
    // },
    EX3: {
      shielding: {
        // A: 0.545,
        // AL: 0.6547,
        // C: 0.524,
        // CG: 0.508,
        // CL: 0.455,
        // CM: 0.465,
        // CR: 0.434,
        // D: 0.603,
        // DG: 0.586,
        // DL: 0.529,
        // DM: 0.54,
        // DR: 0.51,
        // H: 0.4815,
        // HE: 0.6441,
        // R: 0.5779,
        // V: 0.5749,
        // WW: 0.4613,
        WET: 0.596
      },
      ulLimit: {
        EX3: ulW.EX,
        WET: ulW.EW
      },
      boardID: 4 //bar,line,area
    },
    EX3B: {
      shielding: {
        DIR: {
          // A: 0.5854,
          // AL: 0.6547,
          // C: 0.524,
          // CG: 0.508,
          // CL: 0.455,
          // CM: 0.465,
          // CR: 0.434,
          // D: 0.603,
          // DG: 0.586,
          // DL: 0.529,
          // DM: 0.54,
          // DR: 0.51,
          // H: 0.4815,
          // HE: 0.685,
          // R: 0.5779,
          // V: 0.5749,
          // WW: 0.4613,
          WET: 0.582
        },
        IND: {
          O: 0.8842,
          WET: 0.914
        }
      },
      ulLimit: {
        EX3B: ulW.EX,
        WET: ulW.EWB
      },
      boardID: 4 //bar,line,area
    },
    EV2D: {
      shielding: {
        A: 1,
        AL: 1,
        BW: 1,
        H: 1,
        HE: 1,
        HED: 1,
        R: 1,
        WHE: 1
      },
      ulLimit: ulW.EV2D,
      thermalLimits: {
        DIR: [30,262]
      },
      wattAdj: {
        DIR: 1
      },
      boardID: 4 //now line2, was bar,line,area
    },
    EV3D: {
      shielding: {
        A: 1,
        AL: 1,
        BW: 1,
        H: 1,
        HE: 1,
        HED: 1,
        R: 1,
        WHE: 1,
        WET: 1
      },
      ulLimit: ulW.EV3D,
      thermalLimits: {
        DIR: [30,325]
      },
      wattAdj: {
        DIR: 1
      },
      boardID: 4 //now line2, was bar,line,area
    },
    EV4D: {
      shielding: {
        A: 1,
        AL: 1,
        BW: 1,
        H: 1,
        HE: 1,
        HED: 1,
        R: 1,
        WHE: 1
      },
      ulLimit: ulW.EV4D,
      thermalLimits: {
        DIR: [30,314]
      },
      wattAdj: {
        DIR: 1
      },
      boardID: 4 //now line2, was bar,line,area
    },
    "EX2D/I": {
      shielding: {
        DIR: {
          A: 1,
          AL: 1,
          BW: 1,
          HE: 1,
          HED: 1,
          WHE: 1
        },
        IND: {
          BW: 1,
          HE: 1,
          HEA: 1,
          WHE: 1
        }
      },
      ulLimit: ulW.EX2D,
      thermalLimits: {
        DIR: [30,350],
        IND: [30,350]
      },
      wattAdj: {
        DIR: 1,
        IND: 1
      },
      boardID: 4 //now line2, was bar,line,area
    },
    "EX3D/I": {
      shielding: {
        DIR: {
          A: 1,
          AL: 1,
          BW: 1,
          HE: 1,
          HED: 1,
          WHE: 1,
          WW: 1
        },
        IND: {
          BW: 1,
          HE: 1,
          HEA: 1,
          WHE: 1
        }
      },
      ulLimit: ulW.EX3D,
      thermalLimits: {
        DIR: [30,350],
        IND: [30,350]
      },
      wattAdj: {
        DIR: 1,
        IND: 1
      },
      boardID: 4 //now line2, was bar,line,area
    },
    "EX4D/I": {
      shielding: {
        DIR: {
          A: 1,
          AL: 1,
          BW: 1,
          HE: 1,
          HED: 1,
          WHE: 1,
          WW: 1
        },
        IND: {
          BW: 1,
          HE: 1,
          HEA: 1,
          WHE: 1
        }
      },
      ulLimit: ulW.EX4D,
      thermalLimits: {
        DIR: [30,350],
        IND: [30,350]
      },
      wattAdj: {
        DIR: 1,
        IND: 1
      },
      boardID: 4 //now line2, was bar,line,area
    },
    // EX4: {
    //   shielding: {
    //     DIR: {
    //       A: 0.5731
    //     },
    //     IND: {
    //       O: 0.8865
    //     }
    //   },
    //   ulLimit: ulW.EX,
    //   boardID: 1 //bar,line,area
    // },
    // EX33: {
    //   shielding: {
    //     DIR: {
    //       A: 0.545
    //     },
    //     IND: {
    //       O: 0.8578
    //     }
    //   },
    //   ulLimit: ulW.EXXX,
    //   boardID: 1 //bar,line,area
    // },
    // EX44: {
    //   shielding: {
    //     DIR: {
    //       A: 0.5731
    //     },
    //     IND: {
    //       O: 0.8865
    //     }
    //   },
    //   ulLimit: ulW.EXXX,
    //   boardID: 1 //bar,line,area
    // },
    // EX4B: {
    //   shielding: {
    //     DIR: {
    //       A: 0.5742
    //     },
    //     IND: {
    //       O: 0.8943
    //     }
    //   },
    //   ulLimit: ulW.EX,
    //   boardID: 1 //bar,line,area
    // },
    EX6: {
      shielding: {
        A: 0.6886,
        AL: 0.7664,
        // C: 0.646,
        // CG: 0.628,
        // CL: 0.562,
        // CM: 0.577,
        // CR: 0.516,
        // D: 0.721,
        // DG: 0.704,
        // DL: 0.636,
        // DM: 0.652,
        // DR: 0.594,
        // R: 0.6689,
        // V: 0.6497,
        WET: 0.5995
      },
      ulLimit: {
        EX6: ulW.EX,
        WET: ulW.EW
      },
      boardID: 1 //bar,line,area
    },
    EX6B: {
      shielding: {
        DIR: {
          A: 0.6924,
          AL: 0.7664,
          // CR: 0.646,
          // CG: 0.628,
          // CL: 0.562,
          // CM: 0.577,
          // CR: 0.516,
          // D: 0.721,
          // DG: 0.704,
          // DL: 0.636,
          // DM: 0.652,
          // DR: 0.594,
          // R: 0.6689,
          // V: 0.6497,
          WET: 0.5922
        },
        IND: {
          O: 0.9205,
          WET: 0.9371
        }
      },
      ulLimit: {
        EX6B: ulW.EX,
        WET: ulW.EWB
      },
      boardID: 1 //bar,line,area
    },
    // L6A: {
    //   shielding: {
    //     "100": 0.6778,
    //     "75": 0.7608,
    //     "35": 0.6726
    //   },
    //   ulLimit: ulW.L6,
    //   boardID: {
    //     "100": 1, //bar,line,area
    //     "75": 1,
    //     "35": 2 //line22
    //   }
    // },
    'L6D/I': {
      shielding: {
        DIR: {
          "40": 0.904,
          "70": 0.676,
          "100": 0.673,
          A: 0.58
        },
        IND: {
          BW: 0.895
        }
      },
      ulLimit: ulW.L6,
      boardCount: {
        DIR: fixBoardCounts.L6D_DIR,
        IND: fixBoardCounts.L6D_IND
      },
      boardID: 5 //ll
    },
    'L8D/I': {
      shielding: {
        DIR: {
          "40": 0.912,
          "70": 0.713,
          "100": 0.749,
          A: 0.636
        },
        IND: {
          BW: 0.895
        }
      },
      ulLimit: ulW.L8,
      boardCount: {
        DIR: fixBoardCounts.L6D_DIR,
        IND: fixBoardCounts.L6D_IND
      },
      boardID: 5 //ll
    },
    M: {
      shielding: {
        A: 0.704,
        HE: 0.778,
        P: 0.575,
        WHE: 0.735
      },
      ulLimit: ulW.M,
      boardID: 5 //ll
    },
    MW: {
      shielding: {
        HE: 0.851,
        WHE: 0.727
      },
      ulLimit: ulW.M,
      boardID: 5 //ll
    },
    V3: {
      shielding: {
        DIR: {
          A: 1
        },
        IND: {
          A: 1,
          WS: 1
        }
      },
      ulLimit: ulW.V3,
      thermalLimits: {
        DIR: [80,462],
        IND: [80,462]
      },
      wattAdj: {
        DIR: 1,
        IND: 1
      },
      boardID: 4 //now line2, was bar,line,area
    },
    V4: {
      shielding: {
        DIR: {
          A: 1
        },
        IND: {
          A: 1,
          WS: 1
        }
      },
      ulLimit: ulW.V4,
      thermalLimits: {
        DIR: [80,462],
        IND: [80,462]
      },
      wattAdj: {
        DIR: 1,
        IND: 1
      },
      boardID: 4 //now line2, was bar,line,area
    }
  },
  TRO: {
    // AD11: {
    //   shielding: {
    //     A: 0.6901,
    //     L: 0.4099,
    //     R: 0.3506
    //   },
    //   ulLimit: ulW.TRO11,
    //   boardCount: fixBoardCounts.TRO11,
    //   boardID: 1 //bar,line,area
    // },
    AD14: {
      shielding: {
        A: 0.8223,
        L: 0.4884,
        R: 0.4177
      },
      ulLimit: ulW.TRO14,
      boardCount: fixBoardCounts.TRO14,
      boardID: 3 //bar22
    },
    AD22: {
      shielding: {
        A: 0.8196,
        L: 0.4868,
        R: 0.4164
      },
      ulLimit: ulW.TRO22,
      boardCount: fixBoardCounts.TRO22,
      boardID: 3 //bar22
    },
    AD24: {
      shielding: {
        A: 0.8385,
        L: 0.4981,
        R: 0.4260
      },
      ulLimit: ulW.TRO24,
      boardCount: fixBoardCounts.TRO24,
      boardID: 3 //bar22
    },
    CJ11: {
      shielding: {
        A: 0.642,
        L: 0.6089,
        R: 0.6089
      },
      ulLimit: ulW.TRO11,
      boardCount: fixBoardCounts.TRO11,
      boardID: 1 //bar,line,area
    },
    CJ14: {
      shielding: {
        A: 0.7556,
        L: 0.7324,
        R: 0.7324
      },
      ulLimit: ulW.TRO14,
      boardCount: fixBoardCounts.TRO14,
      boardID: 3 //bar22
    },
    CJ22: {
      shielding: {
        A: 0.7603,
        L: 0.7643,
        R: 0.7643
      },
      ulLimit: ulW.TRO22,
      boardCount: fixBoardCounts.TRO22,
      boardID: 3 //bar22
    },
    CJ24: {
      shielding: {
        A: 0.7879,
        L: 0.7916,
        R: 0.7916
      },
      ulLimit: ulW.TRO24,
      boardCount: fixBoardCounts.TRO24,
      boardID: 3 //bar22
    },
    LU11: {
      shielding: {
        A: 0.6409,
        S: 0.5460,
        W: 0.5775
      },
      ulLimit: ulW.TRO11,
      boardCount: fixBoardCounts.TRO11,
      boardID: 1 //bar,line,area
    },
    LU14: {
      shielding: {
        A: 0.7709,
        S: 0.6568,
        W: 0.6946
      },
      ulLimit: ulW.TRO14,
      boardCount: fixBoardCounts.TRO14,
      boardID: 3 //bar22
    },
    LU22: {
      shielding: {
        A: 0.8045,
        S: 0.6854,
        W: 0.7249
      },
      ulLimit: ulW.TRO22,
      boardCount: fixBoardCounts.TRO22,
      boardID: 3 //bar22
    },
    LU24: {
      shielding: {
        A: 0.8333,
        S: 0.7100,
        W: 0.7508
      },
      ulLimit: ulW.TRO24,
      boardCount: fixBoardCounts.TRO24,
      boardID: 3 //bar22
    },
    // F14: {
    //   shielding: {
    //     A: 0.5725
    //   },
    //   ulLimit: ulW.F14,
    //   boardCount: fixBoardCounts.F14,
    //   boardID: 1 //bar,line,area
    // },
    // F18: {
    //   shielding: {
    //     A: 0.6325,
    //     U: 0.6425
    //   },
    //   ulLimit: ulW.F18,
    //   boardCount: fixBoardCounts.F18,
    //   boardID: 1 //bar,line,area
    // },
    // F24: {
    //   shielding: {
    //     A: 0.5988,
    //     U: 0.645
    //   },
    //   ulLimit: ulW.F24,
    //   boardCount: fixBoardCounts.F24B_DIR,
    //   boardID: 1 //bar,line,area
    // },
    // F24B: {
    //   shielding: {
    //     DIR: {
    //       A: 0.63
    //     },
    //     IND: {
    //       A: 0.6075
    //     }
    //   },
    //   ulLimit: ulW.F24,
    //   boardCount: {
    //     DIR: fixBoardCounts.F24B_DIR,
    //     IND: fixBoardCounts.F24B_IND
    //   },
    //   boardID: 1 //bar,line,area
    // },
    // F36: {
    //   shielding: {
    //     A: 0.6175,
    //     U: 0.6263
    //   },
    //   ulLimit: ulW.F36,
    //   boardCount: fixBoardCounts.F36B_DIR,
    //   boardID: 1 //bar,line,area
    // },
    // F36B: {
    //   shielding: {
    //     DIR: {
    //       A: 0.6325
    //     },
    //     IND: {
    //       A: 0.615
    //     }
    //   },
    //   ulLimit: ulW.F36,
    //   boardCount: {
    //     DIR: fixBoardCounts.F36B_DIR,
    //     IND: fixBoardCounts.F36B_IND
    //   },
    //   boardID: 1 //bar,line,area
    // },
    // F48: {
    //   shielding: {
    //     A: 0.5963,
    //     U: 0.6175
    //   },
    //   ulLimit: ulW.F48,
    //   boardCount: fixBoardCounts.F48B_DIR,
    //   boardID: 1 //bar,line,area
    // },
    // F48B: {
    //   shielding: {
    //     DIR: {
    //       A: 0.6175
    //     },
    //     IND: {
    //       A: 0.6125
    //     }
    //   },
    //   ulLimit: ulW.F48,
    //   boardCount: {
    //     DIR: fixBoardCounts.F48B_DIR,
    //     IND: fixBoardCounts.F48B_IND
    //   },
    //   boardID: 1 //bar,line,area
    // },
    F14D: {
      shielding: {
        A: 0.73,
        AL: 0.73,
        AR: 0.73
      },
      ulLimit: ulW.F14,
      wattAdj: .97,
      boardCount: 5, //strings
      thermalLimits: {
        DIR: [20,105]
      },
      boardID: 1 //bar,line,area
    },
    F18D: {
      shielding: {
        A: 0.74,
        AL: 0.74,
        AR: 0.74
      },
      ulLimit: ulW.F18,
      wattAdj: .97,
      boardCount: 9, //strings
      thermalLimits: {
        DIR: [20,105]
      },
      boardID: 1 //bar,line,area
    },
    "F24D/I": {
      shielding: {
        DIR: {
          A: 0.744,
          AL: 0.744,
          AR: 0.744
        },
        IND: {
          LO: 0.877
        }
      },
      ulLimit: ulW.F24D,
      wattAdj: {
        DIR: .97,
        IND: .95
      },
      boardCount: {
        DIR: 9, //strings
        IND: fixBoardCounts.F24D_IND * 3 //strings
      },
      thermalLimits: {
        DIR: [20,105],
        IND: [17,83]
      },
      boardID: 1 //bar,line,area
    },
    "F36D/I": {
      shielding: {
        DIR: {
          A: 0.758,
          AL: 0.758,
          AR: 0.758
        },
        IND: {
          LO: 0.861
        }
      },
      ulLimit: ulW.F36D,
      wattAdj: {
        DIR: 1.01,
        IND: 1
      },
      boardCount: {
        DIR: 27, //strings
        IND: fixBoardCounts.F36D_IND * 3 //strings
      },
      thermalLimits: {
        DIR: [20,105],
        IND: [17,83]
      },
      boardID: 1 //bar,line,area
    },
    "F48D/I": {
      shielding: {
        DIR: {
          A: 0.77,
          AL: 0.77,
          AR: 0.77
        },
        IND: {
          LO: 0.864
        }
      },
      ulLimit: ulW.F48D,
      wattAdj: {
        DIR: 1.025,
        IND: .99
      },
      boardCount: {
        DIR: 57, //strings
        IND: fixBoardCounts.F48D_IND * 3 //strings
      },
      thermalLimits: {
        DIR: [20,105],
        IND: [17,83]
      },
      boardID: 1 //bar,line,area
    },
    // F60: {
    //   shielding: {
    //     A: 0.731
    //   },
    //   ulLimit: ulW.F60,
    //   boardCount: fixBoardCounts.F60,
    //   boardID: 1 //bar,line,area
    // },
    // F72: {
    //   shielding: {
    //     A: 0.71
    //   },
    //   ulLimit: ulW.F72,
    //   boardCount: fixBoardCounts.F72,
    //   boardID: 1 //bar,line,area
    // },
    LF11D: {
      shielding: {
        A: 0.75,
        AL: 0.75,
        AR: 0.75
      },
      ulLimit: 5,
      wattAdj: 1,
      boardCount: 1,
      thermalLimits: {
        DIR: [50,400]
      },
      boardID: 1 //bar,line,area
    },
    LF12D: {
      shielding: {
        A: 0.751,
        AL: 0.751,
        AR: 0.751
      },
      ulLimit: 10,
      wattAdj: 1,
      boardCount: 2,
      thermalLimits: {
        DIR: [50,500]
      },
      boardID: 1 //bar,line,area
    },
    "LF14D/I": {
      shielding: {
        // DIR: {
        //   A: 0.79,
        //   AL: 0.79,
        //   AR: 0.79
        // },
        // IND: {
        //   LO: 0.936
        // }
        DIR: {
          A: 1,
          AL: 1,
          AR: 1
        },
        IND: {
          LO: 1
        }
      },
      ulLimit: 30,
      wattAdj: {
        DIR: 1,
        IND: 1
      },
      boardCount: {
        DIR: 4,
        IND: 4
      },
      thermalLimits: {
        DIR: [50,500],
        IND: [50,300]
      },
      boardID: 1 //bar,line,area
    },
    "LF22D/I": {
      shielding: {
        // DIR: {
        //   A: 0.82,
        //   AL: 0.82,
        //   AR: 0.82
        // },
        // IND: {
        //   LO: 0.933
        // }
        DIR: {
          A: 1,
          AL: 1,
          AR: 1
        },
        IND: {
          LO: 1
        }
      },
      ulLimit: 60,
      wattAdj: {
        DIR: 1,
        IND: 1
      },
      boardCount: {
        DIR: 4,
        IND: 4
      },
      thermalLimits: {
        DIR: [50,500],
        IND: [50,300]
      },
      boardID: 1 //bar,line,area
    },
    "LF24D/I": {
      shielding: {
        // DIR: {
        //   A: 0.791,
        //   AL: 0.791,
        //   AR: 0.791
        // },
        // IND: {
        //   LO: 0.90
        // }
        DIR: {
          A: 1,
          AL: 1,
          AR: 1
        },
        IND: {
          LO: 1
        }
      },
      ulLimit: 200,
      wattAdj: {
        DIR: 1,
        IND: 1
      },
      boardCount: {
        DIR: 8,
        IND: 8
      },
      thermalLimits: {
        DIR: [50,500],
        IND: [50,300]
      },
      boardID: 1 //bar,line,area
    },
    "LF44D/I": {
      shielding: {
        DIR: {
          A: 1,
          AL: 1,
          AR: 1
          //A: 0.797,
          //AL: 0.797,
          //AR: 0.797
        },
        IND: {
          LO: 0.96
        }
      },
      ulLimit: 200,
      wattAdj: {
        DIR: 1,
        IND: 1
      },
      boardCount: {
        DIR: 16,
        IND: 12
      },
      thermalLimits: {
        // DIR: [50,500],
        DIR: [250,500],
        IND: [50,300]
      },
      boardID: 1 //bar,line,area
    }
    // LF11: {
    //   shielding: {
    //     A: 0.6131
    //   },
    //   ulLimit: ulW.ARE11,
    //   boardCount: fixBoardCounts.LF11,
    //   boardID: 1 //bar,line,area
    // },
    // LF12: {
    //   shielding: {
    //     A: 0.6582
    //   },
    //   ulLimit: ulW.ARE12,
    //   boardCount: fixBoardCounts.LF12,
    //   boardID: 1 //bar,line,area
    // },
    // LF14: {
    //   shielding: {
    //     A: 0.677
    //   },
    //   ulLimit: ulW.ARE14,
    //   boardCount: fixBoardCounts.LF14,
    //   boardID: 1 //bar,line,area
    // },
    // LF22: {
    //   shielding: {
    //     A: 0.7004
    //   },
    //   ulLimit: ulW.ARE22,
    //   boardCount: fixBoardCounts.LF22,
    //   boardID: 1 //bar,line,area
    // },
    // LF24: {
    //   shielding: {
    //     A: 0.7125
    //   },
    //   ulLimit: ulW.ARE24,
    //   boardCount: fixBoardCounts.LF24,
    //   boardID: 1 //bar,line,area
    // },
    // LF44: {
    //   shielding: {
    //     A: 0.6702
    //   },
    //   ulLimit: ulW.ARE44,
    //   boardCount: fixBoardCounts.LF44,
    //   boardID: 1 //bar,line,area
    // }
  }
};
