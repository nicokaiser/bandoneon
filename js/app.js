
$(function() {

  // Color codes for coloring the scale lines
  var scaleColors = ['blue', 'red', 'green', 'orange', 'blue'];

  // Color codes for coloring the octaves
  var octaveColors = ['#bcf', '#fdc', '#cfc', '#fea'];


  // Model
  // -----

  // Represents the bandoneon keyboard that can(!) have a
  // direction (push/pull), a side (right/left) and key + mode
  var AppModel = Backbone.Model.extend({

    defaults: {
      direction: 'pull',
      side: 'right',
      key: null,
      mode: null
    },

    validate: function(attrs) {
      // side: left, right
      if (attrs.side && _.indexOf(['left', 'right'], attrs.side) === -1) {
        return 'invalid side';
      }

      // direction: push, pull
      if (attrs.direction && _.indexOf(['push', 'pull'], attrs.direction) === -1) {
        return 'invalid direction';
      }

      // key: from Bandoneon.keys
      if (attrs.key && _.indexOf(Bandoneon.keys, attrs.key) === -1) {
        return 'invalid key';
      }

      // mode: from Bandoneon.modes
      if (attrs.mode && !Bandoneon.modes.hasOwnProperty(attrs.mode)) {
        return 'invalid mode';
      }

      return;
    }

  });

  var appModel = new AppModel();


  // Router
  // ------

  // Configure URL routes for scale selection
  var AppRouter = Backbone.Router.extend({

    routes: {
      'scales/:side/:direction': 'selectLayout',
      'scales/:side/:direction/:key/:mode': 'selectScale'
    },

    selectLayout: function(side, direction) {
      appModel.set({ 
        'side': side,
        'direction': direction
      });
    },

    selectScale: function(side, direction, key, mode) {
      appModel.set({
        'side': side,
        'direction': direction,
        'key': key,
        'mode': mode
      });
    }

  });

  var appRouter = new AppRouter();


  // View
  // ----

  // Renders the keyboard to our container DIV via Raphaël.
  var AppView = Backbone.View.extend({

    paper: null,
    showOctaveColors: false,

    el: document.getElementById('container'),

    events: {
      'click #toggle-octavecolors': 'toggleOctaveColors'
    },

    // Initialie Raphaël and listen to changes
    initialize: function() {
      this.paper = Raphael(this.el, 800, 450);
      this.render();
      this.model.bind('change', this.render, this);
    },

    // Render button layout (with colored octaves)
    renderButtons: function(side, direction) {
      var layout = _.clone(Bandoneon.layout[side][direction]);

      for (var k in layout) {
        var label = k;
        var l = label[0];
        var octave = label[1];
        if (label[1] == '#') {
          octave = label[2];
        }
        if (octave === 0) l = label[0].toUpperCase();
        if (label[1] == '#') l += '♯';
        else if (label[1] == 'b') l += '♭';
        if (octave === 1) l += '';
        else if (octave === 2) l += 'ʹ';
        else if (octave === 3) l += 'ʹʹ';
        else if (octave === 4) l += 'ʹʹʹ';

        var fill = (this.showOctaveColors ? octaveColors[octave % (octaveColors.length)] : 'white');

        this.paper.circle(layout[k][0] + 30, layout[k][1] + 30, 30)
          .attr({
            'stroke-width': 2,
            'fill': fill
          });

        this.paper.text(layout[k][0] + 30, layout[k][1] + 30, l)
          .attr({
            'font-family': 'serif',
            'font-size': 21,
            'font-style': 'italic',
            'cursor': 'default'
          });
      }
    },

    // Render a specific scale
    renderScale: function(side, direction, scale, color) {
      var layout = _.clone(Bandoneon.layout[side][direction]);
      if (!layout) return;

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

      return this.paper.path(pathString)
        .attr({
          'stroke': color,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': 7,
          'stroke-opacity': 0.33
        });
    },

    // Render the whole layout with buttons, octaves and scale
    render: function() {
      var side = this.model.get('side');
      var direction = this.model.get('direction');
  
      if (!side || !direction) return;

      this.paper.clear();
      this.renderButtons(side, direction);

      $('#nav-sides a[href="#' + side + '-' + direction + '"]').tab('show');

      var key = this.model.get('key');
      var mode = this.model.get('mode');

      if (!key || !mode) {
        appRouter.navigate('scales/' + side + '/' + direction, {replace: true});
        return;
      }

      // dismiss introduction alert
      $("#intro-alert").alert('close');

      for (var o = 0; o < 5; o++) {
        var scale = Bandoneon.utils.scale(key, o, mode);
        scale.push(key + '' + (o + 1));
        this.renderScale(side, direction, scale, scaleColors[o]);
      }

      appRouter.navigate('scales/' + side + '/' + direction + '/' 
        + key + '/' + mode, {replace: true});
      return this;
    },

    // Toggle colored octaves and re-render
    toggleOctaveColors: function() {
      this.showOctaveColors = !this.showOctaveColors;
      this.render();
    }

  });

  var appView = new AppView({ model: appModel, router: appRouter });

  Backbone.history.start();

  
  // Scales

  // don't submit the form
  $('#scale-form').submit(function() {
    return false;
  });

  // octave color toggle
  $('#toggle-octavecolors').click(function() { 
    appView.toggleOctaveColors();
    $('#toggle-octavecolors').button('toggle');
  });

  // side / direction navigation
  $('#nav-sides a[data-toggle="tab"]').on('shown', function(e) {
    switch (e.target.hash) {
      case '#left-pull':
        appModel.set({ 'side': 'left', 'direction': 'pull' });
        break;
      case '#left-push':
        appModel.set({ 'side': 'left', 'direction': 'push' });
        break;
      case '#right-pull':
        appModel.set({ 'side': 'right', 'direction': 'pull' });
        break;
      case '#right-push':
        appModel.set({ 'side': 'right', 'direction': 'push' });
        break;
    }
  });

  // key select
  $('#select-key').change(function() {
    $('#select-key option:selected').each(function() {
      appModel.set('key', $(this).val());
    });
  });

  // mode select
  $('#select-mode').change(function() {
    $('#select-mode option:selected').each(function() {
      appModel.set('mode', $(this).val());
    });
  });

});
