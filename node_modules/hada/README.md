# hada
helpers for converting between bytes, strings, numbers, and more

```typescript
import * as hada from 'hada'

hada.bytesToInt([255, 255]) // 65535

hada.intToBytes(65535) // [255, 255]

hada.hexToBytes('ffff') // [255, 255]

hada.bytesToHex([255, 255]) // 'ffff'

hada.stringToAsciiHex('hello world') // '68656c6c6f20776f726c64'

hada.asciiHexToString('68656c6c6f20776f726c64') // 'hello world'

hada.stringToAsciiBytes('hello world')
//[104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]
                                         
hada.asciiBytesToString([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100])
// 'hello world'
```
