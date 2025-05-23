"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var traitInputAttr = {
  placeholder: 'ex. Text aquí'
};
var _default = exports.default = {
  assetManager: {
    addButton: 'Afegir imatge',
    inputPlh: 'http://ruta/a/la/imatge.jpg',
    modalTitle: 'Escollir imatge',
    uploadTitle: 'Arrossega els fitxers aquí o fes clic per a pujar-ne'
  },
  // Here just as a reference, GrapesJS core doesn't contain any block,
  // so this should be omitted from other local files
  blockManager: {
    labels: {
      // 'block-id': 'Block Label',
    },
    categories: {
      // 'category-id': 'Category Label',
    }
  },
  domComponents: {
    names: {
      '': 'Capsa',
      wrapper: 'Cos',
      text: 'Text',
      comment: 'Comentari',
      image: 'Imatge',
      video: 'Vídeo',
      label: 'Etiqueta',
      link: 'Enllaç',
      map: 'Mapa',
      tfoot: 'Peu de la taula',
      tbody: 'Cos de la taula',
      thead: 'Capçalera de la taula',
      table: 'Taula',
      row: 'Fila de la taula',
      cell: 'Cel·la de la taula'
    }
  },
  deviceManager: {
    device: 'Dispositius',
    devices: {
      desktop: 'Escriptori',
      tablet: 'Tauleta',
      mobileLandscape: 'Mòbil en horitzontal',
      mobilePortrait: 'Mòbil en vertical'
    }
  },
  panels: {
    buttons: {
      titles: {
        preview: 'Vista prèvia',
        fullscreen: 'Pantalla sencera',
        'sw-visibility': 'Veure components',
        'export-template': 'Veure codi',
        'open-sm': "Obrir Administrador d'estils",
        'open-tm': 'Configuració',
        'open-layers': 'Obrir Aministrador de capes',
        'open-blocks': 'Obrir Blocs'
      }
    }
  },
  selectorManager: {
    label: 'Classes',
    selected: 'Seleccionat',
    emptyState: '- Estat -',
    states: {
      hover: 'A sobre',
      active: 'Clic',
      'nth-of-type(2n)': 'Parell/Senar'
    }
  },
  styleManager: {
    empty: "Escull un element abans d'utilitzar l'Administrador d'estils",
    layer: 'Capa',
    fileButton: 'Imatges',
    sectors: {
      general: 'General',
      layout: 'Disseny',
      typography: 'Tipografia',
      decorations: 'Decoracions',
      extra: 'Extres',
      flex: 'Flex',
      dimension: 'Tamany'
    },
    // The core library generates the name by their `property` name
    properties: {
      float: 'Flotant',
      display: 'Vista',
      position: 'Posició',
      top: 'Superior',
      right: 'Dreta',
      left: 'Esquerra',
      bottom: 'Inferior',
      width: 'Ample',
      height: 'Alt',
      'max-width': 'Ample màx.',
      'max-height': 'Alt màx.',
      margin: 'Marge',
      'margin-top': 'Marge superior',
      'margin-right': 'Marge dret',
      'margin-left': 'Marge esquerra',
      'margin-bottom': 'Marge inferior',
      padding: 'Padding',
      'padding-top': 'Padding superior',
      'padding-left': 'Padding esquerra',
      'padding-right': 'Padding dret',
      'padding-bottom': 'Padding inferior',
      'font-family': 'Tipus de lletra',
      'font-size': 'Tamany de la font',
      'font-weight': 'Pes',
      'letter-spacing': 'Espai entre lletres',
      color: 'Color',
      'line-height': 'Interlineat',
      'text-align': 'Alineació del text',
      'text-shadow': 'Ombra del text',
      'text-shadow-h': 'Ombra del text: horizontal',
      'text-shadow-v': 'Ombra del text: vertical',
      'text-shadow-blur': "Desenfocament de l'ombra del text",
      'text-shadow-color': "Color de l'ombra del text",
      'border-top-left': 'Marc superior esquerra',
      'border-top-right': 'Marc superior dret',
      'border-bottom-left': 'Marc inferior esquerra',
      'border-bottom-right': 'Marc inferior dret',
      'border-radius-top-left': 'Radi del marc superior esquerra',
      'border-radius-top-right': 'Radi del marc superior dret',
      'border-radius-bottom-left': 'Radi del marc inferior esquerra',
      'border-radius-bottom-right': 'Radi del marc inferior dret',
      'border-radius': 'Radi del marc',
      border: 'Marc',
      'border-width': 'Ample del marc',
      'border-style': 'Estil del marc',
      'border-color': 'Color del marc',
      'box-shadow': 'Ombra de la capsa',
      'box-shadow-h': 'Ombra de la capsa: horizontal',
      'box-shadow-v': 'Ombra de la capsa: vertical',
      'box-shadow-blur': "Desenfocament de l'ombra de la capsa",
      'box-shadow-spread': "Propagació de l'ombra de la capsa",
      'box-shadow-color': "Color de l'ombra de la capsa",
      'box-shadow-type': "Tipus de l'ombra de la capsa",
      background: 'Fons',
      'background-image': 'Imatge de fons',
      'background-repeat': 'Repetir fons',
      'background-position': 'Posició del fons',
      'background-attachment': 'Desplaçament del fons',
      'background-size': 'Tamany del fons',
      transition: 'Transició',
      'transition-property': 'Tipus de transició',
      'transition-duration': 'Temps de transició',
      'transition-timing-function': 'Funció de temps de la transición',
      perspective: 'Perspectiva',
      transform: 'Transformació',
      'transform-rotate-x': 'Rotació horitzontal',
      'transform-rotate-y': 'Rotació vertical',
      'transform-rotate-z': 'Rotació profunditat',
      'transform-scale-x': 'Escalar horitzontalment',
      'transform-scale-y': 'Escalar verticalment',
      'transform-scale-z': 'Escalar profunditat',
      'flex-direction': 'Direcció flex',
      'flex-wrap': 'Distribució flex',
      'justify-content': 'Justificar contingut',
      'align-items': 'Alinear elements',
      'align-content': 'Alinear contingut',
      order: 'Ordre',
      'flex-basis': 'Base flex',
      'flex-grow': 'Creixement flex',
      'flex-shrink': 'Contracció flex',
      'align-self': 'Alineació pròpia',
      'background-color': 'Color de fons'
    }
  },
  traitManager: {
    empty: "Escull un element abans d'usar l'Administrador de característiques",
    label: 'Configuració de components',
    traits: {
      // The core library generates the name by their `name` property
      labels: {
        id: 'Identificador',
        alt: 'Títol alternatiu',
        title: 'Títol',
        href: 'Enllaç'
      },
      // In a simple trait, like text input, these are used on input attributes
      attributes: {
        id: traitInputAttr,
        alt: traitInputAttr,
        title: traitInputAttr,
        href: {
          placeholder: 'ex. https://google.com'
        }
      },
      // In a trait like select, these are used to translate option names
      options: {
        target: {
          false: 'Mateixa pestanya/finestra',
          _blank: 'Nova pestanya/finestra'
        }
      }
    }
  }
};