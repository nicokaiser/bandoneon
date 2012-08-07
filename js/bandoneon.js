
Bandoneon = {};

Bandoneon.Layouts = {
  'right': {
    'pull': {
      'b4': [138, 26],
      'g#4': [208, 23],
      'g4': [286, 23],
      'f4': [359, 28],

      'c#2': [107, 64],
      'a4': [171, 58],
      'f#4': [241, 58],
      'e4': [320, 58],
      'd#4': [381, 68],

      'c2': [79, 102],
      'd2': [140, 94],
      'g2': [206, 88],
      'a#3': [277, 91],
      'c4': [344, 98],
      'd4': [410, 108],

      'b1': [47, 148],
      'e2': [109, 137],
      'c#3': [176, 130],
      'f#2': [240, 127],
      'a2': [305, 130],
      'c3': [373, 137],
      'e3': [434, 150],

      'a1': [22, 192],
      'f2': [82, 179],
      'a#2': [142, 172],
      'g#2': [204, 166],
      'b2': [264, 164],
      'd3': [333, 167],
      'g#3': [394, 178],
      'b3': [460, 193],

      'a#1': [54, 228],
      'd#2': [114, 214],
      'f3': [175, 205],
      'd#3': [235, 201],
      'f#3': [298, 202],
      'a3': [359, 208],
      'c#4': [419, 218],
      'g3': [476, 238]
    },

    'push': {
      'a4': [138, 26],
      'g#4': [208, 23],
      'f#4': [286, 23],
      'f4': [359, 28],

      'c2': [107, 64],
      'g4': [171, 58],
      'a#3': [241, 58],
      'c4': [320, 58],
      'd#4': [381, 68],

      'd2': [79, 102],
      'c#2': [140, 94],
      'g#2': [206, 88],
      'a#2': [277, 91],
      'c3': [344, 98],
      'd4': [410, 108],

      'b1': [47, 148],
      'f#2': [109, 137],
      'f#3': [176, 130],
      'g2': [240, 127],
      'b2': [305, 130],
      'd3': [373, 137],
      'g3': [434, 150],

      'a1': [22, 192],
      'f2': [82, 179],
      'e2': [142, 172],
      'a2': [204, 166],
      'c#3': [264, 164],
      'b2 ': [333, 167],
      'a3': [394, 178],
      'c#4': [460, 193],

      'a#1': [54, 228],
      'd#2': [114, 214],
      'f3': [175, 205],
      'e3': [235, 201],
      'g#3': [298, 202],
      'b3': [359, 208],
      'e4': [419, 218],
      'd#3': [476, 238]
    }

  },

  'left': {
    'pull': {
      'g#0': [132, 35],
      'a#0': [197, 25],
      'c#1': [270, 24],
      'f1': [347, 25],
      'g#2': [414, 31],

      'e0': [45, 87],
      'a0': [102, 78],
      'g1': [168, 66],
      'd#1': [238, 61],
      'f2': [308, 58],
      'a#1': [379, 66],
      'f0': [444, 72],

      'd1': [77, 127],
      'a1': [139, 114],
      'c2': [209, 109],
      'e2': [276, 100],
      'c1': [342, 102],
      'g0': [410, 107],

      'e1': [49, 173],
      'g#1': [113, 161],
      'b1': [180, 152],
      'd2': [244, 144],
      'f#2': [310, 144],
      'c#2': [377, 149],
      'f#0': [440, 153],

      'd0': [26, 228],
      'b0': [89, 211],
      'g2': [152, 198],
      'a2': [216, 185],
      'd#2': [280, 185],
      'f#1': [346, 189],
      'd#0': [408, 194],
      'c0': [471, 202]
    },

    'push': {
      'g#0': [132, 35],
      'a#0': [197, 25],
      'd#1': [270, 24],
      'd#2': [347, 25],
      'g2': [414, 31],

      'd0': [45, 87],
      'd1': [102, 78],
      'a#1': [168, 66],
      'c2': [238, 61],
      'c#1': [308, 58],
      'c1': [379, 66],
      'f#0': [444, 72],

      'g0': [77, 127],
      'g1': [139, 114],
      'b1': [209, 109],
      'd2': [276, 100],
      'f2': [342, 102],
      'f#1': [410, 107],

      'a0': [49, 173],
      'e1': [113, 161],
      'a1': [180, 152],
      'c#2': [244, 144],
      'e2': [310, 144],
      'g#1': [377, 149],
      'b0': [440, 153],

      'e0': [26, 228],
      'e1 ': [89, 211],
      'f#2': [152, 198],
      'g#2': [216, 185],
      'b2': [280, 185],
      'f1': [346, 189],
      'c#0': [408, 194],
      'f0': [471, 202]
    }
  }
};

