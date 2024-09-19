import { ComponentOptions } from 'yox'
import AVPlayer, { AVPlayerProgress } from 'avplayer/AVPlayer'
import * as eventType from 'avplayer/eventType'

import template from './LoadingTip.hbs'
import style from './LoadingTip.styl'
import { AVStreamInterface } from 'avformat/AVStream'
import { dumpCodecName } from 'avformat/dump'
import IntervalQueueTask from 'common/helper/IntervalQueueTask'

const info = {
  [AVPlayerProgress.OPEN_FILE]: 'LOADING_MESSAGE_OPEN_FILE',
  [AVPlayerProgress.ANALYZE_FILE]: 'LOADING_MESSAGE_ANALYZE_FILE',
  [AVPlayerProgress.LOAD_AUDIO_DECODER]: 'LOADING_MESSAGE_LOAD_AUDIO_DECODER',
  [AVPlayerProgress.LOAD_VIDEO_DECODER]: 'LOADING_MESSAGE_LOAD_VIDEO_DECODER',
}

const LoadingTip: ComponentOptions = {

  name: 'LoadingTip',

  template,

  propTypes: {
    player: {
      type: 'object',
      required: true
    },
    language: {
      type: 'object',
      required: true
    },
    error: {
      type: 'string'
    }
  },

  data: function () {
    return {
      style,
      messages: [],
      showMessage: false
    }
  },

  watchers: {
    error: function () {
      this.queue.push(() => {
        this.append('message', this.get('language.LOADING_MESSAGE_LOAD_FAILED'))
      })
    }
  },

  methods: {
    
  },

  afterMount() {
    this.namespace = '.component_loading' + Math.random()

    const player = this.get('player') as AVPlayer

    this.queue = new IntervalQueueTask(100)
    this.queue.onEnd = () => {
      if (this.showTimer) {
        clearTimeout(this.showTimer)
      }
      this.showTimer = setTimeout(() => {
        this.set('showMessage', false)
        this.showTimer = null
      }, 2000)
    }

    player.on(eventType.PLAYED + this.namespace, () => {
      this.queue.push(() => {
        this.append('message', this.get('language.LOADING_MESSAGE_LOAD_END'))
      })
      this.queue.end()
    })
    player.on(eventType.LOADING + this.namespace, () => {
      if (this.showTimer) {
        clearTimeout(this.showTimer)
        this.showTimer = null
      }
      this.queue.reset()
      this.set('message', [])
      this.set('showMessage', true)
    })
    player.on(eventType.PROGRESS + this.namespace, (progress: AVPlayerProgress, data: string | AVStreamInterface) => {
      let message = this.get('language.' + info[progress])
      switch (progress) {
        case AVPlayerProgress.ANALYZE_FILE:
          message = message.replace('${mux}', data as string)
          break
        case AVPlayerProgress.LOAD_AUDIO_DECODER:
        case AVPlayerProgress.LOAD_VIDEO_DECODER:
          message = message.replace('${decoder}', dumpCodecName((data as AVStreamInterface).codecpar.codecType, (data as AVStreamInterface).codecpar.codecId))
          break
      }
      this.queue.push(() => {
        this.append('message', message)
      })
    })
  },

  beforeDestroy() {
    const player = this.get('player') as AVPlayer
    if (this.namespace) {
      player.off(this.namespace)
    }
  }
}

export default LoadingTip