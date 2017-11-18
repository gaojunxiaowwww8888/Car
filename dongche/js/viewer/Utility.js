/**
 * Created by 京美电子 on 2017/5/15.
 */

var modeNameBefored = [ 'A1','A2','A3','A4','A5','A6','A7','A8','A9','A10', 'A11','A12','A13','A14','A15','A16','A17','A18','A19','A20','A21','A22',
    'G1','G2','G3','G4','G5','G6','G7','G8','G10','G12','G13','G14','G15','G16','G18','G19','G20','G21','G22','G23','G25',
    'F1','F2','F3','C6','C7', 'C8','C9','C10','C11','C12','C13','C14','C15','C16','C18','C23','C24','C26','B7','B8','B9','B10'];

var modeChildPositionBeFored = [

    { name: 'A1', position: new THREE.Vector3( -22.71, 18.46, -125.2 )},
    { name: 'A2', position: new THREE.Vector3( -22.71, 18.46, -125.78 )},
    { name: 'A3', position: new THREE.Vector3( -22.73, 18.475, -126.32 )},
    { name: 'A4', position: new THREE.Vector3( -22.71, 18.46, -126.88 )},
    { name: 'A5', position: new THREE.Vector3( -22.71, 18.46, -127.45 )},
    { name: 'A6', position: new THREE.Vector3( -22.71, 18.46, -128.01 )},
    { name: 'A7', position: new THREE.Vector3( -22.71, 18.46, -128.58 )},
    { name: 'A8', position: new THREE.Vector3( -22.71, 18.46, -129.13 )},
    { name: 'A9', position: new THREE.Vector3( -22.71, 17.03, -124.87 )},
    { name: 'A10', position: new THREE.Vector3( -22.71, 17.03, -125.43 )},
    { name: 'A11', position: new THREE.Vector3( -22.71, 17.03, -126.0 )},
    { name: 'A12', position: new THREE.Vector3( -22.71, 17.03, -126.57 )},
    { name: 'A13', position: new THREE.Vector3( -22.71, 17.03, -127.14 )},
    { name: 'A14', position: new THREE.Vector3( -22.71, 17.03, -127.68 )},
    { name: 'A15', position: new THREE.Vector3( -22.71, 17.03, -128.27 )},
    { name: 'A16', position: new THREE.Vector3( -22.71, 15.38, -125.23 )},
    { name: 'A17', position: new THREE.Vector3( -22.71, 15.38, -125.80 )},
    { name: 'A18', position: new THREE.Vector3( -22.71, 15.38, -126.38 )},
    { name: 'A19', position: new THREE.Vector3( -22.71, 15.38, -126.96 )},
    { name: 'A20', position: new THREE.Vector3( -22.71, 15.38, -127.53 )},
    { name: 'A21', position: new THREE.Vector3( -22.71, 15.38, -128.12 )},
    { name: 'A22', position: new THREE.Vector3( -22.71, 15.38, -129.26 )},

    { name: 'G1', position: new THREE.Vector3( -22.33, 18.48, -139.17 )},
    { name: 'G2', position: new THREE.Vector3( -22.23, 18.49, -139.77 )},
    { name: 'G3', position: new THREE.Vector3( -22.13, 18.46, -140.35 )},
    { name: 'G4', position: new THREE.Vector3( -22, 18.49, -140.90 )},
    { name: 'G5', position: new THREE.Vector3( -21.86, 18.49, -141.43 )},
    { name: 'G6', position: new THREE.Vector3( -21.75, 18.51, -141.99 )},
    { name: 'G7', position: new THREE.Vector3( -21.64, 18.50, -142.50 )},
    { name: 'G8', position: new THREE.Vector3( -22.31, 17.56, -139.19 )},
    { name: 'G10', position: new THREE.Vector3( -22.11, 17.54, -140.36 )},
    { name: 'G12', position: new THREE.Vector3( -21.87, 17.52, -141.48 )},
    { name: 'G13', position: new THREE.Vector3( -21.77, 17.55, -142.03 )},
    { name: 'G14', position: new THREE.Vector3( -21.66, 17.55, -142.52 )},
    { name: 'G15', position: new THREE.Vector3( -22.31, 16.67, -139.19 )},
    { name: 'G16', position: new THREE.Vector3( -22.21, 16.65, -139.74 )},
    { name: 'G18', position: new THREE.Vector3( -21.87, 16.64, -141.49 )},
    { name: 'G19', position: new THREE.Vector3( -21.75, 16.63, -142.04 )},
    { name: 'G20', position: new THREE.Vector3( -21.66, 16.62, -142.55 )},
    { name: 'G21', position: new THREE.Vector3( -22.31, 15.66, -139.17 )},
    { name: 'G22', position: new THREE.Vector3( -22.21, 15.68, -139.72 )},
    { name: 'G23', position: new THREE.Vector3( -22.09, 15.66, -140.30 )},
    { name: 'G25', position: new THREE.Vector3( -21.45, 15.64, -142.38 )},

    { name: 'F1', position: new THREE.Vector3( -3.1, 18.4, -147.32 )},
    { name: 'F2', position: new THREE.Vector3( -0.75, 15.88, -146.50 )},
    { name: 'F3', position: new THREE.Vector3( -0.36, 17.84, -146.38 )},

    { name: 'C6', position: new THREE.Vector3( -18.924, 23.72, -144.30 )},
    { name: 'C7', position: new THREE.Vector3( -18.46, 23.56, -145.24 )},
    { name: 'C8', position: new THREE.Vector3( -15.01, 23.55, -145.74 )},
    { name: 'C9', position: new THREE.Vector3( -11.27, 23.84, -149.34 )},
    { name: 'C10', position: new THREE.Vector3( -10.39, 23.88, -149.36 )},
    { name: 'C11', position: new THREE.Vector3( -8.56, 23.86, -149.39 )},
    { name: 'C12', position: new THREE.Vector3( -7.73, 23.88, -149.4 )},
    { name: 'C13', position: new THREE.Vector3( -6.06, 23.53, -146.54 )},
    { name: 'C14', position: new THREE.Vector3( -3.97, 23.52, -146.08 )},
    { name: 'C15', position: new THREE.Vector3( -4.36, 24.16, -147.92 )},
    { name: 'C16', position: new THREE.Vector3( 0.33, 24.24, -144.57 )},
    { name: 'C18', position: new THREE.Vector3( 1.80, 24.24, -143.15 )},
    { name: 'C23', position: new THREE.Vector3( 2.78, 25.88, -144.72 )},
    { name: 'C24', position: new THREE.Vector3( 3.42, 25.96, -143.76 )},
    { name: 'C26', position: new THREE.Vector3( 1.2, 23.03, -141.17 )},

    { name: 'B7', position: new THREE.Vector3( 5.15, 20.58, -135.77 )},
    { name: 'B8', position: new THREE.Vector3( 4.36, 20.34, -135.75 )},
    { name: 'B9', position: new THREE.Vector3( 5.25, 20.6, -134.77 )},
    { name: 'B10', position: new THREE.Vector3( 4.44, 20.35, -134.73 )}

];

