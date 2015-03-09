utt.js
======
A javascript api for calling the TRADEIT trading ticket

[Check out demo](https://www.tradingticket.com/utt.js/demo/)

[Check out doc](https://www.tradingticket.com/utt.js/doc/)

----

Exemple :
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <script src="https://www.tradingticket.com/utt.js/utt.min.js" type="text/javascript"></script>
        <title>UTT.JS DEMO</title>
        <meta charset="utf-8">
        <script type="text/javascript">
            utt = new Utt();
        </script>
    </head>
    <body>
        <h1>UTT.JS DEMO</h1>
        <input type="button" value="open-tradeit"  onClick="utt.open()"/>
        <input type="button" value="close-tradeit" onClick="utt.close()"/>
    </body>
    <script type="text/javascript">
        utt.init();
    </script>
</html>

```
