/**
 * @fileoverview script.js
 * @author Taira Sakurai
 */

/**
 * random
 * @const {Object}
 */
const random = {
  /**
   * Get random number between 0 and 1.
   * @return {number}
   */
  get random() {
    return Math.random();
  },
  /**
   * Generate random integer between min and max (inclusive).
   * @param {number=} min
   * @param {number=} max
   * @return {number}
   */
  randint(min = 0, max = 10) {
    /** @type {number} */
    const firstRand = this.random;
    /** @type {number} */
    const range = max - min + 1;
    return Math.floor(firstRand * range + min);
  },
  /**
   * Choose a random element from the array.
   * @param {Array} array
   * @return {*}
   */
  randChoose(array) {
    /** @type {number} */
    let r = array.length;
    r -= 1;
    /** @type {number} */
    const choice = this.randint(0, r);
    return array[choice];
  }
};

/**
 * Generate an array of numbers or strings within the specified range.
 * @param {number} min
 * @param {number} max
 * @param {number=} step
 * @param {boolean=} isFill
 * @return {Array<number|string>}
 */
function range(min, max, step = 1, isFill = false) {
  /** @type {Array<number|string>} */
  const result = [];
  for (let num = min; num <= max; num += step) {
    result.push(num);
  }
  if (isFill) {
    /** @type {number} */
    let maxlen = 0;
    /** @type {number} */
    let underpoint = 0;
    for (const element of result) {
      /** @type {number} */
      const len = element.toString().length;
      const up = Math.floor(element / 1);
      if (maxlen < len) {
        maxlen = len;
        if (
          element % 1 !== 0 &&
          (element % 1).toString().length - 2 > underpoint
        ) {
          underpoint = (element % 1).toString().length - 2;
        }
      }
    }
    result.map(elm => {
      /** @type {number} */
      const elmUp = (elm % 1).toString().length - 2;
      const less = underpoint - elmUp;
      for (let i = 1; i <= less; i++) {
        elm += '0';
      }
      const len2 = elm.toString().length;
      const less2 = maxlen - len2;
      for (let i = 0; i < less2; i++) {
        elm = '0' + elm;
      }
      return elm;
    });
  }
  return result;
}

/**
 * Convert CSS style properties to an object.
 * @param {...string} properties
 * @return {Object}
 */
function CSSStyleToObject(...properties) {
  /** @type {string} */
  let props = properties.join(",");
  props = props.replace(/\-/g, match => {
    return match.charAt(1).toUpperCase();
  });
  return JSON.parse(props);
}

/**
 * Function to be executed when the document is ready.
 * @param {Event} evt
 * @return {undefined}
 */
function onReadyFunction(evt) {
  /** @type {jQuery} */
  const $ = jQuery;
  $('form').attr('autocomplete', 'on');
  $('main :header:not(header,[id])').each(function(index, value) {
    $(this).attr('id', `SpecialId${index}`);
    /** @type {jQuery} */
    const jQ = $(this);
    $('ol#autoindex').append(
      `<li><a href="#${jQ.attr('id')}">${jQ.text()}</a></li>`
    );
  });
  console.log($('html').html());
  $('input:input').attr('enterkeyhint', 'go');
}

/**
 * Event handler for the click event.
 * @param {Event} event
 * @return {jQuery}
 */
function mainsidebar(event) {
  /** @type {jQuery} */
  const jQEvt = jQuery(event.target);
  /** @type {string|undefined} */
  const jQTargId = jQEvt.data('closeTarget');
  if (jQTargId) {
    /** @type {jQuery} */
    const targJQ = jQuery(jQTargId);
    /** @type {Object} */
    const newStyle = CSSStyleToObject('{"width":"toggle"}');
    targJQ.animate(newStyle, 'slow', 'swing');
    console.log('Called');
  }
}

/**
 * Event handler for the password security.
 * @param {Event} event
 * @return {jQuery}
 */
function passwordSecurity(event) {
  /** @type {Element} */
  const that = this;
  /** @type {Function} */
  const secFunc = function(e) {
    console.info(e.data);
    jQuery(that).val(e.data);
    that.removeEventListener('input', secFunc, false);
    return that;
  };
  this.addEventListener('input', secFunc);
  return jQuery(this);
}

/**
 * Event handler for the click event.
 * @param {Event} event
 * @return {jQuery}
 */
function clickMeFuncSpecial2(event) {
  /** @type {string} */
  const acf = jQuery(this).data('actionFunc');
  if (acf !== '' && acf === '{}') {
    const acfString = acf.toString();
    return window[acfString](event);
  } else {
    /** @type {Object} */
    const action = jQuery(this).data();
    /** @type {string|undefined} */
    const newAction = action.openTarget || action.closeTarget;
    if (newAction) {
      /** @type {jQuery} */
      const jQNewAction = jQuery(newAction);
      jQNewAction.animate(
        {
          width: 'toggle'
        },
        'slow'
      );
    }
  }
  return jQuery(this);
}

jQuery(document).ready(onReadyFunction);
jQuery('input[type=password]').on('click focus', passwordSecurity);
jQuery('button[type=button]').click(clickMeFuncSpecial2);