var modeNameBehind = [ 'G1','G2','G3','G4','G5','G6','G7','G8','G10','G12','G13','G14','G15','G16','G18','G19','G20','G21','G22','G23',
             'A1','A2','A3','A4','A5','A6','A7','A8','A9','A10','A11','A12','A13','A14','A15','A16','A17','A18','A19','A20','A21','A22',
            'F1','F2','F3','C6','C7','C8','C9','C10', 'C11','C12', 'C13','C14', 'C15','C16','C18','C23','C24','C26','B7','B8','B9','B10'];

var modeChildPositionBeHind = [
    { name: 'G1', position: new THREE.Vector3( 4.36, 18.48, 134.86 )},
    { name: 'G2', position: new THREE.Vector3( 4.145, 18.49, 135.64 )},
    { name: 'G3', position: new THREE.Vector3( 3.98, 18.47, 136.32 )},
    { name: 'G4', position: new THREE.Vector3( 3.94, 18.50, 136.88 )},
    { name: 'G5', position: new THREE.Vector3( 3.79, 18.50, 137.42 )},
    { name: 'G6', position: new THREE.Vector3( 3.68, 18.52, 137.98 )},
    { name: 'G7', position: new THREE.Vector3( 3.65, 18.50, 138.49 )},
    { name: 'G8', position: new THREE.Vector3( 4.25, 17.56, 135.18 )},
    { name: 'G10', position: new THREE.Vector3( 4.01, 17.56, 136.35 )},
    { name: 'G12', position: new THREE.Vector3( 3.78, 17.52, 137.46 )},
    { name: 'G13', position: new THREE.Vector3( 3.64, 17.57, 137.99 )},
    { name: 'G14', position: new THREE.Vector3( 3.52, 17.56, 138.48 )},
    { name: 'G15', position: new THREE.Vector3( 4.25, 16.68, 135.18 )},
    { name: 'G16', position: new THREE.Vector3( 4.13, 16.67, 135.73 )},
    { name: 'G18', position: new THREE.Vector3( 3.80, 16.66, 137.46 )},
    { name: 'G19', position: new THREE.Vector3( 3.69, 16.64, 138.04 )},
    { name: 'G20', position: new THREE.Vector3( 3.56, 16.61, 138.53 )},
    { name: 'G21', position: new THREE.Vector3( 4.25, 15.68, 135.16 )},
    { name: 'G22', position: new THREE.Vector3( 4.13, 15.7, 135.70 )},
    { name: 'G23', position: new THREE.Vector3( 3.96, 15.68, 136.26 )},

    { name: 'A1', position: new THREE.Vector3( 4.64, 18.46, 121.19 )},
    { name: 'A2', position: new THREE.Vector3( 4.64, 18.46, 121.75 )},
    { name: 'A3', position: new THREE.Vector3( 4.64, 18.47, 122.31 )},
    { name: 'A4', position: new THREE.Vector3( 4.62, 18.46, 122.86 )},
    { name: 'A5', position: new THREE.Vector3( 4.64, 18.46, 123.42 )},
    { name: 'A6', position: new THREE.Vector3( 4.64, 18.46, 123.98 )},
    { name: 'A7', position: new THREE.Vector3( 4.64, 18.46, 124.54 )},
    { name: 'A8', position: new THREE.Vector3( 4.64, 18.46, 125.10 )},
    { name: 'A9', position: new THREE.Vector3( 4.64, 17.03, 120.86 )},
    { name: 'A10', position: new THREE.Vector3( 4.64, 17.03, 121.41 )},
    { name: 'A11', position: new THREE.Vector3( 4.64, 17.03, 121.98 )},
    { name: 'A12', position: new THREE.Vector3( 4.64, 17.03, 122.55 )},
    { name: 'A13', position: new THREE.Vector3( 4.64, 17.03, 123.12 )},
    { name: 'A14', position: new THREE.Vector3( 4.64, 17.03, 123.68 )},
    { name: 'A15', position: new THREE.Vector3( 4.64, 17.03, 124.24 )},
    { name: 'A16', position: new THREE.Vector3( 4.64, 15.38, 121.21 )},
    { name: 'A17', position: new THREE.Vector3( 4.64, 15.38, 121.78 )},
    { name: 'A18', position: new THREE.Vector3( 4.64, 15.38, 122.37 )},
    { name: 'A19', position: new THREE.Vector3( 4.64, 15.38, 122.95 )},
    { name: 'A20', position: new THREE.Vector3( 4.64, 15.38, 123.52 )},
    { name: 'A21', position: new THREE.Vector3( 4.64, 15.38, 124.10 )},
    { name: 'A22', position: new THREE.Vector3( 4.64, 15.38, 125.24 )},

    { name: 'F1', position: new THREE.Vector3( -14.88, 18.4, 143.46 )},
    { name: 'F2', position: new THREE.Vector3( -17.29, 15.94, 142.54 )},
    { name: 'F3', position: new THREE.Vector3( -17.68, 17.81, 142.35 )},

    { name: 'C6', position: new THREE.Vector3( 0.93, 23.78, 140.29 )},
    { name: 'C7', position: new THREE.Vector3( 0.33, 23.76, 141.07 )},
    { name: 'C8', position: new THREE.Vector3( -3.03, 23.53, 141.84 )},
    { name: 'C9', position: new THREE.Vector3( -6.80, 23.78, 145.18 )},
    { name: 'C10', position: new THREE.Vector3( -7.68, 23.80, 145.23 )},
    { name: 'C11', position: new THREE.Vector3( -9.48, 23.86, 145.22 )},
    { name: 'C12', position: new THREE.Vector3( -10.32, 23.88, 145.23 )},
    { name: 'C13', position: new THREE.Vector3( -11.98, 23.53, 142.45 )},
    { name: 'C14', position: new THREE.Vector3( -14.04, 23.48, 142.08 )},
    { name: 'C15', position: new THREE.Vector3( -13.64, 24.24, 143.75 )},
    { name: 'C16', position: new THREE.Vector3( -18.37, 24.24, 140.57 )},
    { name: 'C18', position: new THREE.Vector3( -19.84, 24.24, 139.12 )},
    { name: 'C23', position: new THREE.Vector3( -20.96, 25.76, 140.76 )},
    { name: 'C24', position: new THREE.Vector3( -21.37, 26.1, 139.66 )},
    { name: 'C26', position: new THREE.Vector3( -19.08, 23.03, 137 )},

    { name: 'B7', position: new THREE.Vector3( -23.18, 20.64, 131.75 )},
    { name: 'B8', position: new THREE.Vector3( -22.38, 20.40, 131.74 )},
    { name: 'B9', position: new THREE.Vector3( -23.25, 20.70, 130.75 )},
    { name: 'B10', position: new THREE.Vector3( -22.47, 20.40, 130.72 )}
];

