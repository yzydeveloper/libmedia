
import AVPlayer, { AVPlayerOptions, AVPlayerStatus, AVPlayerSupportedCodecs } from 'avplayer/AVPlayer'
import { Component, ComponentOptions } from 'yox'
import Yox from 'yox/dist/standard/runtime/yox'
import * as object from 'common/util/object'
import * as eventType from 'avplayer/eventType'
import * as is from 'common/util/is'
import * as array from 'common/util/array'
import * as url from 'common/util/url'

import Progress from './components/progress/Progress'
import Play from './components/control/play/Play'
import Volume from './components/control/volume/Volume'
import Timer from './components/control/timer/Timer'
import Setting from './components/control/setting/Setting'
import Fullscreen from './components/control/fullscreen/Fullscreen'
import Playrate from './components/control/playrate/Playrate'
import AudioTrack from './components/control/audioTrack/AudioTrack'
import VideoTrack from './components/control/videoTrack/VideoTrack'
import SubtitleTrack from './components/control/subtitleTrack/SubtitleTrack'
import Loop from './components/control/loop/Loop'
import Pip from './components/control/pip/Pip'
import Folder from './components/folder/Folder'
import Loading from './components/loading/Loading'
import PcmVisualization from './components/pcmVisualization/PcmVisualization'
import LoadingTip from './components/loadingTip/LoadingTip'
import Info from './components/info/Info'

import template from './AVPlayer.hbs'
import style from './AVPlayer.styl'
import getLanguage from './i18n/getLanguage'
import debounce from 'common/function/debounce'
import { AVMediaType } from 'avutil/codec'
import { AVStreamInterface } from 'avformat/AVStream'
import Keyboard from './Keyboard'

import outside from '../util/outside'

export const enum MenuAction {
  STATS
}

