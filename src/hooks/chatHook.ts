import type { IChatMsgItem } from '@/types/chat';

/**
 * 音频相关 hook
 */
export const useAudioHook = () => {
  // 全局唯一的音频管理器
  const audioManager = ref<UniApp.InnerAudioContext | null>(null);
  // 音频-播放状态 0: 结束播放、1: 播放中
  const audioPlayStatus = ref<0 | 1>(0);

  onMounted(() => {
    _initAudioManager();
  });

  onUnmounted(() => {
    // 销毁音频管理器
    if (audioManager.value) audioManager.value.destroy();
  });

  /**
   * 初始化 音频 manager
   */
  const _initAudioManager = () => {
    audioManager.value = uni.createInnerAudioContext();

    /**
     * 监听音频 播放 event
     */
    audioManager.value.onPlay(() => {
      // console.log('start playing..');
      audioPlayStatus.value = 1;
    });

    /**
     * 监听音频 暂停 event
     */
    audioManager.value.onPause(()=>{
      // console.log('play Pause...');
    });

    /**
     * 监听音频 停止 event
     */
    audioManager.value.onStop(res => {
      // console.log('play stop...');
      // 将播放状态标记为 "已停止"
      audioPlayStatus.value = 0;
    });

    /**
     * 监听音频 自然播放至结束 event
     */
    audioManager.value.onEnded(res => {
      // console.log('play end...');
      audioPlayStatus.value = 0;
    });

    /**
     * 监听音频 播放错误 event
     */
    audioManager.value.onError(res => {
      // console.log('play error...');
      audioPlayStatus.value = 0;
    });
  };

  /**
   * 音频 播放 
   * @param src 音频地址
   */
  const audioManagerPlay = (src: string) => {
    if (!audioManager.value) return;
    audioManager.value.src = src;
    audioManager.value.play();
  };

  /**
   * 音频 停止
   */
  const audioManagerStop = () => {
    if (!audioManager.value) return;
    audioManager.value.stop();
  };
  
  return {
    audioManager,
    audioPlayStatus,
    audioManagerPlay,
    audioManagerStop,
  };
};

/**
 * 录音相关 hook
 */
export const useRecorderHook = (options: any = {}) => {
  // 全局唯一的录音管理器
  const recordManager = ref<UniApp.RecorderManager | null>(null);
  // 音频-录制状态 0: 结束录制、1: 录制中
  const recordStatus = ref<0 | 1>(0);
  // 是否取消录音
  const isCancelRecord = ref(false);
  // 录制 开始手指的 Y 轴坐标
  const recordStartY = ref(0);
  // 录音 定时timer
  const recordTimer = ref<number | null>(null);
  // 录音 时长
  const recordTime = ref(0);

  onMounted(() => {
    // #ifndef WEB
    _initRecordManager();
    // #endif
  });

  onUnmounted(() => {
  });

  /**
   * 初始化 录音 manager
   */
  const _initRecordManager = () => {
    // 获取全局唯一的录音管理器
    recordManager.value = uni.getRecorderManager();

    /**
     * 监听录音-开始事件
     */
    recordManager.value.onStart(() => {
      // console.log('start recording...');

      recordTime.value = 0;
      // 开启录音计时
      recordTimer.value = setInterval(()=>{
        recordTime.value++;
      }, 1000);
    });

    /**
     * 监听录音-错误事件
     */
    recordManager.value.onError(res => {
      console.log('录音错误：', res);
    });

    /**
     * 监听录音-结束事件
     */
    recordManager.value.onStop(res => {
      // 清除定时器
      if (recordTimer.value) {
        clearInterval(recordTimer.value);
        recordTimer.value = null;
      }

      // 取消录音
      if (isCancelRecord.value) {
        uni.$uv.toast('已取消录音');
        return;
      }

      // 录音时长需大于 1s
      if (recordTime.value >= 1) {
        // 发送录音消息
        options.sendRecordChatMsgFunc('audio', res.tempFilePath, { time: recordTime.value });
      } else {
        uni.$uv.toast('录音时间过短');
      }
    });
  };

  /**
   * 录音-开始 
   */
  const recordManagerStart = () => {
    if (!recordManager.value) return;

    // 开始录音
    recordManager.value.start({
      numberOfChannels: 1, // 录音通道数
      sampleRate: 16000, // 采样率
      format: 'mp3', // 音频格式
    });
  };

  /**
   * 录音-停止
   */
  const recordManagerStop = () => {
    if (!recordManager.value) return;
    // 停止录音
    recordManager.value.stop();
  };

  return {
    recordManager,
    recordStatus,
    isCancelRecord,
    recordStartY,

    recordManagerStart,
    recordManagerStop
  };
};
