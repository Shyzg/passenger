/* @ds-bundle: {"format":4,"namespace":"Passenger","components":[{"name":"Icon"},{"name":"Button"},{"name":"Artwork"},{"name":"NowPlaying"},{"name":"TransportControls"},{"name":"VolumeStepper"},{"name":"TrackRow"},{"name":"SearchField"},{"name":"TextField"},{"name":"SeatTag"},{"name":"SeatPicker"},{"name":"TripHeader"},{"name":"TripNotice"},{"name":"SettingSwitch"},{"name":"PendingPassenger"},{"name":"JoinCard"}]} */
/* Passenger components: one classic script. Needs window.React 18; assigns window.Passenger. */
(function () {
  'use strict';
  var React = window.React;
  var h = React.createElement;

  function cx() {
    var out = [];
    for (var i = 0; i < arguments.length; i++) if (arguments[i]) out.push(arguments[i]);
    return out.join(' ');
  }

  function omit(obj, keys) {
    var out = {};
    for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && keys.indexOf(k) < 0) out[k] = obj[k];
    return out;
  }

  function clamp(n, lo, hi) { return Math.min(hi, Math.max(lo, Number(n) || 0)); }

  // Music-player convention: 3:48, or 1:02:05 for long episodes. Clock times elsewhere are written 18.00.
  function formatDuration(ms) {
    var total = Math.max(0, Math.floor((Number(ms) || 0) / 1000));
    var hrs = Math.floor(total / 3600), min = Math.floor((total % 3600) / 60), sec = total % 60;
    var ss = (sec < 10 ? '0' : '') + sec;
    return hrs ? hrs + ':' + (min < 10 ? '0' : '') + min + ':' + ss : min + ':' + ss;
  }

  /* ---------- Icon: 24px grid, 2px round stroke; transport glyphs are filled ---------- */

  var ICONS = {
    play: { filled: true, parts: [['path', { d: 'M8 5.9v12.2c0 .79.87 1.27 1.54.85l9.4-6.1a1 1 0 0 0 0-1.7l-9.4-6.1C8.87 4.63 8 5.11 8 5.9z' }]] },
    pause: { filled: true, parts: [['rect', { x: 6, y: 5, width: 4, height: 14, rx: 1.2 }], ['rect', { x: 14, y: 5, width: 4, height: 14, rx: 1.2 }]] },
    next: { filled: true, parts: [['path', { d: 'M5 6.4v11.2c0 .79.87 1.27 1.53.85l8.9-5.6a1 1 0 0 0 0-1.7l-8.9-5.6C5.87 5.13 5 5.61 5 6.4z' }], ['rect', { x: 16.5, y: 5.5, width: 3, height: 13, rx: 1 }]] },
    previous: { filled: true, parts: [['path', { d: 'M19 6.4v11.2c0 .79-.87 1.27-1.53.85l-8.9-5.6a1 1 0 0 1 0-1.7l8.9-5.6c.66-.42 1.53.06 1.53.85z' }], ['rect', { x: 4.5, y: 5.5, width: 3, height: 13, rx: 1 }]] },
    'queue-add': { parts: [['path', { d: 'M4 6.5h11M4 11.5h11M4 16.5h7M18 13.5v7M14.5 17h7' }]] },
    plus: { parts: [['path', { d: 'M12 5v14M5 12h14' }]] },
    minus: { parts: [['path', { d: 'M5 12h14' }]] },
    search: { parts: [['circle', { cx: 11, cy: 11, r: 6.5 }], ['path', { d: 'M16 16l4.5 4.5' }]] },
    check: { parts: [['path', { d: 'M5 12.5l4.5 4.5L19 7.5' }]] },
    close: { parts: [['path', { d: 'M6 6l12 12M18 6L6 18' }]] },
    lock: { parts: [['rect', { x: 5, y: 10.5, width: 14, height: 9.5, rx: 2 }], ['path', { d: 'M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5' }]] },
    volume: { parts: [['path', { d: 'M4 9.5h3.2L12 5.8v12.4l-4.8-3.7H4z' }], ['path', { d: 'M15.5 9.2a4 4 0 0 1 0 5.6M18.2 6.6a7.6 7.6 0 0 1 0 10.8' }]] },
    tap: { parts: [['rect', { x: 4.5, y: 7, width: 9, height: 14, rx: 2 }], ['path', { d: 'M8 18h2M16.2 3.8a6 6 0 0 1 4 4M15.6 7.4a2.6 2.6 0 0 1 1.4 1.4' }]] },
    qr: { parts: [['rect', { x: 4, y: 4, width: 6, height: 6, rx: 1 }], ['rect', { x: 14, y: 4, width: 6, height: 6, rx: 1 }], ['rect', { x: 4, y: 14, width: 6, height: 6, rx: 1 }], ['path', { d: 'M14 14h2.5v2.5M20 14v.01M14 20h.01M17.5 20H20v-3' }]] },
    steering: { parts: [['circle', { cx: 12, cy: 12, r: 8.5 }], ['circle', { cx: 12, cy: 12, r: 2.2 }], ['path', { d: 'M3.8 10.4l6.1 1M20.2 10.4l-6.1 1M12 14.2v6.3' }]] },
    disc: { parts: [['circle', { cx: 12, cy: 12, r: 8.5 }], ['circle', { cx: 12, cy: 12, r: 2.5 }]] },
    alert: { parts: [['circle', { cx: 12, cy: 12, r: 8.5 }], ['path', { d: 'M12 7.8v5M12 16.2v.01' }]] },
    clock: { parts: [['circle', { cx: 12, cy: 12, r: 8.5 }], ['path', { d: 'M12 7.5V12l3 2' }]] },
    car: { parts: [['path', { d: 'M5 12l1.8-4.6a1.5 1.5 0 0 1 1.4-.9h7.6a1.5 1.5 0 0 1 1.4.9L19 12' }], ['path', { d: 'M4 12h16v3.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z' }], ['path', { d: 'M6 16.5v2M18 16.5v2M7.5 14h.01M16.5 14h.01' }]] },
    back: { parts: [['path', { d: 'M15 5l-7 7 7 7' }]] },
    leave: { parts: [['path', { d: 'M10 5H6.5a1.5 1.5 0 0 0-1.5 1.5v11A1.5 1.5 0 0 0 6.5 19H10M14 8l4 4-4 4M18 12H9' }]] }
  };

  function Icon(props) {
    var def = ICONS[props.name];
    if (!def) return null;
    var size = props.size || 24;
    var paint = def.filled
      ? { fill: 'currentColor' }
      : { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
    return h('svg', Object.assign({
      className: cx('ps-icon', props.className),
      width: size, height: size, viewBox: '0 0 24 24', focusable: 'false',
      role: props.label ? 'img' : undefined,
      'aria-label': props.label || undefined,
      'aria-hidden': props.label ? undefined : 'true'
    }, paint), def.parts.map(function (part, i) { return h(part[0], Object.assign({ key: i }, part[1])); }));
  }

  /* ---------- Button ---------- */

  var ICON_SIZE = { md: 24, lg: 28, hero: 36 };

  function Button(props) {
    var variant = props.variant || 'secondary';
    var size = props.size || 'md';
    var rest = omit(props, ['variant', 'size', 'icon', 'iconOnly', 'className', 'children', 'type']);
    return h('button', Object.assign({ type: props.type || 'button' }, rest, {
      className: cx('ps-btn', 'ps-btn--' + variant, 'ps-btn--' + size, props.iconOnly && 'ps-btn--icon', props.className)
    }),
    props.icon ? h(Icon, { name: props.icon, size: ICON_SIZE[size] || 24 }) : null,
    // an icon-only button keeps its words for screen readers
    props.iconOnly ? h('span', { className: 'ps-vh' }, props.children) : props.children);
  }

  /* ---------- Artwork ---------- */

  function Artwork(props) {
    var size = props.size || 'row';
    var cls = cx('ps-art', 'ps-art--' + size, props.className);
    if (props.src) return h('img', { className: cls, src: props.src, alt: props.alt || '', loading: 'lazy', decoding: 'async' });
    // no artwork: local files on the driver's phone, or while loading
    return h('span', {
      className: cx(cls, 'ps-art--empty', props.tone && props.tone !== 'neutral' && 'ps-art--' + props.tone),
      role: props.alt ? 'img' : undefined,
      'aria-label': props.alt || undefined,
      'aria-hidden': props.alt ? undefined : 'true'
    }, h(Icon, { name: 'disc', size: size === 'hero' ? 72 : 24 }));
  }

  function Explicit() {
    return h('span', { className: 'ps-explicit', role: 'img', 'aria-label': 'Eksplisit' }, 'E');
  }

  function Eq(props) {
    return h('span', { className: cx('ps-eq', props.on && 'ps-eq--on'), 'aria-hidden': 'true' }, h('i'), h('i'), h('i'));
  }

  /* ---------- Seats: "row-col", row 1 at the front, col 1 on the left seen from above ---------- */

  var DEFAULT_LAYOUT = [2, 3, 2]; // seven-seat MPV, the most common family car in Indonesia

  function parseSeat(seat) {
    var m = /^(\d+)-(\d+)$/.exec(String(seat || ''));
    return m ? { row: +m[1], col: +m[2] } : null;
  }

  // Indonesia drives on the left, so the steering wheel sits front right.
  function driverCol(layout, side) { return side === 'left' ? 1 : layout[0]; }

  function seatParts(seat, layout, side) {
    var p = parseSeat(seat), count = p && layout[p.row - 1];
    if (!p || !count || p.col < 1 || p.col > count) return null;
    var pos = count === 1 ? '' : p.col === 1 ? 'kiri' : p.col === count ? 'kanan' : 'tengah';
    if (p.row === 1) {
      if (p.col === driverCol(layout, side)) return { row: 'Pengemudi', pos: '' };
      return { row: 'Depan', pos: count === 2 ? '' : pos };
    }
    return { row: p.row === layout.length ? 'Belakang' : 'Tengah', pos: pos };
  }

  function seatLabel(seat, layout, side) {
    var s = seatParts(seat, layout || DEFAULT_LAYOUT, side);
    if (!s) return 'Kursi';
    if (!s.pos) return s.row;
    if (s.row === 'Tengah' && s.pos === 'tengah') return 'Tengah';
    return s.row + ' ' + s.pos;
  }

  function seatShort(seat, layout, side) {
    var s = seatParts(seat, layout, side);
    if (!s) return 'Kursi';
    return s.pos ? s.pos.charAt(0).toUpperCase() + s.pos.slice(1) : s.row;
  }

  // a row with fewer seats than the widest row keeps its seats at the doors
  function seatColumn(index, count, maxCols) {
    return count === 1 ? Math.ceil(maxCols / 2) : Math.round(index * (maxCols - 1) / (count - 1)) + 1;
  }

  function SeatGlyph(props) {
    var layout = props.layout, me = parseSeat(props.seat);
    var maxCols = Math.max.apply(null, layout), u = 4, g = 1.5;
    var cells = [];
    layout.forEach(function (count, r) {
      for (var c = 0; c < count; c++) {
        var x = (seatColumn(c, count, maxCols) - 1) * (u + g), y = r * (u + g);
        var isMe = me && me.row === r + 1 && me.col === c + 1;
        var isDriver = r === 0 && c + 1 === driverCol(layout, props.driverSide);
        cells.push(isDriver
          ? h('rect', { key: r + '-' + c, className: 'is-driver', x: x + 0.5, y: y + 0.5, width: u - 1, height: u - 1, rx: 1 })
          : h('rect', { key: r + '-' + c, className: isMe ? 'is-me' : undefined, x: x, y: y, width: u, height: u, rx: 1 }));
      }
    });
    var w = maxCols * u + (maxCols - 1) * g, ht = layout.length * u + (layout.length - 1) * g;
    return h('svg', { className: 'ps-seat-glyph', width: w, height: ht, viewBox: '0 0 ' + w + ' ' + ht, 'aria-hidden': 'true', focusable: 'false' }, cells);
  }

  function SeatTag(props) {
    var layout = props.layout || DEFAULT_LAYOUT;
    var seatName = seatLabel(props.seat, layout, props.driverSide);
    return h('span', { className: cx('ps-seat-tag', props.size === 'sm' && 'ps-seat-tag--sm', props.className) },
      h(SeatGlyph, { layout: layout, seat: props.seat, driverSide: props.driverSide }),
      h('span', { className: 'ps-seat-tag__label meta' }, props.name || seatName),
      props.name ? h('span', { className: 'ps-vh' }, ', ' + seatName) : null);
  }

  function SeatPicker(props) {
    var layout = props.layout || DEFAULT_LAYOUT;
    var side = props.driverSide || 'right';
    var taken = props.taken || {};
    var maxCols = Math.max.apply(null, layout);
    var group = props.name || 'ps-seat';
    function pick(e) { if (props.onChange) props.onChange(e.target.value); }

    return h('fieldset', { className: cx('ps-seats', props.className) },
      h('legend', { className: 'ps-seats__legend section' }, props.legend || 'Pilih kursimu'),
      h('div', { className: 'ps-seats__car' },
        h('span', { className: 'ps-seats__front label', 'aria-hidden': 'true' }, 'Depan'),
        layout.map(function (count, r) {
          var seats = [];
          for (var c = 0; c < count; c++) {
            var id = (r + 1) + '-' + (c + 1);
            var isDriver = r === 0 && c + 1 === driverCol(layout, side);
            var who = Object.prototype.hasOwnProperty.call(taken, id) ? taken[id] : null;
            var selected = props.value === id;
            var full = seatLabel(id, layout, side);
            seats.push(h('label', {
              key: id,
              className: cx('ps-seat', isDriver && 'is-driver', who !== null && 'is-taken', selected && 'is-selected'),
              style: { gridColumn: String(seatColumn(c, count, maxCols)) }
            },
            h('input', {
              className: 'ps-vh', type: 'radio', name: group, value: id,
              checked: selected, disabled: isDriver || who !== null, onChange: pick,
              'aria-label': isDriver ? 'Pengemudi' : who !== null ? full + ', terisi' + (who ? ' oleh ' + who : '') : full
            }),
            h('span', { className: 'ps-seat__icon', 'aria-hidden': 'true' },
              isDriver ? h(Icon, { name: 'steering', size: 22 }) : selected ? h(Icon, { name: 'check', size: 22 }) : null),
            h('span', { className: 'ps-seat__label meta', 'aria-hidden': 'true' },
              isDriver ? 'Pengemudi' : who !== null ? (who || 'Terisi') : selected ? 'Kursimu' : seatShort(id, layout, side))));
          }
          return h('div', { key: r, className: 'ps-seats__row', style: { gridTemplateColumns: 'repeat(' + maxCols + ', minmax(0, 1fr))' } }, seats);
        })));
  }

  /* ---------- TripHeader: the top of every passenger screen, your seat and the way out ---------- */

  function TripHeader(props) {
    return h('header', { className: cx('ps-trip', props.className) },
      h('p', { className: 'ps-trip__seat' },
        h('span', { className: 'ps-vh' }, 'Kursimu: '),
        h(SeatTag, { seat: props.seat, name: props.name, layout: props.layout, driverSide: props.driverSide })),
      props.onLeave ? h(Button, { variant: 'ghost', icon: 'leave', onClick: props.onLeave }, props.leaveLabel || 'Turun') : null);
  }

  /* ---------- Player ---------- */

  function NowPlaying(props) {
    var t = props.track || {};
    var dur = t.durationMs || 0;
    var pos = clamp(props.progressMs, 0, dur);
    var paused = props.isPlaying === false;
    return h('section', { className: cx('ps-now', props.className), 'aria-label': 'Sedang diputar' },
      h('p', { className: 'ps-now__eyebrow label' }, h(Eq, { on: !paused }), paused ? 'Dijeda' : 'Sedang diputar'),
      h(Artwork, { src: t.art, alt: t.album ? 'Sampul album ' + t.album : '', size: 'hero', tone: props.artTone }),
      h('div', { className: 'ps-now__text' },
        h('h2', { className: 'ps-now__title track-title' }, t.title),
        h('p', { className: 'ps-now__artist meta' }, t.explicit ? h(Explicit) : null, t.artist)),
      props.addedBy ? h('p', { className: 'ps-now__by meta' }, 'Dipilih oleh', h(SeatTag, Object.assign({ size: 'sm' }, props.addedBy))) : null,
      h('div', { className: 'ps-progress' },
        h('div', {
          className: 'ps-progress__track', role: 'progressbar', 'aria-label': 'Posisi lagu',
          'aria-valuemin': 0, 'aria-valuemax': Math.round(dur / 1000), 'aria-valuenow': Math.round(pos / 1000),
          'aria-valuetext': formatDuration(pos) + ' dari ' + formatDuration(dur)
        }, h('div', { className: 'ps-progress__fill', style: { width: (dur ? (pos / dur) * 100 : 0) + '%' } })),
        h('div', { className: 'ps-progress__times meta', 'aria-hidden': 'true' },
          h('span', null, formatDuration(pos)), h('span', null, formatDuration(dur)))),
      props.children ? h('div', { className: 'ps-now__controls' }, props.children) : null,
      props.attribution ? h('div', { className: 'ps-now__attr meta' }, props.attribution) : null);
  }

  var CONTROL_WORDS = { previous: 'sebelumnya', playPause: 'putar/jeda', next: 'lewati' };

  function joinWords(words) {
    return words.length < 2 ? words.join('') : words.slice(0, -1).join(', ') + ' dan ' + words[words.length - 1];
  }

  function TransportControls(props) {
    var locked = props.locked || [];           // turned off by the driver
    var unavailable = props.unavailable || []; // blocked by Spotify right now (playback actions)
    var playing = !!props.isPlaying;

    function control(key, icon, words, variant, size, onClick) {
      var isLocked = locked.indexOf(key) >= 0;
      var off = isLocked || unavailable.indexOf(key) >= 0;
      return h('span', { className: 'ps-transport__slot', key: key },
        h(Button, { variant: variant, size: size, iconOnly: true, icon: icon, disabled: off, onClick: off ? undefined : onClick },
          words + (isLocked ? ' (dikunci pengemudi)' : '')),
        isLocked ? h('span', { className: 'ps-transport__lock', 'aria-hidden': 'true' }, h(Icon, { name: 'lock', size: 14 })) : null);
    }

    return h('div', { className: cx('ps-transport', props.className), role: 'group', 'aria-label': 'Kontrol pemutar' },
      h('div', { className: 'ps-transport__row' },
        control('previous', 'previous', 'Lagu sebelumnya', 'secondary', 'lg', props.onPrevious),
        control('playPause', playing ? 'pause' : 'play', playing ? 'Jeda' : 'Putar', 'primary', 'hero', props.onPlayPause),
        control('next', 'next', 'Lewati', 'secondary', 'lg', props.onNext)),
      locked.length ? h('p', { className: 'ps-transport__note meta' }, h(Icon, { name: 'lock', size: 16 }),
        'Pengemudi mengunci tombol ' + joinWords(locked.map(function (k) { return CONTROL_WORDS[k] || k; })) + '.') : null);
  }

  function VolumeStepper(props) {
    var step = props.step || 10;
    var v = Math.round(clamp(props.value, 0, 100));
    var locked = !!props.locked;
    function set(next) { if (props.onChange) props.onChange(clamp(next, 0, 100)); }
    var segments = [];
    for (var i = 1; i <= 10; i++) segments.push(h('i', { key: i, className: v >= i * 10 ? 'is-on' : undefined }));

    return h('div', { className: cx('ps-volume', locked && 'is-locked', props.className), role: 'group', 'aria-label': 'Volume' },
      h('span', { className: 'ps-volume__label label' }, h(Icon, { name: 'volume', size: 18 }), 'Volume'),
      h('div', { className: 'ps-volume__row' },
        h(Button, { iconOnly: true, icon: 'minus', size: 'lg', disabled: locked || v <= 0, onClick: function () { set(v - step); } }, 'Kecilkan volume'),
        h('output', { className: 'ps-volume__value code', 'aria-live': 'polite' }, v + '%'),
        h(Button, { iconOnly: true, icon: 'plus', size: 'lg', disabled: locked || v >= 100, onClick: function () { set(v + step); } }, 'Besarkan volume')),
      h('div', { className: 'ps-volume__meter', 'aria-hidden': 'true' }, segments),
      locked ? h('p', { className: 'ps-volume__note meta' }, h(Icon, { name: 'lock', size: 16 }), 'Pengemudi mengunci volume.') : null);
  }

  /* ---------- Queue and search ---------- */

  function TrackRow(props) {
    var status = props.status || 'idle';
    var playing = status === 'playing';
    var lead = null;
    if (playing) lead = h('span', { className: 'ps-row__pos' }, h(Eq, { on: true }), h('span', { className: 'ps-vh' }, 'Sedang diputar'));
    else if (props.position != null) lead = h('span', { className: 'ps-row__pos meta' }, props.position);

    var action = null;
    if (status === 'added') {
      action = h('span', { className: 'ps-row__added meta' }, h(Icon, { name: 'check', size: 18 }), 'Masuk antrean');
    } else if (props.onAdd || status === 'adding') {
      action = h(Button, {
        iconOnly: true, icon: 'queue-add', className: status === 'adding' ? 'is-busy' : undefined,
        disabled: status === 'adding', 'aria-busy': status === 'adding' ? 'true' : undefined,
        onClick: status === 'adding' ? undefined : props.onAdd
      }, (status === 'adding' ? 'Menambahkan ' : 'Tambah ke antrean: ') + props.title);
    }

    return h('div', { className: cx('ps-row', playing && 'is-playing', props.className) },
      lead,
      h(Artwork, { src: props.art, size: 'row', tone: props.artTone }),
      h('div', { className: 'ps-row__text' },
        h('p', { className: 'ps-row__title row-title' }, props.title),
        h('p', { className: 'ps-row__meta meta' },
          props.explicit ? h(Explicit) : null,
          h('span', { className: 'ps-row__artist' }, props.artist),
          props.durationMs ? h('span', { className: 'ps-row__dur' }, '· ' + formatDuration(props.durationMs)) : null)),
      props.addedBy ? h(SeatTag, Object.assign({ size: 'sm' }, props.addedBy)) : null,
      action);
  }

  function SearchField(props) {
    var id = props.id || 'ps-search';
    var value = props.value || '';
    return h('div', { className: cx('ps-search', props.className), role: 'search' },
      h('label', { className: 'ps-vh', htmlFor: id }, props.label || 'Cari lagu'),
      h(Icon, { name: 'search', size: 22, className: 'ps-search__icon' }),
      h('input', {
        id: id, className: 'ps-search__input', type: 'search', inputMode: 'search', enterKeyHint: 'search',
        autoComplete: 'off', autoCorrect: 'off', spellCheck: false,
        placeholder: props.placeholder || 'Cari lagu atau artis', value: value,
        readOnly: !props.onChange, 'aria-busy': props.busy ? 'true' : undefined,
        onChange: props.onChange ? function (e) { props.onChange(e.target.value); } : undefined
      }),
      value && props.onClear ? h('button', { type: 'button', className: 'ps-search__clear', onClick: props.onClear },
        h(Icon, { name: 'close', size: 20 }), h('span', { className: 'ps-vh' }, 'Hapus pencarian')) : null);
  }

  /* ---------- TextField: a square input for short answers; 17px so iOS Safari does not zoom ---------- */

  function TextField(props) {
    var hintId = props.hint ? props.id + '-hint' : undefined;
    return h('div', { className: cx('ps-field', props.className) },
      h('label', { className: 'ps-field__label label', htmlFor: props.id }, props.label),
      h('input', {
        id: props.id, className: 'ps-field__input', type: props.type || 'text',
        value: props.value == null ? '' : props.value, placeholder: props.placeholder,
        maxLength: props.maxLength, autoComplete: props.autoComplete || 'off', enterKeyHint: props.enterKeyHint,
        readOnly: !props.onChange, 'aria-describedby': hintId,
        onChange: props.onChange ? function (e) { props.onChange(e.target.value); } : undefined
      }),
      props.hint ? h('p', { id: hintId, className: 'ps-field__hint meta' }, props.hint) : null);
  }

  /* ---------- Trip status and driver settings ---------- */

  var NOTICE_PRESETS = {
    'no-trip': { tone: 'neutral', icon: 'car', title: 'Perjalanan belum dimulai', body: 'Kontrol musik terbuka setelah pengemudi memulai perjalanan.' },
    waiting: { tone: 'wait', icon: 'clock', title: 'Menunggu persetujuan', body: 'Kamu bisa memilih lagu begitu pengemudi menyetujui.' },
    joined: { tone: 'info', icon: 'check', title: 'Kamu sudah naik', body: 'Cari lagu, lalu tambahkan ke antrean.' },
    locked: { tone: 'neutral', icon: 'lock', title: 'Dikunci pengemudi', body: 'Kontrol ini sedang tidak bisa dipakai penumpang.' },
    'no-device': { tone: 'wait', icon: 'alert', title: 'Spotify di mobil belum aktif', body: 'Minta pengemudi memutar lagu di Spotify dulu. Antrean hanya bisa diisi saat ada pemutar yang aktif.' },
    premium: { tone: 'stop', icon: 'alert', title: 'Butuh Spotify Premium', body: 'Antrean dan kontrol pemutar hanya bisa dipakai dengan akun Premium pengemudi.' },
    'rate-limited': { tone: 'wait', icon: 'clock', title: 'Tunggu sebentar', body: 'Spotify sedang membatasi permintaan. Coba lagi dalam beberapa detik.' },
    ended: { tone: 'neutral', icon: 'leave', title: 'Perjalanan selesai', body: 'Terima kasih sudah ikut memilih lagu. Pindai lagi di perjalanan berikutnya.' }
  };

  function TripNotice(props) {
    var p = NOTICE_PRESETS[props.preset] || {};
    var tone = props.tone || p.tone || 'neutral';
    var body = props.children || p.body;
    return h('div', { className: cx('ps-notice', 'ps-notice--' + tone, props.className), role: tone === 'stop' ? 'alert' : 'status' },
      h(Icon, { name: props.icon || p.icon || 'alert', size: 24, className: 'ps-notice__icon' }),
      h('div', { className: 'ps-notice__text' },
        h('p', { className: 'ps-notice__title row-title' }, props.title || p.title),
        body ? h('p', { className: 'ps-notice__body body' }, body) : null,
        props.action ? h('div', { className: 'ps-notice__action' }, props.action) : null));
  }
  TripNotice.presets = NOTICE_PRESETS;

  function SettingSwitch(props) {
    var descId = props.description ? props.id + '-desc' : undefined;
    return h('label', { className: cx('ps-setting', props.disabled && 'is-disabled', props.className), htmlFor: props.id },
      h('span', { className: 'ps-setting__text' },
        h('span', { className: 'ps-setting__label row-title' }, props.label),
        props.description ? h('span', { id: descId, className: 'ps-setting__desc meta' }, props.description) : null),
      h('input', {
        id: props.id, className: 'ps-switch', type: 'checkbox', role: 'switch',
        checked: !!props.checked, disabled: props.disabled, 'aria-describedby': descId,
        onChange: function (e) { if (props.onChange) props.onChange(e.target.checked); }
      }));
  }

  /* ---------- PendingPassenger: one passenger waiting for the driver, decided while the car is stopped ---------- */

  function PendingPassenger(props) {
    var layout = props.layout || DEFAULT_LAYOUT;
    // the visible word is short; screen readers hear who it is for
    var who = ' ' + (props.name || seatLabel(props.seat, layout, props.driverSide));
    return h('div', { className: cx('ps-pending', props.className) },
      h(SeatTag, { seat: props.seat, name: props.name, layout: layout, driverSide: props.driverSide }),
      h('span', { className: 'ps-pending__actions' },
        props.onDecline ? h(Button, { variant: 'ghost', onClick: props.onDecline }, 'Tolak', h('span', { className: 'ps-vh' }, who)) : null,
        h(Button, { onClick: props.onApprove }, 'Setujui', h('span', { className: 'ps-vh' }, who))));
  }

  /* ---------- JoinCard: the printed card in the car, ID-1 size, always printed in Siang ---------- */

  function JoinCard(props) {
    return h('figure', { className: cx('ps-join', props.className), 'data-theme': 'light' },
      h('div', { className: 'ps-join__qr' }, props.qr || h('span', { className: 'ps-join__qr-empty' }, 'QR')),
      h('figcaption', { className: 'ps-join__body' },
        h('p', { className: 'ps-join__brand' }, 'Passenger'),
        h('p', { className: 'ps-join__title' }, props.title || 'Ikut pilih lagu di mobil ini'),
        h('ul', { className: 'ps-join__ways' },
          h('li', null, h(Icon, { name: 'qr', size: 16 }), 'Pindai kode QR'),
          h('li', null, h(Icon, { name: 'tap', size: 16 }), 'Atau tempelkan ponsel ke kartu')),
        props.url ? h('p', { className: 'ps-join__fallback' }, props.url,
          props.code ? h('span', { className: 'ps-join__code' }, 'kode ', h('b', null, props.code)) : null) : null));
  }

  var api = {
    Icon: Icon, Button: Button, Artwork: Artwork, NowPlaying: NowPlaying, TransportControls: TransportControls,
    VolumeStepper: VolumeStepper, TrackRow: TrackRow, SearchField: SearchField, SeatTag: SeatTag,
    SeatPicker: SeatPicker, TripNotice: TripNotice, SettingSwitch: SettingSwitch, JoinCard: JoinCard,
    TextField: TextField, TripHeader: TripHeader, PendingPassenger: PendingPassenger,
    formatDuration: formatDuration, seatLabel: seatLabel, iconNames: Object.keys(ICONS)
  };
  window.Passenger = Object.assign(window.Passenger || {}, api);
})();
