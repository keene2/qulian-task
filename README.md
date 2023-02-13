#趣联面试作业

## FAQ

1. Error: error:0308010C:digital envelope routines::unsupported
   因为 Node.js v17 及更高版本使用了具有重大更改的 OpenSSL v3.0, 启动需设置环境变量。

```
export NODE_OPTIONS=--openssl-legacy-provider
```
