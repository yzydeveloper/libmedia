"use strict";(self.webpackChunkAVTranscoder=self.webpackChunkAVTranscoder||[]).push([[257],{89088:(t,e,i)=>{i.d(e,{Au:()=>m,He:()=>b,XC:()=>T,Y2:()=>w,hG:()=>p,oz:()=>x});var r=i(77231);const s=[44100,48e3,32e3,0],n=[22050,24e3,16e3,0],a=[11025,12e3,8e3,0],o=[0,1152,1152,384],c=[0,576,1152,384],h=[0,576,1152,384],f=[0,32,64,96,128,160,192,224,256,288,320,352,384,416,448,-1],d=[0,32,48,56,64,80,96,112,128,160,192,224,256,320,384,-1],g=[0,32,40,48,56,64,80,96,112,128,160,192,224,256,320,-1],l=[0,32,48,56,64,80,96,112,128,144,160,176,192,224,256,-1],u=[0,8,16,24,32,40,48,56,64,80,96,112,128,144,160,-1];function w(t,e){switch(t){case 0:return a[e];case 2:return n[e];case 3:return s[e]}return r.N_}function p(t,e){switch(t){case 0:return h[e];case 2:return c[e];case 3:return o[e]}return r.N_}function x(t,e,i){switch(e){case 1:switch(t){case 0:case 2:return u[i];case 3:return g[i]}break;case 2:switch(t){case 0:case 2:return u[i];case 3:return d[i]}case 3:switch(t){case 0:case 2:return l[i];case 3:return f[i]}}return r.N_}function m(t){switch(t){case 1:return 34;case 2:return 33;case 3:return 32}return r.N_}const b={32:"Layer1",33:"Layer2",34:"Layer3"};function T(t,e){if(e&&e.length>=4){const i=e[1]>>>3&3,r=(6&e[1])>>1,s=(12&e[2])>>>2,n=3&~(e[3]>>>6)?2:1,a=m(r),o=w(i,s);t.codecpar.profile=a,t.codecpar.sampleRate=o,t.codecpar.chLayout.nbChannels=n}}},51597:(t,e,i)=>{i.d(e,{A:()=>s});var r=i(134);class s{constructor(){(0,r.A)(this,"type",-1)}destroy(t){}}},52257:(t,e,i)=>{i.r(e),i.d(e,{default:()=>T});var r=i(134),s=i(63939),n=i(51597),a=i(4624),o=i(9705),c=i(89088),h=i(77231),f=i(43607),d=i(75294),g=i(31608),l=i(729),u=i(19028),w=i(14686),p=i(50011),x=i(95335),m="src/avformat/formats/OMp3Format.ts";const b={id3v2Version:4,hasID3v1:!1,hasXing:!0};class T extends n.A{constructor(t={}){super(),(0,r.A)(this,"type",7),(0,r.A)(this,"options",void 0),(0,r.A)(this,"context",void 0),(0,r.A)(this,"xingWriter",void 0),this.options=x.X$({},b,t)}init(t){return t.ioWriter.setEndian(!0),this.context={size:0,frames:0,seen:0,want:1,bag:[],pos:0,initialBitrate:0,hasVariableBitrate:!1,padding:0,delay:0,frameHeader:new d.Vz,xingOffset:-1,xingFrameSize:0,xingFrameOffset:BigInt(0),xingFramePos:BigInt(0),audioSize:0,id3SizePos:BigInt(0)},this.xingWriter=new l.A(new Uint8Array(5e3)),t.streams.find((t=>86017===t.codecpar.codecId))?0:(a.z3("can not found stream with mp3 codec",m,125),o.UY)}writeXingTag(t){if(!this.options.hasXing)return;const e=t.streams.find((t=>86017===t.codecpar.codecId));let i=-1,r=0,s=-1,n=-1,o=BigInt(h.go>>>0),l=0,u=0;const w=[44100,48e3,32e3];for(let t=0;t<w.length;t++){const r=w[t];if(e.codecpar.sampleRate===r)l=3;else if(e.codecpar.sampleRate===r/2)l=2;else{if(e.codecpar.sampleRate!==r/4)continue;l=0}i=t}if(i===w.length)return void a.R8("unsupported sample rate, not writing Xing header.",m,171);switch(e.codecpar.chLayout.nbChannels){case 1:r=3;break;case 2:r=0;break;default:return void a.R8("unsupported number of channels, not writing Xing header.",m,185)}let x=-16777216;for(x|=(227|l<<3)<<16,x|=i<<2<<8,x|=r<<6,s=1;s<15;s++){let t=BigInt(Math.floor(1e3*c.oz(l,2,s))),i=f.tn(t-e.codecpar.bitRate);i<o&&(o=i,n=s)}for(s=n;;s++){let t=s<<12;if(15==s)return;x|=t,d.qg(this.context.frameHeader,x);const i=[[0,9,17],[0,0,0],[0,9,17],[0,17,32]];if(this.context.xingOffset=i[this.context.frameHeader.version][e.codecpar.chLayout.nbChannels]+4,u=this.context.xingOffset+g.FN,u<=d.CM(this.context.frameHeader,e.codecpar.sampleRate))break;x&=~t}this.xingWriter.writeUint32(x),this.xingWriter.writeBuffer(new Uint8Array(this.context.xingOffset-4).fill(0)),this.xingWriter.writeString("Xing"),this.xingWriter.writeUint32(15),this.context.size=d.CM(this.context.frameHeader,e.codecpar.sampleRate),this.context.want=1,this.context.seen=0,this.context.pos=0,this.xingWriter.writeUint32(0),this.xingWriter.writeUint32(0);for(let t=0;t<g.W8;t++)this.xingWriter.writeUint8(255*t/g.W8>>>0);this.xingWriter.writeUint32(0);const b=e.metadata;if(null!=b&&b.encoder){const t=p.l(b.encoder);this.xingWriter.writeBuffer(t.subarray(0,9))}else this.xingWriter.writeString("Lavf"),this.xingWriter.writeBuffer(new Uint8Array(5).fill(0));this.xingWriter.writeUint8(0),this.xingWriter.writeUint8(0),this.xingWriter.writeBuffer(new Uint8Array(8).fill(0)),this.xingWriter.writeUint8(0),this.xingWriter.writeUint8(0),this.xingWriter.writeUint24(0),this.xingWriter.writeUint8(0),this.xingWriter.writeUint8(0),this.xingWriter.writeUint16(0),this.xingWriter.writeUint32(0),this.xingWriter.writeUint16(0),this.xingWriter.writeUint16(0),this.xingWriter.writeBuffer(new Uint8Array(this.context.size-u).fill(0)),this.context.xingFrameSize=this.xingWriter.getPos(),this.context.xingFrameOffset=t.ioWriter.getPos(),t.ioWriter.writeBuffer(this.xingWriter.getWroteBuffer()),this.context.audioSize=this.context.xingFrameSize}xingAddFrame(t){if(this.context.frames++,this.context.seen++,this.context.size+=s.f[15](t+28),this.context.want===this.context.seen){if(this.context.bag[this.context.pos]=this.context.size,400==++this.context.pos){for(let t=1;t<400;t+=2)this.context.bag[t>>1]=this.context.bag[t];this.context.want*=2,this.context.pos=200}this.context.seen=0}}updateXing(t){this.context.hasVariableBitrate&&(this.xingWriter.seek(this.context.xingOffset),this.xingWriter.writeString("Info")),this.xingWriter.seek(this.context.xingOffset+8),this.xingWriter.writeUint32(this.context.frames),this.xingWriter.writeUint32(this.context.size),this.xingWriter.seek(this.context.xingFrameSize);const e=this.xingWriter.getWroteBuffer().subarray(this.context.xingOffset+16);e[0]=0;for(let t=1;t<g.W8;t++){let i=t*this.context.pos/g.W8>>>0;const r=256*this.context.bag[i]/this.context.size>>>0;e[t]=Math.min(r,255)}const i=t.ioWriter.getPos();t.ioWriter.seek(this.context.xingFrameOffset),t.ioWriter.writeBuffer(this.xingWriter.getWroteBuffer()),t.ioWriter.seek(i)}writeHeader(t){const e=t.streams.find((t=>86017===t.codecpar.codecId));return this.options.id3v2Version&&u.M(t.ioWriter,this.options.id3v2Version,t.metadataHeaderPadding,e.metadata),this.options.hasXing&&this.writeXingTag(t),0}writeAVPacket(t,e){if(!s.f[15](e+28))return void a.R8(`packet's size is 0: ${s.f[15](e+32)}, ignore it`,m,368);const i=t.getStreamByIndex(s.f[15](e+32));if(i){if(86017===i.codecpar.codecId){if(s.f[20](e+24)&&s.f[15](e+28)>4){d.qg(this.context.frameHeader,s.f[8](s.f[20](e+24)));const i=c.oz(this.context.frameHeader.version,this.context.frameHeader.layer,this.context.frameHeader.bitrateIndex);this.context.initialBitrate?i!==this.context.initialBitrate&&(this.context.hasVariableBitrate=!0):this.context.initialBitrate=i,this.xingAddFrame(e),t.ioWriter.writeBuffer((0,w.s3)(s.f[20](e+24),s.f[15](e+28)))}return 0}a.R8(`packet's codecId is not mp3: ${s.f[15](e+32)}, ignore it`,m,380)}else a.R8(`can not found the stream width the packet's streamIndex: ${s.f[15](e+32)}, ignore it`,m,375)}writeTrailer(t){if(this.options.hasID3v1){const e=t.streams.find((t=>86017===t.codecpar.codecId)).metadata,i=new Uint8Array(g.c1),r=new l.A(i);function s(t){const e=p.l(t);r.writeBuffer(e.subarray(0,30)),e.length<30&&r.skip(30-e.length)}r.writeString("TAG"),e.title?s(e.title):r.skip(30),e.artist?s(e.artist):r.skip(30),e.album?s(e.album):r.skip(30),i[127]=255,e.genre&&(i[127]=+e.genre),t.ioWriter.writeBuffer(i)}return this.options.hasXing&&this.updateXing(t),t.ioWriter.flush(),0}flush(t){return t.ioWriter.flush(),0}}},75294:(t,e,i)=>{i.d(e,{CM:()=>o,Vz:()=>n,qg:()=>a});var r=i(134),s=i(89088);class n{constructor(){(0,r.A)(this,"version",void 0),(0,r.A)(this,"layer",void 0),(0,r.A)(this,"protection",void 0),(0,r.A)(this,"bitrateIndex",void 0),(0,r.A)(this,"samplingFrequency",void 0),(0,r.A)(this,"padding",void 0),(0,r.A)(this,"private",void 0),(0,r.A)(this,"mode",void 0),(0,r.A)(this,"modeExtension",void 0),(0,r.A)(this,"copyright",void 0),(0,r.A)(this,"original",void 0),(0,r.A)(this,"emphasis",void 0)}}function a(t,e){t.version=e>>19&3,t.layer=e>>17&3,t.protection=e>>16&1,t.bitrateIndex=e>>12&15,t.samplingFrequency=e>>10&3,t.padding=e>>9&1,t.mode=e>>6&3,t.modeExtension=e>>4&3,t.copyright=e>>3&1,t.original=e>>2&1,t.emphasis=3&e}function o(t,e){let i=s.oz(t.version,t.layer,t.bitrateIndex);switch(t.layer){case 1:default:i=144e3*i/(e<<(3===t.version?0:1))>>>0,i+=t.padding;break;case 2:i=144e3*i/e>>>0,i+=t.padding;break;case 3:i=12e3*i/e>>>0,i=4*(i+t.padding)}return i}},19028:(t,e,i)=>{i.d(e,{M:()=>c,q:()=>o});var r=i(4624),s=i(50011),n="src/avformat/formats/mp3/id3v2.ts";function a(t,e){let i="utf-8";return 0===t?i="iso-8859-1":1===t?i="utf-16":2===t&&(i="utf-16be"),new TextDecoder(i).decode(e)}async function o(t,e,i,s){const o=2!==i.version,c=o?10:6;let h=t.getPos()+BigInt(e>>>0);async function f(){await t.seek(h)}if(o&&64&i.flags){let s=await async function(t,e){let i=0;for(;e--;)i=(i<<7)+(127&await t.readUint8());return i}(t,4);if(4===i.version&&(s-=4),s<0)return r.z3("invalid extended header length",n,92),await f();if(await t.skip(s),(e-=s+4)<0)return r.z3("extended header too long",n,98),await t.seek(h),await f()}for(;e>c;){let i,h;if(o){if(i=await t.readString(4),h=await t.readUint32(),!h){r.z3("invalid frame size",n,112);break}await t.readUint16()}else i=await t.readString(3),h=await t.readUint24();if("APIC"===i)s.poster=await t.readBuffer(h);else if("USLT"===i){const e=await t.readUint8(),i=await t.readString(3),r=await t.readBuffer(h-4);s.lyrics=`${i} ${a(e,r)}`}else if("COMM"===i||"COM"===i){const e=await t.readUint8(),i=await t.readString(3),r=await t.readBuffer(h-4);s.comment=`${i} ${a(e,r)}`}else{let e;switch(e="T"===i[0]?a(await t.readUint8(),await t.readBuffer(h-1)):await t.readBuffer(h),i){case"TIT2":case"TT2":s.title=e;break;case"TPE1":case"TP1":s.artist=e;break;case"TPE2":case"TP2":s.albumArtist=e;break;case"TPOS":s.disc=e;break;case"TCOP":s.copyright=e;break;case"TALB":case"TAL":s.album=e;break;case"TRCK":case"TRK":s.track=e;break;case"TYER":case"TDRL":case"TDRC":s.date=e;break;case"COMM":case"COM":s.comment=e;break;case"TCON":case"TCO":s.genre=e;break;case"TSSE":case"TEN":s.encoder=e;break;case"TCOM":s.composer=e;break;case"TENC":s.encodedBy=e;break;case"TLAN":s.language=e;break;case"TPE3":case"TP3":s.performer=e;break;case"TPUB":s.publisher=e;break;case"TCMP":case"TCP":s.compilation=e;break;case"TDEN":s.creationTime=e;break;case"TSOA":s.albumSort=e;break;case"TSOP":s.artistSort=e;break;case"TSOT":s.titleSort=e;break;case"TIT1":s.grouping=e;break;default:s[i]=e}}e-=h+c}4==i.version&&16&i.flags&&(h+=BigInt(10)),await t.seek(h)}function c(t,e,i,r){let n=t.getPos();t.writeString("ID3"),t.writeUint8(e),t.writeUint16(0);const a=t.getPos();function o(e,i){const r=s.l(i);t.writeString(e),t.writeUint32(r.length+1),t.writeUint16(0),t.writeUint8(3),t.writeBuffer(r)}var c;if(t.writeUint32(0),r.poster&&("APIC",c=r.poster,t.writeString("APIC"),t.writeUint32(c.length),t.writeUint16(0),t.writeBuffer(c)),r.title&&o("TIT2",r.title),r.artist&&o("TPE1",r.artist),r.albumArtist&&o("TPE2",r.albumArtist),r.disc&&o("TPOS",r.disc),r.copyright&&o("TCOP",r.copyright),r.album&&o("TALB",r.album),r.track&&o("TRCK",r.track),r.date&&o("TDRC",r.date),r.comment){let t=r.comment;" "===t[3]&&(t=t.slice(0,3)+t.slice(4)),o("COMM",t)}if(r.lyrics){let t=r.lyrics;" "===t[3]&&(t=t.slice(0,3)+t.slice(4)),o("USLT",t)}r.genre&&o("TCON",r.genre+""),r.encoder&&o("TSSE",r.encoder),r.composer&&o("TCOM",r.composer),r.encodedBy&&o("TENC",r.encodedBy),r.language&&o("TLAN",r.language),r.performer&&o("TPE3",r.performer),r.publisher&&o("TPUB",r.publisher),r.compilation&&o("TCMP",r.compilation),r.creationTime&&o("TDEN",r.creationTime),r.albumSort&&o("TSOA",r.albumSort),r.artistSort&&o("TSOP",r.artistSort),r.titleSort&&o("TSOT",r.titleSort),r.grouping&&o("TIT1",r.grouping),i<10&&(i=10);const h=0|Number(t.getPos()-n&0xffffffffn);i>268435455-h&&(i=268435455-h),t.writeBuffer(new Uint8Array(i).fill(0)),n=t.getPos(),t.seek(a),function(t,e){t.writeUint8(e>>21&127),t.writeUint8(e>>14&127),t.writeUint8(e>>7&127),t.writeUint8(127&e)}(t,h),t.seek(n)}},31608:(t,e,i)=>{i.d(e,{FN:()=>n,W8:()=>r,c1:()=>s});const r=100,s=128,n=156},729:(t,e,i)=>{i.d(e,{A:()=>a});var r=i(134),s=i(4624),n=i(50011);class a{constructor(t,e=!0){(0,r.A)(this,"data",void 0),(0,r.A)(this,"buffer",void 0),(0,r.A)(this,"byteStart",void 0),(0,r.A)(this,"pos",void 0),(0,r.A)(this,"size",void 0),(0,r.A)(this,"littleEndian",void 0),this.buffer=t,this.data=t instanceof Uint8Array?new DataView(t.buffer):t.view,this.byteStart=t instanceof Uint8Array?t.byteOffset:0,this.pos=0,this.size=t.byteLength,this.littleEndian=!e}writeUint8(t){this.data.setUint8(this.pos+++this.byteStart,t)}writeUint16(t){this.data.setUint16(this.pos+this.byteStart,t,this.littleEndian),this.pos+=2}writeUint24(t){const e=3840&t,i=240&t,r=15&t;this.littleEndian?(this.writeUint8(r),this.writeUint8(i),this.writeUint8(e)):(this.writeUint8(e),this.writeUint8(i),this.writeUint8(r))}writeUint32(t){this.data.setUint32(this.pos+this.byteStart,t,this.littleEndian),this.pos+=4}writeUint64(t){const e=t&BigInt(4294967295),i=(t&BigInt(4294967295)<<BigInt(32))>>BigInt(32);this.littleEndian?(this.writeUint32(Number(e)),this.writeUint32(Number(i))):(this.writeUint32(Number(i)),this.writeUint32(Number(e)))}writeInt8(t){this.data.setInt8(this.pos+++this.byteStart,t)}writeInt16(t){this.data.setInt16(this.pos+this.byteStart,t,this.littleEndian),this.pos+=2}writeInt32(t){this.data.setInt32(this.pos+this.byteStart,t,this.littleEndian),this.pos+=4}writeInt64(t){const e=t&BigInt(4294967295),i=(t&BigInt(4294967295)<<BigInt(32))>>BigInt(32);this.littleEndian?(this.writeInt32(Number(e)),this.writeInt32(Number(i))):(this.writeInt32(Number(i)),this.writeInt32(Number(e)))}writeFloat(t){this.data.setFloat32(this.pos+this.byteStart,t,this.littleEndian),this.pos+=4}writeDouble(t){this.data.setFloat64(this.pos+this.byteStart,t,this.littleEndian),this.pos+=8}getPos(){return this.pos}seek(t){t>this.size&&(t=this.size),this.pos=Math.max(0,t)}skip(t){this.seek(this.pos+t)}back(t){this.seek(this.pos-t)}remainingSize(){return this.size-this.pos}writeBuffer(t){let e=t.length;this.remainingSize()<e&&(e=this.remainingSize(),s.R8(`the remaining buffer size is smaller then the wrote buffer, hope set ${t.length}, but set ${e}`,"src/common/io/BufferWriter.ts",211)),this.buffer.set(t,this.pos),this.pos+=t.length}writeString(t){const e=n.l(t);return this.writeBuffer(e),e.length}getWroteBuffer(){return this.buffer.subarray(0,this.pos)}resetBuffer(t,e=!0){this.buffer=t,this.data=t instanceof Uint8Array?new DataView(t.buffer):t.view,this.byteStart=t instanceof Uint8Array?t.byteOffset:0,this.pos=0,this.size=t.byteLength,this.littleEndian=!e}}},43607:(t,e,i)=>{function r(t){return t>0?t:-t}function s(t,e){return t>e?t:e}function n(t,e){return t>e?e:t}i.d(e,{T9:()=>s,jk:()=>n,tn:()=>r})}}]);