const AVPlayerUIComponentOptions: ComponentOptions = {

  name: 'AVPlayer',

  template,

  propTypes: {
    player: {
      type: 'object',
      required: true
    },
    indicatorUrl: {
      type: 'string',
    },
    pauseStateUrl: {
      type: 'string',
    },
    errorStateUrl: {
      type: 'string'
    },
    fullscreenDom: {
      type: 'object'
    }
  },

  data: function () {

    const language = getLanguage()

    const menu = [
      {
        name: language.MENU_STATS,
        action: MenuAction.STATS
      }
    ]

    return {
      style,
      title: '',
      error: '',
      showBar: true,
      played: false,
      folded: false,
      loading: false,
      language,
      streams: [],
      isLive: false,
      menu,
      showMenu: false,
      menuTop: 0,
      menuLeft: 0,

      showInfo: false
    }
  },

  events: {
    error: function(event, msg) {
      this.set('error', msg)
    },

    closeInfo: function() {
      this.set('showInfo', false)
    }
  },

  watchers: {
    played: function(value) {
      if (value) {
        if (this.showBarTimer) {
          clearTimeout(this.showBarTimer)
        }
        if (this.get('folded')) {
          this.showBarTimer = setTimeout(() => {
            this.set('showBar', false)
            this.showBarTimer = null
          }, 5000)
        }
      }
    },
    folded: function(value) {
      if (value) {
        if (this.showBarTimer) {
          clearTimeout(this.showBarTimer)
        }
        this.showBarTimer = setTimeout(() => {
          this.set('showBar', false)
          this.showBarTimer = null
        }, 5000)
      }
    }
  },

  computed: {
    hasVideoTrack: function() {
      const streams: AVStreamInterface[] = this.get('streams')
      return streams
        .filter((stream) => stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_VIDEO)
        .filter((stream) => array.has(AVPlayerSupportedCodecs, stream.codecpar.codecId))
        .length > 1
    },
    hasAudioTrack: function() {
      const streams: AVStreamInterface[] = this.get('streams')
      return streams
        .filter((stream: AVStreamInterface) => stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_AUDIO)
        .filter((stream) => array.has(AVPlayerSupportedCodecs, stream.codecpar.codecId))
        .length > 1
    },
    hasSubtitleTrack: function() {
      const streams: AVStreamInterface[] = this.get('streams')
      const isLive = this.get('isLive')
      return !isLive && streams
        .filter((stream: AVStreamInterface) => stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_VIDEO)
        .filter((stream) => array.has(AVPlayerSupportedCodecs, stream.codecpar.codecId))
        .length > 0
    },
    hasPip: function() {
      const streams: AVStreamInterface[] = this.get('streams')
      return streams
        .filter((stream: AVStreamInterface) => stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_VIDEO)
        .filter((stream) => array.has(AVPlayerSupportedCodecs, stream.codecpar.codecId))
        .length > 0
    },
    hasPcmVisualization: function () {
      const streams: AVStreamInterface[] = this.get('streams')
      return streams
        .filter((stream: AVStreamInterface) => stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_AUDIO)
        .filter((stream) => array.has(AVPlayerSupportedCodecs, stream.codecpar.codecId))
        .length > 0
        && streams
        .filter((stream: AVStreamInterface) => stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_VIDEO)
        .filter((stream) => array.has(AVPlayerSupportedCodecs, stream.codecpar.codecId))
        .length === 0
    }
  },

  methods: {
    init(player: AVPlayer) {
      const source = player.getSource()
      if (is.string(source)) {
        this.set('title', url.parse(decodeURI(source)).file)
      }
      else {
        this.set('title', source.name)
      }
      this.set('streams', player.getStreams())
      this.set('isLive', player.isLive())
    },

    mousemove() {
      this.set('showBar', true)
      if (this.showBarTimer) {
        clearTimeout(this.showBarTimer)
      }
      if (this.get('played') && this.get('folded')) {
        this.showBarTimer = setTimeout(() => {
          this.set('showBar', false)
          this.showBarTimer = null
        }, 5000)
      }
    },

    playClick() {
      if (this.$refs['play']) {
        this.$refs['play'].playClick()
      }
    },

    toggleFold() {
      this.set('folded', !this.get('folded'))
    },

    fold() {
      this.set('folded', true)
    },

    unfold() {
      this.set('folded', false)
    },

    menuAction(action: MenuAction) {
      if (action === MenuAction.STATS) {
        this.set('showInfo', true)
      }
      this.set('showMenu', false)
    },

    menuOutside() {
      this.set('showMenu', false)
    }
  },

  afterMount() {
    this.namespace = '.avplayer' + Math.random()

    const player = this.get('player') as AVPlayer

    const container = (this.$el as HTMLDivElement).querySelectorAll('.avplayer-ui-player')[0] as HTMLDivElement

    // @ts-ignore
    player.options.container = container

    player.on(eventType.LOADING + this.namespace, () => {
      this.set('loading', true)
      this.set('error', '')
    })
    player.on(eventType.LOADED + this.namespace, () => {
      this.init(player)
    })
    player.on(eventType.PLAYED + this.namespace, () => {
      this.set('loading', false)
    })
    player.on(eventType.STOPPED + this.namespace, () => {
      this.set('title', '')
      this.set('streams', [])
    })
    if (player.getStatus() >= AVPlayerStatus.LOADED) {
      this.init(player)
    }

    this.onresize = debounce(() => {
      player.resize(container.offsetWidth, container.offsetHeight)
    }, 500)
    window.addEventListener('resize', this.onresize)

    this.oncontextmenu = (event: MouseEvent) => {
      if (this.$refs['playerContainer'].contains(event.target)) {
        this.set('showMenu', true)
        this.set('menuTop', event.clientY)
        this.set('menuLeft', event.clientX)
        event.preventDefault()
      }
    }
    window.addEventListener('contextmenu', this.oncontextmenu)
  },

  beforeDestroy() {
    const player = this.get('player') as AVPlayer
    if (this.namespace) {
      player.off(this.namespace)
    }

    window.removeEventListener('resize', this.onresize)
    window.removeEventListener('contextmenu', this.oncontextmenu)
  },

  components: {
    Progress,
    Play,
    Volume,
    Timer,
    Setting,
    Fullscreen,
    Playrate,
    AudioTrack,
    VideoTrack,
    SubtitleTrack,
    Loop,
    Pip,
    Folder,
    Loading,
    PcmVisualization,
    LoadingTip,
    Info
  }
}

export interface AVPlayerUIOptions extends AVPlayerOptions {
  indicatorUrl?: string
  pauseStateUrl?: string
  errorStateUrl?: string
  fullscreenDom?: HTMLElement
}

export default class AVPlayerUI extends AVPlayer {

  public ui: Component

  private keyboard: Keyboard

  constructor(options: AVPlayerUIOptions) {
    super(object.extend({}, options, { container: null }))
    Yox.dom.addSpecialEvent('outside', outside)
    this.ui = new Yox(object.extend({
      el: options.container,
      replace: false,
      props: {
        player: this,
        indicatorUrl: options.indicatorUrl,
        pauseStateUrl: options.pauseStateUrl,
        errorStateUrl: options.errorStateUrl,
        fullscreenDom: options.fullscreenDom
      }
    }, AVPlayerUIComponentOptions))

    this.keyboard = new Keyboard(this)
  }

  public foldFolder() {
    // @ts-ignore
    this.ui.fold()
  }

  public unfoldFolder() {
    // @ts-ignore
    this.ui.unfold()
  }

  public async destroy() {
    await super.destroy()
    this.keyboard.destroy()
    // @ts-ignore
    this.ui.destroy()
  }
}