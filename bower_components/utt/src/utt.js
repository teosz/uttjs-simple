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
  function Utt() {


    var tradeitView, modalView, tradeitView, appendView, modalFrame;
    var isReady = 0, isCenter = -1, closeButton = -1, arrow = -1, relX = -1, relY = -1, lastConfig = -1;
    var self = this;
    /*
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
      tradeitView.src = GlobalConfig.appPath;
      tradeitView.name = "tradeit-" + (Utils.getDate());
      appendView = document.createElement('div');
      appendView.style.position = 'absolute';
      appendView.style.top = '0px';
      appendView.style.left = '0px';

      modalFrame.appendChild(appendView);
      modalFrame.appendChild(tradeitView);
      document.body.appendChild(modalFrame);

    };
    /**
    * @namespace {Object} config
    * @property {boolean} config.closeButton - show or not close button on modal
    * @property {Array.<String>} config.disclaimer - disclaimer to display on the trading ticket
    * @property {Object} config.brokers - object of brokers "Value/Alias" : "Name"
    * @property {Object} config.defaults - defaults config for widget
    * @property {boolean} config.defaults.onlyBuySell - set onlyBuySell mode
    * @property {String} config.appPath - path to application
    * @property {String} config.stylePath - path to stylesheet
    * @property {Object} config.widgetParams - params which is send to appplication
    * @property {String} config.widgetParams.broker - Default placeholder for widget select
    * @property {String} config.widgetParams.action - action for the widget (buy/sell)
    * @property {String} config.widgetParams.companyName - name of company which is will be display in modal
    * @property {String} config.widgetParams.prices - list of the three quotes "[last,bid,ask]"
    * @property {String} config.widgetParams.quantity - default quantity of shares when opening the trading ticket
    * @property {String} config.widgetParams.stockSymbol - default stock stockSymbol when opening the trading ticket
    * @property {String} config.widgetParams.publisherUser - user id to be pass to publisher
    * @property {String} config.widgetParams.timestamp - the timestamp for the quote data
    *
    * @private
    * @example
    * //This is the default config
    * init({
    * "closeButton" : true,
    * "disclaimer": [ "For maximum security, your brokerage information is always fully","encrypted and never stored by Trade It"],
    * "brokers": {
    *   "TD": "TD Ameritrade",
    *   "Schwabs": "Charles Schwab",
    *   "Scottrade": "Scottradse",
    *   "Etrade": "E*Trade",
    *   "Fidelity": "Fidelity"
    * },
    * "defaults": {
    *   "onlyBuySell": false
    * },
    * "appPath" : "https://tradingticket.com/widget/index.html",
    * "styleUrl" : "https://tradingticket.com/widget/styles/tradeit-inject.css",
    * "widgetParams" : {
    *   "broker": "placeholder",
    *   "action": "buy",
    *   "prices": "",
    *   "quantity": "0",
    *   "stockSymbol": "",
    *   "timestamp": "",
    * })
    */
    var GlobalConfig = {
      "closeButton": true,
      "disclaimer": ["For maximum security, your brokerage information is always fully", "encrypted and never stored by Trade It"],
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
      "appPath": "https://tradingticket.com/widget/index.html",
      "mobilePath": "https://qa.tradingticket.com/widget-mobile/",
      "styleUrl": "https://tradingticket.com/widget/styles/tradeit-inject.css",
      "widgetParams": {
        "broker": "placeholder",
        "action": "buy",
        "companyName": "",
        "publisherUser": "",
        "prices": "",
        "quantity": "0",
        "stockSymbol": "",
        "timestamp": "",
      }
    };

    /*
    * update modal.
    * @method updateModal
    * @param iframe - DOM Object iframe modal
    * @param param - widgetParams ({@link config})
    * @example
    * updateModal(tradeitView, GlobalConfig.widgetParams);
    * @private
    */
    var updateModal = function(iframe, params) {

      var attr, bootstrapBody, onIframeLoad, val, _ref;
      params["date"] = Utils.getDate();
      bootstrapBody = JSON.stringify({
        action: 'bootstrap',
        params: params,
        config: GlobalConfig,
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

    this.embedded = function(element, conf)
    {

      if (typeof(conf) == 'object') {
        lastConfig = JSON.parse(JSON.stringify(GlobalConfig));
        self.setParam(conf);

      }

      EmbeddedTradeitView = document.createElement('iframe');
      EmbeddedTradeitView.frameBorder = "no";
      EmbeddedTradeitView.src = GlobalConfig.appPath;
      EmbeddedTradeitView.name = "embedded-tradeit-" + (Utils.getDate());
      element.appendChild(EmbeddedTradeitView)
      updateModal(EmbeddedTradeitView, GlobalConfig.widgetParams);
      if (lastConfig != -1) {
        GlobalConfig = JSON.parse(JSON.stringify(lastConfig));
        lastConfig = -1;
      }
    }


    /**
    * Open the trading ticket within an iframe
    * @param {Object} config ({@link config}) this config will be set until the trading ticket is closed
    * @param  {Bool} centered if is true will be show in center of page
    * @method open
    * @example
    * open();
    */
    this.open = function(conf, centered) {
      if (centered == null) {
        centered = false;
      }

      startSessionConfig(conf);

      isCenter = centered
      refreshModal();

      updateModal(tradeitView, GlobalConfig.widgetParams);
      if (!Utils.hasClass(document.body, 'tradeit-modal-open')) {
        Utils.addClass(document.body, 'tradeit-modal-open');

        if (centered)
        Utils.addClass(modalFrame, 'tradeit-centered');
      }
      stopSessionConfig(conf);
    };
    /**
    * Update a value of ({@link config}).
    * @method setParam
    * @example
    * setParam('action', 'sell');
    * setParam({ action: 'sell' });
    *
    */
    this.setParam = function() {
      modifyWidget = 0;
      var list = ["broker", "action", "prices", "quantity", "stockSymbol", "timestamp", "widget"];
      if(typeof arguments[0].widgetParams !== undefined)
        arguments[0].widgetParams = {}
      for(key in list)
        if(typeof arguments[0][key] !== undefined)
        {
          modifyWidget = 1;
          key = list[key]
          arguments[0].widgetParams[key] = arguments[0][key]
          delete arguments[0][key];

        }
      GlobalConfig = Utils.merge(GlobalConfig, arguments[0])
      if (modifyWidget)
        return updateModal(tradeitView, GlobalConfig.widgetParams);
      return refreshModal();


    };

    /**
    * Close the trading ticket iframe
    * @method close
    * @example
    * close();
    */
    this.close = function() {
      Utils.removeClass(document.body, 'tradeit-interactive');
      Utils.removeClass(document.body, 'tradeit-modal-open');
      appendView.innerHTML = '';
      closeButton = -1;
      if (lastConfig != -1) {

        GlobalConfig = JSON.parse(JSON.stringify(lastConfig));
        lastConfig = -1;

      }
      tradeitView.contentWindow.postMessage(JSON.stringify({
        action: 'close'
      }), '*');

    };
    /**
    * Update the position for the trading ticket iframe
    * @method positionModal
    * @param x
    * @param y
    * @param addX {Integer} element offset
    * @param addY {Integer} element offset
    * @example
    * // With two paremeter x and y
    * positionModal(100,100);
    * // With two object of coordinates
    * positionModal({ x: 100, y: 100});
    * // With DOM Element
    * positionModal(document.getElementsByTagName('h1')[0]);
    *
    */
    this.positionModal = function(obj, y, addX, addY) {
      if (typeof(obj) == 'object') {
        if (('x' in obj) && ('y' in obj)) {
          relX = obj.x;
          relY = obj.y;
        } else if (obj.nodeType > 0) {
          coords = Utils.getPos(obj);
          relX = coords.x;
          relY = coords.y
        }
      } else if (!isNaN(parseFloat(obj)) && isFinite(obj) && !isNaN(parseFloat(y)) && isFinite(y)) {
        relX = obj;
        relY = y;
      }
      if (relX > 0 && relY > 0) {
        if(isNaN(parseFloat(addY)))
        addY = 0;
        if(isNaN(parseFloat(addX)))
        addX = 0;
        Utils.removeClass(modalFrame, 'tradeit-centered')
        modalFrame.style.position = 'absolute'
        modalFrame.style.top  = relY + addY + 'px';
        modalFrame.style.left = relX + addX + 'px';
      }
    }
    /**
    * append a dom element to the trading ticket iframe
    * @method appendElement
    * @param {Object} element
    * @example
    * var x = document.createTextNode("Hello World");
    * appendElement(x);
    *
    */
    this.appendElement = function(object) {

      appendView.appendChild(object);


    }
    var addCloseButton = function() {

      if (closeButton != -1)
      return 0;
      closeButton = document.createElement('a');
      closeButton.style.left = '486px';

      Utils.addClass(closeButton, "tradeit-close-button");

      Utils.addEventListener(closeButton, 'click', self.close);

      appendView.appendChild(closeButton);

    };
    var addArrow = function() {
      arrow = document.createElement('div')
      Utils.addClass(arrow, "arrow")
      Utils.addClass(arrow, "arrow-up")
      appendView.appendChild(arrow);

    };
    var removeCloseButton = function() {
      if (closeButton == -1)
      return 0;
      closeButton.parentNode.removeChild(closeButton);
      closeButton = -1;
    };

    var removeArrow = function() {
      if (arrow == -1)
      return 0;
      arrow.parentNode.removeChild(arrow);
      arrow = -1;
    };

    var startSessionConfig = function (config)
    {
      if (typeof(config) == 'object') {
        lastConfig = JSON.parse(JSON.stringify(GlobalConfig));
        self.setParam(config);
      }
    }
    var stopSessionConfig = function (config)
    {
      if (lastConfig != -1) {
        GlobalConfig = JSON.parse(JSON.stringify(lastConfig));
        lastConfig = -1;
      }
    }
    /*
    * @method refreshModal
    * @apppend
    * @example
    * refreshModal();
    */
    var refreshModal = function() {


      if (GlobalConfig.closeButton)
        addCloseButton();
      else
        removeCloseButton();
      if (isCenter == 0)
        addArrow();
      // else
      //   removeArrow();


    }
    /*
    * @method loadStyles
    * @append  stylesheet link with styleUrl of  {@link config} to head dom object.
    * @private
    * @example
    * loadStyles();
    */
    var loadStyles = function() {
      var link;
      if (document.createStyleSheet) {
        document.createStyleSheet(GlobalConfig.styleUrl);
      } else {
        link = document.createElement("link");
        link.href = GlobalConfig.styleUrl;
        link.type = "text/css";
        link.rel = "stylesheet";
        document.getElementsByTagName("head")[0].appendChild(link);
      }
    };

    /*
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
          // TODO: should use a break, instead
          return this.lastState = rpc.tradeStatus;

        }
      };

      /*
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
      * Init this with a given config file
      * @method init
      * @param {object} config - {@link config} object.
      * @example
      * init({
      * "closeButton" : true,
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
      *   "quantity": "0",
      *   "": "International Business Machines Corp",
      *   "prices": "[12.4]",
      *   "stockSymbol": "IBM"
      *    }
      * })
      */
      this.init = function(conf) {

        for (attr in conf)
        if (typeof(conf[attr]) == 'object')
        for (subattr in conf[attr]) {
          if (attr == 'widgetParams')
          GlobalConfig[attr][subattr] = conf[attr][subattr];
          else
          GlobalConfig[attr][subattr] = conf[attr][subattr];

        } else
        GlobalConfig[attr] = conf[attr];


        loadStyles();
        attachMessageListner();
        initModal();
        refreshModal();
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
        Utils.merge = function(obj1, obj2) {
          var obj3 = {};
          for (var attrname in obj1) { if(typeof obj1[attrname] != undefined) obj3[attrname] = obj1[attrname]; }
          for (var attrname in obj2) { if(typeof obj2[attrname] != undefined) obj3[attrname] = obj2[attrname]; }
          return obj3;
        }
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
        Utils.isMobile = function() {
          return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
        }
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
        Utils.objectUrlSerializer = function(object)
        {
          var str = "?"
          for (key in object)
            if (typeof(object[key]) === "string"  && object[key] !== 'placeholder')
              str = str + key + "=" + GlobalConfig.widgetParams[key] + "&";
              str = str.substring(0, str.length - 1);
          return str;
        }
        Utils.getPos = function(el) {
          for (var lx = 0, ly = 0; el != null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
          return {
            x: lx,
            y: ly
          };
        };
        return Utils;

      })();

      if (Utils.isMobile()) {
        this.open = function(conf) {
          startSessionConfig(conf);
          window.open(GlobalConfig.mobilePath + Utils.objectUrlSerializer(GlobalConfig.widgetParams));
          stopSessionConfig(conf);
        }

      }
    }
    return Utt;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;
  root.Utt = Utt;