var Viewer = {
    tiegui: null,
    tiegui1: null,
    tieguizx:null,
    dongcheMode: null,
    runflag: 1,
    runtag: false,

    qbflag: false,
    hbflag: false,
    jssjflag: false,
    msjflag: false,
    jcqxflag: false,

    scale: 0,
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    canJumpup: false,
    canJumpdown: false,
    canJump: false,

    kaiguanAButton: false,
    kaiguanGButton: false,
    kaiguanFButton: false,

    groudLight: new THREE.Group(),
    groupQ: new THREE.Group(),
    groupH: new THREE.Group()
};

//开关A的操作常量
var QAButton = [

    { name:'QA1', A1tag: false},
    { name:'QA2', A1tag: false},
    { name:'QA3', A1tag: false},
    { name:'QA4', A1tag: false},
    { name:'QA5', A1tag: false},
    { name:'QA6', A1tag: false},
    { name:'QA7', A1tag: false},
    { name:'QA8', A1tag: false},
    { name:'QA9', A1tag: false},
    { name:'QA10', A1tag: false},
    { name:'QA11', A1tag: false},
    { name:'QA12', A1tag: false},
    { name:'QA13', A1tag: false},
    { name:'QA14', A1tag: false},
    { name:'QA15', A1tag: false},
    { name:'QA16', A1tag: false},
    { name:'QA17', A1tag: false},
    { name:'QA18', A1tag: false},
    { name:'QA19', A1tag: false},
    { name:'QA20', A1tag: false},
    { name:'QA21', A1tag: false},
    { name:'QA22', A1tag: false}
];