Bandoneon.Keys = [ 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b' ];

Bandoneon.Scale = function(key, octave, mode) {
  var pos = Bandoneon.Keys.indexOf(key);
  if (pos === -1) return [];

  var intervals = Bandoneon.Modes[Bandoneon.config.mode];
  if (typeof intervals === 'undefined') return [];

  var scale = [];
  for (var s in intervals) {
    scale.push(Bandoneon.Keys[pos] + '' + octave);
    pos += intervals[s];
    if (pos >= Bandoneon.Keys.length) {
      octave++;
    }
    pos %= Bandoneon.Keys.length;
  }

  return scale;
};

Bandoneon.Modes = {
    'major': [ 2, 2, 1, 2, 2, 2, 1 ]
  , 'minor': [ 2, 1, 2, 2, 1, 2, 2 ]
  , 'chromatic': [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
};

Bandoneon.config = {
    key: ''
  , mode: ''
  , dir: 'pull'
  , side: 'right'
  
  , scaleColors: ['blue', 'red', 'green', 'orange', 'blue']
  , octaveColors: ['#bcf', '#fdc', '#cfc', '#fea']
  , showOctaveColors: false
};

Bandoneon.drawButtons = function(layout) {
  for (var k in layout) {
    layout[k][0] *= 1.5; // FIXME
    layout[k][1] *= 1.5;

    var label = k;

    // label
    var l = label[0];
    var octave = label[1];
    if (label[1] == '#') {
      octave = label[2];
    }
    if (octave == 0) l = label[0].toUpperCase();
    if (label[1] == '#') l += '♯';
    else if (label[1] == 'b') l += '♭';
    if (octave == 1) l += '';
    else if (octave == 2) l += 'ʹ';
    else if (octave == 3) l += 'ʹʹ';
    else if (octave == 4) l += 'ʹʹʹ';

    var fill = 'white';
    if (Bandoneon.config.showOctaveColors) {
      fill = Bandoneon.config.octaveColors[octave % (Bandoneon.config.octaveColors.length)];
    }

    Bandoneon.paper.circle(layout[k][0] + 30, layout[k][1] + 30, 30)
      .attr({
        'stroke-width': 2,
        'fill': fill,
      });

    Bandoneon.paper.text(layout[k][0] + 30, layout[k][1] + 30, l)
      .attr({
        'font-family': 'serif',
        'font-size': 21,
        'font-style': 'italic',
        'cursor': 'default'
      });
  }
};

Bandoneon.drawScale = function(layout, scale, color) {
  var pathString = '';
  for (var t in scale) {
    if (layout.hasOwnProperty(scale[t])) {
      pathString += (pathString === '')?'M':'L';
      pathString += layout[scale[t]][0] + 30;
      pathString += ',';
      pathString += layout[scale[t]][1] + 30;
    }
  }

  if (pathString === '') return;

  // draw line    
  return Bandoneon.paper.path(pathString)
    .attr({
      'stroke': color,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': 7,
      'stroke-opacity': 0.33
    });
};

Bandoneon.redraw = function() {
  Bandoneon.paper.clear();
  
  if (!Bandoneon.config.side || !Bandoneon.config.dir) return;

  var layout = JSON.parse(JSON.stringify(Bandoneon.Layouts[Bandoneon.config.side][Bandoneon.config.dir])); // FIXME
  Bandoneon.drawButtons(layout);

  if (!Bandoneon.config.key || !Bandoneon.config.mode) return;

  for (var o = 0; o < 5; o++) {
    var scale = Bandoneon.Scale(Bandoneon.config.key, o, Bandoneon.config.mode);
    scale.push(Bandoneon.config.key + '' + (o + 1));
    Bandoneon.drawScale(layout, scale, Bandoneon.config.scaleColors[o]);
  }
};
