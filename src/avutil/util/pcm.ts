import { AVCodecID } from '../codec'

export function getPcmCodecId(bps: int32, flt: boolean, be: boolean, flags: int32) {
  if (bps <= 0 || bps > 64) {
    return AVCodecID.AV_CODEC_ID_NONE
  }

  if (flt) {
    switch (bps) {
      case 32:
        return be ? AVCodecID.AV_CODEC_ID_PCM_F32BE : AVCodecID.AV_CODEC_ID_PCM_F32LE
      case 64:
        return be ? AVCodecID.AV_CODEC_ID_PCM_F64BE : AVCodecID.AV_CODEC_ID_PCM_F64LE
      default:
        return AVCodecID.AV_CODEC_ID_NONE
    }
  }
  else {
    bps += 7
    bps >>>= 3

    if (flags & (1 << (bps - 1))) {
      switch (bps) {
        case 1:
          return AVCodecID.AV_CODEC_ID_PCM_S8
        case 2:
          return be ? AVCodecID.AV_CODEC_ID_PCM_S16BE : AVCodecID.AV_CODEC_ID_PCM_S16LE
        case 3:
          return be ? AVCodecID.AV_CODEC_ID_PCM_S24BE : AVCodecID.AV_CODEC_ID_PCM_S24LE
        case 4:
          return be ? AVCodecID.AV_CODEC_ID_PCM_S32BE : AVCodecID.AV_CODEC_ID_PCM_S32LE
        case 8:
          return be ? AVCodecID.AV_CODEC_ID_PCM_S64BE : AVCodecID.AV_CODEC_ID_PCM_S64LE
        default:
          return AVCodecID.AV_CODEC_ID_NONE
      }
    }
    else {
      switch (bps) {
        case 1:
          return AVCodecID.AV_CODEC_ID_PCM_U8
        case 2:
          return be ? AVCodecID.AV_CODEC_ID_PCM_U16BE : AVCodecID.AV_CODEC_ID_PCM_U16LE
        case 3:
          return be ? AVCodecID.AV_CODEC_ID_PCM_U24BE : AVCodecID.AV_CODEC_ID_PCM_U24LE
        case 4:
          return be ? AVCodecID.AV_CODEC_ID_PCM_U32BE : AVCodecID.AV_CODEC_ID_PCM_U32LE
        default:
          return AVCodecID.AV_CODEC_ID_NONE
      }
    }
  }
}

export function getExactBitsPerSample(codecId: AVCodecID) {
  switch (codecId) {
    case AVCodecID.AV_CODEC_ID_8SVX_EXP:
    case AVCodecID.AV_CODEC_ID_8SVX_FIB:
    case AVCodecID.AV_CODEC_ID_ADPCM_ARGO:
    case AVCodecID.AV_CODEC_ID_ADPCM_CT:
    case AVCodecID.AV_CODEC_ID_ADPCM_IMA_ALP:
    case AVCodecID.AV_CODEC_ID_ADPCM_IMA_AMV:
    case AVCodecID.AV_CODEC_ID_ADPCM_IMA_APC:
    case AVCodecID.AV_CODEC_ID_ADPCM_IMA_APM:
    case AVCodecID.AV_CODEC_ID_ADPCM_IMA_EA_SEAD:
    case AVCodecID.AV_CODEC_ID_ADPCM_IMA_OKI:
    case AVCodecID.AV_CODEC_ID_ADPCM_IMA_WS:
    case AVCodecID.AV_CODEC_ID_ADPCM_IMA_SSI:
    case AVCodecID.AV_CODEC_ID_ADPCM_G722:
    case AVCodecID.AV_CODEC_ID_ADPCM_YAMAHA:
    case AVCodecID.AV_CODEC_ID_ADPCM_AICA:
      return 4
    case AVCodecID.AV_CODEC_ID_DSD_LSBF:
    case AVCodecID.AV_CODEC_ID_DSD_MSBF:
    case AVCodecID.AV_CODEC_ID_DSD_LSBF_PLANAR:
    case AVCodecID.AV_CODEC_ID_DSD_MSBF_PLANAR:
    case AVCodecID.AV_CODEC_ID_PCM_ALAW:
    case AVCodecID.AV_CODEC_ID_PCM_MULAW:
    case AVCodecID.AV_CODEC_ID_PCM_VIDC:
    case AVCodecID.AV_CODEC_ID_PCM_S8:
    case AVCodecID.AV_CODEC_ID_PCM_S8_PLANAR:
    case AVCodecID.AV_CODEC_ID_PCM_SGA:
    case AVCodecID.AV_CODEC_ID_PCM_U8:
    case AVCodecID.AV_CODEC_ID_SDX2_DPCM:
    case AVCodecID.AV_CODEC_ID_DERF_DPCM:
      return 8
    case AVCodecID.AV_CODEC_ID_PCM_S16BE:
    case AVCodecID.AV_CODEC_ID_PCM_S16BE_PLANAR:
    case AVCodecID.AV_CODEC_ID_PCM_S16LE:
    case AVCodecID.AV_CODEC_ID_PCM_S16LE_PLANAR:
    case AVCodecID.AV_CODEC_ID_PCM_U16BE:
    case AVCodecID.AV_CODEC_ID_PCM_U16LE:
      return 16
    case AVCodecID.AV_CODEC_ID_PCM_S24DAUD:
    case AVCodecID.AV_CODEC_ID_PCM_S24BE:
    case AVCodecID.AV_CODEC_ID_PCM_S24LE:
    case AVCodecID.AV_CODEC_ID_PCM_S24LE_PLANAR:
    case AVCodecID.AV_CODEC_ID_PCM_U24BE:
    case AVCodecID.AV_CODEC_ID_PCM_U24LE:
      return 24
    case AVCodecID.AV_CODEC_ID_PCM_S32BE:
    case AVCodecID.AV_CODEC_ID_PCM_S32LE:
    case AVCodecID.AV_CODEC_ID_PCM_S32LE_PLANAR:
    case AVCodecID.AV_CODEC_ID_PCM_U32BE:
    case AVCodecID.AV_CODEC_ID_PCM_U32LE:
    case AVCodecID.AV_CODEC_ID_PCM_F32BE:
    case AVCodecID.AV_CODEC_ID_PCM_F32LE:
    case AVCodecID.AV_CODEC_ID_PCM_F24LE:
    case AVCodecID.AV_CODEC_ID_PCM_F16LE:
      return 32
    case AVCodecID.AV_CODEC_ID_PCM_F64BE:
    case AVCodecID.AV_CODEC_ID_PCM_F64LE:
    case AVCodecID.AV_CODEC_ID_PCM_S64BE:
    case AVCodecID.AV_CODEC_ID_PCM_S64LE:
      return 64
    default:
      return 0
  }
}

export function getBitsPerSample(codecId: AVCodecID) {
  switch (codecId) {
    case AVCodecID.AV_CODEC_ID_ADPCM_SBPRO_2:
      return 2
    case AVCodecID.AV_CODEC_ID_ADPCM_SBPRO_3:
      return 3
    case AVCodecID.AV_CODEC_ID_ADPCM_SBPRO_4:
    case AVCodecID.AV_CODEC_ID_ADPCM_IMA_WAV:
    case AVCodecID.AV_CODEC_ID_ADPCM_IMA_QT:
    case AVCodecID.AV_CODEC_ID_ADPCM_SWF:
    case AVCodecID.AV_CODEC_ID_ADPCM_MS:
      return 4
    default:
      return getExactBitsPerSample(codecId)
  }
}