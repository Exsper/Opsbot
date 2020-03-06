# OpsBot
koishi based qq-bot plugin for ppy.sb

## install
```sh
npm install Exsper/Opsbot
```

## usage
```javascript
app.plugin(require('Opsbot'), options);
```
or
```javascript
module.exports = {
    plugins: [
        ['Opsbot', options],
    ],
}
```

### options
```javascript
{
    prefix : "$",    // 前缀1，可省略，默认为"$"
    prefix2 : "￥",    // 前缀2，可省略，默认为"￥"
    host : "osu.ppy.sb"    // 私服主机名，可省略，默认为"osu.ppy.sb"
}
```