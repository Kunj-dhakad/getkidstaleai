// utils/removeBackground.ts
export interface BackgroundResponse {
    reference_id: string;
    success: boolean;
  }
  
  export interface PollResponse {
    status: 1 | 2 | 3 | 4;
    success: boolean;
    url: string;
  }
  
  const API_KEY = 'D684B8EFF387DBD9';
  
  export const removeVideoBackground = async (videoUrl: string): Promise<string> => {
    // 1. Submit the video
    const submitRes = await fetch('https://ai2.oppyo.com/app/v1/remove_video_background_queue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `api_key=${API_KEY}&url=${encodeURIComponent(videoUrl)}`,
    });
  
    const submitData: BackgroundResponse = await submitRes.json();
  
    if (!submitData.success) {
      throw new Error('Failed to submit video for background removal');
    }
  
    const referenceId = submitData.reference_id;
  
    // 2. Poll the processing endpoint
    const poll = async (): Promise<string> => {
      const res = await fetch('https://ai2.oppyo.com/app/v1/get_background_processed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `api_key=${API_KEY}&reference_id=${referenceId}`,
      });
  
      const data: PollResponse = await res.json();
  
      if (data.status === 3 && data.url) {
        return data.url; // ✅ Success
      }
  
      if (data.status === 4) {
        throw new Error('Background processing failed');
      }
  
      // Retry after delay
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
      return poll();
    };
  
    return poll();
  };
  