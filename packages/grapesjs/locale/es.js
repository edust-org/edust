"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var traitInputAttr = {
  placeholder: 'ej. Texto aquí'
};
var _default = exports.default = {
  assetManager: {
    addButton: 'Añadir imagen',
    inputPlh: 'http://camino/a/la/imagen.jpg',
    modalTitle: 'Seleccionar imagen',
    uploadTitle: 'Arrastre los archivos aquí o haga clic para cargar'
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
      '': 'Caja',
      wrapper: 'Cuerpo',
      text: 'Texto',
      comment: 'Comentario',
      image: 'Imagen',
      video: 'Video',
      label: 'Etiqueta',
      link: 'Vínculo',
      map: 'Mapa',
      tfoot: 'Pie de lista',
      tbody: 'Cuerpo de lista',
      thead: 'Encabezado de lista',
      table: 'Lista',
      row: 'Fila de lista',
      cell: 'Celda de lista'
    }
  },
  deviceManager: {
    device: 'Dispositivos',
    devices: {
      desktop: 'Escritorio',
      tablet: 'Tableta',
      mobileLandscape: 'Mobile Landscape',
      mobilePortrait: 'Mobile Portrait'
    }
  },
  panels: {
    buttons: {
      titles: {
        preview: 'Vista previa',
        fullscreen: 'Pantalla completa',
        'sw-visibility': 'Ver componentes',
        'export-template': 'Ver código',
        'open-sm': 'Abrir Administrador de estilos',
        'open-tm': 'Ajustes',
        'open-layers': 'Abrir Aministrador de capas',
        'open-blocks': 'Abrir Bloques'
      }
    }
  },
  selectorManager: {
    label: 'Clases',
    selected: 'Seleccionado',
    emptyState: '- Estado -',
    states: {
      hover: 'Hover',
      active: 'Click',
      'nth-of-type(2n)': 'Par/Impar'
    }
  },
  styleManager: {
    empty: 'Seleccione un elemento antes de usar el Administrador de estilos',
    layer: 'Capa',
    fileButton: 'Imágenes',
    sectors: {
      general: 'General',
      layout: 'Diseño',
      typography: 'Tipografía',
      decorations: 'Decoraciones',
      extra: 'Extras',
      flex: 'Flex',
      dimension: 'Dimensión'
    },
    // The core library generates the name by their `property` name
    properties: {
      float: 'Float',
      display: 'Vista',
      position: 'Posición',
      top: 'Superior',
      right: 'Derecho',
      left: 'Izquierdo',
      bottom: 'Inferior',
      width: 'Ancho',
      height: 'Altura',
      'max-width': 'Max. ancho',
      'max-height': 'Max. altura',
      margin: 'Margen',
      'margin-top': 'Margen Superior',
      'margin-right': 'Margen Derecho',
      'margin-left': 'Margen Izquierdo',
      'margin-bottom': 'Margen Inferior',
      padding: 'Padding',
      'padding-top': 'Padding Superior',
      'padding-left': 'Padding Sol',
      'padding-right': 'Padding Derecho',
      'padding-bottom': 'Padding Inferior',
      'font-family': 'Tipo de letra',
      'font-size': 'Tamaño de fuente',
      'font-weight': 'Espesor',
      'letter-spacing': 'Espacio de letras',
      color: 'Color',
      'line-height': 'Interlineado',
      'text-align': 'Alineación de texto',
      'text-shadow': 'Sombra de texto',
      'text-shadow-h': 'Sombra de texto: horizontal',
      'text-shadow-v': 'Sombra de texto: vertical',
      'text-shadow-blur': 'Desenfoque de sombra de texto',
      'text-shadow-color': 'Color de sombra de fuente',
      'border-top-left': 'Borde Superior Izquierdo',
      'border-top-right': 'Borde Superior Derecho',
      'border-bottom-left': 'Borde Inferior Izquierdo',
      'border-bottom-right': 'Borde Inferior Derecho',
      'border-radius-top-left': 'Borde Redondeado Superior Izquierdo',
      'border-radius-top-right': 'Borde Redondeado Superior Derecho',
      'border-radius-bottom-left': 'Borde Redondeado Inferior Izquierdo',
      'border-radius-bottom-right': 'Borde Redondeado Inferior Derecho',
      'border-radius': 'Borde Redondeado',
      border: 'Bordes',
      'border-width': 'Grosor del Borde',
      'border-style': 'Estilo del Borde',
      'border-color': 'Color de Borde',
      'box-shadow': 'Sombra de caja',
      'box-shadow-h': 'Sombra de caja: horizontal',
      'box-shadow-v': 'Sombra de caja: vertical',
      'box-shadow-blur': 'Desenfoque de sombra de caja',
      'box-shadow-spread': 'Extensión de sombra de caja',
      'box-shadow-color': 'Color de sombra de caja',
      'box-shadow-type': 'Tipo de sombra de caja',
      background: 'Fondo',
      'background-image': 'Imagen de Fondo',
      'background-repeat': 'Repetir fondo',
      'background-position': 'Posición de fondo',
      'background-attachment': 'Plugin de fondo',
      'background-size': 'Tamaño de fondo',
      transition: 'Transición',
      'transition-property': 'Tipo de transición',
      'transition-duration': 'Tiempo de transición',
      'transition-timing-function': 'Función de tiempo de la transición',
      perspective: 'Perspectiva',
      transform: 'Transformación',
      'transform-rotate-x': 'Rotar horizontalmente',
      'transform-rotate-y': 'Rotar verticalmente',
      'transform-rotate-z': 'Rotar profundidad',
      'transform-scale-x': 'Escalar horizontalmente',
      'transform-scale-y': 'Escalar verticalmente',
      'transform-scale-z': 'Escalar profundidad',
      'flex-direction': 'Dirección Flex',
      'flex-wrap': 'Flex wrap',
      'justify-content': 'Ajustar contenido',
      'align-items': 'Alinear elementos',
      'align-content': 'Alinear contenido',
      order: 'Orden',
      'flex-basis': 'Base Flex',
      'flex-grow': 'Crecimiento Flex',
      'flex-shrink': 'Contracción Flex',
      'align-self': 'Alinearse',
      'background-color': 'Color de fondo'
    }
  },
  traitManager: {
    empty: 'Seleccione un elemento antes de usar el Administrador de rasgos',
    label: 'Ajustes de componentes',
    traits: {
      // The core library generates the name by their `name` property
      labels: {
        id: 'Identificador',
        alt: 'Título alterno',
        title: 'Título',
        href: 'Vínculo'
      },
      // In a simple trait, like text input, these are used on input attributes
      attributes: {
        id: traitInputAttr,
        alt: traitInputAttr,
        title: traitInputAttr,
        href: {
          placeholder: 'ej. https://google.com'
        }
      },
      // In a trait like select, these are used to translate option names
      options: {
        target: {
          false: 'Esta ventana',
          _blank: 'Nueva ventana'
        }
      }
    }
  }
};