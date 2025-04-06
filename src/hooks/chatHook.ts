import type { IChatMsgItem } from '@/types/chat';

/**
 * 音频相关 hook
 */
export const useAudioHook = () => {
  const audioManager = ref<UniApp.InnerAudioContext | null>(null);

  // audio 播放状态 0: 结束播放、1: 播放中
  const audioPlayStatus = ref<0 | 1>(0);

  onMounted(() => {
    _initAudioManager();
  });

  onUnmounted(() => {
    console.log('卸载');
    // 销毁音频管理器
    // if (audioManager.value) audioManager.value.destroy();
  });

  /**
   * 初始化音频管理器
   */
  const _initAudioManager = () => {
    // 获取全局唯一的录音管理器
    audioManager.value = uni.createInnerAudioContext();

    /**
     * 监听音频 播放 event
     */
    audioManager.value.onPlay(() => {
      console.log('start playing..');
      audioPlayStatus.value = 1;
    });

    /**
     * 监听音频 暂停 event
     */
    audioManager.value.onPause(()=>{
      console.log('play Pause...');
    });

    /**
     * 监听音频 停止 event
     */
    audioManager.value.onStop(res => {
      console.log('play stop...');
      // 将播放状态标记为 "已停止"
      audioPlayStatus.value = 0;
    });

    /**
     * 监听音频 自然播放至结束 event
     */
    audioManager.value.onEnded(res => {
      console.log('play stop...');
      audioPlayStatus.value = 0;
    });

    /**
     * 监听音频 播放错误 event
     */
    audioManager.value.onError(res => {
      console.log('play error...');
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
   * @param src 音频地址
   */
  const audioManagerStop = () => {
    if (!audioManager.value) return;
    // audioManager.value.src = src;
    audioManager.value.stop();
  };
  
  return {
    audioManager,
    audioPlayStatus,
    audioManagerPlay,
    audioManagerStop,
  };
};
