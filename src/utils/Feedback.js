// helper: save with 10-day expiry
export const saveFeedbacks = (feedbacks) => {
  const data = {
    feedbacks,
    expiry: Date.now() + 10 * 24 * 60 * 60 * 1000, // 10 days
  };
  localStorage.setItem("feedbacks", JSON.stringify(data));
};

export const loadFeedbacks = () => {
  const item = localStorage.getItem("feedbacks");
  if (!item) return [];
  const data = JSON.parse(item);

  // if expired, clear storage
  if (Date.now() > data.expiry) {
    localStorage.removeItem("feedbacks");
    return [];
  }
  return data.feedbacks || [];
};

export const playSuccessSound = () => {
  const audio = new Audio("src/music/sound2.mp3"); // file inside public/
  audio.play().catch((err) => console.log("Sound play error:", err));
};