/*

__/\\\________/\\\___/\\\\\\\\\\\\\\\___/\\\\\\\\\\\\\\\______________/\\\\\\\\\\\______/\\\\\\\\\\\___
 _\/\\\_______\/\\\__\///////\\\/////___\///////\\\/////______________\/////\\\///_____/\\\/////////\\\_
  _\/\\\_______\/\\\________\/\\\______________\/\\\_______________________\/\\\_______\//\\\______\///__
   _\/\\\_______\/\\\________\/\\\______________\/\\\_______________________\/\\\________\////\\\_________
    _\/\\\_______\/\\\________\/\\\______________\/\\\_______________________\/\\\___________\////\\\______
     _\/\\\_______\/\\\________\/\\\______________\/\\\_______________________\/\\\______________\////\\\___
      _\//\\\______/\\\_________\/\\\______________\/\\\________________/\\\___\/\\\_______/\\\______\//\\\__
       __\///\\\\\\\\\/__________\/\\\______________\/\\\______/\\\_____\//\\\\\\\\\_______\///\\\\\\\\\\\/___
        ____\/////////____________\///_______________\///______\///_______\/////////__________\///////////_____

*/


var Utt, root;

Utt = (function() {
  function Utt () {


  var tradeitView, modalView, tradeitView, modalFrame,isReady=0;
  /**
   * init modal.
   * @method initModal
   * @example
   * initModal();
   * @private
   */
    var initModal = function() {
      modalFrame = document.createElement('div');
      modalFrame.id = "tradeit-modal-window";
      tradeitView = document.createElement('iframe');
      tradeitView.frameBorder = "no";
      tradeitView.src = PUB_CONF.appPath;
      tradeitView.name = "tradeit-" + (Utils.getDate());
      modalFrame.appendChild(tradeitView);
      document.body.appendChild(modalFrame);
      this.tradeitView = tradeitView;
    };
/**
 * @namespace {Object} config
 * @property {boolean} config.active - active param if active is false widget will no load
 * @property {Array.<String>} config.disclaimer - active param if active is false widget will no load
 * @property {Object} config.brokers - object of brokers "Value/Alias" : "Name"
 * @property {Object} config.defaults - defaults config for widget
 * @property {boolean} config.defaults.onlyBuySell - set onlyBuySell mode
 * @property {String} config.appPath - path to application
 * @property {String} config.stylePath - path to stylesheet
 * @property {Object} config.widgetParams - params which is send to appplication
 * @property {String} config.widgetParams.broker - Default placeholder for widget select
 * @property {String} config.widgetParams.action - action for the widget (buy/sell)
 * @property {String} config.widgetParams.class - a css class which is attach to div
 * @property {String} config.widgetParams.company-name - name of company which is will be display in modal
 * @property {String} config.widgetParams.prices - list of the three prices "[x,y,z]"
 * @property {String} config.widgetParams.quantity - quantity of  default shares
 * @property {String} config.widgetParams.stock-symbol - stock symbol which will be show in modal
 * @property {String} config.widgetParams.timestamp - the timestamp of momment when modal is init
 * @property {String} config.widgetParams.widget - a name for modal instance
 *
 * @private
 * @example
 * //This is the default config
 * init({
 * "active": true,
 * "disclaimer": [ "For maximum security, your brokerage information is always fully","encrypted and never stored by Trade It"],
 * "brokers": {
 *   "TD": "TD Ameritrade",
 *   "Schwabs": "Charles Schwab",
 *   "Scottrade": "Scottrade",
 *   "Etrade": "E*Trade",
 *   "Fidelity": "Fidelity"
 * },
 * "defaults": {
 *   "onlyBuySell": false
 * },
 * "appPath" : "https://qa.tradingticket.com/widget-rc/index.html",
 * "styleUrl" : "https://qa.tradingticket.com/widget-rc/styles/tradeit-inject.css",
 * "widgetParams" : {
 *   "broker": "placeholder",
 *   "action": "buy",
 *   "class": "tradeit-button-buy",
 *   "company-name": "",
 *   "prices": "",
 *   "quantity": "99",
 *   "stock-symbol": "",
 *   "timestamp": "",
 *   "widget": "",
 * })
 */
  var PUB_CONF = {
    "active": true,
    "disclaimer": [ "For maximum security, your brokerage information is always fully","encrypted and never stored by Trade It"],
    "brokers": {
      "TD": "TD Ameritrade",
      "Schwabs": "Charles Schwab",
      "Scottrade": "Scottrade",
      "Etrade": "ETrade",
      "Fidelity": "Fidelity"
    },
    "defaults": {
      "onlyBuySell": false
    },
    "appPath" : "https://qa.tradingticket.com/widget-rc/index.html",
    "styleUrl" : "https://qa.tradingticket.com/widget-rc/styles/tradeit-inject.css",
    "widgetParams" : {
      "broker": "placeholder",
      "action": "buy",
      "company-name": "",
      "prices": "",
      "quantity": "99",
      "stock-symbol": "",
      "timestamp": "",
      "widget": "",
    }
};
/**
 * update modal.
 * @method updateModal
 * @param iframe - DOM Object iframe modal
 * @param param - widgetParams ({@link config})
 * @example
 * updateModal(tradeitView, PUB_CONF.widgetParams);
 * @private
 */
  var updateModal = function(iframe, params) {

  var attr, bootstrapBody, onIframeLoad, val, _ref;
   for(key in params)
     if(key.substring(0, 13) != "data-tradeit-")
     {
       params["data-tradeit-"+key] = params[key];
       delete params[key];
     }
    params["date"] = Utils.getDate();
    bootstrapBody = JSON.stringify({
      action: 'bootstrap',
      params: params,
      config: PUB_CONF,
      referrer_origin: window.location.origin || ("" + window.location.protocol + "//" + window.location.hostname) + (window.location.port ? ":" + window.location.port : ""),
      iframe_timestamp: iframe.name
    });

    iframe.style.visibility = "hidden";
    isReady = 0;
    var onIframeLoad = function() {

      iframe.contentWindow.postMessage(bootstrapBody, "*");
      isReady = 1;
      iframe.style.visibility = "visible";
      Utils.removeEventListener(iframe, 'load', onIframeLoad);
    };
    Utils.addEventListener(iframe, 'load', onIframeLoad);
    iframe.contentWindow.postMessage(JSON.stringify({
      action: 'reload'
    }), '*');
  };

  /**
   * open the iframe.
   * @method open
   * @example
   * open();
   */
  this.open = function(event, centered) {
    var eventTarget;
    if (event == null) {
      event = window.event;
    }

    if (centered == null) {
      centered = false;
    }
    updateModal(tradeitView, PUB_CONF.widgetParams);
    Utils.addClass(document.body, 'tradeit-modal-open');
    Utils.addClass(modalFrame, 'tradeit-centered');

  };
  /**
   * Set new value of a `widgetParams` property ({@link config}) and send it to application.
   * @method setParam
   * @example
   * setParam('action', 'sell');
   * setParam({ action: 'sell' });
   *
   */
  this.setParam = function(param, value){
    if(typeof(param) == 'object')
      for(key in param)
        PUB_CONF.widgetParams["data-tradeit-"+key] = param[key];
    else
      if(!(param in PUB_CONF.widgetParams))
        PUB_CONF.widgetParams["data-tradeit-"+param] = value;
      else
        PUB_CONF.widgetParams[param] = value;
    updateModal(tradeitView, PUB_CONF.widgetParams);
  };

  /**
   * close opened iframe.
   * @method close
   * @example
   * close();
   */
  this.close = function() {
    Utils.removeClass(document.body, 'tradeit-interactive');
    Utils.removeClass(document.body, 'tradeit-modal-open');
    tradeitView.contentWindow.postMessage(JSON.stringify({
      action: 'close'
    }), '*');

  };
  /**
   * append  stylesheet link with styleUrl of  {@link config} to head dom object.
   * @method loadStyles
   * @private
   * @example
   * loadStyles();
   */
  var loadStyles = function() {
      var link;
      if (document.createStyleSheet) {
          document.createStyleSheet(PUB_CONF.styleUrl);
      } else {
          link = document.createElement("link");
          link.href = PUB_CONF.styleUrl;
          link.type = "text/css";
          link.rel = "stylesheet";
          document.getElementsByTagName("head")[0].appendChild(link);
      }
    };
/**
 * listner for attach message, use for recive data from application
 * @method postMessageHander
 * @param event
 * @example
 * postMessageHander(event);
 * @private
 */
  postMessageHander = function(event) {
    var iframe, rpc;
    if (event == null) {
      event = window.event;
    }
    if (!/tradingticket|localhost|127.0.0.1|0.0.0.0/.test(event.origin)) {
      return;
    }
    rpc = JSON.parse(event.data);
    switch (rpc.action) {
      case "tradeStatusChange":
        if (rpc.tradeStatus === "in_progress" || rpc.tradeStatus === "place_order_no_websocket_support") {
          Utils.addClass(modalFrame, "in-progress");
        } else {
          Utils.removeClass(modalFrame, "in-progress");
        }
        if (rpc.newHeight != null) {
          iframe = document.querySelectorAll(("iframe[name=" + rpc.iframe_timestamp) + "]")[0];
          iframe.parentNode.style.height = "" + rpc.newHeight + "px";
        }
        return this.lastState = rpc.tradeStatus;

    }
  };

  /**
   * listner for attach message, use for send data to application
   * @method attachMessageListner
   * @example
   * attachMessageListner();
   * @private
   */
   var attachMessageListner = function() {
    Utils.addEventListener(window, "message", postMessageHander);
  };
  /**
   * Init this.
   * @method init
   * @param {object} config - {@link config} object.
   * @example
   * init({
   * "active": true,
   * "brokers": {
   *   "TD": "TD Ameritrade",
   *   "Schwabs": "Charles Schwab",
   *   "Scottrade": "Scottrade",
   *   "Etrade": "E*Trade",
   *   "Fidelity": "Fidelity"
   * },
   * "widgetParams" : {
   *   "broker": "placeholder",
   *   "action": "buy",
   *   "quantity": "99",
   *   "company-name": "International Business Machines Corp",
   *   "prices": "[12.4]",
   *   "quantity": "99",
   *   "stock-symbol": "IBM"
   *    }
   * })
   */
  this.init = function(conf) {

      for(attr in conf)
        if(typeof(conf[attr]) == 'object')
          for(subattr in conf[attr])
            PUB_CONF[attr][subattr] = conf[attr][subattr];
        else
          PUB_CONF[attr] = conf[attr];



      loadStyles();
      attachMessageListner();
      initModal();
    };


   Utils = (function() {
    function Utils() {}

    Utils.addClass = function(el, className) {
      if (el.classList) {
        return el.classList.add(className);
      } else {
        return el.className += " " + className;
      }
    };

    Utils.removeClass = function(el, className) {
      if (el.classList) {
        return el.classList.remove(className);
      } else {
        return el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    };

    Utils.changeClass = function(el, actualClassName, newClassName) {
      this.removeClass(el, actualClassName);
      return this.addClass(el, newClassName);
    };

     Utils.getDate = function() {
      if (!Date.now) {
        return new Date().getTime();
      } else {
        return Date.now();
      }
    };
    Utils.hasClass = function(el, className) {
      if (el.classList) {
        return el.classList.contains(className);
      } else {
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
      }
    };

    Utils.addEventListener = function(el, eventName, handler) {
      if (el.addEventListener) {
        el.addEventListener(eventName, handler);
      } else {
        el.attachEvent("on" + eventName, function() {
          return handler.call(el);
        });
      }
    };

    Utils.removeEventListener = function(el, eventName, handler) {
      if (el.removeEventListener) {
        el.removeEventListener(eventName, handler);
      } else {
        el.detachEvent("on" + eventName, handler);
      }
    };
    return Utils;

  })();
  }
    return Utt;

})();

root = typeof exports !== "undefined" && exports !== null ? exports : window;
root.Utt = Utt;
