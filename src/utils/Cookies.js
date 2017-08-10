class Cookies {
  static get(name) {
    /* eslint-disable */
    const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));
    /* eslint-enable */

    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  static set(name, value, options) {
    options = options || {};

    if (!options.path) {
      options.path = '/';
    }

    let expires = options.expires;

    if (typeof expires === 'number' && expires) {
      const d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + '=' + value;

    for (let propName in options) {
      if (options.hasOwnProperty(propName)) {
        updatedCookie += '; ' + propName;
        const propValue = options[propName];
        if (propValue !== true) {
          updatedCookie += '=' + propValue;
        }
      }
    }

    document.cookie = updatedCookie;
  };

  static remove(name) {
    Cookies.set(name, '', {
      expires: -1
    });
  };
}


export default Cookies;