var QGButton = [
    { name:'QG1', G1tag: false },
    { name:'QG2', G1tag: false },
    { name:'QG3', G1tag: false },
    { name:'QG4', G1tag: false },
    { name:'QG5', G1tag: false },
    { name:'QG6', G1tag: false },
    { name:'QG7', G1tag: false },
    { name:'QG8', G1tag: false },
    { name:'QG10', G1tag: false },
    { name:'QG12', G1tag: false },
    { name:'QG13', G1tag: false },
    { name:'QG14', G1tag: false },
    { name:'QG15', G1tag: false },
    { name:'QG16', G1tag: false },
    { name:'QG18', G1tag: false },
    { name:'QG19', G1tag: false },
    { name:'QG20', G1tag: false },
    { name:'QG21', G1tag: false },
    { name:'QG22', G1tag: false },
    { name:'QG23', G1tag: false },
    { name:'QB8', B1tag: false }
];

var QFButton = [
    { name:'QF1', F1tag: false },
    { name:'QF2', F1tag: false },
    { name:'QF3', F1tag: false }
];

var QCStep = {
    QC6Step: 0,
    QC7Step: 0,
    QC8Step: 0,
    QC9Step: 0,
    QC10Step: 0,
    QC11Step: 0,
    QC12Step: 0,
    QC13Step: 0,
    QC14Step: 0,
    QC15Step: 0,
    QC16Step: 0,
    QC18Step: 0,
    QC23Step: 0,
    QC24Step: 0,
    QC26Step: 0,
    QG25Step: 0
};

