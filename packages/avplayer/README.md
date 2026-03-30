
### 介绍

libmedia 播放器实现


### 开源协议

[LGPL-3.0-or-later](https://opensource.org/license/lgpl-3-0)

版权所有 (C) 2024-现在 赵高兴

Copyright (C) 2024-present, Gaoxing Zhao


```bash
解决 “Bad CPU type in executable” 错误
1. brew install wabt
  2. ln -sf "$(which wat2wasm)" packages/cheap/build/asm/macos/wat2wasm
  3. 再跑构建

  这样 transformer 调用的就是本机的 wat2wasm，错误会消失。如果仍有问题，可以把第 2 步改成手动复制/链接你机器上能运行的
  wat2wasm 路径，原则相同。

  如何取消连接？？

  - 删除软链：rm packages/cheap/build/asm/macos/wat2wasm
  - 或用新的文件/可执行覆盖：ln -sf /你想用的路径 packages/cheap/build/asm/macos/wat2wasm（带 -f 会直接替换旧的链接）
```
