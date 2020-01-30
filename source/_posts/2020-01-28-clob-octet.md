---
title: 二进制大对象和字符大对象
tags:
  - null
date: 2020-01-28 16:06:55
---


>这都是啥啥啥

## CLOB 和 BLOB
**CLOB** 是可变长度的字符（char）大（long）对象（Object），用于基于字符的数据，以字节Byte或者标准八字节OCTET为单位，最大长度是2G（2,147,483,647）

**BLOB** 是可变长度的二进制（Binary）大（long）对象（Object），用于保存语音，混合媒体等非传统数据，以字节Byte为单位，最大长度也是2G（2,147,483,647）

## OCTET 和 Byte
我们都知道计算机中一个0/1表示一个比特bit,八个比特表示一个字节byte。但是在实际应用中，byte可以表示4-10比特的不同长度，为了统一标准，将严格意义上的8bits也称为[OCTET](https://zh.wikipedia.org/wiki/%E5%85%AB%E4%BD%8D%E5%85%83%E7%B5%84)