var QBStep = {
    QB7Step: 0,
    QB8Step: 0,
    QB9Step: 0,
    QB10Step: 0
};

var HBStep = {
    HB7Step: 0,
    HB8Step: 0,
    HB9Step: 0,
    HB10Step: 0
};

var HAButton = [
    { name:'HA1', HA1tag: false},
    { name:'HA2', HA1tag: false},
    { name:'HA3', HA1tag: false},
    { name:'HA4', HA1tag: false},
    { name:'HA5', HA1tag: false},
    { name:'HA6', HA1tag: false},
    { name:'HA7', HA1tag: false},
    { name:'HA8', HA1tag: false},
    { name:'HA9', HA1tag: false},
    { name:'HA10', HA1tag: false},
    { name:'HA11', HA1tag: false},
    { name:'HA12', HA1tag: false},
    { name:'HA13', HA1tag: false},
    { name:'HA14', HA1tag: false},
    { name:'HA15', HA1tag: false},
    { name:'HA16', HA1tag: false},
    { name:'HA17', HA1tag: false},
    { name:'HA18', HA1tag: false},
    { name:'HA19', HA1tag: false},
    { name:'HA20', HA1tag: false},
    { name:'HA21', HA1tag: false},
    { name:'HA22', HA1tag: false}
];

var HGButton = [
    { name:'HG1', HG1tag: false },
    { name:'HG2', HG1tag: false },
    { name:'HG3', HG1tag: false },
    { name:'HG4', HG1tag: false },
    { name:'HG5', HG1tag: false },
    { name:'HG6', HG1tag: false },
    { name:'HG7', HG1tag: false },
    { name:'HG8', HG1tag: false },
    { name:'HG10', HG1tag: false },
    { name:'HG12', HG1tag: false },
    { name:'HG13', HG1tag: false },
    { name:'HG14', HG1tag: false },
    { name:'HG15', HG1tag: false },
    { name:'HG16', HG1tag: false },
    { name:'HG18', HG1tag: false },
    { name:'HG19', HG1tag: false },
    { name:'HG20', HG1tag: false },
    { name:'HG21', HG1tag: false },
    { name:'HG22', HG1tag: false },
    { name:'HG23', HG1tag: false },
    { name:'HG25', HG1tag: false },
    { name:'HB8', HB1tag: false }
];

var HCStep = {
    HC6Step: 0,
    HC7Step: 0,
    HC8Step: 0,
    HC9Step: 0,
    HC10Step: 0,
    HC11Step: 0,
    HC12Step: 0,
    HC13Step: 0,
    HC14Step: 0,
    HC15Step: 0,
    HC16Step: 0,
    HC18Step: 0,
    HC23Step: 0,
    HC24Step: 0,
    HC26Step: 0
};

var modeMesh ={
    meshQC23: null
}

