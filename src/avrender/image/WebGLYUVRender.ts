/*
 * libmedia WebGLYUVRender
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 * 
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 * 
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */

import YUVTexture from './webgl/texture/YUVTexture'
import WebGLRender, { WebGLRenderOptions } from './WebGLRender'
import YUVProgram from './webgl/program/YUVProgram'

export default abstract class WebGLYUVRender extends WebGLRender {

  declare protected program: YUVProgram

  protected yTexture: YUVTexture

  protected uTexture: YUVTexture

  protected vTexture: YUVTexture

  protected aTexture: YUVTexture

  constructor(canvas: HTMLCanvasElement | OffscreenCanvas, options: WebGLRenderOptions) {
    super(canvas, options)
  }

  protected useProgram() {

    super.useProgram()

    this.yTexture = new YUVTexture(this.gl)
    this.yTexture.bind(0)
    this.yTexture.init()
    this.program.bindYTexture(0)

    this.uTexture = new YUVTexture(this.gl)
    this.uTexture.bind(1)
    this.uTexture.init()
    this.program.bindUTexture(1)

    this.vTexture = new YUVTexture(this.gl)
    this.vTexture.bind(2)
    this.vTexture.init()
    this.program.bindVTexture(2)

    this.aTexture = new YUVTexture(this.gl)
    this.aTexture.bind(3)
    this.aTexture.init()
    this.program.bindATexture(3)
  }

  public destroy(): void {
    if (this.yTexture) {
      this.yTexture.destroy()
      this.yTexture = null
    }
    if (this.uTexture) {
      this.uTexture.destroy()
      this.uTexture = null
    }
    if (this.vTexture) {
      this.vTexture.destroy()
      this.vTexture = null
    }
    if (this.aTexture) {
      this.aTexture.destroy()
      this.aTexture = null
    }
    super.destroy()
  }
}
