utt.js
======
a javascript module that helps to call the tradingticket

[Check out demo](../demo/)

----

Exemple :
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <script src="../utt.min.js" type="text/javascript"></script>
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
        utt.init(config);
    </script>
</html>

```
